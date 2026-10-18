"""Textures légères générées une fois (au lieu de filtres SVG calculés par le téléphone).

- ink.webp      : nuages d'encre saphir (mode sombre), avec transparence
- brushed.webp  : titane brossé, gris neutre centré sur 50 % (mode clair, fusion « overlay »), raccordable
- grain.webp    : grain fin raccordable (mode sombre)

Usage : python3 scripts/make_textures.py
"""
from pathlib import Path

import numpy as np
from PIL import Image

OUT = Path(__file__).resolve().parent.parent / "public/textures"
rng = np.random.default_rng(17)


def filtered_noise(h: int, w: int, sx: float, sy: float, power: float = 0.0) -> np.ndarray:
    """Bruit blanc filtré en fréquence : périodique, donc raccordable. Renvoie [0, 1]."""
    white = rng.standard_normal((h, w))
    fy = np.fft.fftfreq(h)[:, None]
    fx = np.fft.fftfreq(w)[None, :]
    gauss = np.exp(-((fx / sx) ** 2 + (fy / sy) ** 2))
    if power:
        r = np.sqrt(fx**2 + fy**2) + 1e-6
        gauss = gauss * r ** (-power)
        gauss[0, 0] = 0
    out = np.real(np.fft.ifft2(np.fft.fft2(white) * gauss))
    out = (out - out.mean()) / (out.std() + 1e-9)
    return out


def ink() -> None:
    h, w = 450, 720
    n = 0.62 * filtered_noise(h, w, 0.008, 0.016) + 0.28 * filtered_noise(h, w, 0.027, 0.053) + 0.1 * filtered_noise(h, w, 0.06, 0.1)
    n = (n - n.min()) / (n.max() - n.min())
    alpha = np.clip(1.6 * n - 0.62, 0, 1) ** 1.25
    rgba = np.zeros((h, w, 4), dtype=np.uint8)
    rgba[..., 0] = 117
    rgba[..., 1] = 143
    rgba[..., 2] = 250
    rgba[..., 3] = (alpha * 255 * 0.85).astype(np.uint8)
    Image.fromarray(rgba, "RGBA").save(OUT / "ink.webp", "WEBP", quality=58, method=6)


def brushed() -> None:
    h, w = 480, 960
    n = 0.75 * filtered_noise(h, w, 0.004, 0.45) + 0.25 * filtered_noise(h, w, 0.02, 0.9)
    g = np.clip(128 + n * 30, 0, 255).astype(np.uint8)
    Image.fromarray(g, "L").convert("RGB").save(OUT / "brushed.webp", "WEBP", quality=60, method=6)


def grain() -> None:
    s = 192
    n = rng.standard_normal((s, s))
    g = np.clip(128 + n * 34, 0, 255).astype(np.uint8)
    Image.fromarray(g, "L").convert("RGB").save(OUT / "grain.webp", "WEBP", quality=55, method=6)


if __name__ == "__main__":
    OUT.mkdir(parents=True, exist_ok=True)
    ink()
    brushed()
    grain()
    for p in sorted(OUT.glob("*.webp")):
        print(p.name, p.stat().st_size // 1024, "KB")

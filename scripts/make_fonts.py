"""Sous-ensembles des polices (Instrument Serif, Jost) pour un chargement rapide.

Source : paquets @fontsource et @fontsource-variable (licence SIL OFL 1.1).
Usage : npm install && python3 scripts/make_fonts.py
"""
from pathlib import Path

from fontTools import subset
from fontTools.ttLib import TTFont
from fontTools.varLib import instancer

ROOT = Path(__file__).resolve().parent.parent
SRC_SERIF = ROOT / "node_modules/@fontsource/instrument-serif/files"
SRC_JOST = ROOT / "node_modules/@fontsource-variable/jost/files"
OUT = ROOT / "public/fonts"

# Latin de base + Latin-1 (français, allemand, italien, anglais) + typographie.
LATIN = (
    "U+0020-007E,U+00A0-00FF,U+0152-0153,U+0178,U+02C6,U+02DA,U+02DC,"
    "U+2009,U+200A,U+202F,U+2013-2014,U+2018-201E,U+2022,U+2026,U+2039-203A,U+20AC,U+2122,U+2190-2193,U+2197"
)

# L'italique ne sert qu'au mot final du titre (« après. », « dopo. », « danach. », « after. ») :
# minuscules, accents et ponctuation suffisent.
ITALIC = "U+0020,U+002E,U+0061-007A,U+00DF-00FF,U+0153,U+2019"

# Instrument Serif ne sert qu'aux titres. Elle n'existe qu'en une graisse (400) et n'est pas
# variable : aucun axe à figer (None).
JOBS = [
    (SRC_SERIF / "instrument-serif-latin-400-normal.woff2", "instrument-serif.woff2", LATIN, None),
    (SRC_SERIF / "instrument-serif-latin-400-italic.woff2", "instrument-serif-italic.woff2", ITALIC, None),
    (SRC_JOST / "jost-latin-wght-normal.woff2", "jost.woff2", LATIN, {"wght": (300, 500)}),
]


def run(src: Path, dst: Path, unicodes: str, axes: dict | None) -> None:
    opts = subset.Options()
    opts.flavor = "woff2"
    opts.layout_features = ["kern", "liga", "clig", "calt", "onum", "lnum", "tnum", "pnum"]
    opts.name_IDs = ["*"]
    opts.notdef_outline = True
    font = TTFont(str(src), lazy=False)
    sub = subset.Subsetter(opts)
    sub.populate(unicodes=subset.parse_unicodes(unicodes))
    sub.subset(font)
    if axes:
        font = instancer.instantiateVariableFont(font, axes)
    font.flavor = "woff2"
    subset.save_font(font, str(dst), opts)
    print(f"{dst.name}: {src.stat().st_size // 1024} KB -> {dst.stat().st_size // 1024} KB")


if __name__ == "__main__":
    OUT.mkdir(parents=True, exist_ok=True)
    for src, name, uni, axes in JOBS:
        run(src, OUT / name, uni, axes)

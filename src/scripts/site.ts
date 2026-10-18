// Nitid — interactions légères, sans librairie (≈ 3 Ko).
// Thème, lumière du titre, loupe, apparitions au scroll, formulaire.

declare global {
  interface Window {
    __nitid?: boolean;
  }
}

window.__nitid = true;

const root = document.documentElement;
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const canHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

/* ---------- Thème ---------- */

function applyThemeLabels() {
  const light = root.getAttribute('data-theme') === 'light';
  document.querySelectorAll<HTMLButtonElement>('[data-theme-toggle]').forEach((btn) => {
    const label = light ? btn.dataset.toDark : btn.dataset.toLight;
    if (label) {
      btn.setAttribute('aria-label', label);
      btn.title = label;
    }
  });
  const meta = document.querySelector('meta[name="theme-color"]');
  if (meta) meta.setAttribute('content', light ? '#e6e9ec' : '#0b1633');
}

document.querySelectorAll<HTMLButtonElement>('[data-theme-toggle]').forEach((btn) => {
  btn.addEventListener('click', () => {
    const next = root.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
    root.setAttribute('data-theme', next);
    try {
      localStorage.setItem('nitid-theme', next);
    } catch {
      /* stockage indisponible : le choix vaut pour cette visite */
    }
    applyThemeLabels();
  });
});
applyThemeLabels();

/* ---------- Petit utilitaire : une écriture par image ---------- */

function frame<T extends unknown[]>(fn: (...args: T) => void) {
  let raf = 0;
  let last: T;
  return (...args: T) => {
    last = args;
    if (raf) return;
    raf = requestAnimationFrame(() => {
      raf = 0;
      fn(...last);
    });
  };
}

/* ---------- Lumière qui suit la souris dans l'ouverture ---------- */

const hero = document.querySelector<HTMLElement>('[data-hero]');
if (hero && canHover && !reduceMotion) {
  const setGlow = frame((x: number, y: number) => {
    hero.style.setProperty('--hx', `${x}%`);
    hero.style.setProperty('--hy', `${y}%`);
    hero.style.setProperty('--ix', `${Math.round((50 - x) * 0.5)}px`);
    hero.style.setProperty('--iy', `${Math.round((50 - y) * 0.35)}px`);
  });
  hero.addEventListener('pointermove', (e) => {
    const r = hero.getBoundingClientRect();
    setGlow(((e.clientX - r.left) / r.width) * 100, ((e.clientY - r.top) / r.height) * 100);
  });
}

/* ---------- Loupe ---------- */

const lens = document.querySelector<HTMLElement>('[data-lens]');
let userMovedLens = false;
let demoRaf = 0;

function setLens(x: number, y: number) {
  if (!lens) return;
  lens.style.setProperty('--lx', `${x.toFixed(1)}%`);
  lens.style.setProperty('--ly', `${y.toFixed(1)}%`);
}

if (lens) {
  const move = frame((x: number, y: number) => setLens(x, y));
  lens.addEventListener('pointermove', (e) => {
    userMovedLens = true;
    if (demoRaf) cancelAnimationFrame(demoRaf);
    const r = lens.getBoundingClientRect();
    const x = Math.max(0, Math.min(100, ((e.clientX - r.left) / r.width) * 100));
    const y = Math.max(0, Math.min(100, ((e.clientY - r.top) / r.height) * 100));
    move(x, y);
  });
}

// Petite démonstration automatique la première fois que la loupe est visible (utile sur mobile).
function playLensDemo() {
  if (!lens || userMovedLens || reduceMotion) return;
  const pts: [number, number][] = [
    [38, 50],
    [68, 34],
    [56, 66],
    [38, 50],
  ];
  const dur = [1000, 850, 900];
  let k = 0;
  const leg = () => {
    if (userMovedLens || k >= dur.length) return;
    const [ax, ay] = pts[k];
    const [bx, by] = pts[k + 1];
    const ms = dur[k];
    const t0 = performance.now();
    const tick = (now: number) => {
      if (userMovedLens) return;
      const t = Math.max(0, Math.min(1, (now - t0) / ms));
      const s = t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
      setLens(ax + (bx - ax) * s, ay + (by - ay) * s);
      if (t < 1) demoRaf = requestAnimationFrame(tick);
      else {
        k += 1;
        leg();
      }
    };
    demoRaf = requestAnimationFrame(tick);
  };
  setTimeout(leg, 1400);
}

/* ---------- Apparitions au scroll ---------- */

const steps = Array.from(document.querySelectorAll<HTMLElement>('[data-step]'));
const seen = steps.map(() => false);
let shown = 0;
let pumping = false;

function pump() {
  if (pumping || shown >= steps.length || !seen[shown]) return;
  steps[shown].classList.add('is-in');
  shown += 1;
  pumping = true;
  setTimeout(() => {
    pumping = false;
    pump();
  }, 300);
}

function showEverything() {
  document.querySelectorAll('[data-reveal], [data-step]').forEach((el) => el.classList.add('is-in'));
}

if (reduceMotion || !('IntersectionObserver' in window)) {
  showEverything();
  playLensDemo();
} else {
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((en) => {
        if (!en.isIntersecting) return;
        const el = en.target as HTMLElement;
        io.unobserve(el);
        const i = steps.indexOf(el);
        if (i >= 0) {
          for (let j = 0; j <= i; j += 1) seen[j] = true;
          pump();
        } else if (el === lens) {
          playLensDemo();
        } else {
          el.classList.add('is-in');
        }
      });
    },
    { threshold: 0.2, rootMargin: '0px 0px -6% 0px' },
  );
  document.querySelectorAll('[data-reveal]').forEach((el) => io.observe(el));
  steps.forEach((el) => io.observe(el));
  if (lens) io.observe(lens);
}

/* ---------- Formulaire ---------- */

const form = document.querySelector<HTMLFormElement>('[data-form]');
if (form) {
  const status = form.querySelector<HTMLElement>('.form__status');
  const button = form.querySelector<HTMLButtonElement>('button[type="submit"]');
  const say = (msg: string) => {
    if (status) status.textContent = msg;
  };

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    let firstInvalid: HTMLInputElement | null = null;
    form.querySelectorAll<HTMLInputElement>('input[required], input[type="email"], input[type="url"]').forEach((input) => {
      const ok = input.checkValidity();
      input.setAttribute('aria-invalid', ok ? 'false' : 'true');
      if (!ok && !firstInvalid) firstInvalid = input;
    });
    if (firstInvalid) {
      (firstInvalid as HTMLInputElement).focus();
      return;
    }
    const data = new FormData(form);
    if (data.get('botcheck')) return;

    const endpoint = form.dataset.endpoint;
    if (!endpoint) {
      // Pas encore de service de formulaire : on ouvre un email prérempli.
      const lines = ['nom', 'entreprise', 'email', 'telephone', 'site', 'activite']
        .map((k) => `${k} : ${String(data.get(k) ?? '')}`)
        .join('\n');
      const subject = `Maquette gratuite – ${String(data.get('entreprise') ?? '')}`;
      window.location.href = `mailto:${form.dataset.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(lines)}`;
      return;
    }

    if (button) button.disabled = true;
    say(form.dataset.sending ?? '');
    try {
      const res = await fetch(endpoint, { method: 'POST', body: data, headers: { Accept: 'application/json' } });
      if (!res.ok) throw new Error(String(res.status));
      form.reset();
      say(form.dataset.success ?? '');
    } catch {
      say(form.dataset.error ?? '');
    } finally {
      if (button) button.disabled = false;
    }
  });
}

export {};

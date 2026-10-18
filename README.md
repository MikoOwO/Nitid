# Nitid — site de l'agence

« Le site d'abord, la facture après. » Site vitrine de Nitid, agence de sites web pour les PME suisses.

- Mode sombre par défaut (direction Nocturne), mode clair en option (direction Titane), mémorisé dans le navigateur.
- Site statique Astro : aucune librairie côté navigateur, environ 180 Ko au total sur mobile (polices et textures comprises).
- Polices auto-hébergées (Bodoni Moda pour les titres, Jost pour le texte) : aucune requête vers Google.

## Démarrer

```bash
npm install
npm run dev       # http://localhost:4321
npm run build     # génère dist/
npm run preview   # sert dist/ en local
```

Node 20 ou plus récent.

## Structure

```
src/
  i18n/fr.ts            tous les textes de la page (une langue = un fichier)
  styles/global.css     couleurs des deux modes, typographie, boutons
  layouts/Base.astro    <head>, thème appliqué avant l'affichage
  components/           une section = un composant (Hero, Method, Faq, Contact…)
  scripts/site.ts       thème, lumière, loupe, apparitions au scroll, formulaire
  pages/                index, mentions légales, confidentialité
public/
  fonts/                sous-ensembles woff2 (scripts/make_fonts.py)
  textures/             encre, titane brossé, grain (scripts/make_textures.py)
```

## Modifier

- **Un texte** : `src/i18n/fr.ts`.
- **Une couleur** : les variables en haut de `src/styles/global.css`, bloc `dark` puis bloc `light`.
- **Ajouter une langue** : copier `src/i18n/fr.ts` en `de.ts`, traduire, créer `src/pages/de/index.astro` sur le modèle de `src/pages/index.astro`, ajouter `'de'` dans `astro.config.mjs`. Chaque traduction est relue par une personne de langue maternelle.
- **Régénérer polices ou textures** : `python3 scripts/make_fonts.py` (fonttools, brotli) et `npm run textures` (numpy, Pillow).

## Formulaire de contact

Copier `.env.example` en `.env` et renseigner `PUBLIC_FORM_ENDPOINT` avec l'adresse d'un service de formulaire (Formspree, Web3Forms…). Sans cette variable, le bouton ouvre un email prérempli vers contact@nitid.ch.

## Avant la mise en ligne

- [ ] Réserver nitid.ch et créer contact@nitid.ch
- [ ] Brancher le formulaire (`PUBLIC_FORM_ENDPOINT`)
- [ ] Compléter les mentions légales et la page confidentialité (crochets [ ])
- [ ] Choisir l'hébergeur (en Suisse si possible) et pointer le domaine
- [ ] Mesurer la page avec PageSpeed Insights sur mobile

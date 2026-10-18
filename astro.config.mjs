// @ts-check
import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://nitid.ch',
  // Français d'abord ; allemand, italien et anglais viendront dans src/i18n/.
  i18n: {
    defaultLocale: 'fr',
    locales: ['fr'],
  },
  build: {
    // CSS intégré à la page : une requête de moins, affichage plus rapide.
    inlineStylesheets: 'always',
  },
});

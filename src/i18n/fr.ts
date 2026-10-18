// Textes de la page d'accueil (FR). Source : doc « Agence web — nom, positionnement et textes du site ».
// Pour ajouter une langue : copier ce fichier (de.ts, it.ts, en.ts), traduire, puis l'ajouter dans src/i18n/index.ts.

export default {
  lang: 'fr',
  meta: {
    title: 'Nitid · Le site d’abord, la facture après',
    description:
      'Nous dessinons gratuitement la maquette de votre nouveau site. Elle vous plaît : on en parle. Sinon, vous ne nous devez rien. Sites rapides pour PME suisses.',
  },
  nav: {
    method: 'Méthode',
    work: 'Réalisations',
    faq: 'Questions',
    cta: 'Ma maquette gratuite',
    home: 'Nitid, accueil',
    toLight: 'Passer en mode clair',
    toDark: 'Passer en mode sombre',
  },
  hero: {
    line1: 'Le site d’abord.',
    line2a: 'La facture',
    line2b: 'après.',
    lead: 'Nous dessinons gratuitement la maquette de votre nouveau site. Elle vous plaît : on en parle. Elle ne vous plaît pas : vous ne nous devez rien.',
    cta: 'Recevoir ma maquette gratuite',
    secondary: 'Voir comment ça marche',
    trust: 'Conçu en Suisse pour les Suisses.',
    demoLabel:
      'Démonstration : le site daté et flou d’une menuiserie fictive et, sous la loupe, sa nouvelle version nette',
    hintHover: 'Survolez pour voir l’après.',
    hintTouch: 'Glissez pour voir l’après.',
    fictional: 'Entreprise fictive, pour la démonstration',
  },
  problem: {
    title: 'Un site daté vous coûte des clients. En silence.',
    items: [
      { t: 'Trop lent, il fait fuir.', d: 'À chaque seconde d’attente, des visiteurs ferment la page. Ils ne reviennent pas.' },
      { t: 'Daté, il fait douter.', d: 'Un site d’une autre époque laisse penser que l’entreprise l’est aussi.' },
      {
        t: 'Introuvable, il ne rapporte rien.',
        d: 'S’il n’apparaît pas quand on cherche votre métier près de chez soi, c’est un concurrent qu’on appelle.',
      },
    ],
  },
  method: {
    title: 'Vous voyez votre site avant de payer quoi que ce soit.',
    steps: [
      {
        tag: '15 minutes',
        t: 'Vous nous présentez votre entreprise.',
        d: 'Votre métier, vos clients, votre site actuel s’il existe. Un formulaire, ou un appel de 15 minutes.',
      },
      {
        tag: '3 jours',
        t: 'Nous dessinons votre maquette.',
        d: 'Une vraie page d’accueil, à vos couleurs, avec vos textes. Gratuite, prête sous 3 jours.',
      },
      {
        tag: 'Sans engagement',
        t: 'Vous décidez.',
        d: 'Elle vous convainc : nous vous proposons un prix fixe, sans surprise. Sinon, on s’arrête là, sans frais.',
      },
      {
        tag: '1 à 2 semaines',
        t: 'Nous construisons et mettons en ligne.',
        d: 'Le site complet, rapide, traduit si besoin, visible sur Google. Puis nous restons disponibles.',
      },
    ],
  },
  deliver: {
    title: 'Un site qui travaille pour vous.',
    items: [
      { t: 'Dessiné pour vous.', d: 'Aucun modèle tout fait : chaque site part de votre entreprise.' },
      {
        t: 'Rapide, partout.',
        d: 'Pensé d’abord pour le téléphone, il s’ouvre vite même en 4G. Nous mesurons chaque page avant de livrer.',
      },
      {
        t: 'Trouvé sur Google.',
        d: 'Structure, textes et fiche Google Business préparés pour qu’on vous trouve près de chez vous.',
      },
      { t: 'En quatre langues.', d: 'Français, allemand, italien, anglais : parlez à toute la Suisse.' },
    ],
  },
  why: {
    title: 'La rigueur d’ingénieurs. Le soin d’artisans.',
    lead: 'Formés à l’EPFL, nous construisons un site comme un ouvrage : mesuré, testé, fait pour durer.',
    items: [
      { t: 'Le risque est pour nous.', d: 'Vous ne payez qu’un site que vous avez déjà vu.' },
      { t: 'Un interlocuteur direct.', d: 'Vous parlez à ceux qui dessinent et codent votre site. Personne entre nous.' },
      { t: 'Conçu en Suisse.', d: 'Pour des entreprises suisses, leurs langues, leurs clients, leurs exigences.' },
      { t: 'La vitesse, prouvée.', d: 'Chaque site est livré avec son rapport de performance Google.' },
    ],
  },
  work: {
    title: 'Déjà en ligne',
    items: [
      {
        name: 'Capinvest Partners',
        url: 'https://capinvest-partners.com',
        d: 'Le site d’un cabinet de conseil en finance d’entreprise actif en Europe, en Afrique et au Moyen-Orient.',
      },
      {
        name: 'CapXValue',
        url: 'https://capxvalue.com',
        d: 'Une plateforme de valorisation d’entreprise qui lit les états financiers et projette sept ans de comptes, chaque chiffre relié à sa source.',
      },
      {
        name: 'Ahla Cashflow',
        url: 'https://ahlapp.com',
        d: 'La trésorerie d’une résidence étudiante, lisible d’un coup d’œil, avec un résumé envoyé chaque matin à la direction.',
      },
    ],
  },
  about: {
    title: 'Deux ingénieurs, une exigence.',
    text: 'Nous sommes deux ingénieurs formés à l’EPFL. Nous avons construit des plateformes financières et des outils de gestion utilisés chaque jour. Aujourd’hui, nous offrons aux entreprises suisses des sites à la hauteur de leur travail, sans leur demander de payer à l’aveugle.',
    link: 'Découvrir le travail de Mélik Zaanouni, cofondateur',
    linkUrl: 'https://melik.zaanouni.com',
  },
  faq: {
    title: 'Questions fréquentes',
    items: [
      {
        q: 'La maquette est-elle vraiment gratuite ?',
        a: 'Oui. Aucun engagement, aucune carte bancaire. Si elle ne vous convainc pas, nous en restons là.',
      },
      {
        q: 'Combien coûte un site ?',
        a: 'Cela dépend du nombre de pages, de langues et de fonctionnalités. Vous recevez un prix fixe une fois la maquette vue : vous savez exactement ce que vous achetez.',
      },
      { q: 'En combien de temps ?', a: 'Maquette sous 3 jours, site complet en 1 à 2 semaines en général.' },
      {
        q: 'Le site m’appartient-il ?',
        a: 'Oui : une fois réglé, le site, ses contenus et son nom de domaine sont à vous.',
      },
      {
        q: 'Je n’ai pas encore de site. Est-ce possible ?',
        a: 'Bien sûr. Nous partons de votre activité, de vos photos et de vos documents.',
      },
      {
        q: 'Travaillez-vous dans toute la Suisse ?',
        a: 'Oui. Nous sommes basés à Lausanne et livrons des sites en français, allemand, italien et anglais.',
      },
    ],
  },
  contact: {
    title: 'Voyez votre futur site. Décidez ensuite.',
    lead: 'Parlez-nous de votre entreprise. Nous revenons vers vous avec une maquette sous 3 jours.',
    fields: {
      name: 'Nom',
      company: 'Entreprise',
      email: 'Email',
      phone: 'Téléphone',
      website: 'Site actuel',
      activity: 'Votre activité en une phrase',
      optional: 'facultatif',
      activityPlaceholder: 'Ex. : menuiserie à Morges, escaliers et cuisines…',
    },
    submit: 'Recevoir ma maquette gratuite',
    sending: 'Envoi…',
    below: 'Réponse sous 24 h ouvrées. Aucun engagement.',
    success: 'Merci. Nous revenons vers vous sous 24 h ouvrées.',
    error: 'L’envoi n’a pas abouti. Écrivez-nous directement à contact@nitid.ch.',
    direct: 'Ou directement',
    phone: '+41 77 979 49 83',
    phoneHref: '+41779794983',
    email: 'contact@nitid.ch',
  },
  footer: {
    signature: 'Le web, sans flou.',
    made: 'Conçu en Suisse.',
    legal: 'Mentions légales',
    privacy: 'Confidentialité',
  },
};

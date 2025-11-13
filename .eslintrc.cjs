module.exports = {
  env: {
    node: true, // Code Node.js
    es2021: true, // JavaScript moderne
    jest: true, // Tests Jest
  },
  extends: [
    'airbnb-base', // Règles Airbnb (standard industrie)
  ],
  parserOptions: {
    ecmaVersion: 'latest', // Version JS la plus récente
    sourceType: 'module',
  },
  rules: {
    // Règles personnalisées (moins strictes pour projet pédagogique)
    'no-console': 'off', // Autoriser console.log
    'no-unused-vars': 'warn', // Avertissement pour variables non utilisées
    'consistent-return': 'off', // Pas obligatoire de toujours return
    'no-use-before-define': 'off', // Autoriser utilisation avant déclaration
    'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
    'max-len': ['warn', { code: 120 }], // Longueur max des lignes : 120 caractères
    'global-require': 'off', // Autoriser require() dans des fonctions
    'no-plusplus': 'off', // Autoriser ++ et --
    'no-shadow': 'warn', // Avertissement pour variables shadow
    'object-curly-newline': 'off', // Pas de règle stricte pour les sauts de ligne
    'comma-dangle': ['warn', 'always-multiline'], // Virgules finales seulement si multi-lignes
    'import/order': 'warn', // Avertissement pour l'ordre des imports
  },
};

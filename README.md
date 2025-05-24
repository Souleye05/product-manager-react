# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default tseslint.config({
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

- Replace `tseslint.configs.recommended` to `tseslint.configs.recommendedTypeChecked` or `tseslint.configs.strictTypeChecked`
- Optionally add `...tseslint.configs.stylisticTypeChecked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and update the config:

```js
// eslint.config.js
import react from 'eslint-plugin-react'

export default tseslint.config({
  // Set the react version
  settings: { react: { version: '18.3' } },
  plugins: {
    // Add the react plugin
    react,
  },
  rules: {
    // other rules...
    // Enable its recommended rules
    ...react.configs.recommended.rules,
    ...react.configs['jsx-runtime'].rules,
  },
})
```

# JulesShop - Gestionnaire de Produits React

## Description du Projet

JulesShop est une application web moderne de gestion de produits développée avec React, TypeScript et Tailwind CSS. Elle offre une interface utilisateur intuitive pour gérer un catalogue de produits avec des fonctionnalités d'authentification, de recherche et d'administration.

## Fonctionnalités Principales

### 🔐 Authentification
- Inscription et connexion des utilisateurs
- Gestion des rôles (utilisateur/administrateur)
- Sessions sécurisées avec tokens JWT

### 📦 Gestion des Produits
- Affichage du catalogue de produits
- Recherche et filtrage des produits
- Page détaillée pour chaque produit
- Ajout au panier (interface utilisateur)

### 👨‍💼 Panel Administrateur
- Création, modification et suppression de produits
- Gestion complète du catalogue
- Interface d'administration dédiée

### 🎨 Interface Utilisateur
- Design responsive et moderne
- Navigation intuitive
- Composants UI avec shadcn/ui
- Thème sombre/clair automatique

## Technologies Utilisées

- **Frontend**: React 18 + TypeScript
- **Styling**: Tailwind CSS + shadcn/ui
- **Routing**: React Router DOM
- **État Global**: TanStack Query (React Query)
- **Formulaires**: React Hook Form + Zod
- **Build Tool**: Vite
- **Icons**: Lucide React

## Structure du Projet

```
src/
├── components/          # Composants réutilisables
│   ├── ui/             # Composants UI de base (shadcn/ui)
│   ├── Hero.tsx        # Section héro de la page d'accueil
│   ├── Navbar.tsx      # Barre de navigation
│   ├── Footer.tsx      # Pied de page
│   └── ...
├── pages/              # Pages de l'application
│   ├── admin/          # Pages d'administration
│   ├── Index.tsx       # Page d'accueil
│   ├── ProductsPage.tsx # Catalogue de produits
│   └── ...
├── hooks/              # Hooks personnalisés
├── services/           # Services API
├── types/              # Définitions TypeScript
└── lib/                # Utilitaires
```

## Installation et Démarrage

### Prérequis
- Node.js (version 18 ou supérieure)
- npm ou yarn

### Étapes d'installation

1. **Cloner le projet**
```bash
git clone <https://github.com/Souleye05/product-manager-react>
cd product-manager-react
```

2. **Installer les dépendances**
```bash
npm install
```

3. **Installer les dépendances manquantes (si nécessaire)**
```bash
npm install @radix-ui/react-tooltip next-themes
```

4. **Démarrer le serveur de développement**
```bash
npm run dev
```

5. **Ouvrir l'application**
Ouvrez votre navigateur et allez à `http://localhost:5173`

## Scripts Disponibles

```bash
# Démarrage en mode développement
npm run dev

# Build de production
npm run build

# Prévisualisation du build
npm run preview

# Linting du code
npm run lint
```

## Configuration de l'API

L'application utilise un service API pour gérer les données. Vous devez configurer l'URL de votre API backend :

1. Ouvrez le fichier `src/services/apiService.ts`
2. Modifiez la variable `API_BASE_URL` avec l'URL de votre backend
3. Assurez-vous que votre API backend est démarrée

```typescript
const API_BASE_URL = 'http://localhost:3000/api'; // Modifiez cette URL
```

## Utilisation

### Pour les Utilisateurs

1. **Inscription/Connexion**: Créez un compte ou connectez-vous
2. **Navigation**: Explorez le catalogue de produits
3. **Recherche**: Utilisez la barre de recherche pour trouver des produits
4. **Détails**: Cliquez sur un produit pour voir ses détails

### Pour les Administrateurs

1. **Accès Admin**: Connectez-vous avec un compte administrateur
2. **Gestion**: Accédez au panel d'administration
3. **CRUD Produits**: Créez, modifiez ou supprimez des produits
4. **Catalogue**: Gérez l'ensemble du catalogue

## Déploiement

### Build de Production

```bash
npm run build
```

Les fichiers optimisés seront générés dans le dossier `dist/`.

### Déploiement sur Vercel/Netlify

1. Connectez votre repository GitHub
2. Configurez les variables d'environnement si nécessaire
3. Déployez automatiquement

## Contribution

1. Forkez le projet
2. Créez une branche pour votre fonctionnalité (`git checkout -b feature/ma-fonctionnalite`)
3. Commitez vos changements (`git commit -m 'Ajout de ma fonctionnalité'`)
4. Poussez vers la branche (`git push origin feature/ma-fonctionnalite`)
5. Ouvrez une Pull Request

## Résolution des Problèmes Courants

### Erreurs de Dépendances

Si vous rencontrez des erreurs liées aux dépendances manquantes :

```bash
npm install @radix-ui/react-tooltip next-themes
```

### Problèmes de Build

Si le build échoue, vérifiez :
- Toutes les dépendances sont installées
- Les imports sont corrects
- Les types TypeScript sont valides

### Problèmes d'API

Si l'API ne répond pas :
- Vérifiez que le backend est démarré
- Contrôlez l'URL de l'API dans `apiService.ts`
- Vérifiez les CORS si nécessaire

## Licence

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.

## Support

Pour toute question ou problème :
- Ouvrez une issue sur GitHub
- Contactez moi

---

**JulesShop** - Gestionnaire de Produits React moderne et intuitif 🚀
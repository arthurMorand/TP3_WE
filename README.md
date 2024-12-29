# tp-web-vue

Ce projet a pour objectif de développer une application de gestion de tâches (todo list) en utilisant Vue 3 et Vite. L'application permet de gérer des tâches avec des fonctionnalités telles que l'ajout, la suppression, l'édition, le filtrage et la persistance des données dans le `localStorage` du navigateur. Ce TP met en pratique la manipulation des tâches en Vue.js, l'utilisation du stockage local, et l'édition dynamique des éléments de la liste.

<details>
  <summary>Mise en place et configuration</summary>

### Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

### Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) to make the TypeScript language service aware of `.vue` types.

### Customize configuration

See [Vite Configuration Reference](https://vite.dev/config/).

### Project Setup

```sh
npm install
```

#### Compile and Hot-Reload for Development

```sh
npm run dev
```

#### Type-Check, Compile and Minify for Production

```sh
npm run build
```

#### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
npm run test:unit
```

#### Run End-to-End Tests with [Cypress](https://www.cypress.io/)

```sh
npm run test:e2e:dev
```

This runs the end-to-end tests against the Vite development server.
It is much faster than the production build.

But it's still recommended to test the production build with `test:e2e` before deploying (e.g. in CI environments):

```sh
npm run build
npm run test:e2e
```

#### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```
</details>

## Fonctionnalités

- **Ajout de tâches** : L'utilisateur peut ajouter des tâches avec un titre et une date d'échéance.
- **Suppression de tâches** : L'utilisateur peut supprimer des tâches individuellement ou toutes les supprimer en même temps.
- **Marquer une tâche comme terminée** : Permet de marquer les tâches comme terminées.
- **Édition de titre de tâche** : Double-cliquer sur le titre d'une tâche permet de la modifier. Un événement `blur` est utilisé pour arrêter l'édition lorsqu'on clique en dehors du champ de saisie.
- **Filtrage des tâches** : L'utilisateur peut filtrer les tâches selon leur statut (toutes, à faire, terminées).
- **Persistance dans `localStorage`** : Toutes les tâches sont enregistrées dans le `localStorage`, ce qui permet à l'application de conserver les données même après le rafraîchissement de la page.

## Auteurs
- Enzo LEROYER
- Lucas LEPREVOST
- Arthur MORAND

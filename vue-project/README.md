# vue-project

This template should help get you started developing with Vue 3 in Vite.

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```


# Projet Application

# 1 : ECF maquettage

A partir du wireframe, créez une maquette.

# 2 : Modifier la base de données

Ajoutez à vos produits un champ pour une image et/ou un icône. Ajoutez aussi un champ texte “catégorie” qui vaudra a minima “nourriture” ou “boisson” (à vous de voir comment vous souhaitez classer vos snacks, vous pouvez aussi faire “petit déj / midi” etc.

# 3 : API

Notre serveur PHP fonctionne, on va ajouter quelques routes pour simuler une API.

On considère que notre API est publique et ne nécessite pas de connexion. Dans un cas réel, on gérerait ça avec des **clés d’accès**.

1. Dans votre routeur, ajoutez deux routes
    1. `/api/products` : cette route permettra de lister tous les produits sous forme de JSON
    2. `/api/products/consume` : cette route attend de recevoir un paramètre GET qui donne l’id du produit à consommer. En requêtant cette route, le stock du produit concerné descendra d’un.
2. Créez les actions associées (dans votre ProductController). Appelez les par exemple `apiList` et `apiConsume`
3. Pour `apiList`, vous utiliserez sûrement la méthode `getAll` de votre modèle. Regardez à quoi sert la fonction `json_encode`
4. Pour `apiConsumeOne`, vous pouvez sûrement réutiliser la méthode de votre contrôleur qui vous permettait de changer le stock.

Vous pouvez tester votre API en faisant des requêtes via votre navigateur.

On approfondira la création d’API plus tard. L’idée ici est de faire le minimum pour comprendre :

- qu’une API définit des routes
- que c’est une **interface** avec la base de données, mais elle n’a aucune **présentation** (vue)

# 4 : Créer notre app

<aside>
📎 Nous allons créer notre application front avec le framework VueJS. On aurait aussi très bien pu utiliser HTML/CSS/JS sans aucun framework.

</aside>

- Créer un projet Vue `npm create vue@3`
- Suivez les instructions `npm install` puis ouvrez le dossier dans VSCode
- Les fichiers importants à regarder :
    - `main.js` c’est ce qui permet de lancer votre application
    - `App.vue` c’est votre application web - Vue organise son code dans un même fichier vue, avec d’abord le script javascript, puis le HTML, puis le CSS
    - On supprimera le code existant pour en refaire un nous même mais remarquez le dossier `components/` dans lequel il y a d’autres fichiers `.vue` ; c’est le propre des frameworks Javascript moderne : l’organisation en composants.
- Maintenant, supprimez tous les fichiers `.vue` qui sont dans le dossier `components/` et le dossier `icons/`
- Remplacez le contenu de `App.vue` par
    
    ```html
    <script setup>
    //import HelloWorld from './components/HelloWorld.vue'
    </script>
    
    <template>
    
    </template>
    
    <style scoped>
    
    </style>
    ```
    
- Tapez dans la balise `<template>` le code nécessaire pour implémenter votre maquette. Dans un premier temps, faites une seule balise `<article>` pour représenter l’un de vos produits, nous le dupliquerons ensuite.
    - Je vous recommande d’avoir une **section** en grid, dans laquelle vous mettrez vos différentes balises **article**.
- Maintenant que votre interface est implémentée il nous reste deux choses à faire :
    - Se connecter à notre API et récupérer nos produits
    - Créer une boucle pour afficher ces produits. C’est là que les composants seront intéressants.

### Créer un composant

- Dans le dossier `components/` créez un fichier `Product.vue`
- Le fichier devrait ressembler à ça :
- Dans la balise template, déplacez votre balise article qui est actuellement dans votre App.vue
- Déplacez aussi le style relatif à votre balise article
- Dans App.vue :
    - Ajoutez cette ligne dans la balise script, pour pouvoir utiliser notre composant
        
        ```jsx
        import Product from './components/Product.vue'
        ```
        
    - Et là où vous aviez vos balises article, vous pouvez maintenant taper
        
        ```html
        <Product></Product>
        ```
        
    - Vous venez de créer votre premier composant. L’avantage, c’est que ce sont des blocs de code réutilisables, et qu’on peut leur passer des “props” (des variables).


### Récupérer les données via notre API

Pour dialoguer avec notre API, on pourrait utiliser ***fetch*** (Javascript natif), mais on va utiliser un petit package javascript qui s’appelle ***Axios***. Vous pouvez l’installer dans votre projet comme ça :

```bash
npm install axios
```

Pour s’en servir dans notre projet, on va taper, en haut du fichier `App.vue` :
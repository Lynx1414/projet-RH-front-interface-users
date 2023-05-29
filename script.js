let url = 'http://localhost:8081/api/products';
let url2 = 'http://localhost:8081/api/products/consume';
let url3 = 'http://localhost:8081/api/products/category';


let main = document.querySelector('main');
let mainChoices = document.getElementById('choiceGategory');
let dataList;
let dataListByCat;

async function displayAllProducts() {
  let response = await fetch(url);
  dataList = await response.json();
  // console.log(Object.values(dataList.article));
  dataList.forEach(article => {
    main.classList.add('container');//main.style["grid-template-columns"] = "2fr 1fr";
    let div = document.createElement('div');
    div.classList.add('boxProduit');
    let boxProduit =
      `<img src= "http://localhost:8081/${article.imgSrc}" alt= "${article.imgAlt}">
      <i class="toggle fa-solid fa-heart style=" font-size: 15px"></i>
      <p class="designation">${article.Designation}</p>
      <div class="flex">
      <span class="prix">${article.Prix}€</span>
      <button class="btnAcheter" type= "submit" onclick="consumeOne(${article.ID})">Acheter</button>
      </div><br/>
      <button class="btnAjouter" type= "submit" onclick="xxxxx(${article.ID})">Ajouter au panier</button>
      `
    if (article.Statut == 0 || article.Stock == 0) {
      boxProduit =
        `<img src= "http://localhost:8081/${article.imgSrc}" alt= "${article.imgAlt}">
      <i class="toggle fa-solid fa-heart style=" font-size: 15px"></i>
      <p class="designation">${article.Designation}</p>
      <div class="flex">
      <span class="prix">${article.Prix}€</span>
      <button disabled class="btnAcheter" type= "text">Acheter</button>
      </div><br/>
      <button class="epuise">Epuisé</button>
      `
    }
    div.innerHTML = boxProduit;
    main.append(div);
  })
};

async function consumeOne(id) {
  //défintit le parametre GET 'id' avec "?id="
  let response = await fetch(url2 + "?id=" + id);
  let data = await response.json();
};

async function displayAllByCategory(category) {
  let response = await fetch(url3 + "?category=" + category);
  dataListByCat = await response.json();
  // console.log(Object.values(dataListByCat.article));
  dataListByCat.forEach(article => {
    main.classList.add('container');//mainCategory.style["grid-template-columns"] = "2fr 1fr";
    let div = document.createElement('div');
    div.classList.add('boxProduit');
    let boxProduit =
      `<img src= "http://localhost:8081/${article.imgSrc}" alt= "${article.imgAlt}">
      <i class="toggle fa-solid fa-heart style="font-size: 15px"></i>
      <p class="designation">${article.Designation}</p>
      <div class="flex">
      <span class="prix">${article.Prix}€</span>
      <button class="btnAcheter" type= "submit" onclick="consumeOne(${article.ID})">Acheter</button>
      </div><br/>
      <button class="btnAjouter" type= "submit" onclick="xxxxx(${article.ID})">Ajouter au panier</button>
      `
    if (article.Statut == 0 || article.Stock == 0) {
      boxProduit =
        `<img src= "http://localhost:8081/${article.imgSrc}" alt= "${article.imgAlt}">
      <i class="toggle fa-solid fa-heart style=" font-size: 15px"></i>
      <p class="designation">${article.Designation}</p>
      <div class="flex">
      <span class="prix">${article.Prix}€</span>
      <button disabled class="btnAcheter" type="test">Acheter</button>
      </div><br/>
      <button class="epuise">Epuisé</button>
      `
    }
    div.innerHTML = boxProduit;
    main.append(div);
  })
};

// ! lire les valeurs de l'attribut de données avec l'objet dataset
//  ! dataset.laPartieDuNomDeAttribut, ici la partie du nom choisi est produits
let categorie = main.dataset.produits
if (categorie == 'all') {
  displayAllProducts()
} else {
  displayAllByCategory(categorie)
}

// _____________Hearts/favorits__________________
//! delegation d'evenement
// console.log(event.target.localName)ex:(i); ou  console.log(event.target.classList);
let favoris=[];
main.addEventListener('click', function (event) {
  if (event.target.classList.contains('toggle')) {
    let heart = event.target;
    heart.classList.toggle('colorToggle');
  }
});

// _____________Searchbar________________________
let newDataList = [];
let isVisible;
const searchInput = document.querySelector("[data-search]");
searchInput.addEventListener('input', function(event) {
  const inputValue = event.target.value.toLowerCase();
  // !creer une nouvelle list filtrée (neuwDataList) à partir de l'initiale (dataListByCat)
  newDataList = dataListByCat.filter(article => {
    isVisible = article.Designation.toLowerCase().includes(inputValue);
    return isVisible;
  });
  //! selectionner le main categorie et le vider pour display le boxProduit recherché
  const main = document.querySelector("[data-produits]");
  main.innerHTML = "";
  newDataList.forEach(article => {
    main.classList.add('container');
    const div = document.createElement("div");
    div.classList.add('boxProduit');
    let boxProduit = `
    <img src= "http://localhost:8081/${article.imgSrc}" alt= "${article.imgAlt}">
    <i class="toggle fa-solid fa-heart style="font-size: 15px"></i>
    <p class="designation">${article.Designation}</p>
    <div class="flex">
    <span class="prix">${article.Prix}€</span>
    <button class="btnAcheter" type= "submit" onclick="consumeOne(${article.ID})">Acheter</button>
    </div><br/>
    <button class="btnAjouter" type= "submit" onclick="xxxxx(${article.ID})">Ajouter au panier</button>
    `;
    
    div.innerHTML = boxProduit;
    main.appendChild(div);
  });
});

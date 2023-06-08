const apiProducts = 'http://localhost:8081/api/products';
const apiConsume = 'http://localhost:8081/api/products/consume';
const apiCategory = 'http://localhost:8081/api/products/category';
const apiEmployee = 'http://localhost:8081/api/employee/one';

const idEmployee = 3;

let main = document.querySelector('main');
let mainChoices = document.getElementById('choiceGategory');
let dataList;
let dataListByCat;
const employeeHeader = document.getElementById("employee-header");

async function displayAllProducts() {
  let response = await fetch(apiProducts);
  dataList = await response.json();
  // console.log(Object.values(dataList.article));
  dataList.forEach(article => {
    main.classList.add('grid');//main.style["grid-template-columns"] = "2fr 1fr";
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
      <button class="btnAjouter" type= "submit" onclick="addToCart(${article.ID})">Ajouter au panier</button>
      `
    if (article.Statut == 0 || article.Stock == 0) {
      boxProduit =
        `<img src= "http://localhost:8081/${article.imgSrc}" alt= "${article.imgAlt}">
      <i class="toggle fa-solid fa-heart style=" font-size: 15px"></i>
      <p class="designation">${article.Designation}</p>
      <div class="flex">
      <span class="prix">${article.Prix}€</span>
      <button disabled class="btnAcheter">Acheter</button>
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
  let response = await fetch(apiConsume + "?id=" + id);
  let data = await response.json();
  location.reload();
};

async function displayAllByCategory(category) {
  let response = await fetch(apiCategory + "?category=" + category);
  dataListByCat = await response.json();
  // console.log(Object.values(dataListByCat.article));
  dataListByCat.forEach(article => {
    main.classList.add('grid');//mainCategory.style["grid-template-columns"] = "2fr 1fr";
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
      `
    if (article.Statut == 0 || article.Stock == 0) {
      boxProduit =
        `<img src= "http://localhost:8081/${article.imgSrc}" alt= "${article.imgAlt}">
      <i class="toggle fa-solid fa-heart style=" font-size: 15px"></i>
      <p class="designation">${article.Designation}</p>
      <div class="flex">
      <span class="prix">${article.Prix}€</span>
      <button disabled class="btnAcheter" >Acheter</button>
      </div><br/>
      <button class="epuise">Epuisé</button>
      `
    }
    div.innerHTML = boxProduit;

    let b = document.createElement('button');
    b.textContent = "Ajouter au panier";
    b.classList.add('btnAjouter');
    b.onclick = function () {
      addToCart(article);
    }
    if (article.Statut == 0 || article.Stock == 0) {
      b.classList.add('btnHidden');
    }

    div.appendChild(b);
    main.append(div);
  })
};

// ! lire les valeurs de l'attribut de données avec l'objet dataset
//  ! dataset.laPartieDuNomDeAttribut, ici la partie du nom choisi est produits
let categorie = main.dataset.produits

// let header = header.data.header;
if (categorie == 'all') {
  displayAllProducts()
} else if (categorie == 'viennoiserie' || categorie == 'boisson') {
  displayAllByCategory(categorie)
  displayDetailsEmployee(idEmployee);
} else if (categorie == 'selected' || categorie == 'choiceCategory') {
  displayDetailsEmployee(idEmployee);
}

// _____________Hearts/favorits__________________
//! delegation d'evenement
// console.log(event.target.localName)ex:(i); ou  console.log(event.target.classList);
let favoris = [];
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
searchInput.addEventListener('input', function (event) {
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
    main.classList.add('grid');
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
    `;

    div.innerHTML = boxProduit;
    let b = document.createElement('button');
    b.textContent = "Ajouter au panier";
    b.classList.add('btnAjouter');
    b.onclick = function () {
      addToCart(article);
    }
    if (article.Statut == 0 || article.Stock == 0) {
      b.classList.add('btnHidden');
    }

    div.appendChild(b);
    main.appendChild(div);
  });
});

// _____________AddCart________________________

function addToCart(produit) {
  // le param produit == ${article.ID}
  let cart = [];
  let lsCart = JSON.parse(localStorage.getItem('panier'));
  //.parse convertit un tableau de string en un tableau d'Objet
  if (lsCart != null) {
    cart = lsCart;
  }
  cart.push(produit);
  localStorage.setItem('panier', JSON.stringify(cart));
  // 'panier' est la key et JSON.stringify(cart) est la value
  //.stringify convertit un tableau d'Objet en un tableau de string
}

/*__________________________OneEmployeeInfo_______________________*/
async function displayDetailsEmployee(id) {
  //défintit le parametre GET 'id' avec "?id= id"
  // let response = await fetch(apiEmployee + "?id=" + id);
  let response = await fetch(apiEmployee + `?id=${idEmployee}`);
  let detailsEmployee = await response.json();

  // !recupère le tableau d'Objet json et le convertit en un tableau de string 
  localStorage.setItem('employee', JSON.stringify(detailsEmployee));
  // console.log(localStorage.getItem('employee'));
  id = detailsEmployee.ID;
  let divDetailsEmployee = document.createElement("div");
  divDetailsEmployee.classList.add("user");
  let details;

  if (categorie == 'viennoiserie' || categorie == 'boisson'|| categorie == 'choiceCategory') {
    details = `<p>${detailsEmployee.Prenom} ${detailsEmployee.Nom}</p>
    <span><img src="./assets/img/kevin-avatar.webp" alt="user-avatar" style="width: 8%;"></span>`;
  }
  else {
    details = `<p>${detailsEmployee.Prenom} ${detailsEmployee.Nom}</p>
    <span><img src="./assets/img/kevin-avatar.webp" alt="user-avatar" style="width: 8%;"></span>
    <div class="user solde">
    <p id="solde">Solde : ${detailsEmployee.Solde}€</p>
    <!--.toLocaleDateString("fr")-->
    <p>Réapprovisionnement le : ${detailsEmployee.Date_reappro}</p>
    </div>`;
  }
  divDetailsEmployee.innerHTML = details;
  employeeHeader.appendChild(divDetailsEmployee);
}


/*__________________________AllEmployeesInfo_______________________*/
// async function getAllEmployees() {
//   let response = await fetch(apiEmployee);
//   employeesList = await response.json();

//   employeesList.forEach(employee => {
//     let id;
//     let nom;
//     let prenom;
//     let solde;
//     let reapproDate;
//     id = employee.ID;
//     nom = employee.Nom;
//     prenom = employee.Prenom;
//     solde = employee.Solde;
//     reapproDate = employee.Date_reappro;
//     let divDetailsEmployee = document.createElement("div");
//     divDetailsEmployee.classList.add("user");
//     let details = `<p>${prenom} ${nom}</p>
//     <span><img src="./assets/img/kevin-avatar.webp" alt="user-avatar" style="width: 8%;"></span>
//     <div class="user solde">
//     <p id="solde">Solde : ${solde}</p>
//     <p>Réapprovisionnement le : ${reapproDate}</p>
//     </div>`;

//     divDetailsEmployee.innerHTML = details;
//     employeeHeader.appendChild(divDetailsEmployee);
//   })
// }


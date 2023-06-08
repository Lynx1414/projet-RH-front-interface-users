const apiOrder = 'https://localhost:8081/api/order/one';
const apiOrderHistory = 'https://localhost:8081/api/order/history';

main = document.querySelector("[data-produits= 'selected']")
let table = document.querySelector('table');
let tBody = document.createElement('tbody');
let cart;
let numberArt = 0;
let idProduit = [];
let user;
let total = 0;
let newSolde;
let divTotalAmount;
let fetchedMessage;
document.addEventListener("DOMContentLoaded", displayCart(), false);

function displayCart() {
  
  //récupérer le cart
  cart = JSON.parse(localStorage.getItem('panier'));
  // console.log(JSON.stringify(cart));
  user = JSON.parse(localStorage.getItem('employee'));
  // console.log(JSON.stringify(user));
  let solde = user.Solde;
  // console.log(solde);
  
  if (cart != null) {
    cart.forEach(produit => {
      let trPanier = document.createElement('tr');
      idProduit.push(produit.ID);
      numberArt++;
      let selected =
        ` <tr>
          <td class="produit-size">${numberArt}</td>
          <td class="produit-size">${produit.Designation}</td>
          <td class="produit-size-container text-center">1</td>
          <td class="produit-size-container text-center">${produit.Prix}</td>
        </tr>
    `;
      total += JSON.parse(produit.Prix);
      newSolde = solde - total;
      trPanier.innerHTML = selected;
      tBody.appendChild(trPanier);

      // localStorage.setItem('amount', JSON.stringify(total));
    })
    divTotalAmount = document.createElement('div');
    divTotalAmount.classList.add('#totalAmount');
    divTotalAmount.innerHTML = `<p class="right">Total :<span> ${total.toFixed(2)}€</span></p>
    <p class="right">Solde après achat(s) :<span> ${newSolde.toFixed(2)}€</span></p>`;
    main.appendChild(divTotalAmount);

    if (newSolde < 0) {
      let paragraph = document.createElement('p');
      paragraph.classList.add('redCentered');
      let message = `<strong>Votre solde est insuffisant pour cette commande.</strong>`;
      paragraph.innerHTML = message;
      divTotalAmount.appendChild(paragraph);
      let validateBtn = document.querySelector('#validateBtn');
      validateBtn.setAttribute('disabled', '');
    } 

  } else {
    localStorage.removeItem('panier');
    tBody.innerHTML = "";
    let trPanierVide = document.createElement('tr');
    trPanierVide.innerHTML = `<td id="emptyCart" colspan= 4 class= "text-center">Aucun article n'a été sélectionné</td>`;
    tBody.appendChild(trPanierVide);
  }
  table.appendChild(tBody);

}

// _____________button Annuler________________________
function clearCart() {
  localStorage.removeItem('panier');
  main.removeChild(divTotalAmount);
  displayCart();
}

//_______________NewSolde______________________________
function displayNewSolde() {
  let divNewDetailsEmployee= document.querySelector('div.user');
  let newSoldelem= document.querySelector('#solde');
  newSoldelem.innerHTML= `<p id="solde">Solde : ${newSolde.toFixed(2)} €</p>`;
  divNewDetailsEmployee.appendChild(newSoldelem);
}


// _____________button Valider et régler________________________
// todo UPDATE STOCK DU PRODUIT & UPDATE SOLDE EMPLOYE
async function pay() {
  //POST un array d'Objet
  tBody.innerHTML = "";
  let res = await fetch('http://localhost:8081/api/orders/place', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      "Content-Type": "application/json",
      //'Content-Type': 'application/x-www-form-urlencoded',
    },
    //creer un tableau associatif au format json string pour respecter le content-type de l'headers 
    body: JSON.stringify({
      "employee": localStorage.getItem('employee'),
      "products": localStorage.getItem('panier')
      // From front to back is not secure, so I put these elem below on comments
      // amount: parseInt(localStorage.getItem('amount')),
      // newSolde: parseInt(localStorage.getItem('newSolde'))
    })
    
  })
  // console.log(res);
  let fetchedMessage = await res.json();
  // console.log(fetchedMessage);
  main.removeChild(divTotalAmount);
  tBody.innerHTML ="";
  tBody.innerHTML = `<td id="emptyCart" colspan= 4 class= "text-center">${fetchedMessage}</td>`;
  displayNewSolde();
  
}

// _____________button Historique de cde________________
async function displayHistoriqueOrders(idEmploye) {
  let response = await fetch(apiOrderHistory + "?id=" + idEmploye);
  let ordersHistory = await response.json();
}





//FONCTION FETCH QUI RECUPERE LES PRODUITS DANS L'API
function getProducts() {
  return fetch("http://localhost:3000/api/products")
    .then(function (resultat) {
      return resultat.json();
    })
    .then((lProduct) => {
      return lProduct;
    })
    .catch((error) => {
      alert("There was an error");
    });
}
//FONCTION FETCH QUI RECUPERE LE PRODUITS DANS L'API EN FONCTION DE L'URL (ID)
function getProduct(idUrl) {
  return fetch(`http://localhost:3000/api/products/${idUrl}`)
    .then(function (resultat) {
      return resultat.json();
    })
    .then((lProduct) => {
      return lProduct;
    })
    .catch((error) => {
      alert("There was an error");
    });
}
//FONCTION QUI VERIFIE SI L'USER A BIEN SELECTIONNE UNE QUANTITE ENTRE 1 ET 100
function valideQuantity(quantityId) {
  if (quantityId.value < 1 || quantityId.value > 100) {
    // Ajout d'un message d'erreur si l'user ne selectionne pas un nombre entre 1 et 100
    alert("Selectionner une quantité valide");
    return false;
  }
  return true;
}
//FONCTION QUI PERMET DE CALCULER LA QUANTITE ET LE PRIX DU PANIER
function updateCart() {
  let totalQuantityInCart = 0;
  let totalPriceInCart = 0;
  for (let cartArticles of localStorage_Products) {
    getProduct(cartArticles.id).then((lProduct) => {
      totalPriceInCart += lProduct.price * parseInt(cartArticles.quantity);
      cartArticles.quantity = parseInt(cartArticles.quantity, 10);
      totalQuantityInCart += cartArticles.quantity;

      const totalQuantityDiv = document.getElementById("totalQuantity");
      totalQuantityDiv.innerHTML = totalQuantityInCart;

      const finalPrice = document.getElementById("totalPrice");
      finalPrice.innerHTML = totalPriceInCart;
    });
  }
}

function sendingDataForApi(dataForApi) {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(dataForApi),
  };
  fetch("http://localhost:3000/api/products/order", options)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Error sending data");
      }
      return response.json();
    })
    .then((data) => {
      
      window.location.href = "../html/confirmation.html?id="+data.orderId;
    })
    .catch((error) => alert(error));

    

}
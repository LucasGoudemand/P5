
//récupération de l'url de page actuelle
let stringUrl = window.location.href;
//création de la variable url qui contient la nouvelle URL
let url = new URL(stringUrl);
//extraction dans l'url du parametre ID
let idUrl = url.searchParams.get("id");

getProduct(idUrl).then((lProduct) => {

  //récupération de la class item__img pour pouvoir la mettre en parent de la balise Img
  const itemImg = document.getElementsByClassName("item__img")[0];

  //création de la balise <img>
  let newImg = document.createElement("img");
  itemImg.appendChild(newImg);
  newImg.setAttribute("src", lProduct.imageUrl);
  newImg.setAttribute("alt", lProduct.altTxt);

  //récupération de l'id title pour afficher le titre h1 et afficher le titre
  document.getElementById("title").innerHTML += lProduct.name;

  //récupération de l'id price pour afficher le prix de l'article
  document.getElementById("price").innerHTML += lProduct.price;

  //récupération de l'id description pour afficher la description de l'article
  document.getElementById("description").innerHTML += lProduct.description;

  //Créationd d'une boucle for pour crééer les balise html pour pouvoir afficher chaques couleurs
  for (let color of lProduct.colors) {
    const listColors = document.getElementById("colors");
    let newOption = document.createElement("option");
    listColors.appendChild(newOption);
    newOption.setAttribute("value", color);
    newOption.innerHTML += color;
  }

  // On récupère l'élément sur lequel on veut détecter le clic ici ça sera le bouton ajouter au panier
  const addToCart = document.getElementById("addToCart");

  // On récupère l'élément sur lequel on veut détecter le changement ici la quantitée saisie par l'user
  const quantityId = document.getElementById("quantity");

  // On récupère l'élément sur lequel on veut détecter le changement ici la couleur saisie par l'user
  const colorChoosed = document.getElementById("colors");

  // lors du clic sur le bouton Ajouter au Panier
  addToCart.addEventListener("click", function () {
    let cart = {
      id: idUrl, //la valeur de l'id est l'id contenu dans l'URL
      color: colorChoosed.value, //la valeur de couleur sera la couleur que l'user à choisi
      quantity: quantityId.value, //la valeur de quantity sera la quantité choisi par l'user
    };

    cart.quantity = parseInt(cart.quantity, 10); //cart Quantity que l'on transforme en INT (nombre)

    let localStorage_Products = JSON.parse(localStorage.getItem("products")); //on recupére les données dans le local storage

    if (!lProduct.colors.includes(colorChoosed.value)) {
      // Ajout d'un message d'erreur si l'user ne selectionne pas une couleur
      alert("Selectionner une couleur valide"); // le "!" Pour pouvoir fonctionner il faut passer le false en true et inversement (négativé le resultat pour pouvoir entrer dans le if)
      return;
    }

    valideQuantity(quantityId);

    if (localStorage_Products) {
      // Si il y a quelque chose dans le local storage alors..
      let result = localStorage_Products.find(
        (
          p // on créer la variable résult qui regarde dans le localstorage si l'article existe deja ou non
        ) => p.id === cart.id && p.color === cart.color
      );
      if (result) {
        // Si oui alors on incrémente la quantité sans ajouter un nouvel article

        result.quantity = parseInt(result.quantity, 10);
        result.quantity = cart.quantity + result.quantity;
      } else {
        localStorage_Products.push(cart); // Sinon on ajout un nouvel article avec les données de cart
      }
    } else {
      localStorage_Products = [cart]; //sinon on ajout un nouvel objet
    }

    localStorage.setItem("products", JSON.stringify(localStorage_Products)); //On met à jour le local storage
  });
});

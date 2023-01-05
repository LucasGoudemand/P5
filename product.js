fetch("http://localhost:3000/api/products")
  .then(function (res) {
    if (res.ok) {
      return res.json();
    }
  })
  //création de la fonction lProduct qui est le resultat du FETCH
  .then(function (lProduct) {
    //récupération de l'url de page actuelle
    let stringUrl = window.location.href;
    //création de la variable url qui contient la nouvelle URL
    let url = new URL(stringUrl);
    //extraction dans l'url du parametre ID
    let idUrl = url.searchParams.get("id");
    // Utilisation de la méthode Array.prototype.find() qui va chercher dans mon fichier.json les elements qui
    //correspondent à l'id présent dans l'url
    let productById = lProduct.find((p) => p._id === idUrl);
    //récupération de la class item__img pour pouvoir la mettre en parent de la balise Img
    const itemImg = document.getElementsByClassName("item__img")[0];
    //création de la balise <img>
    let newImg = document.createElement("img");
    itemImg.appendChild(newImg);
    newImg.setAttribute("src", productById.imageUrl);
    newImg.setAttribute("alt", productById.altTxt);
    //récupération de l'id title pour afficher le titre h1 et afficher le titre
    document.getElementById("title").innerHTML += productById.name;
    //récupération de l'id price pour afficher le prix de l'article
    document.getElementById("price").innerHTML += productById.price;
    //récupération de l'id description pour afficher la description de l'article
    document.getElementById("description").innerHTML += productById.description;
    //Création d'une boucle for qui passe en revue tous les produits dans le resultat du fletch et l'associe à la variable product
    for (let product of lProduct) {
      // Si l'id est le même que l'id dans l'url ALORS
      if (product._id === idUrl) {
        // pour chaques couleurs dans la case colors du tableau on créer la balise option
        for (let color of product.colors) {
          const listColors = document.getElementById("colors");
          let newOption = document.createElement("option");
          listColors.appendChild(newOption);
          newOption.setAttribute("value", color);
          newOption.innerHTML += color;
        }
      }
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
        //quantity : parseInt(quantityId.value, 10)
        quantity: quantityId.value //la valeur de quantity sera la quantité choisi par l'user
      };
      cart.quantity = parseInt(cart.quantity, 10);
      //console.log(typeof cart.quantity);
      let localStorage_Products = JSON.parse(localStorage.getItem("products"));
      
      //cart.quantity = parseInt(cart.quantity, 10);
  
      //console.log(typeof cart_quantity_Int);
      //console.log(cart_quantity_Int);
      if (quantityId.value < 1 || quantityId.value > 100 ){
        alert("Selectionner une quantité valide");
        return;
      }

      if (localStorage_Products) {
        let result = localStorage_Products.find((p) => 
          p.id === cart.id && p.color === cart.color
        );
        if (result) {
          
          result.quantity = parseInt(result.quantity, 10);
          result.quantity = cart.quantity + result.quantity;
          
        } else {
          localStorage_Products.push(cart);
        }
      } else {
        localStorage_Products = [cart];
      }
      
      localStorage.setItem("products", JSON.stringify(localStorage_Products));
      //localStorage.clear();
      //localStorage_Products = null;
      console.log(localStorage_Products);
      for (var i = 0; i < localStorage.length; i++){
        var key = localStorage.key(i);
        var value = localStorage.getItem(key);
        console.log(key + " = " + value);
      }
      
    });
  
  })
  .catch(function (err) {
    // Une erreur est survenue
  });

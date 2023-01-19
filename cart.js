let localStorage_Products = JSON.parse(localStorage.getItem("products")); //on recupére les données dans le local storage
let totalQuantityInCart = 0;
let totalPriceInCart = 0;

for (let cartArticles of localStorage_Products) {
  //Pour tout les articles dans le localstorage

  getProduct(cartArticles.id).then((lProduct) => {
    //appel de la fonction getProduct qui correspond au fetch

    //Création de l'article
    let newArticle = document.createElement("article");
    document.getElementById("cart__items").appendChild(newArticle);
    newArticle.setAttribute("class", "cart__item");
    newArticle.setAttribute("data-id", cartArticles.id);
    newArticle.setAttribute("data-color", cartArticles.color);

    //Création de la div cart__item__img
    let newDiv = document.createElement("div");
    newArticle.appendChild(newDiv);
    newDiv.setAttribute("class", "cart__item__img");

    //Création de img en récuppérant l'url et le alt texte de l'api grace au fetch
    let newImg = document.createElement("img");
    newImg.setAttribute("src", lProduct.imageUrl);
    newImg.setAttribute("alt", lProduct.altTxt);
    newDiv.appendChild(newImg);

    //Création de la div cart__item__content
    let newContentDiv = document.createElement("div");
    newContentDiv.setAttribute("class", "cart__item__content");
    newArticle.appendChild(newContentDiv);

    //Création de la div cart__item__content__description
    let newDescriptionDiv = document.createElement("div");
    newDescriptionDiv.setAttribute("class", "cart__item__content__description");
    newContentDiv.appendChild(newDescriptionDiv);

    //Création de la balise H2 qui va cherche le nom du produit dans l'API
    let newNameH2 = document.createElement("h2");
    newDescriptionDiv.appendChild(newNameH2);
    newNameH2.innerHTML = lProduct.name;

    //Création de la balise P qui contient la couleur
    let newColorP = document.createElement("p");
    newDescriptionDiv.appendChild(newColorP);
    newColorP.innerHTML = "Couleur : " + cartArticles.color;

    //Création de la balise P qui contient la le prix qui vient de l'API
    let newPriceP = document.createElement("p");
    newDescriptionDiv.appendChild(newPriceP);
    newPriceP.innerHTML = "Prix : " + lProduct.price;

    //Création de la balise div cart__item__content__settings
    let newContentSettingsDiv = document.createElement("div");
    newContentSettingsDiv.setAttribute(
      "class",
      "cart__item__content__settings"
    );
    newContentDiv.appendChild(newContentSettingsDiv);

    //Création de la balise div cart__item__content__settings__quantity
    let newContentSettingsQuantityDiv = document.createElement("div");
    newContentSettingsQuantityDiv.setAttribute(
      "class",
      "cart__item__content__settings__quantity"
    );
    newContentSettingsDiv.appendChild(newContentSettingsQuantityDiv);

    //Création de la balise p
    let newQuantityP = document.createElement("p");
    newContentSettingsQuantityDiv.appendChild(newQuantityP);
    newQuantityP.innerHTML = "Qté :";

    //Création de la balise input
    let newInput = document.createElement("input");
    newInput.setAttribute("type", "number");
    newInput.setAttribute("class", "itemQuantity");
    newInput.setAttribute("name", "itemQuantity");
    newInput.setAttribute("min", "1");
    newInput.setAttribute("max", "100");
    newInput.setAttribute("value", cartArticles.quantity);
    newContentSettingsQuantityDiv.appendChild(newInput);

    //Création de la balise div cart__item__content__settings__delete
    let newDeleteDiv = document.createElement("div");
    newDeleteDiv.setAttribute("class", "cart__item__content__settings__delete");
    newContentSettingsDiv.appendChild(newDeleteDiv);

    //Création de la balise p supprimer
    let newDeleteP = document.createElement("p");
    newDeleteP.setAttribute("class", "deleteItem");
    newDeleteDiv.appendChild(newDeleteP);
    newDeleteP.innerHTML = "Supprimer";

    const elementId = newArticle;
    const dataId = elementId.dataset.id; //Création de la variable dataID qui va chercher la valeur contenu dans la balise <article data-id="IDPRODUIT"
    const elementColor = newArticle;
    const dataColor = elementColor.dataset.color; //Création de la variable dataColor qui va chercher la valeur contenu dans la balise <article data-color="COLORPRODUIT"

    //Création d'un event listener au click du bouton supprimer
    newDeleteP.addEventListener("click", function () {
      itemToDelete = localStorage_Products.find(
        //Utilisation de la fonction find qui va cherche un item dans le local storage qui correspond a celui afficher à l'écran
        (p) => p.id === dataId && p.color === dataColor
      );

      // Suppression de l'item trouvé avec le find
      localStorage_Products = localStorage_Products.filter(
        //Utilisation de la fonction filter qui va renvopyer un nouveau tableau SANS l'item trouvé dans le local storage
        (p) => p !== itemToDelete
      );

      // mise à jour du local storage avec le nouveau tableau sans l'item trouvé avec le find
      localStorage.setItem("products", JSON.stringify(localStorage_Products));
      elementId.remove();

      updateCart();
    });
    //Ajout d'un eventListener pour detecter quand l'user changer de quantité
    newInput.addEventListener("change", function () {
      if (!valideQuantity(newInput)) {
        return;
      }
      quantityToUpdate = localStorage_Products.find(
        //Utilisation de la fonction find qui va cherche un item dans le local storage qui correspond a celui afficher à l'écran
        (p) => p.id === dataId && p.color === dataColor
      );
      test12 = localStorage_Products.find(
        //Utilisation de la fonction find qui va cherche un item dans le local storage qui correspond a celui afficher à l'écran
        (p) => p.id === dataId && p.color === dataColor
      );

      //MAJ DE LA QUANTITE
      totalQuantityInCart =
        totalQuantityInCart - parseInt(quantityToUpdate.quantity);
      totalQuantityInCart = totalQuantityInCart + parseInt(newInput.value);

      quantityToUpdate.quantity = newInput.value; //On remplace la quantité du produit trouvé avec le find par la quantité contenu dans le NewImput

      localStorage.setItem("products", JSON.stringify(localStorage_Products));

      updateCart(); //update de la quantité et du prix
    });
    updateCart();//update de la quantité et du prix
  });
}

buttonSendOrder = document.getElementById("order");
//Ajout d'un event listener sur le bouton confirmer
buttonSendOrder.addEventListener("click", function () {
  //Création de la regex pour le champ prénom et nom
  // Le champ ne commence pas par un espace ou un caractère spécial (grâce au début ^)
  //Il n'y a que des lettres, espaces, apostrophes, tirets et points ([a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*)
  //Le champ  se termine par une lettre ou un espace (grâce à la fin $)
  const regexName = /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/;
  //Création de la regex pour le champ adresse
  //Le champ ne contient que des lettres, chiffres, espaces, apostrophes, virgules et tirets ([0-9a-zA-Z\s,'-]*) et  les accents de la langue française
  const regexAddress =
    /^[0-9a-zA-Z\s,'-\u00E9\u00E0\u00E8\u00EA\u00EB\u00EF\u00F4\u00F9\u00FB\u00FF\u00E7]*$/;
  //Le champ commence par un chiffre ou une lettre (^[a-zA-Z0-9])
  //Le champ contient un ou plusieurs caractères alphanumériques, tirets, points et soulignements ([a-zA-Z0-9._-]*) avant le @
  //Le champ contient un @
  //Après le @, il y a un ou plusieurs caractères alphanumériques, tirets, points et soulignements ([a-zA-Z0-9._-]*)
  //Il y a un point suivi par au moins deux caractères alphabétiques (\.[a-zA-Z]{2,}$)
  const regexEmail =
    /^[a-zA-Z0-9][a-zA-Z0-9._-]*@[a-zA-Z0-9][a-zA-Z0-9._-]*\.[a-zA-Z]{2,}$/;

  inputName = document.getElementById("firstName");
  //Si le champ est vide alors on affiche ce message
  if (!inputName.value) {
    document.getElementById("firstNameErrorMsg").innerHTML =
      "Veuillez completer le champ Prénom";
    return;
    //Ici on teste la regex et affiche ce message si le prénom de rempli pas les spécifications de la regex
  } else if (!regexName.test(inputName.value)) {
    document.getElementById("firstNameErrorMsg").innerHTML =
      "Veuillez completer le champ Prénom avec des caractéres valides";
    return;
  } else {
    //Supression du message d'erreur dans le dom si le champ est correctement rempli avec verification si l'element firstNameErrorMsg existe bien dans le DOM
    const firstNameError = document.getElementById("firstNameErrorMsg");
    if (firstNameError) {
      firstNameError.remove();
    }
  }

  inputLastName = document.getElementById("lastName");

  if (!inputLastName.value) {
    document.getElementById("lastNameErrorMsg").innerHTML =
      "Veuillez completer le champ Nom";
    return;
    //Ici on teste la regex et affiche ce message si le nom de rempli pas les spécifications de la regex
  } else if (!regexName.test(inputLastName.value)) {
    document.getElementById("lastNameErrorMsg").innerHTML =
      "Veuillez completer le champ Nom avec des caractéres valides";
    return;
  } else {
    //Supression du message d'erreur dans le dom si le champ est correctement rempli avec verification si l'element lastNameErrorMsg existe bien dans le DOM
    const lastNameError = document.getElementById("lastNameErrorMsg");
    if (lastNameError) {
      lastNameError.remove();
    }
  }

  inputAddress = document.getElementById("address");

  if (!inputAddress.value) {
    document.getElementById("addressErrorMsg").innerHTML =
      "Veuillez completer le champ adresse";
    return;
    //Ici on teste la regex et affiche ce message si l'adresse rempli pas les spécifications de la regex
  } else if (!regexAddress.test(inputAddress.value)) {
    document.getElementById("addressErrorMsg").innerHTML =
      "Veuillez completer le champ Adresse avec des caractéres valides";
    return;
  } else {
    //Supression du message d'erreur dans le dom si le champ est correctement rempli avec verification si l'element lastNameErrorMsg existe bien dans le DOM
    const addressError = document.getElementById("addressErrorMsg");
    if (addressError) {
      addressError.remove();
    }
  }

  inputCity = document.getElementById("city");

  if (!inputCity.value) {
    document.getElementById("cityErrorMsg").innerHTML =
      "Veuillez completer le champ Ville";
    return;
    //Ici on teste la regex et affiche ce message si l'adresse rempli pas les spécifications de la regex
  } else if (!regexName.test(inputCity.value)) {
    document.getElementById("cityErrorMsg").innerHTML =
      "Veuillez completer le champ Ville avec des caractéres valides";
    return;
  } else {
    //Supression du message d'erreur dans le dom si le champ est correctement rempli avec verification si l'element lastNameErrorMsg existe bien dans le DOM
    const cityError = document.getElementById("cityErrorMsg");
    if (cityError) {
      cityError.remove();
    }
  }

  inputEmail = document.getElementById("email");

  if (!inputEmail.value) {
    document.getElementById("emailErrorMsg").innerHTML =
      "Veuillez completer le champ Email";
    return;
    //Ici on teste la regex et affiche ce message si l'adresse rempli pas les spécifications de la regex
  } else if (!regexEmail.test(inputEmail.value)) {
    document.getElementById("emailErrorMsg").innerHTML =
      "Veuillez completer le champ Email avec des caractéres valides";
    return;
  } else {
    //Supression du message d'erreur dans le dom si le champ est correctement rempli avec verification si l'element lastNameErrorMsg existe bien dans le DOM
    const emailError = document.getElementById("emailErrorMsg");
    if (emailError) {
      emailError.remove();
    }
  }
  //création de l'objet contact
  const contact = {
    firstName: inputName.value, //la valeur de l'id est l'id contenu dans l'URL
    lastName: inputLastName.value, //la valeur de couleur sera la couleur que l'user à choisi
    address: inputAddress.value,
    city: inputCity.value,
    email: inputEmail.value, //la valeur de quantity sera la quantité choisi par l'user
  };
  //création de l'array products
  let products = [];
  //ajout des produits contenu dans le local storage dans l'array
  for (let ItemsInMyCart of localStorage_Products) {
    products.push(ItemsInMyCart.id);
  };
  //Création des options pour l'envoi à
  sendingDataForApi({ contact, products });

});


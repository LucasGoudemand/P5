getProducts().then((lProduct) => {
  //selection de l'id ITEMS pour l'ajout des canapés et création de la variable element
  const element = document.getElementById("items");
  
  //création de la boucle for
  for (let i = 0; i < lProduct.length; i++) {
    //création de la balise <a>
    let newLink = document.createElement("a");
    element.appendChild(newLink);
    newLink.setAttribute("href", "./product.html?id=" + lProduct[i]._id);

    //création de la balise <article>
    let newArticle = document.createElement("article");
    newLink.appendChild(newArticle);

    //création de la balise <img>
    let newImg = document.createElement("img");
    newArticle.appendChild(newImg);
    newImg.setAttribute("src", lProduct[i].imageUrl);
    newImg.setAttribute("alt", lProduct[i].altTxt);

    //création de la balise <h3>
    let newH3 = document.createElement("h3");
    newArticle.appendChild(newH3);
    newH3.classList.add("productName");

    //création de la balise <p>
    let newP = document.createElement("p");
    newArticle.appendChild(newP);
    newP.classList.add("productDescription");

    //Ajout des lignes à la page INDEX
    //Ajout du titre de l'article
    newH3.innerHTML += lProduct[i].name;
    //Ajout de la description de l'article
    newP.innerHTML += lProduct[i].description;
  }
});

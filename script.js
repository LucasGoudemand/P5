fetch('http://localhost:3000/api/products')
  .then(function(res) {
    if (res.ok) {
      return res.json();
    }
  })
  .then(function(value) {
    console.log(value.objects.colors);
  document.getElementById("hello-result").innerText = value.name ;
  
  })
  .catch(function(err) {
    // Une erreur est survenue
  });
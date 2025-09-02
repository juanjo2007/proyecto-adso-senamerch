document.addEventListener("DOMContentLoaded", function (){
    const direction = document.querySelector(".agregar_direccion");

    if(direction){
      fetch("/frontend/public/views/components/agregar_direccion.html")
        .then(response => response.text())
        .then(data => {
          direction.innerHTML = data;
        })
    .catch(error => console.log("Error", error));
    } 
});
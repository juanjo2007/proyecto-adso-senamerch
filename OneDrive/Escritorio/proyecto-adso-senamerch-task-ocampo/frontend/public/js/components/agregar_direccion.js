document.addEventListener("DOMContentLoaded", function (){
    const direction = document.querySelector(".direction-content");

    if(direction){
      fetch("/frontend/public/views/agregar_direccion.html")
        .then(response => response.text())
        .then(data => {
          direction.innerHTML = data;
        })
    .catch(error => console.log("Error", error));
    } 
});
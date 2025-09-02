document.addEventListener("DOMContentLoaded", function (){
    const direction = document.querySelector(".gestor-publicaciones");

    if(direction){
      fetch("/frontend/public/views/components/gestion_publicaciones.html")
        .then(response => response.text())
        .then(data => {
          direction.innerHTML = data;
        })
    .catch(error => console.log("Error", error));
    } 
});
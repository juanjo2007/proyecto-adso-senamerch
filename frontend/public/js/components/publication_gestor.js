document.addEventListener("DOMContentLoaded", function (){
    const direction = document.querySelector(".publications-gestor");

    if(direction){
      fetch("/frontend/public/views/components/publications_gestor.html")
        .then(response => response.text())
        .then(data => {
          direction.innerHTML = data;
        })
    .catch(error => console.log("Error", error));
    } 
});
document.addEventListener("DOMContentLoaded", function (){
    const direction = document.querySelector(".publications-gestor-two");

    if(direction){
      fetch("/frontend/public/views/components/publications_gestor2.html")
        .then(response => response.text())
        .then(data => {
          direction.innerHTML = data;
        })
    .catch(error => console.log("Error", error));
    } 
});
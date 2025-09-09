document.addEventListener("DOMContentLoaded", function (){
    const direction = document.querySelector(".navbar");

    if(direction){
      fetch("/frontend/public/views/components/navbar.html")
        .then(response => response.text())
        .then(data => {
          direction.innerHTML = data;
        })
    .catch(error => console.log("Error", error));
    } 
});
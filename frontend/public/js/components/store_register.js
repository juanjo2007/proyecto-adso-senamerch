document.addEventListener("DOMContentLoaded", function (){
    const direction = document.querySelector(".formstore-container");

    if(direction){
      fetch("/frontend/public/views/components/store_register.html")
        .then(response => response.text())
        .then(data => {
          direction.innerHTML = data;
        })
    .catch(error => console.log("Error", error));
    }
});
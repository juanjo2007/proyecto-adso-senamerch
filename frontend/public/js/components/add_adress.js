document.addEventListener("DOMContentLoaded", function (){
    const direction = document.querySelector(".add-adress");

    if(direction){
      fetch("/frontend/public/views/components/add_adress.html")
        .then(response => response.text())
        .then(data => {
          direction.innerHTML = data;
        })
    .catch(error => console.log("Error", error));
    } 
});
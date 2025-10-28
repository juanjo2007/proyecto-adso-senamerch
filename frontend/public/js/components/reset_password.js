document.addEventListener("DOMContentLoaded", function (){
    const direction = document.querySelector(".reset-password");

    if(direction){
      fetch("/frontend/public/views/components/reset_password.html")
        .then(response => response.text())
        .then(data => {
          direction.innerHTML = data;
        })
    .catch(error => console.log("Error", error));
    } 
});
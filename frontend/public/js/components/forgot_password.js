document.addEventListener("DOMContentLoaded", function (){
    const direction = document.querySelector(".forgot-password");

    if(direction){
      fetch("/frontend/public/views/components/forgot_password.html")
        .then(response => response.text())
        .then(data => {
          direction.innerHTML = data;
        })
    .catch(error => console.log("Error", error));
    } 
});
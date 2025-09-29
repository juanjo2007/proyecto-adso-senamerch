document.addEventListener("DOMContentLoaded", function (){
    const form = document.querySelector(".login-container");

    if(form){
      fetch("/frontend/public/views/components/login.html")
        .then(response => response.text())
        .then(data => {
          form.innerHTML = data;
        })
    .catch(error => console.log("Error", error));
    } 
});  
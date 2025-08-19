document.addEventListener("DOMContentLoaded", function (){
    const form = document.querySelector(".form__register");

    if(form){
      fetch("/frontend/public/views/components/registro.html")
        .then(response => response.text())
        .then(data => {
          form.innerHTML = data;
        })
    .catch(error => console.log("Error", error));
    } 
});  
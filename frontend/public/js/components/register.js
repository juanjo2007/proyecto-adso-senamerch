document.addEventListener("DOMContentLoaded", function (){
    const form = document.querySelector(".form-container");

    if(form){
      fetch("/frontend/public/views/components/register.html")
        .then(response => response.text())
        .then(data => {
          form.innerHTML = data;
        })
    .catch(error => console.log("Error", error));
    } 
});  
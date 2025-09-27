document.addEventListener("DOMContentLoaded", function (){
    const form = document.querySelector(".contact-page");

    if(form){
      fetch("/frontend/public/views/components/contact.html")
        .then(response => response.text())
        .then(data => {
          form.innerHTML = data;
        })
    .catch(error => console.log("Error", error));
    } 
});  
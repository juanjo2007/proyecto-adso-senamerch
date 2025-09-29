document.addEventListener("DOMContentLoaded", function (){
    const form = document.querySelector(".client-view");

    if(form){
      fetch("/frontend/public/views/components/client_view.html")
        .then(response => response.text())
        .then(data => {
          form.innerHTML = data;
        })
    .catch(error => console.log("Error", error));
    } 
});  
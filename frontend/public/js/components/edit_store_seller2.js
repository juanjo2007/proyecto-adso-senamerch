document.addEventListener("DOMContentLoaded", function (){
    const form = document.querySelector(".edit_store_seller-two");

    if(form){
      fetch("/frontend/public/views/components/edit_store_seller2.html")
        .then(response => response.text())
        .then(data => {
          form.innerHTML = data;
        })
    .catch(error => console.log("Error", error));
    } 
});  
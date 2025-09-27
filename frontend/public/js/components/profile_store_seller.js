document.addEventListener("DOMContentLoaded", function (){
    const form = document.querySelector(".profile-store-seller");

    if(form){
      fetch("/frontend/public/views/components/profile_store_seller.html")
        .then(response => response.text())
        .then(data => {
          form.innerHTML = data;
        })
    .catch(error => console.log("Error", error));
    } 
});  
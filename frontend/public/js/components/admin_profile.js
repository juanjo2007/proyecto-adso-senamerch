document.addEventListener("DOMContentLoaded", function (){
    const direction = document.querySelector(".profile-admin-container");

    if(direction){
      fetch("/frontend/public/views/components/admin_profile.html")
        .then(response => response.text())
        .then(data => {
          direction.innerHTML = data;
        })
    .catch(error => console.log("Error", error));
    } 
});
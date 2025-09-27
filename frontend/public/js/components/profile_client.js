document.addEventListener("DOMContentLoaded", function (){
    const form = document.querySelector(".profile-client");

    if(form){
      fetch("/frontend/public/views/components/profile_client.html")
        .then(response => response.text())
        .then(data => {
          form.innerHTML = data;
        })
    .catch(error => console.log("Error", error));
    } 
});  
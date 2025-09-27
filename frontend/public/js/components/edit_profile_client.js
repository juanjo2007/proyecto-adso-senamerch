document.addEventListener("DOMContentLoaded", function (){
    const form = document.querySelector(".edit_profile_client");

    if(form){
      fetch("/frontend/public/views/components/edit_profile_client.html")
        .then(response => response.text())
        .then(data => {
          form.innerHTML = data;
        })
    .catch(error => console.log("Error", error));
    } 
});  
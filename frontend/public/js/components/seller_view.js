document.addEventListener("DOMContentLoaded", function (){
    const form = document.querySelector(".seller-view");

    if(form){
      fetch("/frontend/public/views/components/seller_view.html")
        .then(response => response.text())
        .then(data => {
          form.innerHTML = data;
        })
    .catch(error => console.log("Error", error));
    } 
});  
document.addEventListener("DOMContentLoaded", function (){
    const direction = document.querySelector(".index-page");

    if(direction){
      fetch("/frontend/public/views/components/index.html")
        .then(response => response.text())
        .then(data => {
          direction.innerHTML = data;
        })
    .catch(error => console.log("Error", error));
    } 
});
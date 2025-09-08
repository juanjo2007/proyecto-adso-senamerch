document.addEventListener("DOMContentLoaded", function (){
    const direction = document.querySelector(".footer");

    if(direction){
      fetch("/frontend/public/views/components/footer.html")
        .then(response => response.text())
        .then(data => {
          direction.innerHTML = data;
        })
    .catch(error => console.log("Error", error));
    } 
});
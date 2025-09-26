document.addEventListener("DOMContentLoaded", function(){
    const heroElemnent = document.querySelector(".hero__content");

    if(heroElemnent){
        fetch("/frontend/public/views/components/hero.html")
        .then(response => response.text())
        .then(data => {
            heroElemnent.innerHTML = data;
        })

    .catch(error => console.log("Error cargando el hero", error));
    }
});
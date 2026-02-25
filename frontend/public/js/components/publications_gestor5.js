document.addEventListener("DOMContentLoaded", function () { 
  const form = document.querySelector(".publications-gestor-five");

  if (form) {
    fetch("/frontend/public/views/components/publications_gestor5.html")
      .then(response => response.text())
      .then(data => {
        form.innerHTML = data;

        // ✅ Eventos propios del componente que ya tienes
        attachCreatePostEvents();

        // ✅ Navegación de la card "LISTADO DE MIS PRODUCTOS"
        const miniCard = form.querySelector(".mini-card-products");

        if (miniCard) {
          miniCard.addEventListener("click", function () {
            window.location.href = "view_publications_gestor6.html";
          });
        }
      })
      .catch(error => console.log("Error al cargar el componente:", error));
  }
});

// /frontend/public/js/components/login_visual.js
document.addEventListener('DOMContentLoaded', function () {
  const visualContainer = document.querySelector('.login-view__visual');

  if (visualContainer) {
    fetch("/frontend/public/views/components/login_image.html")
      .then(response => {
        if (!response.ok) throw new Error("Error al cargar login_image.html");
        return response.text();
      })
      .then(data => {
        visualContainer.innerHTML = data;
      })
      .catch(error => console.error("Error cargando Login Visual:", error));
  } else {
    console.warn("No se encontró '.login-view__visual' en el HTML.");
  }
});

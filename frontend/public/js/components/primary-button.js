// /frontend/public/js/components/primary-button.js
document.addEventListener('DOMContentLoaded', function () {
  const buttonContainer = document.querySelector('.button-container');

  if (buttonContainer) {
    fetch("/frontend/public/views/components/primary-button.html")
      .then(response => {
        if (!response.ok) throw new Error("Error al cargar primary-button.html");
        return response.text();
      })
      .then(data => {
        buttonContainer.innerHTML = data;
      })
      .catch(error => console.error("Error cargando Primary Button:", error));
  } else {
    console.warn("No se encontró '.button-container' en Product.html");
  }
});

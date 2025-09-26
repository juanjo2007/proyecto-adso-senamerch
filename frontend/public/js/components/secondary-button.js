// /frontend/public/js/components/secondary-button.js
document.addEventListener('DOMContentLoaded', function () {
  const buttonContainer = document.querySelector('.secondary-button-container');

  if (buttonContainer) {
    fetch("/frontend/public/views/components/secondary-button.html")
      .then(response => {
        if (!response.ok) throw new Error("Error al cargar secondary-button.html");
        return response.text();
      })
      .then(data => {
        buttonContainer.innerHTML = data;
      })
      .catch(error => console.error("Error cargando Secondary Button:", error));
  } else {
    console.warn("No se encontró '.secondary-button-container' en Product.html");
  }
});

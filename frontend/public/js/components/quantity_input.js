// /frontend/public/js/components/quantity_input.js
document.addEventListener('DOMContentLoaded', function () {
  const quantityContainer = document.querySelector('.quantity-input-container');

  if (quantityContainer) {
    fetch("/frontend/public/views/components/quantity_input.html")
      .then(response => {
        if (!response.ok) throw new Error("Error al cargar quantity_input.html");
        return response.text();
      })
      .then(data => {
        quantityContainer.innerHTML = data;
      })
      .catch(error => console.error("Error cargando Quantity Input:", error));
  } else {
    console.warn("No se encontró '.quantity-input-container' en el HTML.");
  }
});

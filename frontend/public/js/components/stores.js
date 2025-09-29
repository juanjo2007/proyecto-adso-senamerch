// ================== STORES COMPONENT ==================
document.addEventListener('DOMContentLoaded', function () {
  const storesContainer = document.querySelector('.stores-container');

  if (storesContainer) {
    fetch("/frontend/public/views/components/stores.html")
      .then(response => {
        if (!response.ok) throw new Error("Error al cargar stores.html");
        return response.text();
      })
      .then(data => {
        storesContainer.innerHTML = data;
      })
      .catch(error => console.error("Error cargando el componente Stores:", error));
  } else {
    console.warn("No se encontró '.stores-container' en el HTML.");
  }
});

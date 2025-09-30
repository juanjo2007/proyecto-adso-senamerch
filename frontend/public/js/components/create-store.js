// ================== CREATE STORE COMPONENT ==================
document.addEventListener('DOMContentLoaded', function () {
  const createStoreContainer = document.querySelector('.create-store-container');

  if (createStoreContainer) {
    fetch("/frontend/public/views/components/create-store.html")
      .then(response => {
        if (!response.ok) throw new Error("Error al cargar create-store.html");
        return response.text();
      })
      .then(data => {
        createStoreContainer.innerHTML = data;
      })
      .catch(error => console.error("Error cargando el componente Create Store:", error));
  } else {
    console.warn("No se encontró '.create-store-container' en el HTML.");
  }
});

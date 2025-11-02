document.addEventListener("DOMContentLoaded", function () {
  const container = document.querySelector(".create-store-container");

  if (container) {
    fetch("/frontend/public/views/components/create_store.html")
      .then((response) => response.text())
      .then((data) => {
        container.innerHTML = data;
      })
      .catch((error) => console.error("Error cargando contacto:", error));
  }
});

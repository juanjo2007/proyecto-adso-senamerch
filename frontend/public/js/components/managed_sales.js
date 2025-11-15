document.addEventListener("DOMContentLoaded", function () {
  const container = document.querySelector(".managed-sales-container");

  if (container) {
    fetch("/frontend/public/views/components/managed_sales.html")
      .then((response) => response.text())
      .then((data) => {
        container.innerHTML = data;
      })
      .catch((error) => console.error("Error cargando contacto:", error));
  }
});

document.addEventListener("DOMContentLoaded", function () {
  const container = document.querySelector(".managed-orders-container");

  if (container) {
    fetch("/frontend/public/views/components/managed_orders.html")
      .then((response) => response.text())
      .then((data) => {
        container.innerHTML = data;
      })
      .catch((error) => console.error("Error cargando contacto:", error));
  }
});

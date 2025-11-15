document.addEventListener("DOMContentLoaded", function () {
  const container = document.querySelector(".managed-product-container");

  if (container) {
    fetch("/frontend/public/views/components/managed_product.html")
      .then((response) => response.text())
      .then((data) => {
        container.innerHTML = data;
      })
      .catch((error) => console.error("Error cargando contacto:", error));
  }
});

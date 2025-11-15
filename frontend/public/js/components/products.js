// ================== SALES COMPONENT ================== 
document.addEventListener('DOMContentLoaded', function () {
  const productsContainer = document.querySelector('.products-container');

  if (productsContainer) {
    fetch("/frontend/public/views/components/products.html")
      .then(response => {
        if (!response.ok) throw new Error("Error al cargar products.html");
        return response.text();
      })
      .then(data => {
        productsContainer.innerHTML = data;

        // ================== Evento para botones "Gestionar" ==================
        const manageButtons = productsContainer.querySelectorAll('.products__gestor');

        manageButtons.forEach(button => {
          button.addEventListener('click', () => {
            window.location.href = "view_managed_product.html";
          });
        });
      })
      .catch(error => console.error("Error cargando el componente sales:", error));
  } else {
    console.warn("No se encontró '.products-container' en el HTML.");
  }
});
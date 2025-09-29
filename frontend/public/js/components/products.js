// ================== PRODUCTS COMPONENT ================== 
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

        // ================== Funcionalidad extra ==================
        const searchInput = productsContainer.querySelector('.products__search-input');
        const rows = productsContainer.querySelectorAll('.products__row:not(.products__row--header)');

        if (searchInput) {
          searchInput.addEventListener('input', function () {
            const searchValue = this.value.toLowerCase();
            rows.forEach(row => {
              const text = row.textContent.toLowerCase();
              row.style.display = text.includes(searchValue) ? "grid" : "none";
            });
          });
        }
      })
      .catch(error => console.error("Error cargando el componente Products:", error));
  } else {
    console.warn("No se encontró '.products-container' en el HTML.");
  }
});

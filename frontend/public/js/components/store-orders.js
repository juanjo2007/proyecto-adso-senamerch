document.addEventListener('DOMContentLoaded', function () {
  const ordersContainer = document.querySelector('.store-orders-container');

  if (ordersContainer) {
    fetch("/frontend/public/views/components/store_orders.html")
      .then(response => {
        if (!response.ok) throw new Error("Error al cargar store-orders.html");
        return response.text();
      })
      .then(data => {
        ordersContainer.innerHTML = data;

        // ✅ Después de insertar el HTML, ahora sí podemos acceder al <select>
        const filterSelect = ordersContainer.querySelector('.store-orders__filter');
        if (filterSelect) {
          filterSelect.addEventListener('change', function () {
            if (this.value === 'entregado') {
              window.location.href = 'view_sales_made.html';
            }
          });
        }
      })
      .catch(error => console.error("Error:", error));
  }
});

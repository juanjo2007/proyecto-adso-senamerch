document.addEventListener('DOMContentLoaded', function () {
  const ordersContainer = document.querySelector('.store-orders-container');

  if (ordersContainer) {
    fetch("/frontend/public/views/components/store_orders.html")
      .then(response => {
        if (!response.ok) throw new Error("Error al cargar store_orders.html");
        return response.text();
      })
      .then(data => {
        ordersContainer.innerHTML = data;

        // ✅ Después de insertar el HTML, ahora sí podemos acceder a los elementos internos
        const filterSelect = ordersContainer.querySelector('.store-orders__filter');
        const manageButtons = ordersContainer.querySelectorAll('.store-orders__delivery');

        // 🔹 Evento para el <select>
        if (filterSelect) {
          filterSelect.addEventListener('change', function () {
            if (this.value === 'entregado') {
              window.location.href = 'view_sales_made.html';
            }
          });
        }

        // 🔹 Eventos para los botones de entrega
        if (manageButtons.length > 0) {
          manageButtons.forEach(button => {
            button.addEventListener('click', () => {
              window.location.href = "store_order_detail_view.html";
            });
          });
        }
      })
      .catch(error => console.error("Error cargando el componente store_orders:", error));
  } else {
    console.warn("No se encontró '.store-orders-container' en el HTML.");
  }
});

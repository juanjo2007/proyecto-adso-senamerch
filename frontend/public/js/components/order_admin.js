// ================== SALES COMPONENT ================== 
document.addEventListener('DOMContentLoaded', function () {
  const orderContainer = document.querySelector('.order-table-container');

  if (orderContainer) {
    fetch("/frontend/public/views/components/order_admin.html")
      .then(response => {
        if (!response.ok) throw new Error("Error al cargar order_admin.html");
        return response.text();
      })
      .then(data => {
        orderContainer.innerHTML = data;

        // ================== Evento para botones "Gestionar" ==================
        const manageButtons = orderContainer.querySelectorAll('.orders-admin__gestor');

        manageButtons.forEach(button => {
          button.addEventListener('click', () => {
            window.location.href = "view_managed_orders.html";
          });
        });
      })
      .catch(error => console.error("Error cargando el componente sales:", error));
  } else {
    console.warn("No se encontró '.order-table-container' en el HTML.");
  }
});
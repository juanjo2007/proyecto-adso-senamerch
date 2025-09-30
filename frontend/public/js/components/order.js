// ================== TU PEDIDO COMPONENT ==================
document.addEventListener('DOMContentLoaded', function () {
  const ordersContainer = document.querySelector('.orders-container');

  if (ordersContainer) {
    fetch("/frontend/public/views/components/order.html")
      .then(response => {
        if (!response.ok) throw new Error("Error al cargar order.html");
        return response.text();
      })
      .then(data => {
        ordersContainer.innerHTML = data;
      })
      .catch(error => console.error("Error cargando el componente Tu Pedido:", error));
  } else {
    console.warn("No se encontró '.orders-container' en el HTML.");
  }
});

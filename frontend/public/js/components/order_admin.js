// ================== ORDER_0 COMPONENT ==================
document.addEventListener('DOMContentLoaded', function () {
  const order0Container = document.querySelector('.order-0-container');

  if (order0Container) {
    fetch("/frontend/public/views/components/order_admin.html")
      .then(response => {
        if (!response.ok) throw new Error("Error al cargar order_0.html");
        return response.text();
      })
      .then(data => {
        order0Container.innerHTML = data;
      })
      .catch(error => console.error("Error cargando el componente order_admin:", error));
  } else {
    console.warn("No se encontró '.order-0-container' en el HTML.");
  }
});

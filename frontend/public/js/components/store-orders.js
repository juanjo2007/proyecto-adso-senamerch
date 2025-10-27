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
      })
      .catch(error => console.error("Error:", error));
  }
});

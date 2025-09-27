document.addEventListener('DOMContentLoaded', function () {
  const ordersContainer = document.querySelector('.order-card-container');

  if (ordersContainer) {
    fetch("/frontend/public/views/components/orders.html")
      .then(response => {
        if (!response.ok) throw new Error("Error al cargar order-card.html");
        return response.text();
      })
      .then(data => {
        ordersContainer.innerHTML = data;
      })
      .catch(error => console.error("Error:", error));
  }
});

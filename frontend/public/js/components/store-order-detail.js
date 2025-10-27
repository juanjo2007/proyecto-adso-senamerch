document.addEventListener('DOMContentLoaded', function () {
  const orderDetailContainer = document.querySelector('.store-order-detail-container');

  if (orderDetailContainer) {
    fetch("/frontend/public/views/components/store_order_detail.html")
      .then(response => {
        if (!response.ok) throw new Error("Error al cargar store_order_detail.html");
        return response.text();
      })
      .then(data => {
        orderDetailContainer.innerHTML = data;
      })
      .catch(error => console.error("Error:", error));
  }
});

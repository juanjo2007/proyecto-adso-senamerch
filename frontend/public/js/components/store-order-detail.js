document.addEventListener("DOMContentLoaded", function () {
  const orderDetailContainer = document.querySelector(".store-order-detail-container");

  if (orderDetailContainer) {
    fetch("/frontend/public/views/components/store_order_detail.html")
      .then((response) => {
        if (!response.ok) throw new Error("Error al cargar store_order_detail.html");
        return response.text();
      })
      .then((data) => {
        orderDetailContainer.innerHTML = data;

        // === Botón ENTREGAR PEDIDO ===
        const deliverBtn = orderDetailContainer.querySelector(".btn--primary");
        if (deliverBtn) {
          deliverBtn.addEventListener("click", function (e) {
            e.preventDefault();
            showAlert("Pedido entregado, ¡felicidades!", "success");

            setTimeout(() => {
              window.location.href = "store_orders_view.html";
            }, 1500);
          });
        }

        // === Botón CANCELAR PEDIDO ===
        const cancelBtn = orderDetailContainer.querySelector(".btn-variant2--secondary");
        if (cancelBtn) {
          cancelBtn.addEventListener("click", function (e) {
            e.preventDefault();
            showAlert("Pedido cancelado", "error");

            setTimeout(() => {
              window.location.href = "store_orders_view.html";
            }, 1500);
          });
        }
      })
      .catch((error) => console.error("Error:", error));
  }

  // === ALERTA CENTRADA, LIMPIA Y PROFESIONAL ===
  function showAlert(message, type = "success") {
    const existingAlert = document.querySelector(".alert");
    if (existingAlert) existingAlert.remove();

    const alert = document.createElement("div");
    alert.className = `alert alert--${type}`;
    alert.innerHTML = `
      <div class="alert__content">
        <p class="alert__message">${message}</p>
      </div>
    `;

    document.body.appendChild(alert);

    // Mostrar animación
    setTimeout(() => alert.classList.add("alert--show"), 50);

    // Ocultar después de un tiempo
    setTimeout(() => {
      alert.classList.remove("alert--show");
      setTimeout(() => alert.remove(), 300);
    }, 1500);
  }
});

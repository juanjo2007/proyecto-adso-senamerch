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
        const deliverBtn = orderDetailContainer.querySelector(".store-order-detail__delivery");
        if (deliverBtn) {
          deliverBtn.addEventListener("click", function (e) {
            e.preventDefault();
            showAlert("Pedido entregado correctamente", "success");

            setTimeout(() => {
              window.location.href = "store_orders_view.html";
            }, 1200);
          });
        }

        // === Botón CANCELAR PEDIDO ===
        const cancelOrderBtn = orderDetailContainer.querySelector(".store-order-detail__cancel-order");
        if (cancelOrderBtn) {
          cancelOrderBtn.addEventListener("click", function (e) {
            e.preventDefault();
            showAlert("Pedido cancelado", "error");

            setTimeout(() => {
              window.location.href = "store_orders_view.html";
            }, 1200);
          });
        }

        // === Botones CANCELAR PRODUCTO ===
        const cancelProductBtns = orderDetailContainer.querySelectorAll(".store-order-detail__cancel-product");
        cancelProductBtns.forEach((btn) => {
          btn.addEventListener("click", function () {
            showAlert("Producto cancelado del pedido", "warning");
            // Aquí puedes mantener su comportamiento HTML nativo o añadir lógica personalizada
          });
        });
      })
      .catch((error) => console.error("Error:", error));
  }

  // === ALERTA PROFESIONAL Y ANIMADA ===
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

    // Animación de aparición
    setTimeout(() => alert.classList.add("alert--show"), 50);

    // Desaparece automáticamente
    setTimeout(() => {
      alert.classList.remove("alert--show");
      setTimeout(() => alert.remove(), 300);
    }, 1500);
  }
});

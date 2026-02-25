document.addEventListener("DOMContentLoaded", function () {

  // 👉 Este SÍ debe existir en tu HTML
  const orderDetailContainer = document.querySelector(".store-order-detail-container");

  if (!orderDetailContainer) {
    console.error("❌ No se encontró .store-order-detail-container en el HTML.");
    return;
  }

  // 👉 Cargar componente HTML por fetch
  fetch("/frontend/public/views/components/store_order_detail.html")
    .then((response) => {
      if (!response.ok) throw new Error("Error al cargar store_order_detail.html");
      return response.text();
    })
    .then((data) => {
      orderDetailContainer.innerHTML = data;

      // -----------------------------
      //  EVENTOS DESPUÉS DE CARGAR HTML
      // -----------------------------

      // === ENTREGAR PEDIDO ===
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

      // === CANCELAR PEDIDO ===
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

      // === CANCELAR PRODUCTO ===
      const cancelProductBtns = orderDetailContainer.querySelectorAll(".store-order-detail__cancel-product");
      cancelProductBtns.forEach((btn) => {
        btn.addEventListener("click", function () {
          showAlert("Producto cancelado del pedido", "warning");
        });
      });

    })
    .catch((error) => console.error("Error:", error));



  // ===========================================
  //  SISTEMA DE ALERTAS PROFESIONAL
  // ===========================================

  function showAlert(message, type = "success") {
    // Eliminar alerta existente
    const existingAlert = document.querySelector(".alert");
    if (existingAlert) existingAlert.remove();

    // Crear alerta nueva
    const alert = document.createElement("div");
    alert.className = `alert alert--${type}`;
    alert.innerHTML = `
      <div class="alert__content">
        <p class="alert__message">${message}</p>
      </div>
    `;

    document.body.appendChild(alert);

    // Animación de entrada
    setTimeout(() => alert.classList.add("alert--show"), 20);

    // Desaparecer
    setTimeout(() => {
      alert.classList.remove("alert--show");
      setTimeout(() => alert.remove(), 300);
    }, 1500);
  }

});

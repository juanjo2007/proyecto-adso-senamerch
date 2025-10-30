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

        // === Esperar a que el contenido se cargue y agregar evento al botón ===
        const deliverBtn = orderDetailContainer.querySelector(".btn--primary");

        if (deliverBtn) {
          deliverBtn.addEventListener("click", function (e) {
            e.preventDefault();
            showAlert("Pedido entregado, ¡felicidades!", "success");

            // Redirección opcional después del mensaje
            setTimeout(() => {
              window.location.href = "store_orders_view.html";
            }, 1500); // tiempo reducido a 1.5s
          });
        }
      })
      .catch((error) => console.error("Error:", error));
  }

  // === FUNCIÓN ALERTA ===
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

    setTimeout(() => alert.classList.add("show"), 50);

    setTimeout(() => {
      alert.classList.remove("show");
      setTimeout(() => alert.remove(), 300);
    }, 1500); // duración total de la alerta
  }
});

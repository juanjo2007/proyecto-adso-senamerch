document.addEventListener('DOMContentLoaded', function () {
  const container = document.querySelector('.managed-orders-container');

  if (!container) {
    console.warn("No se encontró '.managed-orders-container' en el HTML.");
    return;
  }

  // ============================================================
  // Cargar componente HTML
  // ============================================================
  fetch('/frontend/public/views/components/managed_orders.html')
    .then((response) => response.text())
    .then((data) => {
      container.innerHTML = data;

      // ============================================================
      // Exportar PDF
      // ============================================================
      const exportBtn = container.querySelector(".order-detail__export");
      if (exportBtn) {
        exportBtn.addEventListener("click", function (e) {
          e.preventDefault();

          const element = document.querySelector(".order-detail");

          const script = document.createElement("script");
          script.src = "https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js";

          script.onload = function () {
            html2pdf()
              .set({
                margin: 10,
                filename: "detalle_pedido.pdf",
                image: { type: "jpeg", quality: 0.98 },
                html2canvas: { scale: 2 },
                jsPDF: { unit: "mm", format: "a4", orientation: "portrait" }
              })
              .from(element)
              .save();
          };

          document.body.appendChild(script);
        });
      }

      // ============================================================
      // CANCELAR PEDIDO — CON MODAL
      // ============================================================
      const cancelBtn = container.querySelector(".order-detail__suspend");
      const modal = container.querySelector(".modal-confirm");
      const modalCancel = container.querySelector(".modal-confirm__cancel");
      const modalConfirm = container.querySelector(".modal-confirm__confirm");

      if (!cancelBtn || !modal) return;

      // --- 1. Abrir modal ---
      cancelBtn.addEventListener("click", function (e) {
        e.preventDefault();
        modal.classList.add("modal-confirm--show"); // mostrar modal
      });

      // --- 2. Cerrar modal (botón NO) ---
      modalCancel.addEventListener("click", function () {
        modal.classList.remove("modal-confirm--show");
      });

      // --- 3. CONFIRMAR cancelación del pedido ---
      modalConfirm.addEventListener("click", function () {

        modal.classList.remove("modal-confirm--show");

        // ALERTA GLOBAL
        let alertContainer = document.querySelector(".alert");
        if (!alertContainer) {
          alertContainer = document.createElement("div");
          alertContainer.classList.add("alert");
          document.body.appendChild(alertContainer);
        }

        alertContainer.className = "alert alert--error alert--show";
        alertContainer.innerHTML = `
          <div class="alert__content">
            <p class="alert__message">
              Pedido cancelado correctamente.
            </p>
          </div>
        `;

        // Deshabilitar botón y cambiar texto
        cancelBtn.classList.add("btn--disabled");
        cancelBtn.textContent = "Pedido cancelado";

        setTimeout(() => {
          alertContainer.classList.remove("alert--show");
        }, 2000);
      });
    })
    .catch((error) =>
      console.error("Error cargando componente de pedidos:", error)
    );
});

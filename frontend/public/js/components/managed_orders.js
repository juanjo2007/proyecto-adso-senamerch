document.addEventListener("DOMContentLoaded", function () {
  const container = document.querySelector(".managed-orders-container");

  if (container) {
    fetch("/frontend/public/views/components/managed_orders.html")
      .then((response) => response.text())
      .then((data) => {
        container.innerHTML = data;

        // === Botón: Exportar información en PDF ===
        const exportBtn = container.querySelector(".order-detail__export");
        if (exportBtn) {
          exportBtn.addEventListener("click", function (e) {
            e.preventDefault();

            const element = document.querySelector(".order-detail");

            // Cargar html2pdf dinámicamente
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

        // === Botón: Cancelar pedido ===
        const cancelBtn = container.querySelector(".order-detail__suspend");
        if (cancelBtn) {
          cancelBtn.addEventListener("click", function (e) {
            e.preventDefault();

            // Crear o reutilizar alerta global
            let alertContainer = document.querySelector(".alert");
            if (!alertContainer) {
              alertContainer = document.createElement("div");
              alertContainer.classList.add("alert");
              document.body.appendChild(alertContainer);
            }

            // Mostrar alerta
            alertContainer.className = "alert alert--error alert--show";
            alertContainer.innerHTML = `
              <div class="alert__content">
                <p class="alert__message">Pedido cancelado correctamente</p>
              </div>
            `;

            setTimeout(() => {
              alertContainer.classList.remove("alert--show");
              window.location.href = "managed_orders_view.html";
            }, 2000);
          });
        }
      })
      .catch((error) => console.error("Error cargando componente de pedidos:", error));
  } else {
    console.warn("No se encontró '.managed-orders-container' en el HTML.");
  }
});

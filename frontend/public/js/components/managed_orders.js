document.addEventListener("DOMContentLoaded", function () {
  const container = document.querySelector(".managed-orders-container");

  if (container) {
    fetch("/frontend/public/views/components/managed_orders.html")
      .then((response) => response.text())
      .then((data) => {
        container.innerHTML = data;

        // === Función de descarga en PDF ===
        const exportBtn = container.querySelector(".order-detail__gestor");
        if (exportBtn) {
          exportBtn.addEventListener("click", function (e) {
            e.preventDefault();
            const element = document.querySelector(".order-detail");

            // Cargar html2pdf dinámicamente
            const script = document.createElement("script");
            script.src = "https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js";
            script.onload = function () {
              html2pdf().from(element).save("detalle_pedido.pdf");
            };
            document.body.appendChild(script);
          });
        }
      })
      .catch((error) => console.error("Error cargando contacto:", error));
  }
});

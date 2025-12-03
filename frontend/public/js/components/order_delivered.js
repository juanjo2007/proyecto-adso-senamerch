document.addEventListener("DOMContentLoaded", function () {
  const orderDeliveredContainer = document.querySelector(".order_delivered_container");

  if (orderDeliveredContainer) {
    fetch("/frontend/public/views/components/order_delivered.html")
      .then((response) => {
        if (!response.ok) throw new Error("Error al cargar order_delivered.html");
        return response.text();
      })
      .then((data) => {
        orderDeliveredContainer.innerHTML = data;

        // === Botón: Descargar PDF ===
        const downloadBtn = orderDeliveredContainer.querySelector(".order_delivered__download");
        if (downloadBtn) {
          downloadBtn.addEventListener("click", function (e) {
            e.preventDefault();

            const element = document.querySelector(".order_delivered");

            // Cargar html2pdf dinámicamente
            const script = document.createElement("script");
            script.src =
              "https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js";
            script.onload = function () {
              html2pdf()
                .set({
                  margin: 10,
                  filename: "detalle_compra.pdf",
                  image: { type: "jpeg", quality: 0.98 },
                  html2canvas: { scale: 2 },
                  jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
                })
                .from(element)
                .save();
            };
            document.body.appendChild(script);
          });
        }

        // === Botón: Ir al inicio (login.html) ===
        const homeBtn = orderDeliveredContainer.querySelector(".order_delivered__index");
        if (homeBtn) {
          homeBtn.addEventListener("click", function (e) {
            e.preventDefault();
            window.location.href = "client_view.html";
          });
        }
      })
      .catch((error) =>
        console.error("Error al cargar sale_details.html:", error)
      );
  } else {
    console.warn("No se encontró '.order_delivered_container' en el HTML.");
  }
});
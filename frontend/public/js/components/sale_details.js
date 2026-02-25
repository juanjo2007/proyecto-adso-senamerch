document.addEventListener("DOMContentLoaded", function () {
  const saleDetailsContainer = document.querySelector(".sale-details-container");

  if (saleDetailsContainer) {
    fetch("/frontend/public/views/components/sale_details.html")
      .then((response) => {
        if (!response.ok) throw new Error("Error al cargar sale_details.html");
        return response.text();
      })
      .then((data) => {
        saleDetailsContainer.innerHTML = data;

        // === Descargar PDF ===
        const downloadBtn = saleDetailsContainer.querySelector(".sale-details__download");
        if (downloadBtn) {
          downloadBtn.addEventListener("click", function (e) {
            e.preventDefault();

            const element = document.querySelector(".sale-details");

            const script = document.createElement("script");
            script.src = "https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js";

            script.onload = function () {
              html2pdf()
                .set({
                  margin: 10,
                  filename: "detalle_compra.pdf",
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

        // === Ir al inicio ===
        const homeBtn = saleDetailsContainer.querySelector(".sale-details__index");
        if (homeBtn) {
          homeBtn.addEventListener("click", () => {
            window.location.href = "client_view.html";
          });
        }
      })
      .catch((error) => console.error("Error:", error));
  }
});

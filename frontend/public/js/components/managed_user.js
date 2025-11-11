document.addEventListener("DOMContentLoaded", function () {
  const container = document.querySelector(".managed-user-container");

  if (container) {
    fetch("/frontend/public/views/components/managed_user.html")
      .then((response) => response.text())
      .then((data) => {
        container.innerHTML = data;
      })
      .catch((error) => console.error("Error cargando contacto:", error));
  }

  // >>> Función para exportar a PDF
  document.addEventListener("click", function (event) {
    const exportBtn = event.target.closest(".store-detail__gestor");
    if (exportBtn) {
      event.preventDefault();

      // Importar jsPDF dinámicamente desde CDN
      const script = document.createElement("script");
      script.src =
        "https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js";
      script.onload = () => {
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF({
          orientation: "p",
          unit: "mm",
          format: "a4",
        });

        const content = document.querySelector(".user-detail");

        // Usar html2canvas para capturar el contenido antes del PDF
        const html2canvasScript = document.createElement("script");
        html2canvasScript.src =
          "https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js";
        html2canvasScript.onload = () => {
          html2canvas(content, { scale: 2 }).then((canvas) => {
            const imgData = canvas.toDataURL("image/png");
            const pdfWidth = doc.internal.pageSize.getWidth();
            const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
            doc.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
            doc.save("usuario_detalle.pdf");
          });
        };

        document.body.appendChild(html2canvasScript);
      };

      document.body.appendChild(script);
    }
  });
});

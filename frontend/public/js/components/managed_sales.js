document.addEventListener("DOMContentLoaded", function () {
  const container = document.querySelector(".managed-sales-container");

  if (container) {
    fetch("/frontend/public/views/components/managed_sales.html")
      .then((response) => response.text())
      .then((data) => {
        container.innerHTML = data;
        attachExportEvent(); // 👈 Ejecuta la función del PDF después de cargar
      })
      .catch((error) => console.error("Error cargando contacto:", error));
  }

  // >>> Función para exportar PDF
  function attachExportEvent() {
    const exportBtn = document.querySelector(".sale-detail__gestor");

    if (exportBtn) {
      exportBtn.addEventListener("click", async (event) => {
        event.preventDefault();

        // Cargar librerías solo una vez
        if (!window.html2canvas || !window.jspdf) {
          await loadScripts();
        }

        const { jsPDF } = window.jspdf;
        const content = document.querySelector(".sale-detail");

        html2canvas(content, { scale: 2 }).then((canvas) => {
          const imgData = canvas.toDataURL("image/png");
          const pdf = new jsPDF("p", "mm", "a4");
          const imgWidth = 190;
          const pageHeight = 295;
          const imgHeight = (canvas.height * imgWidth) / canvas.width;

          let heightLeft = imgHeight;
          let position = 10;

          pdf.addImage(imgData, "PNG", 10, position, imgWidth, imgHeight);
          heightLeft -= pageHeight;

          while (heightLeft >= 0) {
            position = heightLeft - imgHeight;
            pdf.addPage();
            pdf.addImage(imgData, "PNG", 10, position, imgWidth, imgHeight);
            heightLeft -= pageHeight;
          }

          pdf.save("detalle_venta.pdf");
        });
      });
    }
  }

  // >>> Cargar scripts externos (solo una vez)
  async function loadScripts() {
    const html2canvasScript = document.createElement("script");
    html2canvasScript.src = "https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js";

    const jsPDFScript = document.createElement("script");
    jsPDFScript.src = "https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js";

    document.body.appendChild(html2canvasScript);
    await new Promise((res) => (html2canvasScript.onload = res));
    document.body.appendChild(jsPDFScript);
    await new Promise((res) => (jsPDFScript.onload = res));
  }
});

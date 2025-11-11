document.addEventListener("DOMContentLoaded", function () {
  const container = document.querySelector(".managed-product-container");

  if (container) {
    fetch("/frontend/public/views/components/managed_product.html")
      .then((response) => response.text())
      .then((data) => {
        container.innerHTML = data;
      })
      .catch((error) => console.error("Error cargando contacto:", error));
  }

  // === Función de exportar PDF ===
  document.addEventListener("click", function (e) {
    if (e.target.closest(".product-detail__gestor")) {
      e.preventDefault();

      // Selecciona el contenido principal del producto
      const element = document.querySelector(".product-detail");
      if (element) {
        import("https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js")
          .then(() => {
            html2pdf()
              .set({
                margin: 0.5,
                filename: "detalle_producto.pdf",
                image: { type: "jpeg", quality: 0.98 },
                html2canvas: { scale: 2 },
                jsPDF: { unit: "in", format: "letter", orientation: "portrait" }
              })
              .from(element)
              .save();
          })
          .catch((error) => console.error("Error al generar el PDF:", error));
      }
    }
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const container = document.querySelector(".managed-sales-container");
  if (!container) {
    console.warn("No se encontró '.managed-sales-container' en el HTML.");
    return;
  }

  // ================================
  // Cargar componente HTML
  // ================================
  fetch("/frontend/public/views/components/managed_sales.html")
    .then((response) => response.text())
    .then((html) => {
      container.innerHTML = html;
      initSaleDetailEvents(container);
    })
    .catch((err) =>
      console.error("Error cargando componente de ventas:", err)
    );
});


// ======================================================================
// Inicializar TODOS los eventos del componente
// ======================================================================
function initSaleDetailEvents(container) {
  setupPDFExport(container);
  setupSuspendSale(container);
}



// ======================================================================
// 1) Exportar PDF
// ======================================================================
function setupPDFExport(container) {
  const exportBtn = container.querySelector(".sale-detail__export");
  if (!exportBtn) return;

  exportBtn.addEventListener("click", (e) => {
    e.preventDefault();

    const element = document.querySelector(".sale-detail");
    if (!element) {
      console.error("No se encontró '.sale-detail' para exportar PDF.");
      return;
    }

    loadHTML2PDF(() => {
      html2pdf()
        .set({
          margin: 10,
          filename: "detalle_venta.pdf",
          image: { type: "jpeg", quality: 0.98 },
          html2canvas: { scale: 2 },
          jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
        })
        .from(element)
        .save();
    });
  });
}



// Cargar html2pdf dinámicamente
function loadHTML2PDF(callback) {
  if (window.html2pdf) {
    callback();
    return;
  }

  const script = document.createElement("script");
  script.src =
    "https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js";
  script.onload = callback;

  document.body.appendChild(script);
}



// ======================================================================
// 2) Suspender usuario
// ======================================================================
function setupSuspendSale(container) {
  const suspendBtn = container.querySelector(".sale-detail__suspend");
  if (!suspendBtn) return;

  suspendBtn.addEventListener("click", (e) => {
    e.preventDefault();

    showAlert("Usuario Deshabilitado correctamente", "error");

    setTimeout(() => {
      window.location.href = "managed_products_view.html";
    }, 2000);
  });
}



// ======================================================================
// Sistema global de alertas
// ======================================================================
function showAlert(message, type = "info") {
  let alertBox = document.querySelector(".alert");

  if (!alertBox) {
    alertBox = document.createElement("div");
    alertBox.classList.add("alert");
    document.body.appendChild(alertBox);
  }

  alertBox.className = `alert alert--${type} alert--show`;
  alertBox.innerHTML = `
    <div class="alert__content">
      <p class="alert__message">${message}</p>
    </div>
  `;
}

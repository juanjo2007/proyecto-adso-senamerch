// ================== SALES COMPONENT ================== 
document.addEventListener('DOMContentLoaded', function () {
  const salesContainer = document.querySelector('.sales-doc-container');

  if (salesContainer) {
    fetch("/frontend/public/views/components/sales_doc.html")
      .then(response => {
        if (!response.ok) throw new Error("Error al cargar sales_doc.html");
        return response.text();
      })
      .then(data => {
        salesContainer.innerHTML = data;

        // ================== Evento para botones "Gestionar" ==================
        const manageButtons = salesContainer.querySelectorAll('.sales-admin__gestor');

        manageButtons.forEach(button => {
          button.addEventListener('click', () => {
            window.location.href = "view_managed_sales.html";
          });
        });
      })
      .catch(error => console.error("Error cargando el componente sales:", error));
  } else {
    console.warn("No se encontró '.sales-doc-container' en el HTML.");
  }
});
// ==============================
//   Funciones internas
// ==============================
function initSalesDocFeatures() {
  const searchInput = document.querySelector(".sales-doc__search-input");
  const rows = document.querySelectorAll(".sales-doc__row:not(.sales-doc__row--header)");

  // 🔍 Filtro de búsqueda
  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      const term = e.target.value.toLowerCase();

      rows.forEach((row) => {
        const cells = row.querySelectorAll(".sales-doc__cell");
        const match = Array.from(cells).some(cell =>
          cell.textContent.toLowerCase().includes(term)
        );
        row.style.display = match ? "grid" : "none";
      });
    });
  }

  // ⚡ Acción "Deshabilitar"
  document.querySelectorAll(".sales-doc__btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const doc = btn.parentElement.querySelector(".sales-doc__cell").textContent;
      alert(`Documento afectado: ${doc}`);
    });
  });
}

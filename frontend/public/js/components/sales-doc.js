// ==============================
//   Componente Documento de Venta (BEM)
// ==============================

document.addEventListener("DOMContentLoaded", () => {
const searchInput = document.querySelector(".sales-doc__search-input");
const rows = document.querySelectorAll(".sales-doc__row:not(.sales-doc__row--header)");

  // 🔍 Filtro de búsqueda
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

  // ⚡ Acción "Deshabilitar"
document.querySelectorAll(".sales-doc__btn").forEach((btn) => {
    btn.addEventListener("click", () => {
        alert(`Documento afectado: ${btn.parentElement.querySelector(".sales-doc__cell").textContent}`);
    });
});
});

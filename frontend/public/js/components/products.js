// ==============================
//   Componente Productos (BEM)
// ==============================

document.addEventListener("DOMContentLoaded", () => {
const searchInput = document.querySelector(".products__search-input");
const rows = document.querySelectorAll(".products__row:not(.products__row--header)");

  // 🔍 Filtro de búsqueda
searchInput.addEventListener("input", (e) => {
    const term = e.target.value.toLowerCase();

    rows.forEach((row) => {
        const cells = row.querySelectorAll(".products__cell");
        const match = Array.from(cells).some(cell =>
        cell.textContent.toLowerCase().includes(term)
        );
        row.style.display = match ? "grid" : "none";
    });
});

  // ⚡ Acción "Deshabilitar"
document.querySelectorAll(".products__btn").forEach((btn) => {
    btn.addEventListener("click", () => {
        alert(`Producto afectado: ${btn.parentElement.querySelector(".products__cell").textContent}`);
    });
  });
});

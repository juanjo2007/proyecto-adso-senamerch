// ==============================
//   Componente Tiendas (BEM)
// ==============================

// 🔍 Filtro de búsqueda por nombre de tienda
document.addEventListener("DOMContentLoaded", () => {
const searchInput = document.querySelector(".stores__search-input");
const rows = document.querySelectorAll(".stores__row:not(.stores__row--header)");

searchInput.addEventListener("input", (e) => {
    const term = e.target.value.toLowerCase();

    rows.forEach((row) => {
        const cells = row.querySelectorAll(".stores__cell");
        const match = Array.from(cells).some(cell =>
        cell.textContent.toLowerCase().includes(term)
        );
        row.style.display = match ? "grid" : "none";
    });
});

  // ⚡ Acción al dar click en "Deshabilitar"
document.querySelectorAll(".stores__btn").forEach((btn) => {
    btn.addEventListener("click", () => {
        alert(`Acción ejecutada en: ${btn.parentElement.querySelector(".stores__cell").textContent}`);
    });
  });
});

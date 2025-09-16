// ==============================
// Componente Pedidos
// ==============================

document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.querySelector(".orders__search-input");
  const rows = document.querySelectorAll(".orders__row:not(.orders__row--header)");

  // 🔍 Filtro de búsqueda
  searchInput.addEventListener("input", () => {
    const searchTerm = searchInput.value.toLowerCase();

    rows.forEach(row => {
      const text = row.textContent.toLowerCase();
      row.style.display = text.includes(searchTerm) ? "grid" : "none";
    });
  });

  // 🚫 Acción de deshabilitar
  document.querySelectorAll(".orders__btn").forEach(btn => {
    btn.addEventListener("click", () => {
      btn.textContent = "Deshabilitado";
      btn.disabled = true;
      btn.style.backgroundColor = "#777";
    });
  });
});

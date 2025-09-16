// Filtrar la tabla al escribir en el buscador
document.addEventListener("DOMContentLoaded", () => {
const input = document.querySelector(".search__input");
const rows = document.querySelectorAll(".table__content tbody tr");

if (input) {
    input.addEventListener("keyup", () => {
        const value = input.value.toLowerCase();
        rows.forEach(row => {
        row.style.display = row.textContent.toLowerCase().includes(value) ? "" : "none";
        });
    });
  }
});

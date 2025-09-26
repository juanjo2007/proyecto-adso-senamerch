// ==============================
//   Componente Productos (BEM)
// ==============================

// Espera a que todo el DOM esté cargado antes de ejecutar el script
document.addEventListener("DOMContentLoaded", () => {

    // Selecciona el input de búsqueda de productos
    const searchInput = document.querySelector(".products__search-input");

    // Selecciona todas las filas de productos que NO sean el encabezado
    const rows = document.querySelectorAll(".products__row:not(.products__row--header)");

    // 🔍 Filtro de búsqueda: se ejecuta cada vez que el usuario escribe en el input
    searchInput.addEventListener("input", (e) => {
        // Obtiene el término de búsqueda en minúsculas para que la búsqueda no distinga mayúsculas
        const term = e.target.value.toLowerCase();

        // Recorre todas las filas de productos
        rows.forEach((row) => {
            // Selecciona todas las celdas de la fila
            const cells = row.querySelectorAll(".products__cell");

            // Verifica si alguna celda contiene el término de búsqueda
            const match = Array.from(cells).some(cell =>
                cell.textContent.toLowerCase().includes(term)
            );

            // Si coincide, muestra la fila; si no, la oculta
            row.style.display = match ? "grid" : "none";
        });
    });

    //  Acción "Deshabilitar": agrega un evento click a cada botón de producto
    document.querySelectorAll(".products__btn").forEach((btn) => {
        btn.addEventListener("click", () => {
            // Muestra un alert con el nombre del producto afectado (el texto de la primera celda)
            alert(`Producto afectado: ${btn.parentElement.querySelector(".products__cell").textContent}`);
        });
    });
});

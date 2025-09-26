// Espera a que todo el contenido del DOM esté cargado antes de ejecutar el script
document.addEventListener('DOMContentLoaded', () => {

    // Selecciona todos los botones de exportación en el historial de ventas
    const exportButtons = document.querySelectorAll('.sales-history__export-button');

    // Recorre cada botón encontrado
    exportButtons.forEach(button => {
        // Agrega un evento click a cada botón
        button.addEventListener('click', () => {
            
            // Busca la fila de la tabla más cercana al botón que se hizo clic
            const row = button.closest('.sales-history__table-row');

            // Si se encontró la fila
            if (row) {
                // Obtiene el contenido de la primera columna (ID de venta)
                const ventaId = row.querySelector('.sales-history__table-data:nth-child(1)').textContent;

                // Obtiene el contenido de la segunda columna (fecha de la venta)
                const fecha = row.querySelector('.sales-history__table-data:nth-child(2)').textContent;

                // Obtiene el contenido de la cuarta columna (nombre del cliente)
                const cliente = row.querySelector('.sales-history__table-data:nth-child(4)').textContent;
                
                // Muestra en la consola los datos de la venta que se va a exportar
                console.log(`Exportando a PDF... Venta #: ${ventaId}, Fecha: ${fecha}, Cliente: ${cliente}`);

                // Muestra una alerta indicando qué venta se va a exportar a PDF
                alert(`Exportando la venta ${ventaId} de ${cliente} a PDF.`);
            }
        });
    });
});

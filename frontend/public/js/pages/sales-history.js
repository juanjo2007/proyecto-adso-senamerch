document.addEventListener('DOMContentLoaded', () => {
    const exportButtons = document.querySelectorAll('.sales-history__export-button');

    exportButtons.forEach(button => {
        button.addEventListener('click', () => {
            const row = button.closest('.sales-history__table-row');
            if (row) {
                const ventaId = row.querySelector('.sales-history__table-data:nth-child(1)').textContent;
                const fecha = row.querySelector('.sales-history__table-data:nth-child(2)').textContent;
                const cliente = row.querySelector('.sales-history__table-data:nth-child(4)').textContent;
                
                console.log(`Exportando a PDF... Venta #: ${ventaId}, Fecha: ${fecha}, Cliente: ${cliente}`);
                alert(`Exportando la venta ${ventaId} de ${cliente} a PDF.`);
            }
        });
    });
});
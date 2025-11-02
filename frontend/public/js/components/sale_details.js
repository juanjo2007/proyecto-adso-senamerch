document.addEventListener('DOMContentLoaded', function () {
  const saleDetailsContainer = document.querySelector('.sale-details-container');

  if (saleDetailsContainer) {
    fetch("/frontend/public/views/components/sale_details.html")
      .then(response => {
        if (!response.ok) throw new Error("Error al cargar sale_details.html");
        return response.text();
      })
      .then(data => {
        saleDetailsContainer.innerHTML = data;

        const downloadBtn = saleDetailsContainer.querySelector('.sale-details__download');
        if (downloadBtn) {
          downloadBtn.addEventListener('click', () => {
            const element = saleDetailsContainer.querySelector('.sale-details');
            html2pdf().from(element).save('detalle_venta.pdf');
          });
        }
      })
      .catch(error => console.error("Error al cargar sale-details.html:", error));
  }
});

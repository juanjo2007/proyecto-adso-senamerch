document.addEventListener('DOMContentLoaded', function () {
  const saleDetailsContainer = document.querySelector('.sale-details-container');

  if (saleDetailsContainer) {
    fetch("/frontend/public/views/components/sale-details.html")
      .then(response => {
        if (!response.ok) throw new Error("Error al cargar sale-details.html");
        return response.text();
      })
      .then(data => {
        saleDetailsContainer.innerHTML = data;
      })
      .catch(error => console.error("Error:", error));
  }
});

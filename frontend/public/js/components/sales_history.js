// ================== SALES HISTORY COMPONENT ==================
document.addEventListener('DOMContentLoaded', function () {
  const salesHistoryContainer = document.querySelector('.sales-history-container');

  if (salesHistoryContainer) {
    fetch("/frontend/public/views/components/sales_history.html")
      .then(response => {
        if (!response.ok) throw new Error("Error al cargar sales_history.html");
        return response.text();
      })
      .then(data => {
        salesHistoryContainer.innerHTML = data;
      })
      .catch(error => console.error("Error cargando el componente Sales History:", error));
  } else {
    console.warn("No se encontró '.sales-history-container' en el HTML.");
  }
});

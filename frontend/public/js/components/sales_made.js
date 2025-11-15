// /frontend/public/js/components/purchases_user.js
document.addEventListener('DOMContentLoaded', function () {
  const purchasesContainer = document.querySelector('.sales-made-container');

  if (purchasesContainer) {
    fetch("/frontend/public/views/components/sales_made.html")
      .then(response => {
        if (!response.ok) throw new Error("Error al cargar sales_made.html");
        return response.text();
      })
      .then(data => {
        purchasesContainer.innerHTML = data;
      })
      .catch(error => console.error("Error cargando sales_made:", error));
  } else {
    console.warn("No se encontró '.sales-made-container' en el HTML.");
  }
});

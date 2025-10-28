// /frontend/public/js/components/purchases_user.js
document.addEventListener('DOMContentLoaded', function () {
  const purchasesContainer = document.querySelector('.purchases-container');

  if (purchasesContainer) {
    fetch("/frontend/public/views/components/purchases.html")
      .then(response => {
        if (!response.ok) throw new Error("Error al cargar purchases.html");
        return response.text();
      })
      .then(data => {
        purchasesContainer.innerHTML = data;
      })
      .catch(error => console.error("Error cargando Purchases User:", error));
  } else {
    console.warn("No se encontró '.purchases-container' en el HTML.");
  }
});

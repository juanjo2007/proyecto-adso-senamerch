document.addEventListener('DOMContentLoaded', function () {
  const descriptionContainer = document.querySelector('.description-seller-container');

  if (descriptionContainer) {
    fetch("/frontend/public/views/components/description_product_seller.html")
      .then(response => {
        if (!response.ok) throw new Error("Error al cargar el componente del producto");
        return response.text();
      })
      .then(data => {
        descriptionContainer.innerHTML = data;

        // ===============================
        // 🔁 BOTÓN HABILITAR / DESHABILITAR
        // ===============================
        const toggleButton = descriptionContainer.querySelector('.btn--primary');
        const statusText = descriptionContainer.querySelector('.product-admin-description__status--active');

        if (toggleButton && statusText) {
          toggleButton.addEventListener('click', (event) => {
            event.preventDefault();
            const isActive = statusText.textContent.trim() === "Habilitado";

            if (isActive) {
              statusText.textContent = "Deshabilitado";
              statusText.classList.remove('product-admin-description__status--active');
              statusText.classList.add('product-admin-description__status--inactive');
              toggleButton.textContent = "Habilitar producto";
            } else {
              statusText.textContent = "Habilitado";
              statusText.classList.remove('product-admin-description__status--inactive');
              statusText.classList.add('product-admin-description__status--active');
              toggleButton.textContent = "Deshabilitar producto";
            }
          });
        }

        // ===============================
        // ⭐ CALIFICACIÓN PROMEDIO (solo lectura)
        // ===============================
        const averageRating = 4.5; // Puedes traerlo desde la BD en el futuro
        const stars = descriptionContainer.querySelectorAll('.product-admin-description__rating-stars .star');

        stars.forEach(star => {
          const value = parseFloat(star.dataset.value);
          if (value <= Math.floor(averageRating)) {
            star.classList.add('active');
          } else if (value - 1 < averageRating && averageRating < value) {
            star.classList.add('active'); // media estrella si deseas
          }
        });
      })
      .catch(error => console.error("Error cargando el componente Description:", error));
  }
});

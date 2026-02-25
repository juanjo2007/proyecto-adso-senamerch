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

        // =======================================
        // 🔁 BOTÓN HABILITAR / DESHABILITAR
        // =======================================
        const toggleBtn = descriptionContainer.querySelector('.product-admin-description__suspend');
        const stateText = descriptionContainer.querySelector('.product-admin-description__status');

        if (toggleBtn && stateText) {
          toggleBtn.addEventListener('click', (event) => {
            event.preventDefault();

            const isDisabled = stateText.textContent.trim() === "Deshabilitado";

            if (isDisabled) {
              stateText.textContent = "Habilitado";

              toggleBtn.classList.remove('btn--success');
              toggleBtn.classList.add('btn--warning');

              toggleBtn.innerHTML = `
                Deshabilitar producto
                <img src="/frontend/public/assets/icons/off.svg" class="btn__icon" />
              `;
            } else {
              stateText.textContent = "Deshabilitado";

              toggleBtn.classList.remove('btn--warning');
              toggleBtn.classList.add('btn--success');

              toggleBtn.innerHTML = `
                Habilitar producto
                <img src="/frontend/public/assets/icons/mobiledata.svg" class="btn__icon" />
              `;
            }
          });
        }

        // =======================================
        // 🔄 GALERÍA – MINIATURAS → IMAGEN PRINCIPAL
        // =======================================
        const mainImage = descriptionContainer.querySelector('.product-admin-description__image--main');
        const thumbnails = descriptionContainer.querySelectorAll('.product-admin-description__thumbnail');

        thumbnails.forEach((thumb) => {
          thumb.addEventListener('click', () => {
            mainImage.src = thumb.src;

            thumbnails.forEach(t =>
              t.classList.remove('product-admin-description__thumbnail--active')
            );

            thumb.classList.add('product-admin-description__thumbnail--active');
          });
        });

        // =======================================
        // ✏️ BOTÓN EDITAR PRODUCTO — REDIRECCIÓN
        // =======================================
        const editButton = descriptionContainer.querySelector('.seller-comments__edit');

        if (editButton) {
          editButton.addEventListener('click', (event) => {
            event.preventDefault();
            window.location.href = "view_edit_post.html";
          });
        }

        // =======================================
        // ⭐ CALIFICACIÓN PROMEDIO (solo lectura)
        // =======================================
        const averageRating = 4.5;
        const stars = descriptionContainer.querySelectorAll('.product-admin-description__rating-stars .star');

        stars.forEach(star => {
          const value = parseFloat(star.dataset.value);
          if (value <= Math.floor(averageRating)) {
            star.classList.add('active');
          } else if (value - 1 < averageRating && averageRating < value) {
            star.classList.add('active');
          }
        });

      })
      .catch(error => console.error("Error cargando el componente Description:", error));
  }
});

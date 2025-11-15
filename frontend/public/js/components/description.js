document.addEventListener('DOMContentLoaded', function () {
  const descriptionContainer = document.querySelector('.description-container');

  if (!descriptionContainer) return;

  // >>> Cargar HTML del componente
  fetch("/frontend/public/views/components/description.html")
    .then(response => {
      if (!response.ok) throw new Error("Error al cargar description.html");
      return response.text();
    })
    .then(data => {
      descriptionContainer.innerHTML = data;

      // === 🖼 Cambiar imagen principal al hacer clic en thumbnails ===
      const mainImage = descriptionContainer.querySelector('.product-description__image--main');
      const thumbnails = descriptionContainer.querySelectorAll('.product-description__thumbnail');

      thumbnails.forEach(thumbnail => {
        thumbnail.addEventListener('click', () => {
          const tempSrc = mainImage.src;
          mainImage.src = thumbnail.src;
          thumbnail.src = tempSrc;
        });
      });

      // === ⭐ Sistema de calificación con estrellas ===
      const stars = descriptionContainer.querySelectorAll('.rating__stars input');
      const starLabels = descriptionContainer.querySelectorAll('.rating__stars label');

      const savedRating = localStorage.getItem('userRating');
      if (savedRating) {
        stars.forEach(star => { if (star.value === savedRating) star.checked = true; });
        highlightStars(savedRating);
      }

      function highlightStars(value) {
        starLabels.forEach(label => {
          const starValue = label.querySelector('input').value;
          const starSpan = label.querySelector('span');
          if (starValue <= value) starSpan.classList.add('active-star');
          else starSpan.classList.remove('active-star');
        });
      }

      stars.forEach(star => {
        star.addEventListener('change', () => {
          highlightStars(star.value);
          localStorage.setItem('userRating', star.value);
        });
      });

      // === 🛒 Botón COMPRAR ===
      const buyButton = descriptionContainer.querySelector('.details__button');
      if (buyButton) {
        buyButton.addEventListener('click', e => {
          e.preventDefault();
          window.location.href = 'quantity_container.html';
        });
      }

      // === 💬 Enviar comentarios dinámicos ===
      const commentForm = descriptionContainer.querySelector('.comments__form');
      const commentTextarea = descriptionContainer.querySelector('.comments__textarea');
      const commentList = descriptionContainer.querySelector('.comments__list');
      const commentButton = descriptionContainer.querySelector('.comments__button');

      if (commentButton && commentForm && commentTextarea && commentList) {
        commentButton.addEventListener('click', e => {
          e.preventDefault();
          const commentText = commentTextarea.value.trim();
          if (!commentText) return showAlert("Por favor escribe un comentario antes de enviarlo.", "error");

          const newComment = document.createElement('div');
          newComment.classList.add('comments__item');
          newComment.innerHTML = `
            <p class="comments__user">Tú <span class="comments__date">• Ahora mismo</span></p>
            <p class="comments__text">${commentText}</p>
          `;

          commentList.prepend(newComment);
          commentTextarea.value = "";
          showAlert("Comentario enviado correctamente.", "success");
        });
      }

      // === 🔔 Función para mostrar alertas simples ===
      function showAlert(message, type = "success") {
        let alertContainer = document.querySelector(".alert");
        if (!alertContainer) {
          alertContainer = document.createElement("div");
          alertContainer.classList.add("alert");
          document.body.appendChild(alertContainer);
        }

        alertContainer.className = "alert";
        alertContainer.classList.add(type === "error" ? "alert--error" : "alert--success");
        alertContainer.innerHTML = `<div class="alert__content"><p class="alert__message">${message}</p></div>`;
        alertContainer.classList.add("alert--show");

        setTimeout(() => alertContainer.classList.remove("alert--show"), 2000);
      }
    })
    .catch(error => console.error("Error cargando el componente Description:", error));
});

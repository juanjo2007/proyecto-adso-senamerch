document.addEventListener('DOMContentLoaded', function () {
  const descriptionContainer = document.querySelector('.description-container');

  if (descriptionContainer) {
    fetch("/frontend/public/views/components/description.html")
      .then(response => {
        if (!response.ok) throw new Error("Error al cargar description.html");
        return response.text();
      })
      .then(data => {
        descriptionContainer.innerHTML = data;

        // === ⭐ Sistema de calificación con estrellas ===
        const stars = descriptionContainer.querySelectorAll('.product-description__rating-stars input');
        const labels = descriptionContainer.querySelectorAll('.product-description__rating-stars label');

        // Recuperar calificación previa (si existe en localStorage)
        const savedRating = localStorage.getItem('userRating');
        if (savedRating) {
          stars.forEach(star => {
            if (star.value === savedRating) star.checked = true;
          });
          highlightStars(savedRating);
        }

        // Función para iluminar estrellas
        function highlightStars(value) {
          labels.forEach(label => {
            const starValue = label.querySelector('input').value;
            if (starValue <= value) {
              label.querySelector('span').classList.add('active-star');
            } else {
              label.querySelector('span').classList.remove('active-star');
            }
          });
        }

        // Evento cuando el usuario califica
        stars.forEach(star => {
          star.addEventListener('change', () => {
            const selectedValue = star.value;
            highlightStars(selectedValue);
            localStorage.setItem('userRating', selectedValue);
          });
        });

        // === 🛒 Botón COMPRAR → redirige a login.html ===
        const buyButton = descriptionContainer.querySelector('.product-description__button');
        if (buyButton) {
          buyButton.addEventListener('click', (e) => {
            e.preventDefault();
            window.location.href = 'quantity_container.html';
          });
        }

        // === 💬 Botón ENVIAR COMENTARIO ===
        const commentForm = descriptionContainer.querySelector('.product-comments__form');
        const commentTextarea = descriptionContainer.querySelector('.product-comments__textarea');
        const commentList = descriptionContainer.querySelector('.product-comments__list');
        const commentButton = descriptionContainer.querySelector('.product-comments__button');

        if (commentButton && commentForm && commentTextarea && commentList) {
          commentButton.addEventListener('click', (e) => {
            e.preventDefault();
            const commentText = commentTextarea.value.trim();

            if (commentText === "") {
              showAlert("Por favor escribe un comentario antes de enviarlo.", "error");
              return;
            }

            // Crear nuevo comentario dinámico
            const newComment = document.createElement('div');
            newComment.classList.add('product-comments__item');
            newComment.innerHTML = `
              <p class="product-comments__user">Tú <span>• Ahora mismo</span></p>
              <p class="product-comments__text">${commentText}</p>
            `;

            // Insertar comentario arriba de los anteriores
            commentList.prepend(newComment);

            // Limpiar textarea
            commentTextarea.value = "";

            // Mostrar alerta de éxito
            showAlert("Comentario enviado correctamente.", "success");
          });
        }

        // === 🔔 Función reutilizable para mostrar alertas ===
        function showAlert(message, type = "success") {
          let alertContainer = document.querySelector(".alert");
          if (!alertContainer) {
            alertContainer = document.createElement("div");
            alertContainer.classList.add("alert");
            document.body.appendChild(alertContainer);
          }

          alertContainer.className = "alert";
          alertContainer.classList.add(type === "error" ? "alert--error" : "alert--success");
          alertContainer.innerHTML = `
            <div class="alert__content">
              <p class="alert__message">${message}</p>
            </div>
          `;
          alertContainer.classList.add("alert--show");

          setTimeout(() => {
            alertContainer.classList.remove("alert--show");
          }, 2000);
        }
      })
      .catch(error => console.error("Error cargando el componente Description:", error));
  }
});

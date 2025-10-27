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

        // 🔥 Sistema de calificación con estrellas
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
            localStorage.setItem('userRating', selectedValue); // Guardar en localStorage
          });
        });
      })
      .catch(error => console.error("Error cargando el componente Description:", error));
  }
});

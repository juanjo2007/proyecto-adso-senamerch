// ================== POSTS COMPONENT ==================
document.addEventListener('DOMContentLoaded', () => {
  const postsContainer = document.querySelector('.posts-container');

  if (postsContainer) {
    fetch("/frontend/public/views/components/posts.html")
      .then(response => {
        if (!response.ok) throw new Error("Error al cargar posts.html");
        return response.text();
      })
      .then(data => {
        postsContainer.innerHTML = data;

        // Agregar eventos a los botones
        const buttons = postsContainer.querySelectorAll('.posts__btn');
        buttons.forEach(btn => {
          btn.addEventListener('click', () => {
            alert(`Acción ejecutada en la publicación #${btn.closest('tr').firstElementChild.textContent}`);
          });
        });
      })
      .catch(error => console.error("Error cargando el componente Posts:", error));
  } else {
    console.warn("No se encontró '.posts-container' en el HTML.");
  }
});

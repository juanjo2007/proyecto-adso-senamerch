// /frontend/public/js/components/search-bar.js
document.addEventListener('DOMContentLoaded', function () {
  const searchBarContainer = document.querySelector('.search-bar-container');

  if (searchBarContainer) {
    fetch("/frontend/public/views/components/search-bar.html")
      .then(response => {
        if (!response.ok) throw new Error("Error al cargar search-bar.html");
        return response.text();
      })
      .then(data => {
        searchBarContainer.innerHTML = data;
      })
      .catch(error => console.error("Error cargando Search Bar:", error));
  } else {
    console.warn("No se encontró '.search-bar-container' en seeker.html");
  }
});

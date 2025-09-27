document.addEventListener('DOMContentLoaded', function () {
  const heroContainer = document.querySelector('.hero__container');

  if (heroContainer) {
    fetch("/frontend/public/views/components/hero.html")
      .then(response => {
        if (!response.ok) throw new Error("Error al cargar hero.html");
        return response.text();
      })
      .then(data => {
        heroContainer.innerHTML = data;
      })
      .catch(error => console.error("Error:", error));
  }
});

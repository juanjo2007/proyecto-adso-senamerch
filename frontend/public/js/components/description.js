// /frontend/public/js/components/description.js
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
      })
      .catch(error => console.error("Error:", error));
  }
});

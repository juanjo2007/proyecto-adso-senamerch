// /frontend/public/js/components/card.js
document.addEventListener("DOMContentLoaded", () => {
  const container = document.querySelector(".card-container"); // donde se insertará la card

  if (container) {
    fetch("/frontend/public/views/components/card.html")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error al cargar el componente card");
        }
        return response.text();
      })
      .then((data) => {
        container.innerHTML = data;
      })
      .catch((error) => console.error("Error cargando el card:", error));
  }
});

document.addEventListener('DOMContentLoaded', function () {
  const optionContainer = document.querySelector('.option-container');

  if (optionContainer) {
    fetch("/frontend/public/views/components/option.html")
      .then(response => {
        if (!response.ok) throw new Error("Error al cargar option.html");
        return response.text();
      })
      .then(data => {
        optionContainer.innerHTML = data;
      })
      .catch(error => console.error("Error cargando el componente Option:", error));
  } else {
    console.warn("No se encontró '.option-container' en el HTML.");
  }
});

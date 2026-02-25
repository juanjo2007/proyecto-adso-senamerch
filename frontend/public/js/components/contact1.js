document.addEventListener("DOMContentLoaded", function () {
  const container = document.querySelector(".contact-pages");

  if (container) {
    fetch("/frontend/public/views/components/contact1.html")
      .then((response) => response.text())
      .then((data) => {
        container.innerHTML = data;
      })
      .catch((error) => console.error("Error cargando contacto:", error));
  }
});

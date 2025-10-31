document.addEventListener("DOMContentLoaded", function () {
  const container = document.querySelector(".managed-user-container");

  if (container) {
    fetch("/frontend/public/views/components/managed_user.html")
      .then((response) => response.text())
      .then((data) => {
        container.innerHTML = data;
      })
      .catch((error) => console.error("Error cargando contacto:", error));
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const navbarElement = document.querySelector(".navbar-container");

  // Verifica que el contenedor exista antes de continuar
  if (navbarElement) {
    fetch("/frontend/public/views/components/navbar.html")
      .then(response => {
        if (!response.ok) {
          throw new Error(`Error HTTP: ${response.status}`);
        }
        return response.text();
      })
      .then(data => {
        // Inserta el contenido del navbar en el contenedor
        navbarElement.innerHTML = data;

        // === Lógica para resaltar el enlace activo ===
        // Obtiene la ruta actual (ejemplo: "pago.html" o "index.html")
        const currentPage = window.location.pathname.split("/").pop() || "index.html";

        // Selecciona todos los enlaces del navbar
        const navLinks = navbarElement.querySelectorAll(".navbar__link");

        // Recorre cada enlace del navbar
        navLinks.forEach(link => {
          const linkHref = link.getAttribute("href");

          // Verifica si el href del enlace incluye el nombre de la página actual
          if (linkHref && linkHref.includes(currentPage)) {
            // Agrega la clase "active" al enlace actual
            link.classList.add("active");
          }
        });
      })
      .catch(error => console.error("Error cargando el navbar:", error));
  }
});

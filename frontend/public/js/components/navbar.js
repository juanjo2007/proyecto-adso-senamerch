// Esperar a que el documento cargue
document.addEventListener("DOMContentLoaded", () => {

  // Seleccionamos el botón que abre/cierra el menú
  const toggleBtn = document.querySelector(".nav-toggle");
  
  // Seleccionamos el menú
  const navMenu = document.querySelector(".nav-menu");

  // Cuando se haga click en el botón
  toggleBtn.addEventListener("click", () => {
    // Alterna la clase "active" en el menú
    navMenu.classList.toggle("active");
  });

});

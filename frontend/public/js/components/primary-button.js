// ====== PRIMARY BUTTON JS ======

// Esperamos a que cargue el DOM
document.addEventListener("DOMContentLoaded", () => {
  const buttons = document.querySelectorAll(".btn--primary");

  buttons.forEach(button => {
    button.addEventListener("click", () => {
      // Aquí decides la acción: agregar al carrito, mostrar alerta, etc.
      alert("✅ Producto agregado al carrito!");
    });
  });
});

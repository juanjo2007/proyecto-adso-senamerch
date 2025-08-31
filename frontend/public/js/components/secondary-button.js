// ====== SECONDARY BUTTON JS ======
document.addEventListener("DOMContentLoaded", () => {
  const secondaryButton = document.querySelector(".btn--secondary");

  secondaryButton.addEventListener("click", () => {
    // Acción al hacer clic en el botón secundario
    console.log("Botón secundario presionado 🟢");

    // Ejemplo de comportamiento: cancelar o cerrar
    alert("Acción del botón secundario ejecutada ⚡");
  });
});

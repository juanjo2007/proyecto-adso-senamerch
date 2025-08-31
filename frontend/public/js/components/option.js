// ====== OPTION BUTTON JS ======
document.addEventListener("DOMContentLoaded", () => {
  const optionButton = document.querySelector(".option-button");

  optionButton.addEventListener("click", () => {
    // Alternar el estado activo
    optionButton.classList.toggle("option-button--active");

    // Obtener el texto de la etiqueta
    const label = optionButton.querySelector(".option-button__label").textContent;

    if (optionButton.classList.contains("option-button--active")) {
      console.log(`Opción activada: ${label}`);
    } else {
      console.log(`Opción desactivada: ${label}`);
    }
  });
});

// ====== CARD PRODUCT JS ======

// Esperamos a que cargue el DOM
document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll(".product");

  cards.forEach(card => {
    // Efecto hover (ejemplo visual extra)
    card.addEventListener("mouseenter", () => {
      card.classList.add("product--active");
    });

    card.addEventListener("mouseleave", () => {
      card.classList.remove("product--active");
    });
  });
});

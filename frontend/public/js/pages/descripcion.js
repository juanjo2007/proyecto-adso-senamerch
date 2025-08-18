// ====== CARD PRODUCT JS ======

// Esperamos a que cargue el DOM
document.addEventListener("DOMContentLoaded", () => {
  // Seleccionamos todos los botones de compra
  const buyButtons = document.querySelectorAll(".card-product__button--buy");

  buyButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
      event.preventDefault();

      // Encontramos la card donde se hizo clic
      const card = button.closest(".card-product");

      // Obtenemos el nombre, precio y descripción del producto
      const title = card.querySelector(".card-product__title").textContent;
      const price = card.querySelector(".card-product__price").textContent;
      const description = card.querySelector(".card-product__description-text").textContent;
      const note = card.querySelector(".card-product__description-note").textContent;

      // Ejemplo: mostrar en consola (puedes cambiarlo por carrito, modal, etc.)
      console.log(`Producto agregado: ${title} - ${price}`);
      console.log(`Descripción: ${description}`);
      console.log(`Nota: ${note}`);

      // Feedback al usuario (alerta rápida)
      alert(`Has agregado "${title}" por ${price} al carrito 🛒`);
    });
  });
});

document.addEventListener('DOMContentLoaded', function () { 
  const cartContainer = document.querySelector('.shopping-car-container');

  if (cartContainer) {
    fetch("/frontend/public/views/components/shopping_cart.html")
      .then(response => {
        if (!response.ok) throw new Error("Error al cargar car.html");
        return response.text();
      })
      .then(data => {
        cartContainer.innerHTML = data;

        // === Seleccionamos elementos ===
        const removeButtons = cartContainer.querySelectorAll('.shopping-cart__remove-button');
        const continueButton = cartContainer.querySelector('.shopping-cart__continue');
        const returnButton = cartContainer.querySelector('.shopping-cart__return'); // ← NUEVO

        // === 🗑️ Funcionalidad: Eliminar producto del carrito ===
        removeButtons.forEach(button => {
          button.addEventListener('click', (e) => {
            e.preventDefault(); 
            const item = button.closest('.shopping-cart__item');
            if (item) {
              item.remove(); 
              updateCartTotal();
            }
          });
        });

        // === 🛒 Continuar comprando ===
        if (continueButton) {
          continueButton.addEventListener('click', () => {
            window.location.href = "client_view.html"; // ← OK
          });
        }

        // === 🔙 Volver ===
        if (returnButton) {
          returnButton.addEventListener('click', () => {
            window.location.href = "quantity_container.html"; // ← NUEVA RUTA
          });
        }

        // === 🔢 Recalcular total ===
        function updateCartTotal() {
          const items = cartContainer.querySelectorAll('.shopping-cart__item');
          let total = 0;

          items.forEach(item => {
            const priceText = item
              .querySelector('.shopping-cart__item-price')
              .textContent.replace(/[^0-9]/g, '');
            const quantityText = item
              .querySelector('.shopping-cart__item-quantity')
              .textContent.replace(/[^0-9]/g, '');
            const price = parseFloat(priceText);
            const quantity = parseInt(quantityText);

            if (!isNaN(price) && !isNaN(quantity)) {
              total += price * quantity;
            }
          });

          const totalDisplay = cartContainer.querySelector('.shopping-cart__total-price');
          if (totalDisplay) {
            totalDisplay.textContent = `$${total.toLocaleString('es-CO')}`;
          }
        }

      })
      .catch(error => console.error("Error:", error));
  } else {
    console.warn("No se encontró '.shopping-car-container' en el HTML.");
  }
});

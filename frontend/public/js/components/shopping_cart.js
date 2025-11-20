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

        // === 🗑️ Funcionalidad: Eliminar producto del carrito ===
        removeButtons.forEach(button => {
          button.addEventListener('click', (e) => {
            e.preventDefault(); // Evita el envío del form
            const item = button.closest('.shopping-cart__item');
            if (item) {
              item.remove(); // Elimina el producto del DOM

              // Actualizar el total (simple: volver a calcular con base en elementos restantes)
              updateCartTotal();
            }
          });
        });

        // === 🛒 Funcionalidad: Continuar comprando ===
        if (continueButton) {
          continueButton.addEventListener('click', () => {
            window.location.href = "client_view.html";
          });
        }

        // === 🔢 Función auxiliar: recalcular total del carrito ===
        function updateCartTotal() {
          const items = cartContainer.querySelectorAll('.shopping-cart__item');
          let total = 0;

          items.forEach(item => {
            const priceText = item.querySelector('.shopping-cart__item-price').textContent.replace(/[^0-9]/g, '');
            const quantityText = item.querySelector('.shopping-cart__item-quantity').textContent.replace(/[^0-9]/g, '');
            const price = parseFloat(priceText);
            const quantity = parseInt(quantityText);
            if (!isNaN(price) && !isNaN(quantity)) total += price * quantity;
          });

          const totalDisplay = cartContainer.querySelector('.shopping-cart__total-price');
          if (totalDisplay) totalDisplay.textContent = `$${total.toLocaleString('es-CO')}`;
        }

      })
      .catch(error => console.error("Error:", error));
  } else {
    console.warn("No se encontró '.shopping-car-container' en el HTML.");
  }
});

document.addEventListener("DOMContentLoaded", function () {

  const container = document.querySelector(".client-orders-container");

  if (container) {
    fetch("/frontend/public/views/components/client_order.html")
      .then(response => response.text())
      .then(data => {

        // Insertamos el componente en el contenedor
        container.innerHTML = data;

        // ================================================
        // LÓGICA DE BOTONES (se ejecuta tras cargar HTML)
        // ================================================

        // ===== FILTRO DEL SELECT =====
        const filterSelect = container.querySelector(".client-orders__filter");

        filterSelect.addEventListener("change", () => {
          if (filterSelect.value === "entregado") {
            window.location.href = "view_purchases.html";
          }
        });

        // ===== EDITAR PEDIDO =====
        const editButtons = container.querySelectorAll(".client-orders__edit");

        editButtons.forEach(button => {
          button.addEventListener("click", () => {
            const orderElement = button.closest(".client-orders__item");

            const orderId = orderElement
              .querySelector(".client-orders__id")
              .textContent
              .replace("Pedido #", "")
              .trim();

            window.location.href = `view_edit_order_client.html?order=${orderId}`;
          });
        });

        // ===== CANCELAR PEDIDO (CON ALERTA) =====
        const cancelButtons = container.querySelectorAll(".client-orders__cancel");

        cancelButtons.forEach(button => {
          button.addEventListener("click", () => {

            // CONFIRMACIÓN
            const confirmar = confirm(
              "¿Estás seguro de que deseas cancelar este pedido?\nEsta acción no se puede deshacer."
            );

            if (confirmar) {
              window.location.href = "view_shopping_cart.html";
            }

            // Si el usuario elige "Cancelar", simplemente no se hace nada
          });
        });

      })
      .catch(error => console.error("Error cargando el componente de pedidos del cliente:", error));
  }

});

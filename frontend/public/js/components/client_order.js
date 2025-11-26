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
            window.location.href = "view_purchases.html";   // <---- ✨ AQUÍ ESTÁ EL LINK
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

        // ===== VOLVER (ANTES CANCELAR) =====
        const cancelButtons = container.querySelectorAll(".client-orders__cancel");

        cancelButtons.forEach(button => {
          button.addEventListener("click", () => {
            window.location.href = "view_shopping_cart.html";
          });
        });

      })
      .catch(error => console.error("Error cargando el componente de pedidos del cliente:", error));
  }

});

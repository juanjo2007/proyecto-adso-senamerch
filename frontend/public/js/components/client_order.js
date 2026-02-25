document.addEventListener("DOMContentLoaded", () => {
  const container = document.querySelector(".client-orders-container");

  if (container) {
    fetch("/frontend/public/views/components/client_order.html")
      .then(res => res.text())
      .then(html => {
        container.innerHTML = html;

        // ===========================
        // TABS
        // ===========================
        const tabs = container.querySelectorAll(".orders-panel__tab");
        const cards = container.querySelectorAll(".order-card");
        const select = container.querySelector(".orders-panel__select");

        const applyFilter = (status) => {
          cards.forEach(card => {
            const cardStatus = card.dataset.status;

            card.style.display =
              status === "all" || status === cardStatus
                ? "block"
                : "none";
          });
        };

        tabs.forEach(tab => {
          tab.addEventListener("click", () => {
            tabs.forEach(t => t.classList.remove("orders-panel__tab--active"));
            tab.classList.add("orders-panel__tab--active");
            applyFilter(tab.dataset.status);
          });
        });

        select.addEventListener("change", () => {
          applyFilter(select.value);
        });

        // ===========================
        // EDITAR
        // ===========================
        container.querySelectorAll(".order-card__edit").forEach(btn => {
          btn.addEventListener("click", () => {
            const id = btn.closest(".order-card")
              .querySelector(".order-card__id")
              .textContent.replace("Pedido #", "")
              .trim();

            window.location.href = `view_edit_order_client.html?order=${id}`;
          });
        });

        // ===========================
        // CANCELAR
        // ===========================
        container.querySelectorAll(".order-card__cancel").forEach(btn => {
          btn.addEventListener("click", () => {
            if (confirm("¿Deseas cancelar este pedido?")) {
              window.location.href = "view_shopping_cart.html";
            }
          });
        });
      });
  }
});

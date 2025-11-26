document.addEventListener("DOMContentLoaded", function() { 
  const editOrderContainer = document.querySelector(".edit-order-content");

  if(editOrderContainer){
    fetch("/frontend/public/views/components/edit_order_client.html")
      .then(response => response.text())
      .then(data => {
        editOrderContainer.innerHTML = data;

        // ===== BOTONES ACCIÓN =====
        const cancelBtn = editOrderContainer.querySelector(".edit-order__cancel");
        const saveBtn = editOrderContainer.querySelector(".edit-order__save");
        const addBtn = editOrderContainer.querySelector(".edit-order__add");

        // ===========================
        // CANCELAR PEDIDO (CON ALERTA)
        // ===========================
        cancelBtn.addEventListener("click", () => {
          const confirmCancel = confirm("¿Deseas cancelar este pedido?");

          if (!confirmCancel) return;

          window.location.href = "view_client-order.html";
        });

        // Guardar cambios → redirigir a la vista del pedido del cliente
        saveBtn.addEventListener("click", () => {
          alert("Cambios guardados correctamente!");
          window.location.href = "details.html";
        });

        // Agregar producto
        addBtn.addEventListener("click", () => {
          const select = editOrderContainer.querySelector(".edit-order__select-product");
          const qtyInput = editOrderContainer.querySelector(".edit-order__input");

          const product = select.value;
          const quantity = qtyInput.value;

          if(product && quantity > 0){
            const newProductCard = document.createElement("div");
            newProductCard.classList.add("edit-order__card", "edit-order__card--product");
            newProductCard.innerHTML = `
              <p class="edit-order__product-name"><strong>${product}</strong></p>
              <div class="edit-order__quantity">
                <label>Cantidad:</label>
                <input type="number" class="edit-order__input" value="${quantity}" min="1">
              </div>
              <button class="btn-secundary btn-secundary-style edit-order__remove">
                  Quitar producto
                  <img
                      src="/frontend/public/assets/icons/cancel.svg"
                      alt=""
                      class="btn-secundary__icon"
                      aria-hidden="true"
                  />
              </button>
            `;

            editOrderContainer.querySelector(".edit-order__products").appendChild(newProductCard);

            // Quitar producto agregado dinámicamente
            newProductCard.querySelector(".edit-order__remove").addEventListener("click", () => {
              newProductCard.remove();
            });

            // Reset inputs
            select.value = "";
            qtyInput.value = "";
          }
        });

        // Quitar productos existentes
        editOrderContainer.querySelectorAll(".edit-order__remove").forEach(btn => {
          btn.addEventListener("click", e => {
            e.target.closest(".edit-order__card--product").remove();
          });
        });
      })
      .catch(error => console.error("Error cargando el componente:", error));
  }
});

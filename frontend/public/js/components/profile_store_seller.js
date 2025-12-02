// ================== SALES COMPONENT ==================
document.addEventListener('DOMContentLoaded', function () {
  const profileclientContainer = document.querySelector('.profile-store-seller');

  if (profileclientContainer) {
    fetch("/frontend/public/views/components/profile_store_seller.html")
      .then(response => {
        if (!response.ok) throw new Error("Error al cargar profile_store_seller.html");
        return response.text();
      })
      .then(data => {
        profileclientContainer.innerHTML = data;

        // ================== BOTONES EDITAR ==================
        const editStoreBtn = profileclientContainer.querySelector('.store-profile__submit--store');
        const editSellerBtn = profileclientContainer.querySelector('.store-profile__submit--seller');

        if (editStoreBtn) {
          editStoreBtn.addEventListener('click', () => {
            if (!editStoreBtn.disabled) {
              window.location.href = "edit_store_seller.html";
            }
          });
        }

        if (editSellerBtn) {
          editSellerBtn.addEventListener('click', () => {
            window.location.href = "edit_seller_profile_view.html";
          });
        }

        // ================== BOTONES VOLVER ==================
        const backStoreBtn = profileclientContainer.querySelector('.store-profile__session--store');
        const backSellerBtn = profileclientContainer.querySelector('.store-profile__session--seller');

        if (backStoreBtn) {
          backStoreBtn.addEventListener('click', () => {
            window.location.href = "profile_store_seller.html";
          });
        }

        if (backSellerBtn) {
          backSellerBtn.addEventListener('click', () => {
            window.location.href = "profile_store_seller.html";
          });
        }

        // ================== DESHABILITAR / HABILITAR TIENDA ==================
        const suspendBtn = profileclientContainer.querySelector('.store-profile__suspend');
        const editStoreBtn2 = profileclientContainer.querySelector('.store-profile__submit--store'); // importante

        if (suspendBtn) {
          suspendBtn.addEventListener('click', () => {

            const isDisabled = suspendBtn.classList.contains('disabled-state');

            // ⚠️ Confirmación al deshabilitar
            if (!isDisabled) {
              const confirmDisable = confirm("¿Estás seguro que deseas DESHABILITAR la tienda?");
              if (!confirmDisable) return;
            }

            // Limpia icono previo
            const oldIcon = suspendBtn.querySelector('.btn__icon');
            if (oldIcon) oldIcon.remove();

            if (isDisabled) {
              // --------- HABILITAR TIENDA ---------
              suspendBtn.textContent = "Deshabilitar Tienda";
              suspendBtn.classList.remove('disabled-state');
              suspendBtn.classList.remove('btn--success');
              suspendBtn.classList.add('btn--warning');

              const icon = document.createElement('img');
              icon.src = "/frontend/public/assets/icons/off.svg";
              icon.classList.add("btn__icon");
              suspendBtn.appendChild(icon);

              // 🔥 HABILITAR botón Editar Datos de la tienda
              if (editStoreBtn2) {
                editStoreBtn2.disabled = false;
                editStoreBtn2.classList.remove("disabled-edit");
              }

            } else {
              // --------- DESHABILITAR TIENDA ---------
              suspendBtn.textContent = "Habilitar Tienda";
              suspendBtn.classList.add('disabled-state');
              suspendBtn.classList.remove('btn--warning');
              suspendBtn.classList.add('btn--success');

              const icon = document.createElement('img');
              icon.src = "/frontend/public/assets/icons/home.svg";
              icon.classList.add("btn__icon");
              suspendBtn.appendChild(icon);

              // ❌ DESHABILITAR botón Editar Datos de la tienda
              if (editStoreBtn2) {
                editStoreBtn2.disabled = true;
                editStoreBtn2.classList.add("disabled-edit");
              }
            }

          });
        }

      })
      .catch(error => console.error("Error cargando el componente profile_store_seller:", error));
  } else {
    console.warn("No se encontró '.profile-store-seller' en el HTML.");
  }
});

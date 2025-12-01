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
            window.location.href = "edit_store_seller.html";
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

      })
      .catch(error => console.error("Error cargando el componente profile_store_seller:", error));
  } else {
    console.warn("No se encontró '.profile-store-seller' en el HTML.");
  }
});

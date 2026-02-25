document.addEventListener('DOMContentLoaded', function () {
  const adminprofileContainer = document.querySelector('.profile-seller-container');

  if (adminprofileContainer) {
    fetch("/frontend/public/views/components/seller_profile.html")
      .then(response => {
        if (!response.ok) throw new Error("Error al cargar seller_profile.html");
        return response.text();
      })
      .then(data => {
        adminprofileContainer.innerHTML = data;

        // Detectar si el panel es STORE o SELLER
        const adminProfile = adminprofileContainer.querySelector('.admin-profile');
        const type = adminProfile?.dataset.type; // "store" o "seller"

        // === Botón: Editar datos ===
        const editButtons = adminprofileContainer.querySelectorAll('.admin-profile__submit');
        editButtons.forEach(button => {
          button.addEventListener('click', () => {

            if (type === "store") {
              window.location.href = "edit_store_seller.html";
            } else if (type === "seller") {
              window.location.href = "edit_seller_profile_view.html";
            }

          });
        });

        // === Botón: Volver ===
        const backButtons = adminprofileContainer.querySelectorAll('.admin-profile__session');
        backButtons.forEach(button => {
          button.addEventListener('click', () => {
            window.location.href = "profile_store_seller.html";
          });
        });

      })
      .catch(error => console.error("Error cargando el componente admin_profile:", error));
  } else {
    console.warn("No se encontró '.profile-seller-container' en el HTML.");
  }
});

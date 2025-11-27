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

        // === Botón primario: Editar datos ===
        const manageButtons = adminprofileContainer.querySelectorAll('.admin-profile__submit');
        manageButtons.forEach(button => {
          button.addEventListener('click', () => {
            window.location.href = "edit_seller_profile_view.html";
          });
        });

        // === Botón secundario: Cerrar sesión ===
        const logoutButtons = adminprofileContainer.querySelectorAll('.admin-profile__session');
        logoutButtons.forEach(button => {
          button.addEventListener('click', () => {
            window.location.href = "profile_store_seller.html";
          });
        });

      })
      .catch(error => console.error("Error cargando el componente admin_profile:", error));
  } else {
    console.warn("No se encontró '.profile-admin-container' en el HTML.");
  }
});

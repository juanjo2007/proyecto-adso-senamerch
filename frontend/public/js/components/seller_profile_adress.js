document.addEventListener('DOMContentLoaded', function () {
  const adminprofileContainer = document.querySelector('.profile-seller-adress-container');

  if (adminprofileContainer) {
    fetch("/frontend/public/views/components/seller_profile_adress.html")
      .then(response => {
        if (!response.ok) throw new Error("Error al cargar seller_profile_adress.html");
        return response.text();
      })
      .then(data => {
        adminprofileContainer.innerHTML = data;
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
    console.warn("No se encontró '.profile-admin-adress-container' en el HTML.");
  }
});

document.addEventListener('DOMContentLoaded', function () {
  const adminprofileContainer = document.querySelector('.profile-admin-adress-container');

  if (adminprofileContainer) {
    fetch("/frontend/public/views/components/admin_profile_adress.html")
      .then(response => {
        if (!response.ok) throw new Error("Error al cargar admin_profile_adress.html");
        return response.text();
      })
      .then(data => {
        adminprofileContainer.innerHTML = data;
        // === Botón secundario: Cerrar sesión ===
        const logoutButtons = adminprofileContainer.querySelectorAll('.admin-profile__session');
        logoutButtons.forEach(button => {
          button.addEventListener('click', () => {
            window.location.href = "admin_profile_view.html";
          });
        });

      })
      .catch(error => console.error("Error cargando el componente admin_profile:", error));
  } else {
    console.warn("No se encontró '.profile-admin-adress-container' en el HTML.");
  }
});

// ================== SALES COMPONENT ================== 
document.addEventListener('DOMContentLoaded', function () {
  const profileclientContainer = document.querySelector('.user-profile-container');

  if (profileclientContainer) {
    fetch("/frontend/public/views/components/profile_user.html")
      .then(response => {
        if (!response.ok) throw new Error("Error al cargar profile_user.html");
        return response.text();
      })
      .then(data => {
        profileclientContainer.innerHTML = data;

        // ================== Evento para botones "Gestionar" ==================
        const manageButtons = profileclientContainer.querySelectorAll('.user-profile__send');

        manageButtons.forEach(button => {
          button.addEventListener('click', () => {
            window.location.href = "edit_profile_client.html";
          });
        });
      })
      .catch(error => console.error("Error cargando el componente sales:", error));
  } else {
    console.warn("No se encontró '.user-profile-container' en el HTML.");
  }
});
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

        // ================== Evento para botones "Gestionar" ==================
        const manageButtons = profileclientContainer.querySelectorAll('.store-profile__edit');

        manageButtons.forEach(button => {
          button.addEventListener('click', () => {
            window.location.href = "edit_store_seller.html";
          });
        });
      })
      .catch(error => console.error("Error cargando el componente sales:", error));
  } else {
    console.warn("No se encontró '.profile-store-seller' en el HTML.");
  }
});
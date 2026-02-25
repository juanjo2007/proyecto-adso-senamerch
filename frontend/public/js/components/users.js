// ================== USERS COMPONENT ================== 
document.addEventListener('DOMContentLoaded', function () {
  const usersContainer = document.querySelector('.users-container');

  if (usersContainer) {
    fetch("/frontend/public/views/components/users.html")
      .then(response => {
        if (!response.ok) throw new Error("Error al cargar users.html");
        return response.text();
      })
      .then(data => {
        usersContainer.innerHTML = data;

        // ================== Evento para botones "Gestionar" ==================
        const manageButtons = usersContainer.querySelectorAll('.users__gestor');

        manageButtons.forEach(button => {
          button.addEventListener('click', () => {
            window.location.href = "view_managed_user.html";
          });
        });
      })
      .catch(error => console.error("Error cargando el componente Users:", error));
  } else {
    console.warn("No se encontró '.users-container' en el HTML.");
  }
});

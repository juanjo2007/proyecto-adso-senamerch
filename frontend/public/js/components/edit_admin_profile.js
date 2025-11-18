document.addEventListener("DOMContentLoaded", function () { 
  const direction = document.querySelector(".edit-profile-admin-container");

  if (direction) {
    fetch("/frontend/public/views/components/edit_admin_profile.html")
      .then(response => response.text())
      .then(data => {
        direction.innerHTML = data;

        // === Botones ===
        const saveButton = direction.querySelector(".edit-profile-admin__submit");
        const cancelButton = direction.querySelector(".edit-profile-admin__cancel");

        // Botón Guardar → ir a edit_admin_profile_view2.html
        if (saveButton) {
          saveButton.addEventListener("click", (e) => {
            e.preventDefault();
            window.location.href = "edit_admin_profile_view2.html";
          });
        }

        // Botón Cancelar → ir a admin_profile_view.html
        if (cancelButton) {
          cancelButton.addEventListener("click", (e) => {
            e.preventDefault();
            window.location.href = "admin_profile_view.html";
          });
        }
      })
      .catch(error => console.error("Error al cargar el componente:", error));
  }
});

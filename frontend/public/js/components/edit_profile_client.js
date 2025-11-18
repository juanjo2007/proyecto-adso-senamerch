document.addEventListener("DOMContentLoaded", function () {
  const formContainer = document.querySelector(".edit-profile-client-container");

  if (formContainer) {
    fetch("/frontend/public/views/components/edit_profile_client.html")
      .then((response) => response.text())
      .then((data) => {
        formContainer.innerHTML = data;

        // === BOTÓN PRINCIPAL (Guardar / Siguiente) ===
        const mainBtn = formContainer.querySelector(".edit-profile-user__submit");
        if (mainBtn) {
          mainBtn.addEventListener("click", function (e) {
            e.preventDefault();
            window.location.href = "edit_profile_client2.html";
          });
        }

        // === BOTÓN SECUNDARIO (Cancelar) ===
        const secondaryBtn = formContainer.querySelector(".edit-profile-user__cancel");
        if (secondaryBtn) {
          secondaryBtn.addEventListener("click", function (e) {
            e.preventDefault();
            window.location.href = "profile_user.html";
          });
        }
      })
      .catch((error) => console.error("Error al cargar el formulario:", error));
  }
});

document.addEventListener("DOMContentLoaded", function () {
  const formContainer = document.querySelector(".edit-profile-client-finish-container");

  if (formContainer) {
    fetch("/frontend/public/views/components/edit_profile_client2.html")
      .then((response) => response.text())
      .then((data) => {
        formContainer.innerHTML = data;

        // === BOTÓN PRINCIPAL (Guardar cambios) ===
        const saveBtn = formContainer.querySelector(".edit-profile-user__submit");
        if (saveBtn) {
          saveBtn.addEventListener("click", function (e) {
            e.preventDefault();
            showAlert("Cambios guardados exitosamente", "success");

            setTimeout(() => {
              window.location.href = "profile_user.html";
            }, 1200);
          });
        }

        // === BOTÓN SECUNDARIO (Cancelar) ===
        const cancelBtn = formContainer.querySelector(".edit-profile-user__cancel");
        if (cancelBtn) {
          cancelBtn.addEventListener("click", function (e) {
            e.preventDefault();
            showAlert("Has cancelado la edición", "error");

            setTimeout(() => {
              window.location.href = "edit_profile_client.html";
            }, 1000);
          });
        }
      })
      .catch((error) => console.error("Error al cargar el formulario:", error));
  }

  // ===== FUNCIÓN DE ALERTA =====
  function showAlert(message, type = "success") {
    const existingAlert = document.querySelector(".alert");
    if (existingAlert) existingAlert.remove();

    const alert = document.createElement("div");
    alert.className = `alert alert--${type}`;
    alert.innerHTML = `
      <div class="alert__content">
        <p class="alert__message">${message}</p>
      </div>
    `;

    document.body.appendChild(alert);

    setTimeout(() => alert.classList.add("show"), 50);

    setTimeout(() => {
      alert.classList.remove("show");
      setTimeout(() => alert.remove(), 400);
    }, 1200);
  }
});

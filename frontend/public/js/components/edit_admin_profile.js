document.addEventListener("DOMContentLoaded", function () {
  const direction = document.querySelector(".edit-profile-admin-container");

  if (direction) {
    fetch("/frontend/public/views/components/edit_admin_profile.html")
      .then(response => response.text())
      .then(data => {
        direction.innerHTML = data;

        // === Cambiar foto de perfil ===
        const avatarInputs = direction.querySelectorAll(".edit-profile-admin__avatar-input");
        avatarInputs.forEach(input => {
          input.addEventListener("change", (e) => {
            const file = e.target.files[0];
            const avatarContainer = e.target.closest(".edit-profile-admin__avatar");
            const img = avatarContainer.querySelector(".edit-profile-admin__avatar-img");
            if (file) img.src = URL.createObjectURL(file);
          });
        });

        // === Crear alerta global ===
        let alertContainer = document.querySelector(".alert");
        if (!alertContainer) {
          alertContainer = document.createElement("div");
          alertContainer.classList.add("alert");
          document.body.appendChild(alertContainer);
        }

        // === Función para mostrar alerta ===
        function showAlert(message, type = "success") {
          alertContainer.className = "alert"; // reset
          alertContainer.classList.add(type === "error" ? "alert--error" : "alert--success");
          alertContainer.innerHTML = `
            <div class="alert__content">
              <p class="alert__message">${message}</p>
            </div>
          `;
          alertContainer.classList.add("alert--show");

          setTimeout(() => {
            alertContainer.classList.remove("alert--show");
          }, 1800);
        }

        // === Botones ===
        const saveButton = direction.querySelector(".edit-profile-admin__submit");
        const cancelButton = direction.querySelector(".edit-profile-admin__cancel");

        if (saveButton) {
          saveButton.addEventListener("click", (e) => {
            e.preventDefault();
            showAlert("Cambios guardados exitosamente", "success");
            setTimeout(() => {
              window.location.href = "admin_profile_view.html";
            }, 2200);
          });
        }

        if (cancelButton) {
          cancelButton.addEventListener("click", (e) => {
            e.preventDefault();
            showAlert("Cambios cancelados", "error");
            setTimeout(() => {
              window.location.href = "admin_profile_view.html";
            }, 2200);
          });
        }

        // === Mostrar / ocultar contraseña ===
        attachLoginEvents();
      })
      .catch(error => console.error("Error al cargar el componente:", error));
  }
});

function attachLoginEvents() {
  const form = document.querySelector(".edit-profile-admin__form");
  if (!form) return;

  const passwordInput = form.querySelector(".edit-profile-admin__input--password");
  const togglePasswordBtn = form.querySelector(".edit-profile-admin__toggle-password");

  if (togglePasswordBtn && passwordInput) {
    togglePasswordBtn.addEventListener("click", function () {
      if (passwordInput.type === "password") {
        passwordInput.type = "text";
        togglePasswordBtn.textContent = "Ocultar";
      } else {
        passwordInput.type = "password";
        togglePasswordBtn.textContent = "Mostrar";
      }
    });
  }
}

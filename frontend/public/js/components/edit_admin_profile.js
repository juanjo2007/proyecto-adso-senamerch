document.addEventListener("DOMContentLoaded", function () {
  const direction = document.querySelector(".edit-profile-admin-container");

  if (direction) {
    fetch("/frontend/public/views/components/edit_admin_profile.html")
      .then(response => response.text())
      .then(data => {
        direction.innerHTML = data;

        // === Funcionalidad para cambiar foto del perfil ===
        const avatarInputs = direction.querySelectorAll(".edit-profile-admin__avatar-input");

        avatarInputs.forEach(input => {
          input.addEventListener("change", (e) => {
            const file = e.target.files[0];
            const avatarContainer = e.target.closest(".edit-profile-admin__avatar");
            const img = avatarContainer.querySelector(".edit-profile-admin__avatar-img");

            if (file) {
              img.src = URL.createObjectURL(file);
            }
          });
        });

        // ✅ Importante: llama a la función de eventos del formulario aquí
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

  // ✅ Mostrar/Ocultar contraseña
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

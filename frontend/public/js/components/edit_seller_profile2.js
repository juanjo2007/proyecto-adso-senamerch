document.addEventListener("DOMContentLoaded", function () { 
  const container = document.querySelector(".edit-profile-seller-finish-container");

  if (container) {
    fetch("/frontend/public/views/components/edit_seller_profile2.html")
      .then((response) => response.text())
      .then((data) => {
        container.innerHTML = data;

        // === BOTÓN GUARDAR (Primario) ===
        const saveBtn = container.querySelector(".edit-profile-admin__submit");
        if (saveBtn) {
          saveBtn.addEventListener("click", function (e) {
            e.preventDefault();
            showAlert("Cambios guardados exitosamente", "success");

            setTimeout(() => {
              window.location.href = "profile_store_seller.html";
            }, 1200);
          });
        }

        // === BOTÓN CANCELAR (Secundario) ===
        const cancelBtn = container.querySelector(".edit-profile-admin__cancel");
        if (cancelBtn) {
          cancelBtn.addEventListener("click", function (e) {
            e.preventDefault();
            showAlert("Has cancelado la edición", "error");

            setTimeout(() => {
              window.location.href = "edit_seller_profile_view.html";
            }, 1000);
          });
        }

        // === Mostrar / ocultar contraseña ===
        const passwordInput = container.querySelector(".edit-profile-admin__input--password");
        const togglePasswordBtn = container.querySelector(".edit-profile-admin__toggle-password");

        if (passwordInput && togglePasswordBtn) {
          togglePasswordBtn.addEventListener("click", () => {
            if (passwordInput.type === "password") {
              passwordInput.type = "text";
              togglePasswordBtn.textContent = "Ocultar";
            } else {
              passwordInput.type = "password";
              togglePasswordBtn.textContent = "Mostrar";
            }
          });
        }

      })
      .catch((error) => console.error("Error al cargar el formulario:", error));
  }

  // ===== ALERTA GLOBAL =====
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

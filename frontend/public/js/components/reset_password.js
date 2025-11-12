document.addEventListener("DOMContentLoaded", function () {
  const direction = document.querySelector(".reset-password");

  if (direction) {
    fetch("/frontend/public/views/components/reset_password.html")
      .then(response => response.text())
      .then(data => {
        direction.innerHTML = data;

        // Crear contenedor de alerta (si no existe)
        let alertContainer = document.querySelector(".alert");
        if (!alertContainer) {
          alertContainer = document.createElement("div");
          alertContainer.classList.add("alert");
          document.body.appendChild(alertContainer);
        }

        // === Función alerta ===
        function showAlert(message, duration = 2000, type = "success") {
          alertContainer.className = "alert";
          if (type === "success") alertContainer.classList.add("alert--success");
          if (type === "error") alertContainer.classList.add("alert--error");

          alertContainer.innerHTML = `
            <div class="alert__content">
              <p class="alert__message">${message}</p>
            </div>
          `;
          alertContainer.classList.add("alert--show");

          setTimeout(() => {
            alertContainer.classList.remove("alert--show");
          }, duration);
        }

        // === Evento para el formulario ===
        const form = direction.querySelector(".reset__form");

        if (form) {
          form.addEventListener("submit", function (e) {
            e.preventDefault();

            const inputs = form.querySelectorAll(".reset__input[type='password']");
            const newPassword = inputs[0]?.value.trim();
            const confirmPassword = inputs[1]?.value.trim();

            if (!newPassword || !confirmPassword) {
              showAlert("Por favor completa todos los campos", 2000, "error");
              return;
            }

            if (newPassword !== confirmPassword) {
              showAlert("Las contraseñas no coinciden", 2000, "error");
              return;
            }

            showAlert("Contraseña restablecida exitosamente", 2000, "success");

            setTimeout(() => {
              window.location.href = "login.html";
            }, 2300);
          });
        }
      })
      .catch(error => console.error("Error al cargar el componente:", error));
  }
});

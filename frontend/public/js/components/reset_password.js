document.addEventListener("DOMContentLoaded", function () {
  const direction = document.querySelector(".reset-password");

  if (direction) {
    fetch("/frontend/public/views/components/reset_password.html")
      .then(response => response.text())
      .then(data => {
        direction.innerHTML = data;

        // =====================================================
        //            SELECCIÓN DE ELEMENTOS DEL RESET
        // =====================================================

        const form = direction.querySelector(".reset__form");
        const passwordInputs = direction.querySelectorAll(".reset__input--password");
        const toggleButtons = direction.querySelectorAll(".reset__toggle-password");

        // =====================================================
        //       FUNCIÓN PARA MOSTRAR / OCULTAR CONTRASEÑA
        // =====================================================
        toggleButtons.forEach((btn, index) => {
          // ⚠️ Muy importante: evitar que el botón envíe el formulario
          btn.type = "button";

          btn.addEventListener("click", (e) => {
            e.preventDefault(); // <-- evita submit accidental

            const input = passwordInputs[index];
            if (!input) return;

            const isHidden = input.type === "password";
            input.type = isHidden ? "text" : "password";
            btn.textContent = isHidden ? "Ocultar" : "Mostrar";
          });
        });

        // =====================================================
        //            ALERTAS (MISMA LÓGICA LOGIN)
        // =====================================================

        let alertContainer = document.querySelector(".alert");
        if (!alertContainer) {
          alertContainer = document.createElement("div");
          alertContainer.classList.add("alert");
          document.body.appendChild(alertContainer);
        }

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

        // =====================================================
        //                   VALIDACIÓN RESET
        // =====================================================

        if (form) {
          form.addEventListener("submit", function (e) {
            e.preventDefault();

            const inputs = form.querySelectorAll(".reset__input--password");
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

document.addEventListener("DOMContentLoaded", function () {
  const container = document.querySelector(".managed-user-container");

  if (!container) {
    console.warn("No se encontró '.managed-user-container' en el HTML.");
    return;
  }

  fetch("/frontend/public/views/components/managed_user.html")
    .then((response) => response.text())
    .then((data) => {
      container.innerHTML = data;

      // ============================================================
      // ELEMENTOS
      // ============================================================
      const btnSuspend = container.querySelector(".user-detail__suspend");
      const btnExport = container.querySelector(".user-detail__export");

      // ============================================================
      // ALERTA REUTILIZABLE
      // ============================================================
      function showAlert(type, message) {
        let alertBox = document.querySelector(".alert");

        if (!alertBox) {
          alertBox = document.createElement("div");
          alertBox.classList.add("alert");
          document.body.appendChild(alertBox);
        }

        alertBox.className = `alert alert--${type} alert--show`;
        alertBox.innerHTML = `
          <div class="alert__content">
            <p class="alert__message">${message}</p>
          </div>
        `;

        setTimeout(() => {
          alertBox.classList.remove("alert--show");
        }, 2000);
      }

      // ============================================================
      // ACCIÓN: DESHABILITAR USUARIO
      // ============================================================
      function disableUser() {
        showAlert("error", "Usuario deshabilitado correctamente.");

        btnSuspend.innerHTML = `
          Habilitar usuario
          <img src="/frontend/public/assets/icons/enabled.svg" class="btn__icon">
        `;

        btnSuspend.classList.add("is-suspended");
        btnSuspend.classList.remove("btn--warning");
        btnSuspend.classList.add("btn--success");

        // Cambiar acción
        btnSuspend.removeEventListener("click", disableUser);
        btnSuspend.addEventListener("click", enableUser);
      }

      // ============================================================
      // ACCIÓN: HABILITAR USUARIO
      // ============================================================
      function enableUser() {
        showAlert("success", "Usuario habilitado nuevamente.");

        btnSuspend.innerHTML = `
          Deshabilitar usuario
          <img src="/frontend/public/assets/icons/user-off.svg" class="btn__icon">
        `;

        btnSuspend.classList.remove("is-suspended");
        btnSuspend.classList.remove("btn--success");
        btnSuspend.classList.add("btn--warning");

        // Regresar acción original
        btnSuspend.removeEventListener("click", enableUser);
        btnSuspend.addEventListener("click", disableUser);
      }

      // Acción inicial
      btnSuspend.addEventListener("click", disableUser);

      // ============================================================
      // EXPORTAR PDF
      // ============================================================
      if (btnExport) {
        btnExport.addEventListener("click", () => {
          const element = container.querySelector(".user-detail");

          const script = document.createElement("script");
          script.src =
            "https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js";

          script.onload = function () {
            html2pdf()
              .set({
                margin: 10,
                filename: "detalle_usuario.pdf",
                image: { type: "jpeg", quality: 0.98 },
                html2canvas: { scale: 2 },
                jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
              })
              .from(element)
              .save();
          };

          document.body.appendChild(script);
        });
      }
    })
    .catch((err) =>
      console.error("Error cargando componente de usuario:", err)
    );
});

document.addEventListener("DOMContentLoaded", function () {
  const container = document.querySelector(".managed-user-container");

  if (container) {
    fetch("/frontend/public/views/components/managed_user.html")
      .then((response) => response.text())
      .then((data) => {
        container.innerHTML = data;

        // === BOTÓN: Exportar información a PDF ===
        const exportBtn = container.querySelector(".user-detail__export");
        if (exportBtn) {
          exportBtn.addEventListener("click", function (e) {
            e.preventDefault();
            const element = document.querySelector(".user-detail");

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
                  jsPDF: {
                    unit: "mm",
                    format: "a4",
                    orientation: "portrait",
                  },
                })
                .from(element)
                .save();
            };
            document.body.appendChild(script);
          });
        }

        // === BOTÓN: Suspender / Habilitar usuario ===
        const suspendBtn = container.querySelector(".user-detail__suspend");
        const suspendIcon = suspendBtn?.querySelector(".user-detail__icon");

        if (suspendBtn && suspendIcon) {
          suspendBtn.addEventListener("click", function (e) {
            e.preventDefault();

            let alertContainer = document.querySelector(".alert");
            if (!alertContainer) {
              alertContainer = document.createElement("div");
              alertContainer.classList.add("alert");
              document.body.appendChild(alertContainer);
            }

            const isSuspended = suspendBtn.classList.contains("is-suspended");

            if (!isSuspended) {
              // === Caso: Suspender usuario ===
              alertContainer.className = "alert alert--error alert--show";
              alertContainer.innerHTML = `
                <div class="alert__content">
                  <p class="alert__message">
                    Usuario suspendido correctamente.<br>
                    Se le notificará formalmente al usuario.
                  </p>
                </div>
              `;

              setTimeout(() => {
                alertContainer.classList.remove("alert--show");

                suspendBtn.innerHTML = `
                  Habilitar usuario
                  <img src="/frontend/public/assets/icons/enabled.svg" 
                       alt="Icono habilitar usuario" 
                       class="btn__icon user-detail__icon">
                `;
                suspendBtn.classList.add("is-suspended");
              }, 2000);
            } else {
              // === Caso: Habilitar usuario ===
              alertContainer.className = "alert alert--success alert--show";
              alertContainer.innerHTML = `
                <div class="alert__content">
                  <p class="alert__message">
                    Usuario habilitado nuevamente.
                  </p>
                </div>
              `;

              setTimeout(() => {
                alertContainer.classList.remove("alert--show");

                suspendBtn.innerHTML = `
                  Suspender usuario
                  <img src="/frontend/public/assets/icons/user-off.svg" 
                       alt="Icono suspender usuario" 
                       class="btn__icon user-detail__icon">
                `;
                suspendBtn.classList.remove("is-suspended");
              }, 2000);
            }
          });
        }
      })
      .catch((error) =>
        console.error("Error cargando componente de usuarios:", error)
      );
  } else {
    console.warn("No se encontró '.managed-user-container' en el HTML.");
  }
});

document.addEventListener("DOMContentLoaded", function () {
  const container = document.querySelector(".managed-store-container");

  if (container) {
    fetch("/frontend/public/views/components/managed_store.html")
      .then((response) => response.text())
      .then((data) => {
        container.innerHTML = data;

        /* =====================================================================
           BOTÓN: EXPORTAR INFORMACIÓN EN PDF
        ===================================================================== */
        const exportBtn = container.querySelector(".store-detail__export");

        if (exportBtn) {
          exportBtn.addEventListener("click", function (e) {
            e.preventDefault();

            const element = document.querySelector(".store-detail");

            const script = document.createElement("script");
            script.src =
              "https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js";

            script.onload = function () {
              html2pdf()
                .set({
                  margin: 10,
                  filename: "detalle_tienda.pdf",
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

        /* =====================================================================
           BOTÓN: SUSPENDER / HABILITAR TIENDA
        ===================================================================== */
        const suspendBtn = container.querySelector(".store-detail__suspend");

        if (suspendBtn) {
          suspendBtn.addEventListener("click", function (e) {
            e.preventDefault();

            // Crear o reutilizar alerta global
            let alertContainer = document.querySelector(".alert");

            if (!alertContainer) {
              alertContainer = document.createElement("div");
              alertContainer.classList.add("alert");
              document.body.appendChild(alertContainer);
            }

            const isSuspended = suspendBtn.classList.contains("is-suspended");

            /* ============================================================
               CASO 1: SUSPENDER TIENDA
            ============================================================ */
            if (!isSuspended) {
              alertContainer.className = "alert alert--error alert--show";
              alertContainer.innerHTML = `
                <div class="alert__content">
                  <p class="alert__message">
                    La tienda ha sido suspendida correctamente.
                  </p>
                </div>
              `;

              setTimeout(() => {
                alertContainer.classList.remove("alert--show");

                // Cambiar contenido del botón
                suspendBtn.innerHTML = `
                  Habilitar tienda
                  <img src="/frontend/public/assets/icons/enabled.svg"
                       alt="Icono habilitar tienda"
                       class="btn__icon">
                `;

                // Agregar estado suspendido
                suspendBtn.classList.add("is-suspended");

                // Cambiar estilos del botón
                suspendBtn.classList.remove("btn--primary", "btn--warning");
                suspendBtn.classList.add("btn--success");
              }, 2000);
            }

            /* ============================================================
               CASO 2: HABILITAR TIENDA
            ============================================================ */
            else {
              alertContainer.className = "alert alert--success alert--show";
              alertContainer.innerHTML = `
                <div class="alert__content">
                  <p class="alert__message">La tienda ha sido habilitada nuevamente.</p>
                </div>
              `;

              setTimeout(() => {
                alertContainer.classList.remove("alert--show");

                // Cambiar contenido del botón
                suspendBtn.innerHTML = `
                  Deshabilitar tienda
                  <img src="/frontend/public/assets/icons/off.svg"
                       alt="Icono suspender tienda"
                       class="btn__icon">
                `;

                // Quitar estado suspendido
                suspendBtn.classList.remove("is-suspended");

                // Cambiar estilos del botón
                suspendBtn.classList.remove("btn--success");
                suspendBtn.classList.add("btn--warning");
              }, 2000);
            }
          });
        }

      })
      .catch((error) =>
        console.error("Error cargando componente de tienda:", error)
      );
  } else {
    console.warn("No se encontró '.managed-store-container' en el HTML.");
  }
});

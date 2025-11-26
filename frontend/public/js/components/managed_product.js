document.addEventListener("DOMContentLoaded", function () {
  const container = document.querySelector(".managed-product-container");

  if (container) {
    fetch("/frontend/public/views/components/managed_product.html")
      .then((response) => response.text())
      .then((data) => {
        container.innerHTML = data;

        // === BOTÓN: Exportar PDF ===
        const exportBtn = container.querySelector(".product-detail__export");
        if (exportBtn) {
          exportBtn.addEventListener("click", function (e) {
            e.preventDefault();
            const element = document.querySelector(".product-detail");

            const script = document.createElement("script");
            script.src =
              "https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js";
            script.onload = function () {
              html2pdf()
                .set({
                  margin: 10,
                  filename: "detalle_producto.pdf",
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

        // === BOTÓN: Deshabilitar / Habilitar PRODUCTO ===
        const suspendBtn = container.querySelector(".product-detail__suspend");
        if (suspendBtn) {
          suspendBtn.addEventListener("click", function (e) {
            e.preventDefault();

            let alertContainer = document.querySelector(".alert");
            if (!alertContainer) {
              alertContainer = document.createElement("div");
              alertContainer.classList.add("alert");
              document.body.appendChild(alertContainer);
            }

            const isSuspended = suspendBtn.classList.contains("is-suspended");

            /* ============================================================
               CASO 1: DESHABILITAR PRODUCTO → pasa a "Habilitar"
            ============================================================ */
            if (!isSuspended) {
              alertContainer.className =
                "alert alert--error alert--show";
              alertContainer.innerHTML = `
                <div class="alert__content">
                  <p class="alert__message">
                    Producto deshabilitado correctamente.<br>
                    Ya no estará visible en el catálogo.
                  </p>
                </div>
              `;

              setTimeout(() => {
                alertContainer.classList.remove("alert--show");

                suspendBtn.innerHTML = `
                  Habilitar producto
                  <img src="/frontend/public/assets/icons/mobiledata.svg" 
                       alt="Icono habilitar" 
                       class="btn__icon">
                `;

                suspendBtn.classList.add("is-suspended");

                // Colores
                suspendBtn.classList.remove("btn--primary", "btn--warning");
                suspendBtn.classList.add("btn--success");
              }, 2000);
            }

            /* ============================================================
               CASO 2: HABILITAR PRODUCTO → vuelve a "Deshabilitar"
            ============================================================ */
            else {
              alertContainer.className =
                "alert alert--success alert--show";
              alertContainer.innerHTML = `
                <div class="alert__content">
                  <p class="alert__message">Producto habilitado nuevamente.</p>
                </div>
              `;

              setTimeout(() => {
                alertContainer.classList.remove("alert--show");

                suspendBtn.innerHTML = `
                  Deshabilitar producto
                  <img src="/frontend/public/assets/icons/off.svg" 
                       alt="Icono deshabilitar" 
                       class="btn__icon">
                `;

                suspendBtn.classList.remove("is-suspended");

                // volver a warning
                suspendBtn.classList.remove("btn--success");
                suspendBtn.classList.add("btn--warning");
              }, 2000);
            }
          });
        }
      })
      .catch((error) =>
        console.error("Error cargando componente de producto:", error)
      );
  } else {
    console.warn("No se encontró '.managed-product-container' en el HTML.");
  }
});

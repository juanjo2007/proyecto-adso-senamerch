document.addEventListener("DOMContentLoaded", function () {
  const formContainer = document.querySelector(".edit_store_seller");

  if (formContainer) {
    fetch("/frontend/public/views/components/edit_store_seller.html")
      .then((response) => response.text())
      .then((data) => {
        formContainer.innerHTML = data;

        const saveBtn = formContainer.querySelector(".btn--primary");
        const cancelBtn = formContainer.querySelector(".btn-variant2--secondary");

        // ✅ Botón "Guardar"
        if (saveBtn) {
          saveBtn.addEventListener("click", function (e) {
            e.preventDefault();
            showAlert("Cambios guardados exitosamente", "success");
            setTimeout(() => {
              window.location.href = "profile_store_seller.html";
            }, 2500);
          });
        }

        // ✅ Botón "Cancelar"
        if (cancelBtn) {
          cancelBtn.addEventListener("click", function (e) {
            e.preventDefault();
            showAlert("Cambios cancelados", "error");
            setTimeout(() => {
              window.location.href = "profile_store_seller.html";
            }, 2500);
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

    // Mostrar animación
    setTimeout(() => alert.classList.add("show"), 50);

    setTimeout(() => {
      alert.classList.remove("show");
      setTimeout(() => alert.remove(), 400);
      }, 1500); // ← ahora la alerta dura 1.5 segundos
  }
});

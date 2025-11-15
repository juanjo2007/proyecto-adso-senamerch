document.addEventListener("DOMContentLoaded", function () {
  const formContainer = document.querySelector(".edit-profile-client-container");

  if (formContainer) {
    fetch("/frontend/public/views/components/edit_profile_client.html")
      .then((response) => response.text())
      .then((data) => {
        formContainer.innerHTML = data;

        // Seleccionamos el botón "Guardar cambios"
        const saveBtn = formContainer.querySelector(".btn--primary");
        if (saveBtn) {
          saveBtn.addEventListener("click", function (e) {
            e.preventDefault(); // Evita redirección inmediata
            showAlert("Cambios guardados exitosamente", "success");

            // Redirección opcional después de la alerta
            setTimeout(() => {
              window.location.href = "profile_user.html";
            }, 1200); // ⏱ tiempo reducido
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

    // Animación de entrada
    setTimeout(() => alert.classList.add("show"), 50);

    // Desaparición automática
    setTimeout(() => {
      alert.classList.remove("show");
      setTimeout(() => alert.remove(), 400);
    }, 1200); // ⏱ duración más corta
  }
});

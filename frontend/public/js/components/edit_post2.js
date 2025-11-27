document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector(".edit-post-two-two");

  if (form) {
    fetch("/frontend/public/views/components/edit_post2.html")
      .then(response => response.text())
      .then(data => {
        form.innerHTML = data;

        // Botones correctos del componente
        const btnSave = form.querySelector(".edit-post-two__save");    // Guardar cambios
        const btnCancel = form.querySelector(".edit-post-two__cancel"); // Volver

        // 🟢 GUARDAR CAMBIOS → ALERTA + REDIRECCIÓN
        if (btnSave) {
          btnSave.addEventListener("click", (e) => {
            e.preventDefault();
            showAlert("Edición realizada con éxito", "success");

            setTimeout(() => {
              window.location.href = "view_seller_cards.html";
            }, 2500);
          });
        }

        // 🔴 VOLVER → SIN ALERTA, SOLO REDIRECCIÓN
        if (btnCancel) {
          btnCancel.addEventListener("click", (e) => {
            e.preventDefault();
            window.location.href = "view_edit_post6.html";
          });
        }
      })
      .catch(error => console.log("Error cargando el componente:", error));
  }

  // ===== ALERTA (misma que la de publicaciones) =====
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

    // Animación
    setTimeout(() => alert.classList.add("show"), 50);

    // Ocultar después de 1.5s
    setTimeout(() => {
      alert.classList.remove("show");
      setTimeout(() => alert.remove(), 400);
    }, 1500);
  }
});

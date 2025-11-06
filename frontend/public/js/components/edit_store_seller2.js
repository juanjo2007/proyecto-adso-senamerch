document.addEventListener("DOMContentLoaded", () => {
  const formContainer = document.querySelector(".edit_store_seller-two");

  if (!formContainer) {
    console.error("No se encontró el contenedor .edit_store_seller-two");
    return;
  }

  // 🔹 Cargar el contenido del formulario
  fetch("/frontend/public/views/components/edit_store_seller2.html")
    .then(response => response.text())
    .then(data => {
      formContainer.innerHTML = data;
      attachEditStoreEvents(); // ✅ Importante: después de insertar el HTML
    })
    .catch(error => console.error("Error al cargar el formulario:", error));

  // 🔹 Alerta simple (con color según el tipo)
  function showAlert(message, type = "success", duration = 1500) {
    const alert = document.createElement("div");
    alert.classList.add("alert", `alert--${type}`);
    alert.innerHTML = `
      <div class="alert__content">
        <p class="alert__message">${message}</p>
      </div>
    `;
    document.body.appendChild(alert);

    // Mostrar animación
    requestAnimationFrame(() => alert.classList.add("alert--show"));

    // Ocultar después de un tiempo
    setTimeout(() => {
      alert.classList.remove("alert--show");
      setTimeout(() => alert.remove(), 400);
    }, duration);
  }

  // 🔹 Eventos de los botones
  function attachEditStoreEvents() {
    const saveBtn = document.querySelector(".btn--primary");
    const cancelBtn = document.querySelector(".btn-variant2--secondary");

    if (!saveBtn || !cancelBtn) {
      console.error("No se encontraron los botones de acción");
      return;
    }

    saveBtn.addEventListener("click", (e) => {
      e.preventDefault();
      showAlert("Cambios guardados correctamente.", "success");
      setTimeout(() => {
        window.location.href = "profile_store_seller.html";
      }, 2000);
    });

    cancelBtn.addEventListener("click", (e) => {
      e.preventDefault();
      showAlert("Cambios cancelados.", "error");
      setTimeout(() => {
        window.location.href = "profile_store_seller.html";
      }, 2000);
    });
  }
});

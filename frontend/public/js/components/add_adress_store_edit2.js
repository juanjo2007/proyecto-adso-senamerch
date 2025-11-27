document.addEventListener("DOMContentLoaded", function () {
  const direction = document.querySelector(".add-adress-store-edit-two");

  if (direction) {
    fetch("/frontend/public/views/components/add_adress_store_edit2.html")
      .then(response => response.text())
      .then(data => {
        direction.innerHTML = data;
        attachAddressEvents(); // ✅ Se agregan los eventos después de cargar el HTML
      })
      .catch(error => console.log("Error", error));
  }

  // 🔹 Función para mostrar la alerta (con mismo diseño que las anteriores)
  function showAlert(message, type = "success", duration = 1500) {
    const alert = document.createElement("div");
    alert.classList.add("alert", `alert--${type}`);
    alert.innerHTML = `
      <div class="alert__content">
        <p class="alert__message">${message}</p>
      </div>
    `;
    document.body.appendChild(alert);

    // Animación de aparición
    requestAnimationFrame(() => alert.classList.add("alert--show"));

    // Ocultar después del tiempo definido
    setTimeout(() => {
      alert.classList.remove("alert--show");
      setTimeout(() => alert.remove(), 400);
    }, duration);
  }

  // 🔹 Función para manejar los botones
  function attachAddressEvents() {
    const saveBtn = document.querySelector(".btn--primary");
    const returnBtn = document.querySelector(".btn-secundary"); // ✅ SIN ID

    if (!saveBtn) {
      console.error("No se encontró el botón de guardar");
      return;
    }

    // Botón Guardar
    saveBtn.addEventListener("click", (e) => {
      e.preventDefault();
      showAlert("Dirección editada correctamente.", "success");
      setTimeout(() => {
        window.location.href = "edit_store_seller2.html";
      }, 2000);
    });

    // ✅ Botón Volver (solo clase)
    if (returnBtn) {
      returnBtn.addEventListener("click", (e) => {
        e.preventDefault();
        window.location.href = "view_add_adress_store_edit.html";
      });
    }
  }
});

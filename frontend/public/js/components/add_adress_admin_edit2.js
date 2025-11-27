document.addEventListener("DOMContentLoaded", function () {
  const direction = document.querySelector(".add-adress-admin-edit-two");

  if (direction) {
    fetch("/frontend/public/views/components/add_adress_admin_edit2.html")
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

  // 🔹 Función para manejar el botón "Guardar"
  function attachAddressEvents() {
    const saveBtn = document.querySelector(".btn--primary");

    if (!saveBtn) {
      console.error("No se encontró el botón de guardar");
      return;
    }

    saveBtn.addEventListener("click", (e) => {
      e.preventDefault();
      showAlert("Dirección editada correctamente.", "success");
      setTimeout(() => {
        window.location.href = "edit_admin_profile_view2.html";
      }, 2000);
    });
  }
});

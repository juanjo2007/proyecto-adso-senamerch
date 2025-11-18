document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector(".");

  if (form) {
    fetch("/frontend/public/views/components/.html")
      .then(response => response.text())
      .then(data => {
        form.innerHTML = data;
      })
      .catch(error => console.log("Error", error));
  }
});

document.addEventListener("DOMContentLoaded", function () {
  const direction = document.querySelector(".store-admin-form");

  if (direction) {
    fetch("/frontend/public/views/components/store_admin_form.html")
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
      showAlert("Información añadida correctamente.", "success");
      setTimeout(() => {
        window.location.href = "create_store2.html";
      }, 2000);
    });
  }
});

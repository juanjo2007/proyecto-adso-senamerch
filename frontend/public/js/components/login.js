document.addEventListener("DOMContentLoaded", function () {
  const formContainer = document.querySelector(".login-container");

  if (formContainer) {
    fetch("/frontend/public/views/components/login.html")
      .then(response => response.text())
      .then(data => {
        formContainer.innerHTML = data;
        attachLoginEvents();
      })
      .catch(error => console.error("Error al cargar login.html:", error));
  }
});

function attachLoginEvents() {
  const form = document.querySelector(".login__form");

  if (!form) return;

  const userTypeSelect = document.querySelector(".login__input--user-type");
  const passwordInput = document.querySelector(".login__input--password");
  const togglePasswordBtn = document.querySelector(".login__toggle-password");

  // ✅ Mostrar / ocultar contraseña
  if (togglePasswordBtn) {
    togglePasswordBtn.addEventListener("click", function () {
      const isHidden = passwordInput.type === "password";
      passwordInput.type = isHidden ? "text" : "password";
      togglePasswordBtn.textContent = isHidden ? "Ocultar" : "Mostrar";
    });
  }

  // ✅ Evento de envío del formulario
  form.addEventListener("submit", function (event) {
    event.preventDefault();

    const userType = userTypeSelect.value;

    if (!userType) {
      showCustomAlert("Debes seleccionar un tipo de usuario.", "error");
      return;
    }

    // ✅ Mostrar alerta de bienvenida
    showCustomAlert("¡Bienvenido! Iniciaste sesión correctamente.", "success");

    // ⏳ Redirección con retardo
    setTimeout(() => {
      if (userType === "admin") {
        window.location.href = "/frontend/public/views/admin_validation.html";
      } else if (userType === "client") {
        window.location.href = "/frontend/public/views/client_view.html";
      } else if (userType === "seller") {
        window.location.href = "/frontend/public/views/create_store.html";
      }
    }, 2000);
  });
}

// ✅ Alerta visual sin iconos
function showCustomAlert(message, type = "success") {
  const alert = document.createElement("div");
  alert.classList.add("alert", `alert--${type}`);
  alert.innerHTML = `
    <div class="alert__content">
      <p class="alert__message">${message}</p>
    </div>
  `;

  document.body.appendChild(alert);

  // Animación de aparición
  setTimeout(() => {
    alert.classList.add("show");
  }, 50);

  // Tiempo visible
  setTimeout(() => {
    alert.classList.remove("show");
    setTimeout(() => alert.remove(), 300);
  }, 1500);
}

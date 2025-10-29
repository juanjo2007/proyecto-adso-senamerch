document.addEventListener("DOMContentLoaded", function () {
  const formContainer = document.querySelector(".login-container");

  if (formContainer) {
    fetch("/frontend/public/views/components/login.html")
      .then(response => response.text())
      .then(data => {
        formContainer.innerHTML = data;
        attachLoginEvents();
      })
      .catch(error => console.log("Error", error));
  }
});

function attachLoginEvents() {
  const form = document.querySelector(".login__form");

  if (!form) return;

  const userTypeSelect = document.querySelector(".login__input--user-type");
  const passwordInput = document.querySelector(".login__input--password");
  const togglePasswordBtn = document.querySelector(".login__toggle-password");

  // ✅ Mostrar/Ocultar contraseña
  if (togglePasswordBtn) {
    togglePasswordBtn.addEventListener("click", function () {
      if (passwordInput.type === "password") {
        passwordInput.type = "text";
        togglePasswordBtn.textContent = "Ocultar";
      } else {
        passwordInput.type = "password";
        togglePasswordBtn.textContent = "Mostrar";
      }
    });
  }

  // ✅ Evento de envío del formulario
  form.addEventListener("submit", function (event) {
    event.preventDefault();

    const userType = userTypeSelect.value;
    if (!userType) {
      showCustomAlert("⚠️ Debes seleccionar un tipo de usuario.", "error");
      return;
    }

    // ✅ Mostrar alerta de bienvenida
    showCustomAlert("✅ ¡Bienvenido! Iniciaste sesión correctamente.", "success");

    // ⏳ Tiempo antes de redirigir
    const redirectDelay = 2500;

    setTimeout(() => {
      if (userType === "admin") {
        window.location.href = "/frontend/public/views/admin_index.html";
      } else if (userType === "client") {
        window.location.href = "/frontend/public/views/client_view.html";
      } else if (userType === "seller") {
        window.location.href = "/frontend/public/views/seller_view.html";
      }
    }, redirectDelay);
  });
}

// ✅ Alerta visual coherente con el diseño del register
function showCustomAlert(message, type = "success") {
  const alert = document.createElement("div");
  alert.classList.add("alert", `alert--${type}`);
  alert.innerHTML = `
    <div class="alert__content">
      <span class="alert__icon">${type === "success" ? "✔️" : "⚠️"}</span>
      <p class="alert__message">${message}</p>
    </div>
  `;
  document.body.appendChild(alert);

  setTimeout(() => {
    alert.classList.add("show");
  }, 50);

  // Duración visible
  const visibleTime = 2000;
  setTimeout(() => {
    alert.classList.remove("show");
    setTimeout(() => alert.remove(), 400);
  }, visibleTime);
}

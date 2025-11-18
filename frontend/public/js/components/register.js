document.addEventListener("DOMContentLoaded", async () => {
  const container = document.querySelector(".form-container");

  if (!container) {
    console.error("❌ No se encontró el contenedor .form-container");
    return;
  }

  // Cargar el formulario
  try {
    const response = await fetch("/frontend/public/views/components/register.html");
    const html = await response.text();
    container.innerHTML = html;
  } catch (error) {
    console.error("❌ Error al cargar el formulario de registro:", error);
    return;
  }

  // ====== Seleccionar elementos DESPUÉS de cargar el HTML ======
  const form = container.querySelector(".register__form");
  const userType = form.querySelector("select[name='user-type']");
  const passwordInput = form.querySelector("input[name='password']");
  const togglePasswordBtn = form.querySelector(".register__toggle-password");

  // ====== Mostrar / Ocultar contraseña ======
  if (togglePasswordBtn && passwordInput) {
    togglePasswordBtn.addEventListener("click", () => {
      const isHidden = passwordInput.type === "password";
      passwordInput.type = isHidden ? "text" : "password";
      togglePasswordBtn.textContent = isHidden ? "Ocultar" : "Mostrar";
    });
  } else {
    console.warn("⚠ No se encontró el botón o el campo de contraseña.");
  }

  // ===== ALERTA =====
  function showAlert(message, type = "success", duration = 2000) {
    const alert = document.createElement("div");
    alert.classList.add("alert");

    if (type === "success") {
      alert.classList.add("alert--success");
    } else if (type === "error") {
      alert.classList.add("alert--error");
    }

    alert.innerHTML = `
      <div class="alert__content">
        <p class="alert__message">${message}</p>
      </div>
    `;

    document.body.appendChild(alert);

    requestAnimationFrame(() => alert.classList.add("alert--show"));

    setTimeout(() => {
      alert.classList.remove("alert--show");
      setTimeout(() => alert.remove(), 400);
    }, duration);
  }

  // ===== SUBMIT =====
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    if (!userType.value) {
      showAlert("Selecciona un tipo de usuario.", "error");
      return;
    }

    showAlert("Registro completado correctamente.", "success");

    setTimeout(() => {
      const routes = {
        admin: "/frontend/public/views/admin_validation.html",
        seller: "/frontend/public/views/create_store.html",
        client: "/frontend/public/views/client_view.html",
      };
      window.location.href = routes[userType.value];
    }, 2200);
  });
});

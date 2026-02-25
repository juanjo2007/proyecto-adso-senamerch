document.addEventListener("DOMContentLoaded", async () => { 
  const container = document.querySelector(".form-container-two");

  if (!container) {
    console.error("❌ No se encontró el contenedor .form-container-two");
    return;
  }

  // Cargar el formulario
  try {
    const response = await fetch("/frontend/public/views/components/register2.html");
    const html = await response.text();
    container.innerHTML = html;
  } catch (error) {
    console.error("❌ Error al cargar el formulario de registro:", error);
    return;
  }

  // ====== Seleccionar elementos DESPUÉS de cargar el HTML ======
  const form = container.querySelector(".register__form");
  const passwordInput = form.querySelector("input[name='password']");
  const togglePasswordBtn = form.querySelector(".register__toggle-password");
  const backButton = form.querySelector(".btn-secundary");

  // ====== Mostrar / Ocultar contraseña ======
  if (togglePasswordBtn && passwordInput) {
    togglePasswordBtn.addEventListener("click", () => {
      const isHidden = passwordInput.type === "password";
      passwordInput.type = isHidden ? "text" : "password";
      togglePasswordBtn.textContent = isHidden ? "Ocultar" : "Mostrar";
    });
  }

  // ===== Botón Volver =====
  if (backButton) {
    backButton.addEventListener("click", () => {
      window.location.href = "register.html";
    });
  }

  // ===== ALERTA PERSONALIZADA =====
  function showAlert(message, type = "success", duration = 2000) {
    const alert = document.createElement("div");
    alert.classList.add("alert");

    if (type === "success") alert.classList.add("alert--success");
    if (type === "error") alert.classList.add("alert--error");

    alert.innerHTML = `
      <div class="alert__content">
        <p class="alert__message">${message}</p>
      </div>
    `;

    document.body.appendChild(alert);

    // Animación
    requestAnimationFrame(() => alert.classList.add("alert--show"));

    // Remover
    setTimeout(() => {
      alert.classList.remove("alert--show");
      setTimeout(() => alert.remove(), 400);
    }, duration);
  }

  // ===== SUBMIT =====
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    // 💬 Alerta SIEMPRE antes de redirigir
    showAlert("Registro completado con éxito.", "success", 2000);

    // 🔁 Redirección fija a client_view.html
    setTimeout(() => {
      window.location.href = "/frontend/public/views/client_view.html";
    }, 2200);
  });
});

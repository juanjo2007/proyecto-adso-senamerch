document.addEventListener("DOMContentLoaded", async () => {
  const container = document.querySelector(".forgot-password");

  if (!container) return;

  try {
    const response = await fetch("/frontend/public/views/components/forgot_password.html");
    const html = await response.text();
    container.innerHTML = html;

    // === Aseguramos que el input esté habilitado inmediatamente ===
    const input = container.querySelector(".forgot__input");
    if (input) {
      input.disabled = false;
      input.style.pointerEvents = "auto";
      input.focus(); // permite escribir de inmediato
    }

    // === Contenedor de alerta reutilizable ===
    let alertContainer = document.querySelector(".alert");
    if (!alertContainer) {
      alertContainer = document.createElement("div");
      alertContainer.classList.add("alert");
      document.body.appendChild(alertContainer);
    }

    // === Función para mostrar alertas con estilos del sistema ===
    const showAlert = (message, duration = 2000, type = "success") => {
      alertContainer.className = "alert";
      alertContainer.classList.add(
        type === "success" ? "alert--success" : "alert--error"
      );
      alertContainer.innerHTML = `<p class="alert__message">${message}</p>`;
      alertContainer.classList.add("alert--show");
      setTimeout(() => alertContainer.classList.remove("alert--show"), duration);
    };

    // === Evento del formulario ===
    const form = container.querySelector(".forgot__form");
    if (form) {
      form.addEventListener("submit", (e) => {
        e.preventDefault();
        const email = input.value.trim();

        if (email === "") {
          showAlert("Por favor ingresa tu correo electrónico", 2000, "error");
          input.focus();
          return;
        }

        showAlert("Código enviado exitosamente", 2000, "success");

        // Redirige después del mensaje
        setTimeout(() => {
          window.location.href = "code_verify.html";
        }, 2300);
      });
    }
  } catch (err) {
    console.error("Error al cargar el componente:", err);
  }
});

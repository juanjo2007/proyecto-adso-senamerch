document.addEventListener("DOMContentLoaded", () => {
  const container = document.querySelector(".form-container");

  // ✅ Inserta dinámicamente el formulario
  container.innerHTML = `
    <div class="register">
      <h1 class="register__title">Completa los datos para crear tu cuenta</h1>

      <form class="register__form">
        <div class="register__grid">
          <div class="register__column">
            <div class="register__field">
              <label class="register__label">Correo electrónico</label>
              <input class="register__input" type="email" name="email" required />
              <small class="register__text">Recibirás información de tu cuenta.</small>
            </div>

            <div class="register__field">
              <label class="register__label">Nombre</label>
              <input class="register__input" type="text" name="name" required />
              <small class="register__text">Se mostrará a las personas que interactúen contigo.</small>
            </div>

            <div class="register__field">
              <label class="register__label">Tipo de usuario</label>
              <select class="register__input" name="user-type" required>
                <option value="">Selecciona...</option>
                <option value="client">Cliente</option>
                <option value="seller">Vendedor</option>
                <option value="admin">Administrador</option>
              </select>
              <small class="register__text">Selecciona el tipo de usuario que serás.</small>
            </div>
          </div>

          <div class="register__column">
            <div class="register__field">
              <label class="register__label">Departamento</label>
              <select class="register__input" name="department" required>
                <option value="">Selecciona...</option>
                <option value="Risaralda">Risaralda</option>
                <option value="Quindio">Quindío</option>
                <option value="Caldas">Caldas</option>
              </select>
              <small class="register__text">Así podrás interactuar con locales de tu zona.</small>
            </div>

            <div class="register__field">
              <label class="register__label">Dirección</label>
              <a href="/frontend/public/views/add_adress.html" class="register__link">Agregar dirección</a>
              <small class="register__text">Los clientes estarán más cerca de ti.</small>
            </div>

            <div class="register__field register__field--password">
              <label class="register__label">Contraseña</label>
              <div class="register__password-wrapper">
                <input class="register__input" type="password" name="password" required />
                <button type="button" class="register__toggle-password">Mostrar</button>
              </div>
              <small class="register__text">Mantén tu cuenta segura con una buena contraseña.</small>
            </div>
          </div>
        </div>

        <div class="register__actions">
          <button type="submit" class="btn btn--primary">Registrar</button>
        </div>
      </form>
    </div>
  `;

  // ✅ Variables
  const form = document.querySelector(".register__form");
  const userType = form.querySelector("select[name='user-type']");
  const passwordInput = form.querySelector("input[name='password']");
  const togglePasswordBtn = form.querySelector(".register__toggle-password");

  // ✅ Mostrar / Ocultar contraseña
  togglePasswordBtn.addEventListener("click", () => {
    const isHidden = passwordInput.type === "password";
    passwordInput.type = isHidden ? "text" : "password";
    togglePasswordBtn.textContent = isHidden ? "Ocultar" : "Mostrar";
  });

  // ✅ Alerta negra profesional (centrada y animada)
  function showAlert(message, duration = 2500) {
    const alert = document.createElement("div");
    alert.classList.add("alert");
    alert.innerHTML = `
      <p class="alert__message">${message}</p>
      <div class="alert__progress"></div>
    `;
    document.body.appendChild(alert);

    // Mostrar animación
    requestAnimationFrame(() => {
      alert.classList.add("alert--show");
    });

    // Ocultar después del tiempo definido
    setTimeout(() => {
      alert.classList.remove("alert--show");
      setTimeout(() => alert.remove(), 400);
    }, duration);
  }

  // ✅ Evento de envío
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    if (!userType.value) {
      showAlert("Selecciona un tipo de usuario.");
      return;
    }

    showAlert("Cuenta creada satisfactoriamente");

    setTimeout(() => {
      const routes = {
        client: "/frontend/public/views/client_view.html",
        seller: "/frontend/public/views/create_store.html",
        admin: "/frontend/public/views/admin_index.html",
      };
      window.location.href = routes[userType.value] ?? "/frontend/public/views/login.html";
    }, 2600);
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const adminContainer = document.querySelector(".admin-panel");

  if (adminContainer) {
    fetch("/frontend/public/views/components/admin_validation.html")
      .then(response => {
        if (!response.ok) throw new Error("Error al cargar admin_validation.html");
        return response.text();
      })
      .then(html => {
        adminContainer.innerHTML = html;

        // === Lógica de validación ===
        const form = adminContainer.querySelector(".admin-panel__form");
        const input = adminContainer.querySelector(".admin-panel__input");
        const message = adminContainer.querySelector(".admin-panel__message");

        form.addEventListener("submit", (e) => {
          e.preventDefault();
          const code = input.value.trim();
          const validCode = "1234"; // 🔐 Código secreto real

          message.classList.remove(
            "admin-panel__message--hidden",
            "admin-panel__message--error",
            "admin-panel__message--success"
          );

          if (code === validCode) {
            message.textContent = "Código correcto. Redirigiendo al panel...";
            message.classList.add("admin-panel__message--success");

            setTimeout(() => {
              window.location.href = "/frontend/public/views/wiews_users_admin.html";
            }, 1500);
          } else {
            message.textContent = "Código incorrecto. Redirigiendo a inicio...";
            message.classList.add("admin-panel__message--error");

            setTimeout(() => {
              window.location.href = "/frontend/public/views/index.html";
            }, 2000);
          }
        });
      })
      .catch(error => console.error("Error:", error));
  }
});

document.addEventListener("DOMContentLoaded", function () {
  const direction = document.querySelector(".publications-gestor-two");

  if (direction) {
    fetch("/frontend/public/views/components/publications_gestor2.html")
      .then(response => response.text())
      .then(data => {
        direction.innerHTML = data;

        const publishBtn = direction.querySelector(".btn--primary");
        const cancelBtn = direction.querySelector(".btn-secundary");

        // 🔵 Botón primario → view_seller_cards.html
        if (publishBtn) {
          publishBtn.addEventListener("click", (e) => {
            e.preventDefault();
            showAlert("Publicación creada exitosamente", "success");
            setTimeout(() => {
              window.location.href = "view_seller_cards.html";
            }, 2500);
          });
        }

        // 🔴 Botón secundario → publications_gestor.html
        if (cancelBtn) {
          cancelBtn.addEventListener("click", (e) => {
            e.preventDefault();
            showAlert("Publicación cancelada", "error");
            setTimeout(() => {
              window.location.href = "publications_gestor.html";
            }, 2500);
          });
        }
      })
      .catch((error) => console.error("Error al cargar las publicaciones:", error));
  }

  // ===== FUNCIÓN DE ALERTA =====
  function showAlert(message, type = "success") {
    const existingAlert = document.querySelector(".alert");
    if (existingAlert) existingAlert.remove();

    const alert = document.createElement("div");
    alert.className = `alert alert--${type}`;

    alert.innerHTML = `
      <div class="alert__content">
        <p class="alert__message">${message}</p>
      </div>
    `;

    document.body.appendChild(alert);

    // Animación de aparición
    setTimeout(() => alert.classList.add("show"), 50);

    // Ocultar después de 2.5s
    setTimeout(() => {
      alert.classList.remove("show");
      setTimeout(() => alert.remove(), 400);
    }, 1500);
  }
});

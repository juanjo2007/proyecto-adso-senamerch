document.addEventListener("DOMContentLoaded", function () { 
  const form = document.querySelector(".publications-gestor");

  if (form) {
    fetch("/frontend/public/views/components/publications_gestor.html")
      .then(response => response.text())
      .then(data => {
        form.innerHTML = data;

        // ✅ Agregar eventos después de insertar el contenido
        attachCreatePostEvents();
      })
      .catch(error => console.log("Error al cargar el componente:", error));
  }

  // === Función que agrega los eventos ===
  function attachCreatePostEvents() {
    const cancelBtn = document.querySelector(".create-product-post-one__cancel");
    const continueBtn = document.querySelector(".create-product-post-one__continue");

    // 🟠 CANCELAR → ALERTA + redirección a view_seller_cards.html
    if (cancelBtn) {
      cancelBtn.addEventListener("click", (e) => {
        e.preventDefault();

        showAlert("Creación cancelada", "error");

        setTimeout(() => {
          window.location.href = "view_seller_cards.html";
        }, 2500);
      });
    }

    // 🔵 CONTINUAR → ir a view_publications_gestor3.html
    if (continueBtn) {
      continueBtn.addEventListener("click", (e) => {
        e.preventDefault();
        window.location.href = "view_publications_gestor3.html";
      });
    }
  }

  // === FUNCIÓN DE ALERTA ===
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

    // Animación de entrada
    setTimeout(() => alert.classList.add("show"), 50);

    // Ocultar después de 1.5s
    setTimeout(() => {
      alert.classList.remove("show");
      setTimeout(() => alert.remove(), 400);
    }, 1500);
  }
});

document.addEventListener('DOMContentLoaded', function () {
  const createStoreContainer = document.querySelector('.create-store-container-two');

  if (!createStoreContainer) {
    console.warn("⚠️ No se encontró '.create-store-container-two' en el HTML.");
    return;
  }

  fetch("/frontend/public/views/components/create_store2.html")
    .then(response => {
      if (!response.ok) throw new Error("Error al cargar create_store2.html");
      return response.text();
    })
    .then(data => {
      createStoreContainer.innerHTML = data;

      const createButton = createStoreContainer.querySelector(".create-store__buttons .btn--primary");
      const backButton = createStoreContainer.querySelector(".create-store__gestor");

      // Crear contenedor de alerta si no existe
      let alertContainer = document.querySelector(".alert");
      if (!alertContainer) {
        alertContainer = document.createElement("div");
        alertContainer.classList.add("alert");
        document.body.appendChild(alertContainer);
      }

      // Función alerta
      function showAlert(message, duration = 2000, type = "success") {
        if (!alertContainer) return;

        // Limpiar clases previas
        alertContainer.className = "alert";

        // Asignar color según tipo
        alertContainer.classList.add(type === "error" ? "alert--error" : "alert--success");

        // Mostrar mensaje
        alertContainer.innerHTML = `<p class="alert__message">${message}</p>`;
        alertContainer.classList.add("alert--show");

        // Ocultar después del tiempo indicado
        setTimeout(() => {
          alertContainer.classList.remove("alert--show");
        }, duration);
      }

      // Acción del botón "Crear Tienda"
      if (createButton) {
        createButton.addEventListener("click", function (e) {
          e.preventDefault();
          showAlert("Tienda creada exitosamente", 2000, "success");

          // Redirección después de la alerta
          setTimeout(() => {
            window.location.href = "profile_store_seller.html";
          }, 2500);
        });
      } else {
        console.warn("⚠️ No se encontró el botón 'Crear Tienda'.");
      }

      // Acción del botón "Volver"
      if (backButton) {
        backButton.addEventListener("click", function () {
          window.location.href = "create_store.html"; // Redirección a create_store.html
        });
      } else {
        console.warn("⚠️ No se encontró el botón 'Volver'.");
      }
    })
    .catch(error => console.error("Error cargando el componente Create Store:", error));
});

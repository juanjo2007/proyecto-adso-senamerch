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

      // Crear contenedor de alerta si no existe
      let alertContainer = document.querySelector(".alert");
      if (!alertContainer) {
        alertContainer = document.createElement("div");
        alertContainer.classList.add("alert");
        document.body.appendChild(alertContainer);
      }

      // Función alerta
      function showAlert(message, duration = 1500, type = "success") {
        if (!alertContainer) return;

        alertContainer.className = "alert"; // limpia clases previas
        if (type === "error") alertContainer.classList.add("alert--error");

        alertContainer.innerHTML = `<p class="alert__message">${message}</p>`;
        alertContainer.classList.add("alert--show");

        setTimeout(() => {
          alertContainer.classList.remove("alert--show");
        }, duration);
      }

      if (createButton) {
        createButton.addEventListener("click", function (e) {
          e.preventDefault();
          showAlert("Tienda creada exitosamente", 1500, "success");
          setTimeout(() => {
            window.location.href = "profile_store_seller.html";
          }, 2600);
        });
      } else {
        console.warn("No se encontró el botón 'Crear Tienda'.");
      }
    })
    .catch(error => console.error("Error cargando el componente Create Store:", error));
});

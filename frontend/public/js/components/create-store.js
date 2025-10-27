// ================== CREATE STORE COMPONENT ==================
document.addEventListener('DOMContentLoaded', function () {
  const createStoreContainer = document.querySelector('.create-store-container');

  if (createStoreContainer) {
    fetch("/frontend/public/views/components/create-store.html")
      .then(response => {
        if (!response.ok) throw new Error("Error al cargar create-store.html");
        return response.text();
      })
      .then(data => {
        createStoreContainer.innerHTML = data;

        // Selecciona el botón de crear tienda
        const createButton = createStoreContainer.querySelector(".create-store__buttons .btn--primary");

        if (createButton) {
          createButton.addEventListener("click", function (e) {
            e.preventDefault(); // evita redirección inmediata

            // Si ya existe un mensaje, no crees otro
            if (document.querySelector(".create-store__overlay")) return;

            // Crear overlay oscuro
            const overlay = document.createElement("div");
            overlay.classList.add("create-store__overlay");

            // Crear mensaje centrado
            const messageBox = document.createElement("div");
            messageBox.classList.add("create-store__message-box");
            messageBox.textContent = "TIENDA CREADA CON ÉXITO";

            // Agregar al body
            overlay.appendChild(messageBox);
            document.body.appendChild(overlay);

            // Animación + redirección después de 2.5s
            setTimeout(() => {
              overlay.classList.add("fade-out");
              setTimeout(() => {
                overlay.remove();
                window.location.href = "profile_store_seller.html";
              }, 500);
            }, 2500);
          });
        } else {
          console.warn("No se encontró el botón 'Crear Tienda'.");
        }
      })
      .catch(error => console.error("Error cargando el componente Create Store:", error));
  } else {
    console.warn("No se encontró '.create-store-container' en el HTML.");
  }
});

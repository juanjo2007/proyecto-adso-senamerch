document.addEventListener("DOMContentLoaded", function () {
  const container = document.querySelector(".create-store-container");

  if (container) {
    fetch("/frontend/public/views/components/create_store.html")
      .then((response) => response.text())
      .then((data) => {
        container.innerHTML = data;
      })
      .catch((error) => console.error("Error cargando contacto:", error));
  }
});


document.addEventListener("DOMContentLoaded", function () { 
  const form = document.querySelector(".create-store-container");

  if (form) {
    fetch("/frontend/public/views/components/create_store.html")
      .then(response => response.text())
      .then(data => {
        form.innerHTML = data;

        // ✅ Agregar eventos después de insertar el contenido
        attachEditPostEvents();
      })
      .catch(error => console.log("Error al cargar el componente:", error));
  }

  // === Función que agrega los eventos ===
  function attachEditPostEvents() {
    const cancelBtn = document.querySelector(".create-store-one__gestor");
    const saveBtn = document.querySelector(".create-store-one__continue");

    // 🟢 Botón secundario → ir a view_seller_cards.html
    if (cancelBtn) {
      cancelBtn.addEventListener("click", (e) => {
        e.preventDefault();
        window.location.href = "register.html";
      });
    }

    // 🔵 Botón primario → ir a view_edit_post2.html
    if (saveBtn) {
      saveBtn.addEventListener("click", (e) => {
        e.preventDefault();
        window.location.href = "create_store2.html";
      });
    }
  }
});

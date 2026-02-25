document.addEventListener("DOMContentLoaded", function () { 
  const form = document.querySelector(".add-adress-store");

  if (form) {
    fetch("/frontend/public/views/components/add_adress_store.html")
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
    const saveBtn = document.querySelector(".btn--primary");
    const returnBtn = document.querySelector(".btn-secundary"); // <- SIN ID

    // 🔵 Botón Siguiente → va a view_add_adress_store2.html
    if (saveBtn) {
      saveBtn.addEventListener("click", (e) => {
        e.preventDefault();
        window.location.href = "view_add_adress_store2.html";
      });
    }

    // 🔙 Botón Volver → va a create_store2.html
    if (returnBtn) {
      returnBtn.addEventListener("click", (e) => {
        e.preventDefault();
        window.location.href = "create_store2.html";
      });
    }
  }
});

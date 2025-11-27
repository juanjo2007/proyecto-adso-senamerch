document.addEventListener("DOMContentLoaded", function () { 
  const form = document.querySelector(".add-adress-store-edit");

  if (form) {
    fetch("/frontend/public/views/components/add_adress_store_edit.html")
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
    const returnBtn = document.querySelector(".btn-secundary"); // ✅ SIN ID

    // 🔵 Botón Siguiente
    if (saveBtn) {
      saveBtn.addEventListener("click", (e) => {
        e.preventDefault();
        window.location.href = "view_add_adress_store_edit2.html";
      });
    }

    // 🔙 Botón Volver → ir a edit_store_seller2.html
    if (returnBtn) {
      returnBtn.addEventListener("click", (e) => {
        e.preventDefault();
        window.location.href = "edit_store_seller2.html"; // ✅ ESTA ES LA DIRECCIÓN QUE PEDISTE
      });
    }
  }
});

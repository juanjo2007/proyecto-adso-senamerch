document.addEventListener("DOMContentLoaded", function () { 
  const form = document.querySelector(".add-adress-seller-edit");

  if (form) {
    fetch("/frontend/public/views/components/add_adress_seller_edit.html")
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
    const returnBtn = document.querySelector(".btn-secundary"); // ← botón Volver

    // Botón Guardar → view_add_adress_seller_edit2.html
    if (saveBtn) {
      saveBtn.addEventListener("click", (e) => {
        e.preventDefault();
        window.location.href = "view_add_adress_seller_edit2.html";
      });
    }

    // Botón Volver → edit_seller_profile_view2.html
    if (returnBtn) {
      returnBtn.addEventListener("click", (e) => {
        e.preventDefault();
        window.location.href = "edit_seller_profile_view2.html";
      });
    }
  }
});

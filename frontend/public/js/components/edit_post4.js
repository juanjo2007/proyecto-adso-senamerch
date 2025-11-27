document.addEventListener("DOMContentLoaded", function () { 
  const form = document.querySelector(".edit-post-four");

  if (form) {
    fetch("/frontend/public/views/components/edit_post4.html")
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
    const cancelBtn = document.querySelector(".edit-post-two__cancel");
    const saveBtn = document.querySelector(".edit-post-two__save");

    // 🟢 Botón secundario → ir a view_seller_cards.html
    if (cancelBtn) {
      cancelBtn.addEventListener("click", (e) => {
        e.preventDefault();
        window.location.href = "view_edit_post3.html";
      });
    }

    // 🔵 Botón primario → ir a view_edit_post2.html
    if (saveBtn) {
      saveBtn.addEventListener("click", (e) => {
        e.preventDefault();
        window.location.href = "view_edit_post6.html";
      });
    }
  }
});

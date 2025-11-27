document.addEventListener("DOMContentLoaded", function () { 
  const form = document.querySelector(".add-adress");

  if (form) {
    fetch("/frontend/public/views/components/add_adress.html")
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
    // 🔵 Botón primario → ir a view_edit_post2.html
    if (saveBtn) {
      saveBtn.addEventListener("click", (e) => {
        e.preventDefault();
        window.location.href = "add_adress2.html";
      });
    }
  }
});

document.addEventListener("DOMContentLoaded", function () { 
  const form = document.querySelector(".form-container");

  if (form) {
    fetch("/frontend/public/views/components/register.html")
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
        window.location.href = "register2.html";
      });
    }
  }
});

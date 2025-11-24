document.addEventListener("DOMContentLoaded", function () { 
  const form = document.querySelector(".publications-gestor-four");

  if (form) {
    fetch("/frontend/public/views/components/publications_gestor4.html")
      .then(response => response.text())
      .then(data => {
        form.innerHTML = data;

        // ✅ Agregar eventos después de insertar el contenido
        attachCreatePostEvents();
      })
      .catch(error => console.log("Error al cargar el componente:", error));
  }

  // === Función que agrega los eventos ===
  function attachCreatePostEvents() {
    const cancelBtn = document.querySelector(".create-post__cancel");
    const continueBtn = document.querySelector(".create-post__continue");

    // 🟠 Botón secundario → view_seller_cards.html
    if (cancelBtn) {
      cancelBtn.addEventListener("click", (e) => {
        e.preventDefault();
        window.location.href = "view_publications_gestor4.html";
      });
    }

    // 🔵 Botón primario → view_publications_gestor2.html
    if (continueBtn) {
      continueBtn.addEventListener("click", (e) => {
        e.preventDefault();
        window.location.href = "view_publications_gestor5.html";
      });
    }
  }
});

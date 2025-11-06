document.addEventListener("DOMContentLoaded", function (){
  const form = document.querySelector(".edit-post-two");

  if(form){
    fetch("/frontend/public/views/components/edit_post2.html")
      .then(response => response.text())
      .then(data => {
        form.innerHTML = data;

        // === Seleccionar botones ===
        const btnSave = form.querySelector(".btn--primary");
        const btnCancel = form.querySelector(".btn-variant2--secondary");

        // === FUNCIÓN ALERTA (mismo diseño de las anteriores) ===
        function showAlert(message, type = "success") {
          const existingAlert = document.querySelector(".alert");
          if (existingAlert) existingAlert.remove();

          const alert = document.createElement("div");
          alert.className = `alert alert--${type}`;
          alert.innerHTML = `
            <div class="alert__content">
              <p class="alert__message">${message}</p>
            </div>
          `;

          document.body.appendChild(alert);

          // Mostrar animación
          setTimeout(() => alert.classList.add("alert--show"), 50);

          // Ocultar después de 1.5s
          setTimeout(() => {
            alert.classList.remove("alert--show");
            setTimeout(() => alert.remove(), 300);
          }, 1500);
        }

        // === Evento: Guardar cambios ===
        if (btnSave) {
          btnSave.addEventListener("click", function(e) {
            e.preventDefault();
            showAlert("Producto editado correctamente", "success");
            setTimeout(() => {
              window.location.href = "view_seller_cards.html";
            }, 1500);
          });
        }

        // === Evento: Cancelar ===
        if (btnCancel) {
          btnCancel.addEventListener("click", function(e) {
            e.preventDefault();
            showAlert("Cambios cancelados", "error");
            setTimeout(() => {
              window.location.href = "view_seller_cards.html";
            }, 1500);
          });
        }

      })
      .catch(error => console.log("Error", error));
  } 
});

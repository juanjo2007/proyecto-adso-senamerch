document.addEventListener("DOMContentLoaded", function () {
  const direction = document.querySelector(".add-adress-seller-edit-two");

  if (direction) {
    fetch("/frontend/public/views/components/add_adress_seller_edit2.html")
      .then(response => response.text())
      .then(data => {
        direction.innerHTML = data;
        attachAddressEvents(); // ✅ Agregamos los eventos después de cargar el HTML
      })
      .catch(error => console.log("Error", error));
  }

  // 🔹 Función para mostrar la alerta
  function showAlert(message, type = "success", duration = 1500) {
    const alert = document.createElement("div");
    alert.classList.add("alert", `alert--${type}`);
    alert.innerHTML = `
      <div class="alert__content">
        <p class="alert__message">${message}</p>
      </div>
    `;
    document.body.appendChild(alert);

    requestAnimationFrame(() => alert.classList.add("alert--show"));

    setTimeout(() => {
      alert.classList.remove("alert--show");
      setTimeout(() => alert.remove(), 400);
    }, duration);
  }

  // 🔹 Función para manejar botones Guardar y Volver
  function attachAddressEvents() {
    const saveBtn = document.querySelector(".btn--primary");
    const returnBtn = document.querySelector(".btn-secundary"); // ← botón Volver

    // Botón Guardar → edit_seller_profile_view2.html
    if (saveBtn) {
      saveBtn.addEventListener("click", (e) => {
        e.preventDefault();
        showAlert("Dirección editada correctamente.", "success");
        setTimeout(() => {
          window.location.href = "edit_seller_profile_view2.html";
        }, 2000);
      });
    }

    // Botón Volver → view_add_adress_seller_edit.html
    if (returnBtn) {
      returnBtn.addEventListener("click", (e) => {
        e.preventDefault();
        window.location.href = "view_add_adress_seller_edit.html";
      });
    }
  }
});

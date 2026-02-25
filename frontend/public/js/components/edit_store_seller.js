document.addEventListener("DOMContentLoaded", function () { 
  const formContainer = document.querySelector(".edit-store-seller-container");

  if (formContainer) {
    fetch("/frontend/public/views/components/edit_store_seller.html")
      .then((response) => response.text())
      .then((data) => {
        formContainer.innerHTML = data;

        const saveBtn = formContainer.querySelector(".btn--primary");
        const cancelBtn = formContainer.querySelector(".edit-store-seller-one__cancel"); // ✅ corregido

        // Botón "Guardar"
        if (saveBtn) {
          saveBtn.addEventListener("click", function (e) {
            e.preventDefault();
            window.location.href = "edit_store_seller2.html";
          });
        }

        // Botón "Volver"
        if (cancelBtn) {
          cancelBtn.addEventListener("click", function (e) {
            e.preventDefault();
            window.location.href = "profile_store_seller.html";
          });
        }
      })
      .catch((error) => console.error("Error al cargar el formulario:", error));
  }
});

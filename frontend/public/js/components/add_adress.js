document.addEventListener("DOMContentLoaded", function () { 
  
  const form = document.querySelector(".add-adress");

  if (form) {
    fetch("/frontend/public/views/components/add_adress.html")
      .then(response => response.text())
      .then(data => {
        form.innerHTML = data;

        attachAddressEvents(form);
      })
      .catch(error => console.log("Error al cargar componente:", error));
  }

  function attachAddressEvents(container) {
    const backBtn = container.querySelector(".btn-secundary");
    const nextBtn = container.querySelector(".address-store-form__continue");

    if (!backBtn || !nextBtn) {
      console.error("Botones no encontrados en:", container);
      return;
    }

    // ← botón VOLVER
    backBtn.addEventListener("click", (e) => {
      e.preventDefault();
      window.location.href = "register.html";
    });

    // → botón SIGUIENTE
    nextBtn.addEventListener("click", (e) => {
      e.preventDefault();
      window.location.href = "add_adress2.html";
    });
  }
});

document.addEventListener('DOMContentLoaded', function () {
  const methodContainer = document.querySelector('.payment-method-container');

  if (methodContainer) {
    fetch("/frontend/public/views/components/option_payment_method.html")
      .then(response => {
        if (!response.ok) throw new Error("Error al cargar option_payment_method.html");
        return response.text();
      })
      .then(data => {
        methodContainer.innerHTML = data;

        // === Opciones de método de pago ===
        const options = methodContainer.querySelectorAll(".payment-method__option");
        const payButton = methodContainer.querySelector(".payment-method__pay"); // 🔥 Botón pagar

        options.forEach(option => {
          option.addEventListener("click", () => {
            // Quita la selección de todas
            options.forEach(o => o.classList.remove("selected"));
            // Marca la que clicaste
            option.classList.add("selected");
          });
        });

        // === 🔥 Evento: botón "Pagar" redirige a details.html ===
        if (payButton) {
          payButton.addEventListener("click", () => {
            window.location.href = "details.html";
          });
        }

      })
      .catch(error => console.error("Error cargando el componente Payment Method:", error));
  } else {
    console.warn("No se encontró '.payment-method-container' en el HTML.");
  }
});

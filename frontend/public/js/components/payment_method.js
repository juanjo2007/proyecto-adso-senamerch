document.addEventListener('DOMContentLoaded', function () {
  const methodContainer = document.querySelector('.payment-method-container');

  if (methodContainer) {
    fetch("/frontend/public/views/components/option_payment_method.html")
      .then(response => {
        if (!response.ok) throw new Error("Error al cargar payment_method.html");
        return response.text();
      })
      .then(data => {
        methodContainer.innerHTML = data;
      })
      .catch(error => console.error("Error cargando el componente Payment Method:", error));
  } else {
    console.warn("No se encontró '.payment-method-container' en el HTML.");
  }
});

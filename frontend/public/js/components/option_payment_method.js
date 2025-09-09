document.addEventListener('DOMContentLoaded', function () {
  const optionContainer = document.querySelector('.payment-option-container');

  if (optionContainer) {
    fetch("/frontend/public/views/components/option_payment_method.html")
      .then(response => {
        if (!response.ok) throw new Error("Error al cargar option_payment_method.html");
        return response.text();
      })
      .then(data => {
        optionContainer.innerHTML = data;
      })
      .catch(error => console.error("Error cargando el componente Payment Method:", error));
  } else {
    console.warn("No se encontró '.payment-option-container' en el HTML.");
  }
});

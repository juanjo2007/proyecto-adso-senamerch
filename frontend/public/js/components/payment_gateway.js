// ================== PAYMENT GATEWAY COMPONENT ==================
document.addEventListener('DOMContentLoaded', function () {
  const paymentGatewayContainer = document.querySelector('.payment-gateway-container');

  if (paymentGatewayContainer) {
    fetch("/frontend/public/views/components/payment_gateway.html")
      .then(response => {
        if (!response.ok) throw new Error("Error al cargar payment_gateway.html");
        return response.text();
      })
      .then(data => {
        paymentGatewayContainer.innerHTML = data;

        // 👉 Inicializar funciones internas (ej: buscador)
        initPaymentGateway();
      })
      .catch(error => console.error("Error cargando el componente Payment Gateway:", error));
  } else {
    console.warn("No se encontró '.payment-gateway-container' en el HTML.");
  }
});


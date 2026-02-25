// ================== FOOTER COMPONENT ================== 
document.addEventListener('DOMContentLoaded', function () {
  const footerContainer = document.querySelector('.footer-container');

  if (footerContainer) {
    fetch("/frontend/public/views/components/footer.html")
      .then(response => {
        if (!response.ok) throw new Error("Error al cargar footer.html");
        return response.text();
      })
      .then(data => {
        footerContainer.innerHTML = data;
      })
      .catch(error => console.error("Error cargando el componente Footer:", error));
  } else {
    console.warn("No se encontró '.footer-container' en el HTML.");
  }
});

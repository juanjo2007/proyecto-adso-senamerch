// ================== PRODUCTS COMPONENT ==================
document.addEventListener('DOMContentLoaded', function () {
  // Seleccionamos el contenedor principal del componente Productos
  const productsContainer = document.querySelector('.products-container');

  // Verificamos si el contenedor existe en el DOM
  if (productsContainer) {
    // Cargamos el componente HTML de Productos de forma dinámica
    fetch("/frontend/public/views/components/products.html")
      .then(response => {
        // Validamos si la respuesta fue exitosa
        if (!response.ok) throw new Error("Error al cargar products.html");
        return response.text();
      })
      .then(data => {
        // Insertamos el contenido del archivo HTML dentro del contenedor
        productsContainer.innerHTML = data;
      })
      .catch(error => console.error("Error cargando el componente Products:", error));
  } else {
    // Mensaje de advertencia si el contenedor no se encuentra
    console.warn("No se encontró '.products-container' en el HTML.");
  }
});

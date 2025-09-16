// /frontend/public/js/components/card.js
export async function loadCards(containerSelector) {
  // Obtenemos el contenedor del DOM
  const container = document.querySelector(containerSelector);

  if (!container) return; // Si no existe, nos salimos

  try {
    // Hacemos dos fetch en paralelo
    const [templateRes, dataRes] = await Promise.all([
      fetch("/frontend/public/views/components/card.html"), 
      fetch("/frontend/public/data/cards.json"),            
    ]);

    if (!templateRes.ok || !dataRes.ok) {
      throw new Error("Error al cargar el componente o los datos");
    }

    // Convertir las respuestas
    const template = await templateRes.text();
    const products = await dataRes.json();

    // Recorremos los productos y reemplazamos los placeholders
    products.forEach(product => {
      let html = template
        .replace("{{image}}", product.image)
        .replace("{{name}}", product.name)
        .replace("{{price}}", product.price);

      // Insertamos cada card en el contenedor
      container.insertAdjacentHTML("beforeend", html);
    });

  } catch (error) {
    console.error("Error cargando los cards:", error);
  }
}

export async function loadProductCards(containerSelector) {
  const container = document.querySelector(containerSelector);
  if (!container) return;

  try {
    const [templateRes, dataRes] = await Promise.all([
      fetch("/frontend/public/views/components/product_card.html"),
      fetch("/frontend/public/data/products.json"),
    ]);

    if (!templateRes.ok || !dataRes.ok) {
      throw new Error("Error al cargar el componente o los datos");
    }

    const template = await templateRes.text();
    const products = await dataRes.json();

    products.forEach(product => {
      let html = template
        .replaceAll("{{name}}", product.name)
        .replaceAll("{{price}}", product.price)
        .replaceAll("{{discount}}", product.discount)
        .replaceAll("{{image}}", product.image)
        .replaceAll("{{store_logo}}", product.store_logo)
        .replaceAll("{{store_name}}", product.store_name);

      container.insertAdjacentHTML("beforeend", html);
    });

  } catch (error) {
    console.error("Error cargando las cards:", error);
  }
}

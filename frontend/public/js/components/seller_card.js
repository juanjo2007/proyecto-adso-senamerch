export async function loadSellercards(containerSelector) {
  const container = document.querySelector(containerSelector);
  if (!container) return;

  try {
    const [templateRes, dataRes] = await Promise.all([
      fetch("/frontend/public/views/components/seller_card.html"),
      fetch("/frontend/public/data/seller_cards.json"),
    ]);

    if (!templateRes.ok || !dataRes.ok) {
      throw new Error("Error al cargar el componente o los datos");
    }

    const template = await templateRes.text();
    const products = await dataRes.json();

    products.forEach((sellercard) => {
      let html = template
        .replaceAll("{{image}}", sellercard.image)
        .replaceAll("{{name}}", sellercard.name)
        .replaceAll("{{price}}", sellercard.price);

      container.insertAdjacentHTML("beforeend", html);
    });

    // === Agregar eventos una vez insertadas las cards ===
    const descriptionButtons = container.querySelectorAll(".card-seller__description");
    const editButtons = container.querySelectorAll(".card-seller__edit");

    // 🔹 Botón primario → Descripción
    descriptionButtons.forEach((btn) => {
      btn.addEventListener("click", () => {
        window.location.href = "view_description_product_seller.html";
      });
    });

    // 🔹 Botón secundario → Gestor de publicaciones
    editButtons.forEach((btn) => {
      btn.addEventListener("click", () => {
        window.location.href = "view_edit_post.html";
      });
    });

  } catch (error) {
    console.error("Error cargando las cards:", error);
  }
}

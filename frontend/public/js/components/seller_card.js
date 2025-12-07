import { initCommentsSidebar } from "/frontend/public/js/components/comments.js";

export async function loadSellercards(containerSelector) {
  const container = document.querySelector(containerSelector);
  if (!container) return;

  try {
    const [templateRes, dataRes] = await Promise.all([
      fetch("/frontend/public/views/components/seller_card.html"),
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

    // ✅ Inicializa el sidebar de comentarios
    initCommentsSidebar();

    // ✅ Abrir sidebar al hacer click en "Dejar un comentario"
    container.addEventListener("click", (event) => {
      const btn = event.target.closest('[data-action="open-comments"]');
      if (!btn) return;

      event.preventDefault();

      const sidebar = document.querySelector(".comments-users-sidebar");
      const overlay = document.querySelector(".comments-overlay");

      if (sidebar) sidebar.classList.add("comments-users-sidebar--active");
      if (overlay) overlay.classList.add("comments-overlay--active");
    });

    // 🔹 Botones existentes
    const descriptionButtons = container.querySelectorAll(".product-card__description");
    const editButtons = container.querySelectorAll(".product-card__edit");

    descriptionButtons.forEach((btn) => {
      btn.addEventListener("click", () => {
        window.location.href = "view_description_product_seller.html";
      });
    });

    editButtons.forEach((btn) => {
      btn.addEventListener("click", () => {
        window.location.href = "view_edit_post.html";
      });
    });

  } catch (error) {
    console.error("Error cargando las cards:", error);
  }
}

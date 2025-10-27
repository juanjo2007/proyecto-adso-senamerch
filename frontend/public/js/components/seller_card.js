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

    products.forEach(sellercard => {
      let html = template
        .replaceAll("{{image}}", sellercard.image)
        .replaceAll("{{name}}", sellercard.name)
        .replaceAll("{{price}}", sellercard.price);

      container.insertAdjacentHTML("beforeend", html);
    });

    // 🔁 Lógica para cambiar texto del botón "Desactivar" ↔ "Activar"
    const toggleButtons = container.querySelectorAll(".btn--primary");
    toggleButtons.forEach(button => {
      button.addEventListener("click", (event) => {
        event.preventDefault();
        if (button.textContent.trim() === "Desactivar") {
          button.textContent = "Activar";
        } else {
          button.textContent = "Desactivar";
        }
      });
    });

  } catch (error) {
    console.error("Error cargando las cards:", error);
  }
}

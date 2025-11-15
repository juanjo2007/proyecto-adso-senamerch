export async function loadCards(containerSelector) {
  const container = document.querySelector(containerSelector);
  if (!container) return;

  try {
    const [templateRes, dataRes] = await Promise.all([
      fetch("/frontend/public/views/components/card_home.html"),
      fetch("/frontend/public/data/cards.json"),
    ]);

    if (!templateRes.ok || !dataRes.ok) {
      throw new Error("Error al cargar el componente o los datos");
    }

    const template = await templateRes.text();
    const products = await dataRes.json();

    products.forEach(card => {
      let html = template
        .replaceAll("{{image}}", card.image)
        .replaceAll("{{name}}", card.name)
        .replaceAll("{{price}}", card.price);

      container.insertAdjacentHTML("beforeend", html);
    });

    // === Agregar redirección de los botones "Comprar" ===
    const buyButtons = container.querySelectorAll(".card-home__pay");
    buyButtons.forEach(btn => {
      btn.addEventListener("click", () => {
        window.location.href = "login.html";
      });
    });

  } catch (error) {
    console.error("Error cargando las cards:", error);
  }
}

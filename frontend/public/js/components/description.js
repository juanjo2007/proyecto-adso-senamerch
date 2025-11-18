document.addEventListener('DOMContentLoaded', async function () {
  const descriptionContainer = document.querySelector('.description-container');
  if (!descriptionContainer) return;

  try {
    // >>> Cargar HTML del componente description
    const descriptionRes = await fetch("/frontend/public/views/components/description.html");
    if (!descriptionRes.ok) throw new Error("Error al cargar description.html");
    const descriptionHTML = await descriptionRes.text();
    descriptionContainer.innerHTML = descriptionHTML;

    // === 🖼 GALERÍA DE IMÁGENES ===
    const mainImage = descriptionContainer.querySelector('.product-description__image--main');
    const thumbnails = descriptionContainer.querySelectorAll('.product-description__thumbnail');
    thumbnails.forEach(thumbnail => {
      thumbnail.addEventListener('click', () => {
        const tempSrc = mainImage.src;
        mainImage.src = thumbnail.src;
        thumbnail.src = tempSrc;
      });
    });

    // === ⭐ CALIFICACIÓN ===
    const stars = descriptionContainer.querySelectorAll('.rating__stars input');
    const starLabels = descriptionContainer.querySelectorAll('.rating__stars label');
    const savedRating = localStorage.getItem('userRating');

    if (savedRating) {
      stars.forEach(star => { if (star.value === savedRating) star.checked = true; });
      highlightStars(savedRating);
    }

    function highlightStars(value) {
      starLabels.forEach(label => {
        const starValue = label.querySelector('input').value;
        const starSpan = label.querySelector('span');
        starSpan.classList.toggle('active-star', starValue <= value);
      });
    }

    stars.forEach(star => {
      star.addEventListener('change', () => {
        highlightStars(star.value);
        localStorage.setItem('userRating', star.value);
      });
    });

    // === 💬 COMENTARIOS ===
    const commentButton = descriptionContainer.querySelector('.comments__button');
    const commentTextarea = descriptionContainer.querySelector('.comments__textarea');
    const commentList = descriptionContainer.querySelector('.comments__list');

    if (commentButton && commentTextarea && commentList) {
      commentButton.addEventListener('click', () => {
        const text = commentTextarea.value.trim();
        if (!text) return showAlert("Por favor escribe un comentario.", "error");

        const newComment = document.createElement('div');
        newComment.classList.add('comments__item');
        newComment.innerHTML = ` 
          <p class="comments__user">Tú <span class="comments__date">• Ahora mismo</span></p>
          <p class="comments__text">${text}</p>
        `;

        commentList.prepend(newComment);
        commentTextarea.value = "";
        showAlert("Comentario enviado correctamente.");
      });
    }

    function showAlert(msg, type = "success") {
      let alert = document.querySelector(".alert");

      if (!alert) {
        alert = document.createElement("div");
        alert.classList.add("alert");
        document.body.appendChild(alert);
      }

      alert.className = "alert alert--" + (type === "error" ? "error" : "success");
      alert.innerHTML = `<p>${msg}</p>`;
      alert.classList.add("alert--show");

      setTimeout(() => alert.classList.remove("alert--show"), 2000);
    }

    // === 🟢 CARGAR MÁS PRODUCTOS DESDE JSON ===
    const productsContainer = descriptionContainer.querySelector(".product-description__more-products");

    if (productsContainer) {
      const dataRes = await fetch("/frontend/public/data/card_description_client.json");
      if (!dataRes.ok) throw new Error("Error cargando JSON de productos");

      const products = await dataRes.json();

      // Tomamos la primera card como template
      const templateCard = productsContainer.querySelector(".product-description__item").outerHTML;
      productsContainer.innerHTML = ""; // Limpiar la card original

      products.forEach(product => {
        let html = templateCard
          .replaceAll("{{image}}", product.image)
          .replaceAll("{{name}}", product.name)
          .replaceAll("{{price}}", product.price);

        productsContainer.insertAdjacentHTML("beforeend", html);
      });

      // === BOTONES "COMPRAR" DE LAS CARDS ===
      const buyButtons = productsContainer.querySelectorAll(".product-description__item-pay");

      buyButtons.forEach(btn => {
        btn.addEventListener('click', () => {
          window.location.href = "product_description.html";
        });
      });
    }

    // === BOTÓN "COMPRAR" PRINCIPAL ===
    const buyButton = descriptionContainer.querySelector('.details__button');

    if (buyButton) {
      buyButton.addEventListener('click', () => {
        window.location.href = "quantity_container.html";
      });
    }

  } catch (error) {
    console.error("Error cargando la descripción o productos:", error);
  }
});

document.addEventListener('DOMContentLoaded', async function () {
  const descriptionContainer = document.querySelector('.description-container');
  if (!descriptionContainer) return;

  try {
    // >>> Cargar HTML del componente description
    const descriptionRes = await fetch("/frontend/public/views/components/description.html");
    if (!descriptionRes.ok) throw new Error("Error al cargar description.html");
    const descriptionHTML = await descriptionRes.text();
    descriptionContainer.innerHTML = descriptionHTML;

    /* =========================
       🖼 GALERÍA DE IMÁGENES
    ========================= */
    const mainImage = descriptionContainer.querySelector('.product-description__image--main');
    const thumbnails = descriptionContainer.querySelectorAll('.product-description__thumbnail');

    thumbnails.forEach(thumbnail => {
      thumbnail.addEventListener('click', () => {
        const tempSrc = mainImage.src;
        mainImage.src = thumbnail.src;
        thumbnail.src = tempSrc;
      });
    });

    /* =========================
       ⭐ CALIFICACIÓN
    ========================= */
    const stars = descriptionContainer.querySelectorAll('.rating__stars input');
    const starLabels = descriptionContainer.querySelectorAll('.rating__stars label');
    const savedRating = localStorage.getItem('userRating');

    function highlightStars(value) {
      starLabels.forEach(label => {
        const starValue = label.querySelector('input').value;
        const starSpan = label.querySelector('span');
        starSpan.classList.toggle('active-star', starValue <= value);
      });
    }

    if (savedRating) {
      stars.forEach(star => {
        if (star.value === savedRating) star.checked = true;
      });
      highlightStars(savedRating);
    }

    stars.forEach(star => {
      star.addEventListener('change', () => {
        highlightStars(star.value);
        localStorage.setItem('userRating', star.value);
      });
    });

    /* =========================
       💬 COMENTARIOS
    ========================= */
    const commentButton = descriptionContainer.querySelector('.comments__button');
    const commentTextarea = descriptionContainer.querySelector('.comments__textarea');
    const commentList = descriptionContainer.querySelector('.comments__list');

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

    /* =========================
       🟢 MÁS PRODUCTOS (CARDS)
       usa la card existente en description.html
    ========================= */
    const productsContainer = descriptionContainer.querySelector(".product-description__more-products");

    if (productsContainer) {
      const cardTemplate = productsContainer.querySelector(".product-card");

      if (!cardTemplate) {
        console.error("No se encontró .product-card como plantilla");
      } else {
        productsContainer.innerHTML = "";

        const dataRes = await fetch("/frontend/public/data/card_description_client.json");
        const products = await dataRes.json();

        products.forEach(product => {
          const card = cardTemplate.cloneNode(true);

          card.querySelector(".product-card__title").textContent = product.name;
          card.querySelector(".product-card__price").textContent = `$ ${product.price} / kilo`;
          card.querySelector(".product-card__discount").textContent = `${product.discount} % de descuento`;

          card.querySelector(".product-card__image").src = product.image;
          card.querySelector(".product-card__store-logo").src = product.store_logo;
          card.querySelector(".product-card__store-logo").alt = product.store_name;

          const buyBtn = card.querySelector(".product-card__pay");
          buyBtn.addEventListener("click", () => {
            window.location.href = "quantity_container.html";
          });

          productsContainer.appendChild(card);
        });
      }
    }

    /* =========================
       🛒 BOTÓN COMPRAR PRINCIPAL
    ========================= */
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

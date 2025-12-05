 // ================== FORM PRODUCT IMAGES COMPONENT ==================
document.addEventListener("DOMContentLoaded", function () {

  // Contenedor donde se debe cargar el HTML del componente
  const formImagesContainer = document.querySelector(".form-images-product-container");

  // ================== FETCH DEL COMPONENTE ==================
  if (formImagesContainer) {
    fetch("/frontend/public/views/components/form_images_product.html")
      .then(response => {
        if (!response.ok) throw new Error("Error al cargar form_images_product.html");
        return response.text();
      })
      .then(html => {
        formImagesContainer.innerHTML = html;

        // Inicializar subida de imágenes
        initializeImageUpload();

        // Inicializar lógica de botones
        initializeButtons();
      })
      .catch(error => console.error("Error cargando el componente de imágenes:", error));
  } else {
    console.warn("No se encontró '.form-images-product-container' en el HTML.");
  }

  // ================== FUNCIÓN PRINCIPAL IMÁGENES ==================
  function initializeImageUpload() {
    const thumbnails = document.querySelectorAll(".image-upload__thumbnail");
    const preview = document.querySelector(".image-upload__preview");

    let activeIndex = null;

    // ================== MANEJAR SUBIDA DE IMAGEN ==================
    thumbnails.forEach((thumbnail, index) => {
      const input = thumbnail.querySelector(".image-upload__input");

      input.addEventListener("change", function () {
        const file = this.files[0];
        if (!file) return;

        const url = URL.createObjectURL(file);

        // Actualizar miniatura
        updateThumbnail(thumbnail, url);

        // Actualizar preview si es la primera imagen o la activa
        if (activeIndex === null || activeIndex === index) {
          updatePreview(url);
          activeIndex = index;
        }
      });

      // ================== SELECCIONAR MINIATURA ==================
      thumbnail.addEventListener("click", function () {
        const img = thumbnail.querySelector("img");

        if (img) {
          updatePreview(img.src);
          activeIndex = index;
        }
      });
    });

    // ================== ACTUALIZAR MINIATURA ==================
    function updateThumbnail(thumbnail, imageURL) {
      thumbnail.classList.remove("image-upload__thumbnail--empty");

      let img = thumbnail.querySelector("img");

      if (!img) {
        img = document.createElement("img");
        img.classList.add("image-upload__img");
        thumbnail.appendChild(img);
      }

      img.src = imageURL;

      // Ocultar texto “Agregar”
      const text = thumbnail.querySelector(".image-upload__add-text");
      if (text) text.style.display = "none";
    }

    // ================== ACTUALIZAR PREVIEW ==================
    function updatePreview(imageURL) {
      preview.classList.remove("image-upload__preview--empty");

      let img = preview.querySelector("img");

      if (!img) {
        img = document.createElement("img");
        img.classList.add("image-upload__img");
        preview.innerHTML = "";
        preview.appendChild(img);
      }

      img.src = imageURL;
    }
  }

  // ============================================================
  // ================== BOTONES (LO QUE PEDISTE) ==================
  // ============================================================
  function initializeButtons() {
    const cancelBtn = document.querySelector(".image-upload__cancel");
    const submitBtn = document.querySelector(".image-upload__submit");

    // 🔵 Botón "Crear producto"
    if (submitBtn) {
      submitBtn.addEventListener("click", (e) => {
        e.preventDefault();

        showAlert("Producto creado exitosamente", "success");

        setTimeout(() => {
          window.location.href = "view_seller_cards.html";
        }, 2500);
      });
    }

    // 🔴 Botón "Volver"
    if (cancelBtn) {
      cancelBtn.addEventListener("click", (e) => {
        e.preventDefault();
        window.location.href = "view_publications_gestor4.html";
      });
    }
  }

  // ================== ALERTA ==================
  function showAlert(message, type = "success") {
    const existingAlert = document.querySelector(".alert");
    if (existingAlert) existingAlert.remove();

    const alert = document.createElement("div");
    alert.className = `alert alert--${type}`;

    alert.innerHTML = `
      <div class="alert__content">
        <p class="alert__message">${message}</p>
      </div>
    `;

    document.body.appendChild(alert);

    // Animación de aparición
    setTimeout(() => alert.classList.add("show"), 50);

    // Ocultar después de 2.5s
    setTimeout(() => {
      alert.classList.remove("show");
      setTimeout(() => alert.remove(), 400);
    }, 1500);
  }
});

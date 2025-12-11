document.addEventListener("DOMContentLoaded", function () {
  const heroContainer = document.querySelector(".hero__container");

  if (heroContainer) {
    fetch("/frontend/public/views/components/hero.html")
      .then(response => {
        if (!response.ok) throw new Error("Error al cargar hero.html");
        return response.text();
      })
      .then(html => {
        heroContainer.innerHTML = html;
        initHeroSlider(); // 👈 activar slider cuando ya se insertó el HTML
      })
      .catch(error => console.error("Error:", error));
  }
});


/* =============================
   SLIDER PROFESIONAL DEL HERO
============================= */
function initHeroSlider() {
  const hero = document.querySelector(".hero");

  if (!hero) return;

  const images = [
    "/frontend/public/assets/img/img_contact.jpg",
    "/frontend/public/assets/img/home_img.jpg",
    "/frontend/public/assets/img/store_seller.jpg",
    "/frontend/public/assets/img/hortalizas-portada.png"
  ];

  let index = 0;

  setInterval(() => {
    index = (index + 1) % images.length;

    hero.style.opacity = 0; // efecto fade-out

    setTimeout(() => {
      hero.style.backgroundImage = `url(${images[index]})`;
      hero.style.opacity = 1; // efecto fade-in
    }, 600); // duración del fade
  }, 7000); // cambiar cada 7s
}

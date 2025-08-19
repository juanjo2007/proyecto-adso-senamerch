document.addEventListener("DOMContentLoaded", function () {
  const instagramIcon = document.querySelector('a[href*="instagram"]');
  const facebookIcon = document.querySelector('a[href*="facebook"]');

  instagramIcon.addEventListener("click", function () {
    alert("Estás visitando nuestro perfil de Instagram.");
  });

  facebookIcon.addEventListener("click", function () {
    alert("Estás visitando nuestro perfil de Facebook.");
  });
});

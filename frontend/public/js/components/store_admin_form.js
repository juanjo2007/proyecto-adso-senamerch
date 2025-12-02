document.addEventListener("DOMContentLoaded", function () {
  const direction = document.querySelector(".store-admin-form");

  if (direction) {
    fetch("/frontend/public/views/components/store_admin_form.html")
      .then(response => response.text())
      .then(data => {
        direction.innerHTML = data;
        attachAddressEvents();
      })
      .catch(error => console.log("Error", error));
  }

  // -------------------------------------------------
  // 🔹 DELEGACIÓN DE EVENTOS PARA EL BOTÓN "VOLVER"
  // -------------------------------------------------
  document.addEventListener("click", function (e) {
    if (e.target.closest(".admin-profile__session")) {
      window.location.href = "profile_store_seller.html";
    }
  });
});

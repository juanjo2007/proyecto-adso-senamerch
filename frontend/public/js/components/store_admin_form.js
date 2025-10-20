document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector(".store-admin-form");

  if (form) {
    fetch("/frontend/public/views/components/store_admin_form.html")
      .then(response => response.text())
      .then(data => {
        form.innerHTML = data;
      })
      .catch(error => console.log("Error", error));
  }
});

document.addEventListener('DOMContentLoaded', function () {
  const adminContainer = document.querySelector('.admin-container');

  if (adminContainer) {
    fetch("/frontend/public/views/components/admin.html")
      .then(response => {
        if (!response.ok) throw new Error("Error al cargar admin.html");
        return response.text();
      })
      .then(data => {
        adminContainer.innerHTML = data;
        // === Una vez insertado el sidebar, activamos el link correspondiente ===
        const currentPage = window.location.pathname.split("/").pop();
        const menuLinks = adminContainer.querySelectorAll(".admin-layout__menu-link");

        menuLinks.forEach(link => {
          const linkPage = link.getAttribute("href").split("/").pop();
          if (linkPage === currentPage) {
            link.classList.add("admin-layout__menu-link--active");
          } else {
            link.classList.remove("admin-layout__menu-link--active");
          }
        });
      })
      .catch(error => console.error("Error:", error));
  }
});

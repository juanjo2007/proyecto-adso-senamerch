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
      })
      .catch(error => console.error("Error:", error));
  }
});

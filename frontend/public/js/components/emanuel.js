document.addEventListener('DOMContentLoaded', function () {
  const userProfileContainer = document.querySelector('.user-profile-container');

  if (userProfileContainer) {
    fetch("/frontend/public/views/components/emanuel.html")
      .then(response => {
        if (!response.ok) throw new Error("Error al cargar emanuel.html");
        return response.text();
      })
      .then(data => {
        userProfileContainer.innerHTML = data;
      })
      .catch(error => console.error("Error:", error));
  }
});

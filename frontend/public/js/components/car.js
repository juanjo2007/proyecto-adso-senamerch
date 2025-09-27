document.addEventListener('DOMContentLoaded', function () {
  const cartContainer = document.querySelector('.shopping-car-container');

  if (cartContainer) {
    fetch("/frontend/public/views/components/car.html")
      .then(response => {
        if (!response.ok) throw new Error("Error al cargar car.html");
        return response.text();
      })
      .then(data => {
        cartContainer.innerHTML = data;
      })
      .catch(error => console.error("Error:", error));
  }
});

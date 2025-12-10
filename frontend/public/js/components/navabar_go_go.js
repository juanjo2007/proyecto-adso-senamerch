document.addEventListener("DOMContentLoaded", function () {
  const govcoElement = document.querySelector(".govco-container__one");

  if (govcoElement) {
    fetch("/frontend/public/views/components/navabar_go_go.html")
      .then(response => response.text())
      .then(data => {
        govcoElement.innerHTML = data;
      })
      .catch(error => console.log("Error cargando el gov.co 1", error));
  }
});
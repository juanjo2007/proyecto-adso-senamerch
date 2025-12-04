document.addEventListener("DOMContentLoaded", function () { 
  const form = document.querySelector(".publications-gestor-six");

  if (form) {
    fetch("/frontend/public/views/components/publications_gestor6.html")
      .then(response => response.text())
      .then(data => {
        form.innerHTML = data;

        // Este es solo para lo que viene del fetch
        attachCreatePostEvents();
      })
      .catch(error => console.log("Error al cargar el componente:", error));
  }

  // Este SIEMPRE debe ejecutarse fuera del fetch
  attachEditButtons(); 
});


// -------------------------------------------------------
//   FUNCIÓN QUE HACE QUE LOS BOTONES EDITAR FUNCIONEN
// -------------------------------------------------------
function attachEditButtons() {
  document.addEventListener("click", function (event) {
    if (event.target.closest(".product-seller__gestor")) {
      window.location.href = "view_edit_post.html";
    }
  });
}

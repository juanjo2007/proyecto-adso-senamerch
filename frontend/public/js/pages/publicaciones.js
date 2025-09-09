const searchInput = document.getElementById("searchInput");
const publicacionesBody = document.getElementById("publicacionesBody");

// Filtro de búsqueda
searchInput.addEventListener("input", e => {
  const filtro = e.target.value.toLowerCase();

  const filas = publicacionesBody.querySelectorAll(".publicaciones__tabla-row");
  filas.forEach(fila => {
    const texto = fila.innerText.toLowerCase();
    fila.style.display = texto.includes(filtro) ? "grid" : "none";
  });
});

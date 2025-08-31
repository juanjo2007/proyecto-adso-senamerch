// ====== SEARCH BAR JS ======

// Esperamos a que cargue el DOM
document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.querySelector(".search-bar__input");
  const searchButton = document.querySelector(".search-bar__button");

  // Evento: Enter dentro del input
  searchInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleSearch(searchInput.value);
    }
  });

  // Evento: Click en la lupa
  searchButton.addEventListener("click", () => {
    handleSearch(searchInput.value);
  });

  // Función para manejar la búsqueda
  function handleSearch(query) {
    const cleanQuery = query.trim();
    if (cleanQuery === "") {
      alert("Por favor escribe algo para buscar.");
      return;
    }
    console.log("Buscando:", cleanQuery);

    // Aquí puedes conectar con backend o redirigir
    // Por ejemplo: window.location.href = `/buscar?query=${encodeURIComponent(cleanQuery)}`
  }
});

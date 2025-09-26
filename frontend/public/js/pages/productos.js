document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.getElementById("searchInput");
  const table = document.getElementById("productosTable");
  const rows = table.getElementsByTagName("tr");

  searchInput.addEventListener("keyup", () => {
    const filter = searchInput.value.toLowerCase();
    for (let i = 0; i < rows.length; i++) {
      let cells = rows[i].getElementsByTagName("td");
      let match = false;
      for (let j = 0; j < cells.length; j++) {
        if (cells[j].textContent.toLowerCase().includes(filter)) {
          match = true;
          break;
        }
      }
      rows[i].style.display = match ? "" : "none";
    }
  });
});

// Selects the search input by its ID
const searchInput = document.getElementById("searchInput");

// Selects the table body where the posts are displayed
const postsBody = document.getElementById("postsBody");

// Adds an event that triggers every time the user types in the input
searchInput.addEventListener("input", e => {
  
  // Gets the value typed by the user and converts it to lowercase
  const filter = e.target.value.toLowerCase();

  // Selects all rows of the posts table
  const rows = postsBody.querySelectorAll(".posts__table-row");

  // Loops through each row of the table
  rows.forEach(row => {

    // Gets all the text of the row and converts it to lowercase
    const text = row.innerText.toLowerCase();

    // If the row text includes the user input, show it
    // Otherwise, hide it
    row.style.display = text.includes(filter) ? "grid" : "none";
  });
});

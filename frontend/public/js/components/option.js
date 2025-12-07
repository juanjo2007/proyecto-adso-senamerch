document.addEventListener('DOMContentLoaded', function () {
  const optionContainer = document.querySelector('.option-container');

  const attachButtonListeners = () => {
    const btnReturn = document.querySelector('.product-purchase__return');
    const btnAdd = document.querySelector('.product-purchase__add');

    if (btnReturn) {
      btnReturn.addEventListener('click', () => {
        window.location.href = "/frontend/public/views/client_view.html";
      });
    }

    if (btnAdd) {
      btnAdd.addEventListener('click', () => {
        window.location.href = "/frontend/public/views/view_shopping_cart.html";
      });
    }
  };

  if (optionContainer) {
    fetch("/frontend/public/views/components/option.html")
      .then(response => {
        if (!response.ok) throw new Error("Error al cargar option.html");
        return response.text();
      })
      .then(data => {
        optionContainer.innerHTML = data;
        // Volver a enlazar botones porque ahora el DOM podría haber cambiado
        attachButtonListeners();
      })
      .catch(err => console.error(err));
  } else {
    // Si optionContainer no existe, igual intentamos enlazar (por si los botones están en el HTML principal)
    attachButtonListeners();
  }
});

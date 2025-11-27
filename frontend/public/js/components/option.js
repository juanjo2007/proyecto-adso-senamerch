document.addEventListener('DOMContentLoaded', function () {
  const optionContainer = document.querySelector('.option-container');

  if (optionContainer) {
    fetch("/frontend/public/views/components/option.html")
      .then(response => {
        if (!response.ok) throw new Error("Error al cargar option.html");
        return response.text();
      })
      .then(data => {
        optionContainer.innerHTML = data;

        // === Lógica del componente ===
        const section = optionContainer.querySelector('.product-purchase');
        if (!section) return;

        const radios = section.querySelectorAll('.product-purchase__radio');
        const select = section.querySelector('.product-purchase__select');
        const unitLabel = section.querySelector('.product-purchase__unit');
        const quantityInput = section.querySelector('.product-purchase__input');
        const addToCartButton = section.querySelector('.product-purchase__button'); // 🔥 Botón agregar al carrito

        const solidOptions = [
          { value: 'kg', text: 'Kilogramo (kg)', unit: 'kilogramos' },
          { value: 'g', text: 'Libra (Lib)', unit: 'gramos' },
          { value: 'halfkg', text: 'Medio kilogramo (500gr)', unit: 'medios kilos' },
          { value: 'quarterkg', text: 'Media Libra (250gr)', unit: 'cuartos de kilo' },
          { value: 'ton', text: 'Tonelada (t)', unit: 'toneladas' },
          { value: 'arroba', text: 'Arroba (Arb)', unit: 'arrobas' }
        ];

        const liquidOptions = [
          { value: 'ml', text: 'Mililitro (mL)', unit: 'mililitros' },
          { value: 'dl', text: 'Decilitro (dL)', unit: 'decilitros' },
          { value: 'l', text: 'Litro (L)', unit: 'litros' },
          { value: 'hl', text: 'Hectolitro (hL)', unit: 'hectolitros' },
          { value: 'kl', text: 'Kilolitro (kL)', unit: 'kilolitros' }
        ];

        // === Función para actualizar las unidades según el tipo seleccionado ===
        const updateOptions = (type) => {
          select.innerHTML = ''; // Limpiar opciones anteriores
          const options = type === 'solid' ? solidOptions : liquidOptions;

          const optgroup = document.createElement('optgroup');
          optgroup.label = type === 'solid' ? 'Sólido' : 'Líquido';

          options.forEach(opt => {
            const option = document.createElement('option');
            option.value = opt.value;
            option.textContent = opt.text;
            option.dataset.unit = opt.unit;
            optgroup.appendChild(option);
          });

          select.appendChild(optgroup);

          // Actualizar label y limpiar cantidad
          unitLabel.textContent = options[0].unit;
          quantityInput.value = '';
        };

        // === Evento: cambio entre sólido / líquido ===
        radios.forEach(radio => {
          radio.addEventListener('change', (e) => {
            updateOptions(e.target.value);
          });
        });

        // === Evento: cambio en el select para actualizar la unidad ===
        select.addEventListener('change', (e) => {
          const selected = e.target.options[e.target.selectedIndex];
          unitLabel.textContent = selected.dataset.unit;
        });

        // === 🔥 Evento: botón “Agregar al carrito” va a login ===
        if (addToCartButton) {
          addToCartButton.addEventListener('click', () => {
            window.location.href = "view_shopping_cart.html";
          });
        }

      })
      .catch(error => console.error("Error cargando el componente Option:", error));
  } else {
    console.warn("No se encontró '.option-container' en el HTML.");
  }
});

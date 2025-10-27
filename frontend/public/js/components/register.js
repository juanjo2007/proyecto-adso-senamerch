document.addEventListener("DOMContentLoaded", function () {
  const formContainer = document.querySelector(".form-container");

  if (formContainer) {
    fetch("/frontend/public/views/components/register.html")
      .then((response) => response.text())
      .then((data) => {
        formContainer.innerHTML = data;

        // Esperar a que el formulario del componente esté en el DOM
        const registerForm = formContainer.querySelector(".register__form");

        if (registerForm) {
          registerForm.addEventListener("submit", function (e) {
            e.preventDefault(); // Evita el envío real

            // Simular registro exitoso (aquí podrías conectar tu backend real)
            setTimeout(() => {
              // Mostrar alerta o mensaje visual
              alert("✅ Registro completado con éxito");

              // Reiniciar formulario
              registerForm.reset();
            }, 500);
          });
        }
      })
      .catch((error) => console.log("Error al cargar el componente:", error));
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const cancelarBtn = document.querySelector(".btn--black");
  const confirmarBtn = document.querySelector(".btn--green");

  if (cancelarBtn) {
    cancelarBtn.addEventListener("click", () => {
      alert("Tu pedido ha sido cancelado ❌");
    });
  }

  if (confirmarBtn) {
    confirmarBtn.addEventListener("click", () => {
      alert("✅ Tu pedido ha sido confirmado");
    });
  }
});

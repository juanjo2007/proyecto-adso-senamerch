// ===== Eliminar producto o transporte =====
document.querySelectorAll(".cart__btn-remove").forEach(btn => {
  btn.addEventListener("click", (e) => {
    const row = e.target.closest("tr");
    row.remove();
    actualizarTotales();
  });
});

// ===== Actualizar totales =====
function actualizarTotales() {
  let totalProductos = 0;
  document.querySelectorAll("#cart-products .cart__total").forEach(td => {
    totalProductos += parseInt(td.textContent.replace(/\D/g, ""));
  });

  let totalTransporte = 0;
  document.querySelectorAll("#cart-transport .cart__total").forEach(td => {
    totalTransporte += parseInt(td.textContent.replace(/\D/g, ""));
  });

  document.getElementById("cart-products-total").textContent = "$" + totalProductos.toLocaleString();
  document.getElementById("cart-transport-total").textContent = "$" + totalTransporte.toLocaleString();
}

// ===== Confirmar pedido =====
document.querySelector(".cart__btn--confirm").addEventListener("click", () => {
  alert("✅ Pedido confirmado con éxito!");
});

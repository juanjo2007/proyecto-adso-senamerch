// comments.js (ES module)
export function initCommentsSidebar() {
  // Contenedor donde vamos a inyectar el componente
  const container = document.querySelector(".comments-userss-container");
  if (!container) {
    console.warn("initCommentsSidebar: .comments-userss-container no encontrado");
    return;
  }

  // Si ya está inyectado, solo attach events
  if (container.childElementCount === 0) {
    fetch("/frontend/public/views/components/comments.html")
      .then(response => {
        if (!response.ok) throw new Error("comments.html no encontrado: " + response.status);
        return response.text();
      })
      .then(html => {
        container.innerHTML = html;
        attachCommentsEvents(container);
        console.log("comments: componente inyectado");
      })
      .catch(err => console.error("Error cargando comments.html:", err));
  } else {
    attachCommentsEvents(container);
    console.log("comments: ya inyectado, attach events");
  }
}

function attachCommentsEvents(container) {
  const sidebar = container.querySelector(".comments-users-sidebar");
  const closeBtn = container.querySelector(".comments-users-sidebar__close-btn");
  const overlay = document.querySelector(".comments-overlay");

  if (!sidebar) {
    console.warn("attachCommentsEvents: sidebar no encontrada dentro del container");
    return;
  }

  // función para abrir
  function openSidebar() {
    sidebar.classList.add("comments-users-sidebar--active");
    if (overlay) overlay.classList.add("comments-overlay--active");
  }

  // función para cerrar
  function closeSidebar() {
    sidebar.classList.remove("comments-users-sidebar--active");
    if (overlay) overlay.classList.remove("comments-overlay--active");
  }

  // Close button
  if (closeBtn) closeBtn.addEventListener("click", closeSidebar);

  // overlay click
  if (overlay) overlay.addEventListener("click", closeSidebar);

  // Delegación: abrir desde cualquier botón con data-action="open-comments"
  // (esto captura clicks dentro de la página, incluye las cards dinámicas)
  // Solo attach una vez
  if (!document.__commentsOpenListenerAttached) {
    document.addEventListener("click", (ev) => {
      const opener = ev.target.closest('[data-action="open-comments"]');
      if (!opener) return;
      ev.preventDefault();
      // Si el sidebar no está aún en el DOM (no inyectado) — forzamos la inyección
      if (!container.querySelector(".comments-users-sidebar")) {
        // re-inyectar y abrir después
        fetch("/frontend/public/views/components/comments.html")
          .then(r => {
            if (!r.ok) throw new Error("comments.html no encontrado: " + r.status);
            return r.text();
          })
          .then(html => {
            container.innerHTML = html;
            // actualizar referencias
            const newSidebar = container.querySelector(".comments-users-sidebar");
            const newClose = container.querySelector(".comments-users-sidebar__close-btn");
            if (newClose) newClose.addEventListener("click", closeSidebar);
            if (overlay) overlay.addEventListener("click", closeSidebar);
            // abrir ya
            newSidebar.classList.add("comments-users-sidebar--active");
            if (overlay) overlay.classList.add("comments-overlay--active");
          })
          .catch(err => console.error("Error re-inyectando comments.html:", err));
      } else {
        openSidebar();
      }
    });
    document.__commentsOpenListenerAttached = true;
  }
}

// /frontend/public/js/components/purchases_user.js

document.addEventListener('DOMContentLoaded', async function () {
  const purchasesContainer = document.querySelector('.purchases-container');

  // 🔥 Cargar librerías SIN scripts en el HTML
  await loadLibrary("https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js");
  await loadLibrary("https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js");

  if (purchasesContainer) {
    fetch("/frontend/public/views/components/purchases.html")
      .then(response => {
        if (!response.ok) throw new Error("Error al cargar purchases.html");
        return response.text();
      })
      .then(data => {
        purchasesContainer.innerHTML = data;

        // activar botones una vez cargado el HTML
        initDownloadButtons();
      })
      .catch(error => console.error("Error cargando Purchases User:", error));
  } else {
    console.warn("No se encontró '.purchases-container' en el HTML.");
  }
});


/* ────────────────────────────────────────────────
      FUNCIÓN PARA DESCARGAR PDF POR BOTÓN
───────────────────────────────────────────────── */
function initDownloadButtons() {
  const downloadButtons = document.querySelectorAll(".purchases-details__download");

  if (downloadButtons.length === 0) {
    console.warn("No se encontraron botones .purchases-details__download");
    return;
  }

  downloadButtons.forEach((button, index) => {
    button.addEventListener("click", async () => {
      try {
        // Capturar pantalla completa
        const canvas = await html2canvas(document.body, {
          scale: 2,
          useCORS: true
        });

        const imgData = canvas.toDataURL("image/png");

        const pdf = new jspdf.jsPDF("p", "mm", "a4");
        const imgWidth = 210;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;

        pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);

        pdf.save(`compra_${index + 1}.pdf`);
      } catch (error) {
        console.error("Error al generar PDF:", error);
      }
    });
  });
}


/* ────────────────────────────────────────────────
      FUNCIÓN PARA CARGAR LIBRERÍAS DINÁMICAMENTE
───────────────────────────────────────────────── */
function loadLibrary(url) {
  return new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = url;
    script.onload = resolve;
    script.onerror = () => reject(`❌ Error al cargar librería: ${url}`);
    document.head.appendChild(script);
  });
}

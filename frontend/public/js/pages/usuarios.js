// Datos de prueba
const usuarios = [
  { id: 1, nombre: "Julian gil", correo: "juliangil@gmail.com", tipo: "Común", depto: "Risaralda", direccion: "Carrera 10#34-54" },
  { id: 2, nombre: "Sebastian valencia", correo: "juliangil@gmail.com", tipo: "Común", depto: "Risaralda", direccion: "Avenida 10 #34-36" },
  { id: 3, nombre: "Daniela arias", correo: "juliangil@gmail.com", tipo: "Común", depto: "Quindío", direccion: "Carrera 10#34-54" },
  { id: 4, nombre: "Victoria arias", correo: "juliangil@gmail.com", tipo: "Transportador", depto: "Quindío", direccion: "Avenida 10 #34-36" },
  { id: 5, nombre: "Stiven orozco", correo: "juliangil@gmail.com", tipo: "Común", depto: "Quindío", direccion: "Carrera 10#34-54" },
  { id: 6, nombre: "Juan ocampo", correo: "juliangil@gmail.com", tipo: "Transportador", depto: "Caldas", direccion: "Avenida 10 #34-36" },
  { id: 7, nombre: "Leon ruiz", correo: "juliangil@gmail.com", tipo: "Común", depto: "Caldas", direccion: "Carrera 10#34-54" },
  { id: 8, nombre: "Yuli saenz", correo: "juliangil@gmail.com", tipo: "Común", depto: "Caldas", direccion: "Avenida 10 #34-36" }
];

// Renderizar usuarios
const usuariosBody = document.getElementById("usuariosBody");

function mostrarUsuarios(lista) {
  usuariosBody.innerHTML = "";
  lista.forEach(u => {
    const fila = `
      <tr>
        <td>#${u.id}</td>
        <td>${u.nombre}</td>
        <td>${u.correo}</td>
        <td>${u.tipo}</td>
        <td>${u.depto}</td>
        <td>${u.direccion}</td>
        <td><button class="btn-disable">Deshabilitar</button></td>
      </tr>
    `;
    usuariosBody.innerHTML += fila;
  });
}

mostrarUsuarios(usuarios);

// Búsqueda
document.getElementById("searchBtn").addEventListener("click", () => {
  const valor = document.getElementById("searchInput").value.toLowerCase();
  const filtrados = usuarios.filter(u =>
    u.nombre.toLowerCase().includes(valor) || 
    u.correo.toLowerCase().includes(valor) ||
    u.depto.toLowerCase().includes(valor)
  );
  mostrarUsuarios(filtrados);
});

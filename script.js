// Activa solo la sección correspondiente al hacer clic en una pestaña
function mostrarSeccion(id) {
  const secciones = document.querySelectorAll(".seccion");
  const botones = document.querySelectorAll(".menu button");

  // Oculta todas las secciones
  secciones.forEach(seccion => seccion.style.display = "none");

  // Muestra la sección seleccionada
  const activa = document.getElementById(id);
  if (activa) {
    activa.style.display = "block";
  }

  // Quita clase activa de todos los botones
  botones.forEach(btn => btn.classList.remove("activo"));

  // Añade clase activa al botón actual
  const botonActivo = document.querySelector(`.menu button[onclick="mostrarSeccion('${id}')"]`);
  if (botonActivo) {
    botonActivo.classList.add("activo");
  }
}
function filtrarMateriales() {
  const filtro = document.getElementById("filtro-estado").value;
  const tarjetas = document.querySelectorAll(".tarjeta-material");

  tarjetas.forEach(tarjeta => {
    const estado = tarjeta.getAttribute("data-estado");

    if (filtro === "todos" || filtro === estado) {
      tarjeta.style.display = "block";
    } else {
      tarjeta.style.display = "none";
    }
  });
}
function enviarMensaje() {
  const input = document.getElementById("mensaje");
  const mensaje = input.value.trim();

  if (mensaje !== "") {
    const chatBox = document.getElementById("chat-box");
    const nuevoMensaje = document.createElement("div");
    nuevoMensaje.className = "mensaje usuario";
    nuevoMensaje.textContent = mensaje;
    chatBox.appendChild(nuevoMensaje);
    chatBox.scrollTop = chatBox.scrollHeight;

    input.value = "";

    // Respuesta automática (opcional)
    setTimeout(() => {
      const respuesta = document.createElement("div");
      respuesta.className = "mensaje vendedor";
      respuesta.textContent = "Gracias por tu mensaje. Te responderé pronto.";
      chatBox.appendChild(respuesta);
      chatBox.scrollTop = chatBox.scrollHeight;
    }, 1000);
  }
}
function guardarPerfil() {
  const nombre = document.getElementById("nombre").value;
  const correo = document.getElementById("correo").value;
  const ubicacion = document.getElementById("ubicacion").value;
  const telefono = document.getElementById("telefono").value;

  if (nombre && correo && ubicacion && telefono) {
    document.getElementById("ver-nombre").textContent = nombre;
    document.getElementById("ver-correo").textContent = correo;
    document.getElementById("ver-ubicacion").textContent = ubicacion;
    document.getElementById("ver-telefono").textContent = telefono;

    document.getElementById("perfil-guardado").style.display = "block";
  } else {
    alert("Por favor completa todos los campos.");
  }
}
const materiales = [
  {
    id: 1,
    imagen: "Tejas nuevas.png",
    descripcion: "20 Tejas nuevas",
    estado: "nuevo",
    precio: "$100.000"
  },
  {
    id: 2,
    imagen: "Ventana usada.png",
    descripcion: "1 Ventana doble con un pequeño rayón",
    estado: "usado-buen",
    precio: "$200.000"
  },
  {
    id: 3,
    imagen: "Puerta de madera usada.png",
    descripcion: "3 Puertas de madera usadas",
    estado: "usado-regular",
    precio: "$150.000 c/u"
  }
];

function mostrarMateriales(lista) {
  const contenedor = document.getElementById("lista-materiales");
  contenedor.innerHTML = "";

  lista.forEach(material => {
    const card = document.createElement("div");
    card.className = "material-card";

    card.innerHTML = `
      <img src="${material.imagen}" alt="${material.descripcion}">
      <h4>${material.descripcion}</h4>
      <p><strong>Estado:</strong> ${estadoTexto(material.estado)}</p>
      <p><strong>Precio:</strong> ${material.precio}</p>
      <button onclick="irAlChat('${material.descripcion}')">Contactar</button>
    `;

    contenedor.appendChild(card);
  });
}

function estadoTexto(valor) {
  if (valor === "nuevo") return "Nuevo";
  if (valor === "usado-buen") return "Usado - Buen estado";
  if (valor === "usado-regular") return "Usado - Regular";
  return valor;
}

function filtrarMateriales() {
  const filtro = document.getElementById("filtro").value;
  if (filtro === "todos") {
    mostrarMateriales(materiales);
  } else {
    const filtrados = materiales.filter(m => m.estado === filtro);
    mostrarMateriales(filtrados);
  }
}

function irAlChat(producto) {
  mostrarSeccion("chat");
  const chatBox = document.getElementById("chat-box");
  chatBox.innerHTML = ""; // limpiar mensajes anteriores

  const mensajes = [
    { tipo: "usuario", texto: `Hola, estoy interesado en el material: ${producto}` },
    { tipo: "vendedor", texto: "¡Hola! Claro que sí, aún está disponible." },
    { tipo: "usuario", texto: "Perfecto, ¿puedes decirme si está en buen estado?" },
    { tipo: "vendedor", texto: "Sí, está en excelente estado. Lo puedes ver sin compromiso." },
    { tipo: "usuario", texto: "Me interesa. ¿Podemos acordar la entrega?" },
    { tipo: "vendedor", texto: "Claro. ¿Te parece bien este sábado 31 de mayo a las 10:00 a.m.?" },
    { tipo: "usuario", texto: "Perfecto, ¿en qué lugar?" },
    { tipo: "vendedor", texto: "Podemos encontrarnos en el Parque del Perro." },
    { tipo: "usuario", texto: "Listo, nos vemos el sábado. ¡Gracias!" },
    { tipo: "vendedor", texto: "Con gusto, ¡nos vemos!" }
  ];

  mensajes.forEach(m => {
    const mensajeDiv = document.createElement("div");
    mensajeDiv.className = `mensaje ${m.tipo}`;
    mensajeDiv.textContent = m.texto;
    chatBox.appendChild(mensajeDiv);
  });

  chatBox.scrollTop = chatBox.scrollHeight;
}

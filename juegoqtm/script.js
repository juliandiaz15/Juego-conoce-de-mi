


const preguntas = [

    {
        pregunta: "⚽ ¿Cuál es mi equipo favorito?",
        opciones: [
            "Atlético Nacional",
            "Millonarios",
            "Deportivo Cali",
            "Santa Fe"
        ],
        respuesta: 0,
        correcta: "Atlético Nacional"
    },

    {
        pregunta: "🍔 ¿Cuál es mi comida favorita?",
        opciones: [
            "Pasta",
            "Bandeja Paisa",
            "Sushi",
            "Lasagna"
        ],
        respuesta: 1,
        correcta: "Bandeja Paisa"
    },

    {
        pregunta: "🎨 ¿Cuál es mi color favorito para vestir?",
        opciones: [
            "Azul",
            "Rojo",
            "Negro",
            "Blanco"
        ],
        respuesta: 3,
        correcta: "Blanco"
    },

    {
        pregunta: "⚽ ¿Cuál es mi deporte favorito?",
        opciones: [
            "Fútbol",
            "Baloncesto",
            "Tenis",
            "Natación"
        ],
        respuesta: 0,
        correcta: "Fútbol"
    },

    {
        pregunta: "🎤 ¿Cuál es mi artista favorito?",
        opciones: [
            "Bad Bunny",
            "Luar la L",
            "Blessd",
            "Feid"
        ],
        respuesta: 1,
        correcta: "Luar la L"
    },

    {
        pregunta: "👕 ¿Cuál es mi marca favorita para vestir?",
        opciones: [
            "Nike",
            "Adidas",
            "Reebok",
            "Puma"
        ],
        respuesta: 0,
        correcta: "Nike"
    },

    {
        pregunta: "🏆 ¿Cuál es mi futbolista favorito?",
        opciones: [
            "CR7",
            "Messi",
            "Pelé",
            "Neymar Jr"
        ],
        respuesta: 0,
        correcta: "CR7"
    },

    {
        pregunta: "🎶 ¿Cuál es mi música para tomar favorita?",
        opciones: [
            "Popular",
            "Salsa",
            "Vallenato",
            "Música para planchar"
        ],
        respuesta: 0,
        correcta: "Popular"
    },

    {
        pregunta: "🥃 ¿Cuál es mi bebida favorita?",
        opciones: [
            "Whisky",
            "Ron",
            "Cerveza",
            "Vodka"
        ],
        respuesta: 0,
        correcta: "Whisky"
    },

    {
        pregunta: "🐶 ¿Cuál es mi animal favorito?",
        opciones: [
            "Perro",
            "Gato",
            "Conejo",
            "Caballo"
        ],
        respuesta: 0,
        correcta: "Perro"
    }

];




let nombre = "";

let preguntaActual = 0;

let puntos = 0;

let respuestasUsuario = [];

let respuestaBloqueada = false;




const pantallaInicio = document.getElementById("inicio");

const pantallaJuego = document.getElementById("juego");

const pantallaResultado = document.getElementById("resultado");

const entradaNombre = document.getElementById("nombre");

const nombreJugador = document.getElementById("nombreJugador");

const contador = document.getElementById("contador");

const preguntaTexto = document.getElementById("pregunta");

const opciones = document.getElementById("opciones");

const barraProgreso = document.getElementById("barraProgreso");

const mensaje = document.getElementById("mensaje");




function cambiarPantalla(pantalla) {

    document.querySelectorAll(".pantalla").forEach(elemento => {

        elemento.classList.remove("activa");

    });

    pantalla.classList.add("activa");

}




document.getElementById("btnComenzar").addEventListener("click", comenzarJuego);


entradaNombre.addEventListener("keydown", function(evento) {

    if (evento.key === "Enter") {

        comenzarJuego();

    }

});


function comenzarJuego() {

    nombre = entradaNombre.value.trim();

    if (nombre === "") {

        alert("💎 ¡Escribe tu nombre para comenzar la aventura!");

        entradaNombre.focus();

        return;

    }

    preguntaActual = 0;

    puntos = 0;

    respuestasUsuario = [];

    respuestaBloqueada = false;

    nombreJugador.textContent = nombre;

    cambiarPantalla(pantallaJuego);

    mostrarPregunta();

}



function mostrarPregunta() {

    respuestaBloqueada = false;

    const pregunta = preguntas[preguntaActual];

    contador.textContent =
        `Pregunta ${preguntaActual + 1} de ${preguntas.length}`;

    preguntaTexto.textContent = pregunta.pregunta;

    barraProgreso.style.width =
        `${((preguntaActual + 1) / preguntas.length) * 100}%`;

    mensaje.textContent = "";

    opciones.innerHTML = "";



    pregunta.opciones.forEach((opcion, indice) => {

        const boton = document.createElement("button");

        boton.classList.add("opcion");

        boton.textContent =
            `${String.fromCharCode(97 + indice)}. ${opcion}`;

        boton.addEventListener("click", function() {

            verificarRespuesta(indice, boton);

        });

        opciones.appendChild(boton);

    });

}



function verificarRespuesta(respuesta, botonSeleccionado) {

    if (respuestaBloqueada) return;

    respuestaBloqueada = true;

    const pregunta = preguntas[preguntaActual];

    const botones = document.querySelectorAll(".opcion");

    const esCorrecta = respuesta === pregunta.respuesta;


    // DESACTIVAR BOTONES

    botones.forEach(boton => {

        boton.disabled = true;

    });


  

    respuestasUsuario.push({

        pregunta: pregunta.pregunta,

        respuestaUsuario: pregunta.opciones[respuesta],

        respuestaCorrecta: pregunta.correcta,

        correcta: esCorrecta

    });


  

    if (esCorrecta) {

        puntos++;

        botonSeleccionado.classList.add("correcta");

        mensaje.textContent = "💎 ¡EXCELENTE! RESPUESTA CORRECTA ✨";

        mensaje.style.color = "#35D69A";

    }

    

    else {

        botonSeleccionado.classList.add("incorrecta");

        botones[pregunta.respuesta].classList.add("correcta");

        mensaje.textContent =
            `✨ ¡CASI! La respuesta correcta es ${pregunta.correcta}.`;

        mensaje.style.color = "#FF667D";

    }


    

    setTimeout(() => {

        preguntaActual++;

        if (preguntaActual < preguntas.length) {

            mostrarPregunta();

        } else {

            mostrarResultados();

        }

    }, 1500);

}



function mostrarResultados() {

    cambiarPantalla(pantallaResultado);

    document.getElementById("saludoFinal").textContent =
        `💙 ¡Gracias por jugar, ${nombre}!`;


    

    document.getElementById("puntosFinales").textContent =
        `${puntos}/10`;


    

    let mensajeFinal = "";

    if (puntos === 10) {

        mensajeFinal =
            "🏆 Deje de stalkearme, me da miedo ome. 💎";

    }

    else if (puntos >= 7) {

        mensajeFinal =
            "🌟 Me conoces bastante bien.  ✨";

    }

    else if (puntos >= 4) {

        mensajeFinal =
            "💫 Uy no pa, decepcionado me tiene. 💙";

    }

    else {

        mensajeFinal =
            "🚀 ¡vaya a dormir mejor. 😂";

    }

    document.getElementById("mensajeFinal").textContent =
        mensajeFinal;


    

    const resumen = document.getElementById("resumen");

    resumen.innerHTML = "";


    respuestasUsuario.forEach((respuesta, indice) => {

        const elemento = document.createElement("div");

        elemento.classList.add("respuesta-resumen");


        const titulo = document.createElement("strong");

        titulo.textContent =
            `Pregunta ${indice + 1}: ${respuesta.pregunta}`;

        elemento.appendChild(titulo);


        const salto = document.createElement("br");

        elemento.appendChild(salto);


        const textoUsuario = document.createElement("span");

        textoUsuario.textContent =
            `Tu respuesta: ${respuesta.respuestaUsuario}`;

        textoUsuario.classList.add(
            respuesta.correcta ? "correcto" : "incorrecto"
        );

        elemento.appendChild(textoUsuario);


        const icono = document.createElement("span");

        icono.textContent =
            respuesta.correcta ? " ✅" : " ❌";

        elemento.appendChild(icono);


        // MOSTRAR RESPUESTA CORRECTA SI FALLÓ

        if (!respuesta.correcta) {

            const salto2 = document.createElement("br");

            elemento.appendChild(salto2);


            const respuestaCorrecta = document.createElement("span");

            respuestaCorrecta.textContent =
                `Respuesta correcta: ${respuesta.respuestaCorrecta}`;

            respuestaCorrecta.classList.add("correcto");

            elemento.appendChild(respuestaCorrecta);

        }


        resumen.appendChild(elemento);

    });

}


/* ==========================================
   9. VOLVER A JUGAR
========================================== */

document.getElementById("btnReiniciar").addEventListener("click", function() {

    entradaNombre.value = "";

    preguntaActual = 0;

    puntos = 0;

    respuestasUsuario = [];

    respuestaBloqueada = false;

    cambiarPantalla(pantallaInicio);

});


/* ==========================================
   💎 FIN DEL JUEGO
   ✨ GRACIAS POR JUGAR
========================================== */

Swal.fire({
    title: '¿Preparado para salvar el mundo? <br><br> <img src="IMG/planeta_tierra.png" width = "120px"><br>',
    html: 'IRON FIST es un juego de reflejos por niveles. Supera cada desafío, consigue los puntos necesarios y protege la Tierra de los meteoritos.',
    icon: 'info',
    confirmButtonText: 'ESTOY PREPARADO',
    width: '50%',
    heightAuto: false,
    timer: undefined,


    timerProgressbar: true,
    /*Funcion de cerrar la alerta*/
    allowOutsideClick: false,
    allowEscapeKey: false,
    allowEnterkey: false,
    stopKeydownPropagation: false,
});



Tiempo = 71 //VARIBLE DE INICIO TIEMPO
Puntaje = 0 //VARIABLE DE INICIO PUNTOS


// CAMBIO HECHO DIRECTAMENTE EN MAIN PARA PROBAR MERGE
//FUNCION DE NARRACIONES

Narracion = 1
document.getElementById("Contenedor_narracion").addEventListener('click', Iniciar_narracion)

function Iniciar_narracion() {
    var audio = document.getElementById("narracion")
    var texto = document.getElementById("Texto_narracion")
    if (Narracion == 1) {
        audio.play()
        document.getElementById("VOLUMEN").style.display = "none"
        document.getElementById("PAUSE").style.display = "inline-block"
        texto.textContent = "PAUSAR NARRACIÓN"
        Narracion = 2
    } else {
        audio.pause()
        document.getElementById("VOLUMEN").style.display = "inline-block"
        document.getElementById("PAUSE").style.display = "none"
        texto.textContent = "ESCUCHAR HISTORIA"
        Narracion = 1
    }
}

document.getElementById("narracion").addEventListener("ended", function () {
    document.getElementById("VOLUMEN").style.display = "inline-block"
    document.getElementById("PAUSE").style.display = "none"
    document.getElementById("Texto_narracion").textContent = "ESCUCHAR HISTORIA"
    Narracion = 1
})




Graficos = 1 //Este es el medidor de graficos

function AlternarFondos() {
    document.getElementById("Selector_fondos").classList.toggle("abierto")
}

function CambiarFondo(ruta) {
    document.getElementById("Fondo").style.backgroundImage = "url('" + ruta + "')"
    document.getElementById("Fondo").style.backgroundAttachment = "fixed"
    document.getElementById("Fondo").style.backgroundRepeat = "no-repeat"
    document.getElementById("Fondo").style.backgroundSize = "cover"
    document.getElementById("Selector_fondos").classList.remove("abierto")
}

function Graficos_fondo() {
    AlternarFondos()
}



//CONTENEDOR QUE CONTEIENE TOO EL JUEGO
//DE POR SI ESTA FUNCION NO SE EJECUTA HASTA QUE SE LA LLAMA, MAS ADELANTE LA LLAMAREMOS
//PARA QUE EL JUEGO INICIE UNA VEZ SE PRESIONE JUGAR

//TRANSICIONES ENTRE PAGINAS----------------------------------------------------------------------------------
// BOTONES PARA REGRESAR ENTRE LAS TRES SECCIONES INICIALES
function Volver_Inicio() {
    var inicio = document.getElementById('Seccion_01');
    var reglas = document.getElementById('Reglas');

    inicio.style.display = 'flex';
    inicio.style.top = '-100%';
    inicio.style.transition = '0s';

    setTimeout(function () {
        reglas.style.top = '120%';
        reglas.style.transition = '1.2s';
        inicio.style.top = '0%';
        inicio.style.transition = '1.2s';
    }, 30);
}

function Volver_Reglas() {
    var reglas = document.getElementById('Reglas');
    var historia = document.getElementById('Seccion_2');

    reglas.style.display = 'block';
    reglas.style.top = '-100%';
    reglas.style.transition = '0s';

    setTimeout(function () {
        historia.style.top = '10%';
        historia.style.transition = '1.2s';
        reglas.style.top = '3%';
        reglas.style.transition = '1.2s';
    }, 30);
}




function Mover() {//TRANSICION DE LA PRIMERA SECCION A LA SEGUNDA
    var contenedor = document.getElementById("Seccion_01")
    contenedor.style.top = "-100%"
    contenedor.style.transition = "2s"
    function Desaparecer() {
        var contenedor = document.getElementById("Seccion_01")
        var Reglas = document.getElementById("Reglas")

        Reglas.style.top = "3%"
        Reglas.style.transition = "1s"
        contenedor.style.display = "none"


    }
    setTimeout(Desaparecer, 1090)

}



// Continuar desde reglas con teclado, como una interfaz de videojuego
document.addEventListener("keydown", function (event) {
    if ((event.key === "Enter" || event.key === " ") && document.getElementById("Reglas")) {
        var reglas = document.getElementById("Reglas");
        var rect = reglas.getBoundingClientRect();
        if (rect.top > -window.innerHeight && rect.top < window.innerHeight) {
            event.preventDefault();
            Mover_2();
        }
    }
});

function Mover_2() {
    var Reglas_Sacar = document.getElementById("Reglas")


    Reglas_Sacar.style.top = "-100%"
    Reglas_Sacar.style.transition = "1.4s"



    function Desaparecer2() {
        var Reglas_Sacar = document.getElementById("Reglas")
        var contenedor_2 = document.getElementById("Seccion_2")
        var imagen = document.getElementById("Imagen")
        var mensaje = document.getElementById("Mensaje")
        var titulo = document.getElementById("Titulo_historia")

        Reglas_Sacar.style.display = "none"
        contenedor_2.style.top = "0%"

        imagen.style.left = "2%"
        imagen.style.transition = "2s"
        mensaje.style.right = "2%"
        mensaje.style.transition = "2s"
        titulo.style.left = "2%"
        titulo.style.transition = "1s"
    }
    setTimeout(Desaparecer2, 1260)



}


function Mover_3() {//TRANSICION DE LA SEGUNDA SECCION A LA TERCERA 

    var contenedor_2 = document.getElementById("Seccion_2")
    var Supremo = document.getElementById("Seccion_suprema")

    document.getElementById("narracion").pause()
    contenedor_2.style.top = "-100%"
    contenedor_2.style.transition = "1.4s"
    Supremo.style.height = "100vh" //Le aumente para que no tape al contenedor del juego


    function Desaparaceer3() {
        var Seccion_Juego = document.getElementById("Seccion_Juego")
        var contenedor_2 = document.getElementById("Seccion_2")
        var juego = document.getElementById("Registraar")
        var Titulo_jugar = document.getElementById("Titulo_jugar")
        var Contenedor_juego = document.getElementById("Contenedor_Juego")
        var Cabezara = document.getElementById("Cabezera")

        Seccion_Juego.style.left = "0%"
        contenedor_2.style.display = "none"
        juego.style.top = "0%"
        juego.style.transition = "0s"
        Titulo_jugar.style.left = "0%"
        Titulo_jugar.style.transition = "0.8s"
        Contenedor_juego.style.left = "0%"
        Contenedor_juego.style.transition = "1.2s"
        Cabezara.style.left = "0%"
        Cabezara.style.transition = "1.2s"

    }

    setTimeout(Desaparaceer3, 900)
}

//RELOJ


function Reloj_Tiempo() {
    var actualizar_Hora = function () {
        var Fecha = new Date(),
            Horas = Fecha.getHours(),
            ampm,
            Minutos = Fecha.getMinutes(),
            Segundos = Fecha.getSeconds(),
            diaSemana = Fecha.getDay(),
            dia = Fecha.getDate(),
            mes = Fecha.getMonth(),
            Año = Fecha.getFullYear();

        var pHoras = document.getElementById("Hora"),
            pAMPM = document.getElementById("AMPM"),
            pMinutos = document.getElementById("Minutos"),
            pSegundos = document.getElementById("Segundos"),
            pDia_Semana = document.getElementById("Dia_Semana"),
            pDia = document.getElementById("dia"),
            pMes = document.getElementById("mes"),
            pAño = document.getElementById("año");

        var semana = ['Domingo', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado']
        pDia_Semana.textContent = semana[diaSemana];
        pDia.textContent = dia
        var Mes_Actual = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Nomviembre', 'Diciembre']
        pMes.textContent = Mes_Actual[mes];
        pAño.textContent = Año

        if (Horas >= 12) {
            Horas = Horas - 12;
            ampm = 'PM';
        }
        else { ampm = 'AM'; }

        if (Horas == 0) {
            Horas = 12;
        }
        if (Horas < 10) {
            Horas = "0" + Horas
        }
        pHoras.textContent = Horas
        pAMPM.textContent = ampm
        if (Minutos < 10) {
            Minutos = "0" + Minutos
        }
        pMinutos.textContent = Minutos
        if (Segundos < 10) {
            Segundos = "0" + Segundos
        }
        pSegundos.textContent = Segundos
    };
    actualizar_Hora();
}


Reloj_Tiempo()

setInterval(Reloj_Tiempo, 1000)

Swal.fire({
    title : '¿Preparado para salvar el mundo? <br><br> <img src="IMG/planeta_tierra.png" width = "120px"><br>',
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



//FUNCION DE NARRACIONES

Narracion = 1
document.getElementById("Contenedor_narracion").addEventListener('click', Iniciar_narracion)

function Iniciar_narracion(){
    var audio = document.getElementById("narracion")
    var texto = document.getElementById("Texto_narracion")
    if(Narracion == 1){
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

document.getElementById("narracion").addEventListener("ended", function(){
    document.getElementById("VOLUMEN").style.display = "inline-block"
    document.getElementById("PAUSE").style.display = "none"
    document.getElementById("Texto_narracion").textContent = "ESCUCHAR HISTORIA"
    Narracion = 1
})




Graficos = 1 //Este es el medidor de graficos

function AlternarFondos(){
    document.getElementById("Selector_fondos").classList.toggle("abierto")
}

function CambiarFondo(ruta){
    document.getElementById("Fondo").style.backgroundImage = "url('" + ruta + "')"
    document.getElementById("Fondo").style.backgroundAttachment = "fixed"
    document.getElementById("Fondo").style.backgroundRepeat = "no-repeat"
    document.getElementById("Fondo").style.backgroundSize = "cover"
    document.getElementById("Selector_fondos").classList.remove("abierto")
}

function Graficos_fondo(){
    AlternarFondos()
}



//CONTENEDOR QUE CONTEIENE TOO EL JUEGO
//DE POR SI ESTA FUNCION NO SE EJECUTA HASTA QUE SE LA LLAMA, MAS ADELANTE LA LLAMAREMOS
//PARA QUE EL JUEGO INICIE UNA VEZ SE PRESIONE JUGAR
let Nivel1_Ganado = false;
function JUEGO(){

    function Tiempo_Disminur(){ //FUNCION QUE REDUCE EL TIEMPO Y RESETEAL EL RESULTADO UNA VEZ LLEGUE A 0
        Tiempo--;
        document.getElementById("Tiempo").innerHTML = Tiempo
        if(Tiempo == 0){
    clearInterval(Restar_Tiempo)
    Puntaje = 0
            document.getElementById("Perdiste_sound").play()
            alert("Lo lamento perdiste")} }

    
        Restar_Tiempo = setInterval(Tiempo_Disminur, 1000)

        //AÑADIMOS LA FUNCION AUMENTAR PUNTOS AL PASAR EL CURSOR SOBRE LOS METIORITOS
        document.getElementById("Meteiorito").addEventListener('mouseover', Aumentar_Puntos)
        document.getElementById("Meteiorito2").addEventListener('mouseover', Aumentar_Puntos)


        //FUNCION QUE UNICAMENTE AUMENTA PUNTOS Y RESETEA LAS VARIABLES AL LLEGAR A CIERTO LIMITE
        function Aumentar_Puntos(){
            Puntaje++;
            document.getElementById("Puntaje").innerHTML = Puntaje + "&nbsp;/&nbsp;15"
            if(Puntaje == 15){
                Puntaje = 0 
                Nivel1_Ganado = true;
                Tiempolvl2 = Tiempo;
                
                

                   
                document.getElementById("Tiempo").innerHTML = Tiempo
                document.getElementById("Puntaje").innerHTML = 0+"&nbsp;/&nbsp;"+27
                document.getElementById("Triunfo").play()
                document.getElementById("Fondo_Ciberpunk").pause()
                document.getElementById("Puntos_sound").pause()
                document.getElementById("Punto2").pause()
                document.getElementById("GANASTE_PANTALLA").style.display = "flex"
                
                function Ganaste_Pantalla(){

                    clearInterval(Reanudar_trayectoria)
                    clearInterval(Reanudar_trayectoria2)
                    clearInterval(Restar_Tiempo)

                    document.getElementById("Meteiorito").style.left = "-70%"
                    document.getElementById("Meteiorito").style.transition = "0s"

                    document.getElementById("Meteiorito2").style.left = "-70%"
                    document.getElementById("Meteiorito2").style.transition = "0s"
                }
                    //ejecutar  solo una vez 
                    Ganaste_Pantalla()

                Swal.fire({
                    title : 'FELICIDADES POR SUPERAR <br> EL NIVEL <br><br> <img src="IMG/Check.png" width = "120px"><br>',
                    html: 'Al parecer nos salvamos, agradecemos tu ayuda y ezfuerzo al superar este nivel, esperamos seguir contando contigo, si algo mas sucede y por cierto, no olvides que te esperan grandes cosas al final del juego asi que no pares de intentar ',
                    icon: 'sucess',
                    confirmButtonText: 'QUIERO CONTINUAR',
                    width: '50%',
                    height: '80%',
                    timer: 100000,
                    
                    
                    timerProgressbar: true,
                    /*Funcion de cerrar la alerta*/
                    allowOutsideClick: true,
                    allowEscapeKey: false,
                    allowEnterkey: false,
                    stopKeydownPropagation: false,
                    });
                    
                        }
                    }



        //ESTA FUNCION DIRIGE AL PRIMER METIORITO 1 A LA TIERRA 
        function Metiorito_Direccion(){
            Distancia1 = 80
            Altura1 = Math.round(Math.random()* 450)

            document.getElementById("Meteiorito").style.left = Distancia1 + "%"
            document.getElementById("Meteiorito").style.top = Altura1 + "px"}

            Inicio_Meteorito1 = setTimeout(Metiorito_Direccion, 2000)//PRIMERO VA A SER EJECUTADO A LOS DOS PRIMEROS SEGUNDOS
            Reanudar_trayectoria = setInterval(Metiorito_Direccion, 2430)//LUEGO SE VA A LLAMAR A LOS METIORITOS CADA 2,4 SEGUNDOS


        //ESTA FUNCION DIRIGE AL PRIMER METIORITO 2 A LA TIERRA         
        function Metiorito_Direccion2(){
            Distancia2 = 80
            Altura2 = Math.round(Math.random()* 450)

            document.getElementById("Meteiorito2").style.left = Distancia2 + "%"
            document.getElementById("Meteiorito2").style.top = Altura2 + "px"}

            Inicio_Meteorito2 = setTimeout(Metiorito_Direccion2, 2600)//PRIMERO VA A SER EJECUTADO A LOS DOS PRIMEROS SEGUNDOS
            Reanudar_trayectoria2 = setInterval(Metiorito_Direccion2, 2350)//LUEGO SE VA A LLAMAR A LOS METIORITOS CADA 2,3 SEGUNDOS


        //AQUI ADJUNTAMOS LA ACCION DE LA FUNCION EXPULZAR AL PASAR SOBRE EL METIORITO
        document.getElementById("Meteiorito").addEventListener('mouseover', Explulsar)
        document.getElementById("Meteiorito2").addEventListener('mouseover', Explulsar2)


        //ESTA ES LA FUNCION QUE EXPULSA AL METIRITO 1 DE MANERA ALEATORIA FUERA DEL MAPA
        function Explulsar (){
            document.getElementById("Puntos_sound").play()
            Distancia = "-500"
            Altura = Math.round(Math.random()* 450)

            document.getElementById("Meteiorito").style.left = Distancia + "px"
            document.getElementById("Meteiorito").style.top = Altura + "px"
            document.getElementById("Meteiorito").style.transition = "1.8s"}


        //ESTA ES LA FUNCION QUE EXPULSA AL METIRITO 2 DE MANERA ALEATORIA FUERA DEL MAPA
        function Explulsar2 (){
            document.getElementById("Punto2").play()
            Distancia = "-500"
            Altura = Math.round(Math.random()* 450)
    
            document.getElementById("Meteiorito2").style.left = Distancia + "px"
            document.getElementById("Meteiorito2").style.top = Altura + "px"
            document.getElementById("Meteiorito2").style.transition = "1.8s"}




        
        //ESTA FUNCION SE ENCARGA DE ALERTARTE UNA VEZ EL METIORITO CRUZE LA LINEA CON UN PERDISTE
        //TAMBIEN RESETEA LOS VALORES Y LLEVA A LOS METIORITOS FUERA DEL MAPA DE MANERA INSTANTANEA
        function perdiste (){
            if(Nivel1_Ganado == true){
                 return;
            }
                const meteorito1 = document.getElementById("Meteiorito");
                const meteorito2 = document.getElementById("Meteiorito2");

                const limite = meteorito1.parentElement.clientWidth * 0.70;

                // Detectar el BORDE DERECHO del meteorito
                const bordeMeteorito1 = meteorito1.offsetLeft + meteorito1.offsetWidth;
                const bordeMeteorito2 = meteorito2.offsetLeft + meteorito2.offsetWidth;

                if((bordeMeteorito1 >= limite) ||
                (bordeMeteorito2 >= limite)) {
                document.getElementById("Perdiste_sound").play()
                alert("YA ES DEMASIADO TARDE, LOS METEORITOS DESTRUYERON GRAN PARTE DEL CONTINENTE Y LO MEJOR ES ESPERAR LO PEOR")
                document.getElementById("Meteiorito").style.left = "-70%"
                document.getElementById("Meteiorito").style.transition = "0s"

                document.getElementById("Meteiorito2").style.left = "-70%"
                document.getElementById("Meteiorito2").style.transition = "0s"
                
              clearInterval(Restar_Tiempo)

                // DETENER LOS METEORITOS
                clearInterval(Reanudar_trayectoria)
                clearInterval(Reanudar_trayectoria2)

                clearTimeout(Inicio_Meteorito1)
                clearTimeout(Inicio_Meteorito2)

                // MANTENER EL PUNTAJE CONSEGUIDO
                document.getElementById("Puntaje").innerHTML = Puntaje + "&nbsp;/&nbsp;15"
                }
            else {
                document.getElementById("Meteiorito").style.transition = "3.5s"
                document.getElementById("Meteiorito2").style.transition = "3.5s"} }

        setInterval(perdiste, 1)//LE COLOCAMOS UNO PARA QUE SIEMPRE SE ESTE EJECUTANDO, DADO A 
        //QUE NO SABEMOS CUANDO EL METIORITO VA A SUPERAR EL LIMITE
        }

        
        //LE DECIMOS QUE AL PRECIONAR EL BOTON JUGAR EJECUTARA LA FUNCION PLAY     
        document.getElementById("Play").addEventListener('click', PLAY)

        Conteo = 4 //ESTE ES EL CONTEO DE LA CUENTA REGRESIVA QUE SE DA DESPUEZ DE PRESINAR JUGAR
            
            //ESTA FUNCION EJECUTA UN CONJUNTO DE ACCIONES AL PRESIONAR JUGAR
            function PLAY(){

    // Estado inicial
    Activo = 1;

    // Música desde el clic de JUGAR
    document.getElementById("Fondo_Ciberpunk").play();

    // Sacar título
    document.getElementById("Texo").style.left = "-900px";

    // Sacar botón JUGAR
    document.getElementById("Contenedor_Mensaje_Star").style.left = "-100%";

       // INICIAR JUEGO DESDE EL PRIMER CLICK
    JUEGO()
    DETENER_JUEGO()


  


    // CUENTA REGRESIVA
    function ESPERAR(){

        function Cuenta_rg(){

            Conteo--;

            document.getElementById("RGB").innerHTML = Conteo;

            if(Conteo == -1){

                document.getElementById("Contenedor_contador").style.display = "none";

                function Borrar(){

                    document.getElementById("Start").style.display = "none";
                }

                setTimeout(Borrar, 500);
            }
        }

        setInterval(Cuenta_rg, 1000);
    }

    setTimeout(ESPERAR, 350);
}



            //ESTA FUNCION CONTIENE EL REANUDE Y PAUSE DEL BOTON
         function DETENER_JUEGO(){

    const botonPause = document.getElementById("Pause");

    // Evita registrar varias veces el evento
    botonPause.onclick = PAUSE;

    // El juego comienza activo
    Activo = 1;

    // Estado inicial del botón
    botonPause.innerHTML = "<h3>PAUSA</h3>";
    botonPause.classList.remove("pausado");


    function PAUSE(){

        // =========================
        // PAUSAR
        // =========================
        if(Activo == 1){

            // Pausar música
            document.getElementById("Fondo_Ciberpunk").pause();

            // Mostrar pantalla de pausa
            document.getElementById("Pausa_Pantalla").style.display = "table";

            // Detener tiempo
            clearInterval(Restar_Tiempo);

            // Detener movimiento automático
            clearInterval(Reanudar_trayectoria);
            clearInterval(Reanudar_trayectoria2);

            // DETENER TAMBIÉN LOS METEORITOS QUE TODAVÍA NO SALIERON
                clearTimeout(Inicio_Meteorito1)
                clearTimeout(Inicio_Meteorito2)

            const meteorito1 = document.getElementById("Meteiorito");
            const meteorito2 = document.getElementById("Meteiorito2");

            // Obtener posición actual
            const posicion1 = meteorito1.getBoundingClientRect();
            const posicion2 = meteorito2.getBoundingClientRect();

            const padre1 = meteorito1.offsetParent.getBoundingClientRect();
            const padre2 = meteorito2.offsetParent.getBoundingClientRect();

            // Quitar transición
            meteorito1.style.transition = "0s";
            meteorito2.style.transition = "0s";

            // Congelar meteorito 1
            meteorito1.style.left =
                (posicion1.left - padre1.left) + "px";

            meteorito1.style.top =
                (posicion1.top - padre1.top) + "px";

            // Congelar meteorito 2
            meteorito2.style.left =
                (posicion2.left - padre2.left) + "px";

            meteorito2.style.top =
                (posicion2.top - padre2.top) + "px";

            // Cambiar botón
            botonPause.innerHTML = "<h3>REANUDAR</h3>";
            botonPause.classList.add("pausado");

            Activo = 2;
        }


        // =========================
        // REANUDAR
        // =========================
        else{

            // Ocultar pantalla de pausa
            document.getElementById("Pausa_Pantalla").style.display = "none";

            // Reanudar música
            document.getElementById("Fondo_Ciberpunk").play();

            // Cambiar botón
            botonPause.innerHTML = "<h3>PAUSA</h3>";
            botonPause.classList.remove("pausado");


            // REANUDAR TIEMPO
            function Tiempo_Disminur(){

                Tiempo--;

                document.getElementById("Tiempo").innerHTML = Tiempo;

                if(Tiempo <= 0){

                    Tiempo = 0;

                    clearInterval(Restar_Tiempo);

                    document.getElementById("Tiempo").innerHTML = Tiempo;

                    document.getElementById("Perdiste_sound").play();

                    alert("Lo lamento perdiste");
                }
            }

            Restar_Tiempo =
                setInterval(Tiempo_Disminur, 1000);


            // METEORITO 1
            function Metiorito_Direccion(){

                Distancia1 = 80;
                Altura1 = Math.round(Math.random() * 450);

                document.getElementById("Meteiorito").style.transition = "3.5s";

                document.getElementById("Meteiorito").style.left =
                    Distancia1 + "%";

                document.getElementById("Meteiorito").style.top =
                    Altura1 + "px";
            }


            // METEORITO 2
            function Metiorito_Direccion2(){

                Distancia2 = 80;
                Altura2 = Math.round(Math.random() * 450);

                document.getElementById("Meteiorito2").style.transition = "3.5s";

                document.getElementById("Meteiorito2").style.left =
                    Distancia2 + "%";

                document.getElementById("Meteiorito2").style.top =
                    Altura2 + "px";
            }


            // Lanzar nuevamente
            Metiorito_Direccion();
            Metiorito_Direccion2();

            // Crear nuevamente los intervalos
            Reanudar_trayectoria =
                setInterval(Metiorito_Direccion, 2430);

            Reanudar_trayectoria2 =
                setInterval(Metiorito_Direccion2, 2350);

            // Próximo clic vuelve a PAUSA
            Activo = 1;
        }
    }
}

//TRANSICIONES ENTRE PAGINAS----------------------------------------------------------------------------------
// BOTONES PARA REGRESAR ENTRE LAS TRES SECCIONES INICIALES
function Volver_Inicio(){
    var inicio = document.getElementById('Seccion_01');
    var reglas = document.getElementById('Reglas');

    inicio.style.display = 'flex';
    inicio.style.top = '-100%';
    inicio.style.transition = '0s';

    setTimeout(function(){
        reglas.style.top = '120%';
        reglas.style.transition = '1.2s';
        inicio.style.top = '0%';
        inicio.style.transition = '1.2s';
    }, 30);
}

function Volver_Reglas(){
    var reglas = document.getElementById('Reglas');
    var historia = document.getElementById('Seccion_2');

    reglas.style.display = 'block';
    reglas.style.top = '-100%';
    reglas.style.transition = '0s';

    setTimeout(function(){
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
    function Desaparecer(){
    var contenedor = document.getElementById("Seccion_01")
    var Reglas = document.getElementById("Reglas")

    Reglas.style.top = "3%"
    Reglas.style.transition = "1s"
    contenedor.style.display = "none"


    }
    setTimeout(Desaparecer,1090)

}



// Continuar desde reglas con teclado, como una interfaz de videojuego
document.addEventListener("keydown", function(event){
    if ((event.key === "Enter" || event.key === " ") && document.getElementById("Reglas")) {
        var reglas = document.getElementById("Reglas");
        var rect = reglas.getBoundingClientRect();
        if (rect.top > -window.innerHeight && rect.top < window.innerHeight) {
            event.preventDefault();
            Mover_2();
        }
    }
});

function Mover_2(){
    var Reglas_Sacar = document.getElementById("Reglas") 


    Reglas_Sacar.style.top = "-100%"
    Reglas_Sacar.style.transition = "1.4s"



    function Desaparecer2(){
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


function Mover_3 (){//TRANSICION DE LA SEGUNDA SECCION A LA TERCERA 

var contenedor_2 = document.getElementById("Seccion_2")
var Supremo = document.getElementById("Seccion_suprema")

document.getElementById("narracion").pause()
contenedor_2.style.top = "-100%"
contenedor_2.style.transition = "1.4s"
Supremo.style.height = "100vh" //Le aumente para que no tape al contenedor del juego


    function Desaparaceer3(){
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


function Reloj_Tiempo(){
    var actualizar_Hora = function(){
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
            pDia_Semana.textContent = semana [diaSemana];
            pDia.textContent = dia
            var Mes_Actual = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Nomviembre', 'Diciembre']
            pMes.textContent = Mes_Actual[mes];
            pAño.textContent = Año

            if(Horas >= 12){
                Horas = Horas - 12;
                ampm = 'PM';
            }
            else{ampm = 'AM';}

            if(Horas == 0){
                Horas = 12;
            }
            if(Horas < 10){
                Horas = "0" + Horas
            }
            pHoras.textContent = Horas
            pAMPM.textContent = ampm
            if(Minutos < 10){
                Minutos = "0" + Minutos
            }
            pMinutos.textContent = Minutos
            if(Segundos < 10){
                Segundos = "0" + Segundos
            }
            pSegundos.textContent = Segundos
        };
    actualizar_Hora();
}


Reloj_Tiempo()

setInterval(Reloj_Tiempo, 1000)
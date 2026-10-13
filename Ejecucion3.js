/* IRON FIST — NIVEL 3 */
(() => {
    "use strict";
    const $ = id => document.getElementById(id);
    const META = 25, ids = ["Meteoritolvl3", "Meteorito2lvl3", "Meteorito3lvl3", "Meteorito4lvl3"];
    let iniciado = false, ganado = false, pausado = false, tiempo = 50, puntos = 0, timer = null, perdida = null;
    let contando = false, conteoTimer = null; // CONTEO 3,2,1 (igual que nivel 1 y 2)
    const intervalos = [], vuelos = {};
    //const carriles = [10, 34, 58, 82];

    // Mensajes de derrota: los mismos que usan los niveles 1 y 2
    const MSG_LINEA = "LOS METEORITOS DESTRUYERON GRAN PARTE DEL CONTINENTE<br>LO MEJOR ES ESPERAR LO PEOR";
    const MSG_TIEMPO = "EL TIEMPO SE AGOTÓ. DE SEGURO LO LOGRARÁS EN EL SIGUIENTE INTENTO";

    function aleatorio(min,max){return min+Math.random()*(max-min);}

    // Altura al azar (% del tablero), como en los niveles 1 y 2
    function posicionMeteorito(id){return aleatorio(4,82);}

    // Programa el próximo lanzamiento de un meteorito tras un tiempo al azar
    function programar(id,ms){
        if(vuelos[id]?.timeout)clearTimeout(vuelos[id].timeout);
        vuelos[id]={esperando:true,timeout:setTimeout(()=>lanzar(id),ms)};
    }

    function hud() { if ($("Tiempolvl3")) $("Tiempolvl3").textContent = tiempo; if ($("Puntajelvl3")) $("Puntajelvl3").innerHTML = `${puntos}&nbsp;/&nbsp;${META}`; }

    function limpiar() { if (timer) clearInterval(timer); if (perdida) clearInterval(perdida); intervalos.forEach(clearInterval); intervalos.length = 0; timer = perdida = null; ids.forEach(id => { if (vuelos[id]?.timeout) clearTimeout(vuelos[id].timeout); vuelos[id] = null; }); }

    function ocultar(id) { const e = $(id); if (!e) return; if (vuelos[id]?.timeout) clearTimeout(vuelos[id].timeout); vuelos[id] = null; e.style.visibility = "visible"; e.style.display=""; e.style.opacity = "1"; e.style.transition = "none"; e.style.left = "-14%"; e.style.top = `${posicionMeteorito(id)}%`; void e.offsetWidth; e.style.transition = "2.1s linear"; }

    function lanzar(id) { const e = $(id); if (!e || !iniciado || pausado || ganado) return; if (vuelos[id]?.timeout) clearTimeout(vuelos[id].timeout); const token = Symbol(id); vuelos[id] = { token }; e.style.visibility = "visible"; e.style.opacity = "1"; e.style.transition = "2.1s linear"; e.style.top = `${posicionMeteorito(id)}%`; e.style.left = "73%"; vuelos[id].timeout = setTimeout(() => { if (vuelos[id]?.token === token && iniciado && !pausado && !ganado) perder(MSG_LINEA); }, 2150); }

    function punto(e) {
        if (!iniciado || pausado || ganado) return;
        const el = e.currentTarget, id = el.id;
        if (vuelos[id]?.expulsado) return;   // ya fue golpeado, evita sumar doble
        if (vuelos[id]?.timeout) clearTimeout(vuelos[id].timeout);
        puntos++;
        const s = $("Punto4"); if (s) { s.currentTime = 0; s.play().catch(() => { }); }
        // Expulsión hacia la izquierda (como nivel 1 y 2)
        el.style.transition = "1.8s";
        el.style.left = "-500px";
        el.style.top = `${Math.round(Math.random() * 85)}%`;
        vuelos[id] = { expulsado: true, timeout: setTimeout(() => { if (iniciado) { ocultar(id); lanzar(id); } }, 1800) };
        hud();
        if (puntos >= META) ganar();
    }


    /* =========================================================
       DERROTA — mismo Swal.fire que en los niveles 1 y 2
    ========================================================= */

    function perder(motivo) {
        if (!iniciado || ganado) return;
        iniciado = false; pausado = false; limpiar(); $("Music_level3")?.pause(); ids.forEach(ocultar);
        const s = $("Perdiste_sound"); if (s) { s.currentTime = 0; s.play().catch(() => { }); }
        const txt = motivo || MSG_LINEA;
        if (!window.Swal) { alert(txt.replace(/<br>/g, " ")); reiniciarNivel3(); return; }
        Swal.fire({
            title: 'MISIÓN FALLIDA <br><br> <img src="IMG/Chems.gif" width="120px">',
            html: txt,
            icon: 'error',
            confirmButtonText: 'INTENTAR DE NUEVO',
            width: '50%',
            background: 'radial-gradient(circle at center, rgba(255,40,40,0.35), rgba(20,0,0,0.95))',
            color: '#fff',
            allowOutsideClick: false,
            allowEscapeKey: false,
            allowEnterKey: false,
            preConfirm: () => { Swal.getConfirmButton().disabled = true }
        }).then(() => {
            reiniciarNivel3();
        });
    }

    /* Reinicia tiempo/puntaje/meteoritos y lanza el conteo 3,2,1 (como en nivel 1 y 2) */
    function reiniciarNivel3() {
        iniciado = false; pausado = false; ganado = false; limpiar();
        tiempo = 50; puntos = 0; hud();
        const creditos = $("Pantalla_creditoslvl3");
        if (creditos) creditos.style.display = "none";
        ids.forEach(ocultar);
        conteo();
    }

    window.reiniciarEstadoNivel3 = () => {
        iniciado = false; pausado = false; ganado = false; limpiar();
        detenerConteo();
        tiempo = 50; puntos = 0; hud();
        $("Startlvl3") && ($("Startlvl3").style.display = "flex");

        const creditos = $("Pantalla_creditoslvl3");
        if (creditos) creditos.style.display = "none";

        ids.forEach(ocultar);
    };


    /* =========================================================
       CONTEO 3, 2, 1 AL PRESIONAR JUGAR (y al reintentar)
    ========================================================= */

    function elementosInicio(visible) {
        ["NivelIndicadorlvl3", "Textolvl3", "Dificultadlvl3", "Playlvl3"].forEach(id => {
            const e = $(id);
            if (e) e.style.display = visible ? "" : "none";
        });
    }

    function detenerConteo() {
        if (conteoTimer) clearInterval(conteoTimer);
        conteoTimer = null;
        contando = false;
        const cont = $("Contenedor_contadorlvl3");
        if (cont) cont.style.display = "none";
        elementosInicio(true);
    }

    function conteo() {

        if (contando || iniciado) return;
        contando = true;

        const inicio = $("Startlvl3");
        const cont = $("Contenedor_contadorlvl3");
        const num = $("RGBlvl3");

        let cuenta = 3;

        if (inicio) inicio.style.display = "flex";
        elementosInicio(false);               // oculta título, JUGAR y dificultad; deja solo el número
        if (cont) cont.style.display = "table";
        if (num) num.textContent = cuenta;

        conteoTimer = setInterval(() => {

            cuenta--;

            if (cuenta >= 1) {
                if (num) num.textContent = cuenta;
                return;
            }

            clearInterval(conteoTimer);
            conteoTimer = null;

            if (cont) cont.style.display = "none";
            elementosInicio(true);            // restaura por si se vuelve a mostrar Start
            contando = false;

            iniciar();                        // arranca solo, sin volver a pulsar JUGAR

        }, 1000);

    }


    /* =========================================================
       INICIAR NIVEL 3
    ========================================================= */

    function iniciar() {

        if (iniciado) return;

        iniciado = true;
        ganado = false;
        pausado = false;
        tiempo = 50;
        puntos = 0;

        limpiar();
        hud();

        const inicio = $("Startlvl3");
        if (inicio) inicio.style.display = "none";

        const creditos = $("Pantalla_creditoslvl3");
        if (creditos) creditos.style.display = "none";

        const victoria = $("GanastePantallaLvL3");
        if (victoria) victoria.style.display = "none";

        const musica = $("Music_level3");
        if (musica) {
            musica.currentTime = 0;
            musica.play().catch(() => { });
        }

        /* CONTADOR */

        timer = setInterval(() => {

            if (!iniciado || pausado || ganado) return;

            tiempo--;
            hud();

            if (tiempo <= 0) {

                perder(MSG_TIEMPO);

            }

        }, 1000);


        ids.forEach(id=>programar(id,aleatorio(300,2200)));
    }


    /* =========================================================
       GANAR NIVEL 3
    ========================================================= */

    function ganar() {

        if (ganado) return;

        ganado = true;
        iniciado = false;
        pausado = false;

        limpiar();

        const musica = $("Music_level3");
        if (musica) musica.pause();

        ids.forEach(id => {

            const e = $(id);

            if (e) {
                e.style.display="none";
            }

        });

        const victoria = $("GanastePantallaLvL3");

        if (victoria) {
            victoria.style.display = "flex";
        }

        const sonido = $("Triunfo");

        if (sonido) {
            sonido.currentTime = 0;
            sonido.play().catch(() => { });
        }


        /* DESPUÉS DE GANAR → ESCENA FINAL */

        setTimeout(() => {

            if (victoria) {
                victoria.style.display = "none";
            }

            finalCinematico();

        }, 2500);

    }


    /* =========================================================
       ESCENA FINAL Y CRÉDITOS
    ========================================================= */

    function finalCinematico() {

        /* Mantener la pequeña escena final de las naves */

        ["Pantalla_Ovnislvl3",
            "Pantalla_Nodrizalvl3",
            "Pantalla_Ovnis2lvl3"
        ].forEach(id => {

            const e = $(id);

            if (e) {
                e.style.left = "7%";
                e.style.transition = "6s";
            }

        });


        const nod = $("Pantalla_Nodrizalvl3");

        if (nod) {
            nod.style.left = "10%";
            nod.style.transition = "5s";
        }


        /* Después de la escena final aparecen LOS CRÉDITOS */

        setTimeout(() => {

            const pantalla = $("Pantalla_creditoslvl3");
            const creditos = $("Creditoslvl3");

            if (!pantalla || !creditos) return;


            /* Mostrar pantalla negra */

            pantalla.style.display = "block";
            pantalla.style.background = "#000";
            pantalla.style.visibility = "visible";
            pantalla.style.opacity = "1";


            /* Reiniciar posición */

            creditos.style.animation = "none";
            creditos.style.top = "100%";

            void creditos.offsetWidth;


            /* Activar animación */

            creditos.style.animation = "creditosSubir 25s linear forwards";


        }, 5000);

    }


    /* =========================================================
       GUARDAR POSICIÓN AL PAUSAR
    ========================================================= */

    function guardarPosicionPausa(id) {

        const e = $(id);
        const estado = vuelos[id];

        if (!e || !estado) return;

        const contenedor = e.parentElement;

        if (!contenedor) return;

        const rect = e.getBoundingClientRect();
        const contRect = contenedor.getBoundingClientRect();

        if (!contRect.width) return;

        const posicion = ((rect.left - contRect.left) / contRect.width) * 100;

        vuelos[id].pauseLeft = posicion;

        if (vuelos[id].timeout) {
            clearTimeout(vuelos[id].timeout);
            vuelos[id].timeout = null;
        }

        e.style.transition = "none";
        e.style.left = `${posicion}%`;

    }


    /* =========================================================
       REANUDAR METEORITO
    ========================================================= */

    function reanudarMeteorito(id) {
        const e = $(id), estado = vuelos[id]; if (!e || !iniciado || ganado || !estado) return;
        if(estado.expulsado||estado.esperando){ocultar(id);programar(id,aleatorio(200,1200));return;}
        const token = Symbol(id), distancia = Math.max(0, 73 - (estado.pauseLeft ?? -14)), duracion = Math.max(.35, 2.1 * (distancia / 87));
        vuelos[id] = { ...estado, token }; e.style.transition = `${duracion}s linear`; e.style.left = "73%";
        vuelos[id].timeout = setTimeout(() => { if (vuelos[id]?.token === token && iniciado && !pausado && !ganado) perder(MSG_LINEA); }, duracion * 1000 + 80);
    }


    /* =========================================================
       PAUSA
    ========================================================= */

    function pausar() { if (!iniciado || ganado) return; pausado = !pausado; if (pausado) { ids.forEach(guardarPosicionPausa); } else { ids.forEach(id => { if (vuelos[id]) reanudarMeteorito(id); else lanzar(id); }); } const b = $("Pauselvl3"), p = $("Pausa_Pantallalvl3"), m = $("Music_level3"); if (b) { const t = b.querySelector("h3"); if (t) t.textContent = pausado ? "REANUDAR" : "PAUSAR"; b.classList.toggle("Pauselvl3_Activo", pausado); } if (p) p.style.display = pausado ? "table" : "none"; if (m) { if (pausado) m.pause(); else m.play().catch(() => { }); } }


    /* =========================================================
       PREPARAR
    ========================================================= */

    function preparar() {
        hud(); $("Startlvl3") && ($("Startlvl3").style.display = "flex");
        const cont = $("Contenedor_contadorlvl3"); if (cont) cont.style.display = "none";
        ids.forEach(id => {
            const e = $(id); if (e) {
                e.onmouseenter = punto;
                e.setAttribute("role", "button");
                e.setAttribute("tabindex", "0");
                e.onkeydown = (ev) => { if (ev.key === "Enter" || ev.key === " ") { ev.preventDefault(); punto({ currentTarget: e }); } }; ocultar(id);
            }
        });
    }


    /* =========================================================
       BOTONES
    ========================================================= */

    $("Playlvl3")?.addEventListener("click", conteo);
    $("Pauselvl3")?.addEventListener("click", pausar);

    window.JUEGOlvl3 = iniciar;

    preparar();

})();
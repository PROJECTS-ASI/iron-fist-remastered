/* IRON FIST — NIVEL 3 | meteoritos giratorios y dificultad ajustada */
(() => {
"use strict";
const $ = id => document.getElementById(id);
const META = 25;
const ids = ["Meteoritolvl3", "Meteorito2lvl3", "Meteorito3lvl3", "Meteorito4lvl3"];
let iniciado = false, ganado = false, pausado = false, tiempo = 50, puntos = 0, timer = null, perdida = null;
const intervalos = [], vuelos = {};
const carriles = [10, 34, 58, 82];
const DURACION_VUELO = 1.95; // un poco más rápido que antes (2.1 s)

function posicionMeteorito(id) {
  const i = Math.max(0, ids.indexOf(id));
  return Math.max(6, Math.min(90, carriles[i % carriles.length] + (Math.random() * 7 - 3.5)));
}
function hud() {
  if ($("Tiempolvl3")) $("Tiempolvl3").textContent = tiempo;
  if ($("Puntajelvl3")) $("Puntajelvl3").innerHTML = `${puntos}&nbsp;/&nbsp;${META}`;
}
function limpiar() {
  if (timer) clearInterval(timer);
  if (perdida) clearInterval(perdida);
  intervalos.forEach(clearInterval); intervalos.length = 0;
  timer = perdida = null;
  ids.forEach(id => { if (vuelos[id]?.timeout) clearTimeout(vuelos[id].timeout); vuelos[id] = null; });
}
function ocultar(id) {
  const e = $(id); if (!e) return;
  if (vuelos[id]?.timeout) clearTimeout(vuelos[id].timeout);
  vuelos[id] = null;
  e.style.visibility = "visible"; e.style.opacity = "1"; e.style.transition = "none";
  e.style.animationPlayState = "running";
  e.style.left = "-14%"; e.style.top = `${posicionMeteorito(id)}%`;
  void e.offsetWidth;
  e.style.transition = `${DURACION_VUELO}s linear`;
}
function lanzar(id) {
  const e = $(id); if (!e || !iniciado || pausado || ganado) return;
  if (vuelos[id]?.timeout) clearTimeout(vuelos[id].timeout);
  const token = Symbol(id); vuelos[id] = { token };
  e.style.visibility = "visible"; e.style.opacity = "1";
  e.style.animationPlayState = "running";
  e.style.transition = `${DURACION_VUELO}s linear`;
  e.style.top = `${posicionMeteorito(id)}%`;
  e.style.left = "73%";
  vuelos[id].timeout = setTimeout(() => {
    if (vuelos[id]?.token === token && iniciado && !pausado && !ganado)
      perder("Un meteorito cruzó la línea de seguridad.");
  }, DURACION_VUELO * 1000 + 80);
}
function punto(ev) {
  if (!iniciado || pausado || ganado) return;
  const id = ev.currentTarget.id;
  if (vuelos[id]?.timeout) clearTimeout(vuelos[id].timeout);
  vuelos[id] = null; puntos++;
  const s = $("Punto4"); if (s) { s.currentTime = 0; s.play().catch(() => {}); }
  ocultar(id); hud(); if (puntos >= META) ganar();
}
function perder(motivo) {
  if (!iniciado || ganado) return;
  iniciado = false; pausado = false; limpiar(); $("Music_level3")?.pause(); ids.forEach(ocultar);
  const s = $("Perdiste_sound"); if (s) { s.currentTime = 0; s.play().catch(() => {}); }
  const txt = motivo || "Un meteorito cruzó la línea de seguridad y alcanzó la Tierra.";
  if (typeof window.mostrarDerrotaGeneral === "function") window.mostrarDerrotaGeneral(txt);
  else if (window.Swal) Swal.fire({ title: "¡HAS PERDIDO!", text: txt, icon: "error", confirmButtonText: "REINTENTAR NIVEL 3", allowOutsideClick: false }).then(() => window.reiniciarEstadoNivel3());
  else { alert(txt); window.reiniciarEstadoNivel3(); }
}
window.reiniciarEstadoNivel3 = () => {
  iniciado = false; pausado = false; ganado = false; limpiar(); tiempo = 50; puntos = 0; hud();
  if ($("Startlvl3")) $("Startlvl3").style.display = "flex";
  if ($("Pantalla_creditoslvl3")) $("Pantalla_creditoslvl3").style.display = "none";
  ids.forEach(ocultar);
};
function iniciar() {
  if (iniciado) return;
  iniciado = true; ganado = false; pausado = false; tiempo = 50; puntos = 0;
  limpiar(); hud();
  if ($("Startlvl3")) $("Startlvl3").style.display = "none";
  if ($("Pantalla_creditoslvl3")) $("Pantalla_creditoslvl3").style.display = "none";
  if ($("GanastePantallaLvL3")) $("GanastePantallaLvL3").style.display = "none";
  const musica = $("Music_level3"); if (musica) { musica.currentTime = 0; musica.play().catch(() => {}); }
  timer = setInterval(() => {
    if (!iniciado || pausado || ganado) return;
    tiempo--; hud(); if (tiempo <= 0) perder("Se acabó el tiempo. La Tierra quedó expuesta.");
  }, 1000);
  ids.forEach((id, index) => setTimeout(() => { if (iniciado && !pausado && !ganado) lanzar(id); }, index * 500));
  // Espaciamos un poco los lanzamientos para compensar la velocidad extra y mantenerlo justo.
  ids.forEach((id, index) => {
    const intervalo = setInterval(() => {
      if (iniciado && !pausado && !ganado && !vuelos[id]) lanzar(id);
    }, 2850 + index * 400);
    intervalos.push(intervalo);
  });
}
function ganar() {
  if (ganado) return;
  ganado = true; iniciado = false; pausado = false; limpiar(); $("Music_level3")?.pause();
  ids.forEach(id => { const e = $(id); if (e) e.style.visibility = "hidden"; });
  const victoria = $("GanastePantallaLvL3"); if (victoria) victoria.style.display = "flex";
  const sonido = $("Triunfo"); if (sonido) { sonido.currentTime = 0; sonido.play().catch(() => {}); }
  setTimeout(() => { if (victoria) victoria.style.display = "none"; finalCinematico(); }, 2500);
}
function finalCinematico() {
  ["Pantalla_Ovnislvl3", "Pantalla_Nodrizalvl3", "Pantalla_Ovnis2lvl3"].forEach(id => {
    const e = $(id); if (e) { e.style.left = "7%"; e.style.transition = "6s"; }
  });
  const nod = $("Pantalla_Nodrizalvl3"); if (nod) { nod.style.left = "10%"; nod.style.transition = "5s"; }
  setTimeout(() => {
    const pantalla = $("Pantalla_creditoslvl3"), creditos = $("Creditoslvl3"); if (!pantalla || !creditos) return;
    pantalla.style.display = "block"; pantalla.style.background = "#000"; pantalla.style.visibility = "visible"; pantalla.style.opacity = "1";
    creditos.style.animation = "none"; creditos.style.top = "100%"; void creditos.offsetWidth;
    creditos.style.animation = "creditosSubir 25s linear forwards";
  }, 5000);
}
function guardarPosicionPausa(id) {
  const e = $(id), estado = vuelos[id]; if (!e || !estado) return;
  const contenedor = e.parentElement; if (!contenedor) return;
  const rect = e.getBoundingClientRect(), contRect = contenedor.getBoundingClientRect(); if (!contRect.width) return;
  const posicion = ((rect.left - contRect.left) / contRect.width) * 100;
  vuelos[id].pauseLeft = posicion;
  if (vuelos[id].timeout) { clearTimeout(vuelos[id].timeout); vuelos[id].timeout = null; }
  e.style.transition = "none"; e.style.left = `${posicion}%`; e.style.animationPlayState = "paused";
}
function reanudarMeteorito(id) {
  const e = $(id), estado = vuelos[id]; if (!e || !iniciado || ganado || !estado) return;
  const token = Symbol(id), distancia = Math.max(0, 73 - (estado.pauseLeft ?? -14));
  const duracion = Math.max(.35, DURACION_VUELO * (distancia / 87));
  vuelos[id] = { ...estado, token }; e.style.animationPlayState = "running";
  e.style.transition = `${duracion}s linear`; e.style.left = "73%";
  vuelos[id].timeout = setTimeout(() => {
    if (vuelos[id]?.token === token && iniciado && !pausado && !ganado)
      perder("Un meteorito cruzó la línea de seguridad y alcanzó la Tierra.");
  }, duracion * 1000 + 80);
}
function pausar() {
  if (!iniciado || ganado) return;
  pausado = !pausado;
  if (pausado) ids.forEach(guardarPosicionPausa);
  else ids.forEach(id => { if (vuelos[id]) reanudarMeteorito(id); else lanzar(id); });
  const b = $("Pauselvl3"), p = $("Pausa_Pantallalvl3"), m = $("Music_level3");
  if (b) { const t = b.querySelector("h3"); if (t) t.textContent = pausado ? "REANUDAR" : "PAUSAR"; b.classList.toggle("Pauselvl3_Activo", pausado); }
  if (p) p.style.display = pausado ? "table" : "none";
  if (m) { if (pausado) m.pause(); else m.play().catch(() => {}); }
}
function preparar() {
  hud(); if ($("Startlvl3")) $("Startlvl3").style.display = "flex";
  ids.forEach(id => {
    const e = $(id); if (!e) return;
    e.onclick = punto; e.setAttribute("role", "button"); e.setAttribute("tabindex", "0");
    e.onkeydown = ev => { if (ev.key === "Enter" || ev.key === " ") { ev.preventDefault(); punto({ currentTarget: e }); } };
    ocultar(id);
  });
}
$("Playlvl3")?.addEventListener("click", iniciar);
$("Pauselvl3")?.addEventListener("click", pausar);
window.JUEGOlvl3 = iniciar;
preparar();
})();

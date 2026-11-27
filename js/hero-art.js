/**
 * hero-art.js
 * Anima las formas decorativas de la portada:
 *  - con mouse (escritorio): cada forma se desplaza a distinta velocidad
 *    según la posición del cursor sobre la portada (efecto de profundidad);
 *  - al hacer scroll (celular y escritorio): las formas se desplazan, rotan
 *    y respiran mientras la ilustración cruza la pantalla.
 * Se desactiva si la persona pidió reducir el movimiento.
 * Marcado esperado: .hero con .hero-art que contiene 4 .hero-shape
 * (sol, aro, barra, punto, en ese orden).
 */
(function () {
  'use strict';

  var hero = document.querySelector('.hero');
  var art = document.querySelector('.hero-art');

  if (!hero || !art) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  var shapes = Array.prototype.slice.call(art.querySelectorAll('.hero-shape'));
  if (shapes.length < 4) return;

  // Amplitudes en px para una ilustración de 460 px de ancho (se escalan al tamaño real).
  // mouse: desplazamiento con el cursor · scroll: desplazamiento con el scroll
  // rot: grados de rotación · pulse: cuánto "respira" la forma al hacer scroll
  var config = [
    { mouse: [14, 14], scroll: [-20, 30], rotMouse: 0, rotScroll: 0, pulse: 0.07 },   // sol
    { mouse: [-22, -18], scroll: [14, -40], rotMouse: 0, rotScroll: 0, pulse: -0.04 }, // aro
    { mouse: [30, 8], scroll: [0, 44], rotMouse: 8, rotScroll: 28, pulse: 0 },         // barra
    { mouse: [-40, -30], scroll: [30, 18], rotMouse: 0, rotScroll: 0, pulse: 0 }       // punto
  ];

  var EASING = 0.12;
  var mouse = { x: 0, y: 0 };
  var scrollProgress = 0; // de -1 (entra por abajo) a 1 (sale por arriba)
  var current = shapes.map(function () {
    return { x: 0, y: 0, r: 0, s: 1 };
  });
  var frameId = 0;

  function clamp(value, min, max) {
    return Math.min(Math.max(value, min), max);
  }

  function readScroll() {
    var rect = art.getBoundingClientRect();
    var viewport = window.innerHeight;
    var progress = clamp((viewport - rect.top) / (viewport + rect.height), 0, 1);
    scrollProgress = (progress - 0.5) * 2;
  }

  function targetFor(index, scale) {
    var c = config[index];
    return {
      x: (mouse.x * c.mouse[0] + scrollProgress * c.scroll[0]) * scale,
      y: (mouse.y * c.mouse[1] + scrollProgress * c.scroll[1]) * scale,
      r: mouse.x * c.rotMouse + scrollProgress * c.rotScroll,
      s: 1 + (1 - Math.abs(scrollProgress)) * c.pulse
    };
  }

  function apply(index, state) {
    shapes[index].style.transform =
      'translate3d(' + state.x.toFixed(2) + 'px,' + state.y.toFixed(2) + 'px,0) ' +
      'rotate(' + state.r.toFixed(2) + 'deg) scale(' + state.s.toFixed(4) + ')';
  }

  function frame() {
    frameId = 0;
    var scale = Math.min(art.offsetWidth / 460, 1);
    var moving = false;

    shapes.forEach(function (shape, index) {
      if (!config[index]) return;
      var target = targetFor(index, scale);
      var state = current[index];

      ['x', 'y', 'r', 's'].forEach(function (key) {
        var delta = target[key] - state[key];
        if (Math.abs(delta) > 0.01) {
          state[key] += delta * EASING;
          moving = true;
        } else {
          state[key] = target[key];
        }
      });

      apply(index, state);
    });

    if (moving) frameId = window.requestAnimationFrame(frame);
  }

  function requestFrame() {
    if (!frameId) frameId = window.requestAnimationFrame(frame);
  }

  function onPointerMove(event) {
    if (event.pointerType !== 'mouse') return;
    var rect = hero.getBoundingClientRect();
    mouse.x = clamp(((event.clientX - rect.left) / rect.width - 0.5) * 2, -1, 1);
    mouse.y = clamp(((event.clientY - rect.top) / rect.height - 0.5) * 2, -1, 1);
    requestFrame();
  }

  function onPointerLeave() {
    mouse.x = 0;
    mouse.y = 0;
    requestFrame();
  }

  function onScroll() {
    readScroll();
    requestFrame();
  }

  // Estado inicial sin animación de entrada
  readScroll();
  (function () {
    var scale = Math.min(art.offsetWidth / 460, 1);
    shapes.forEach(function (shape, index) {
      if (!config[index]) return;
      current[index] = targetFor(index, scale);
      apply(index, current[index]);
    });
  })();

  hero.addEventListener('pointermove', onPointerMove);
  hero.addEventListener('pointerleave', onPointerLeave);
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll);
})();

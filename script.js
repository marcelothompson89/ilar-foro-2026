/* ============================================================
   Micrositio II Foro de Alto Nivel — ILAR
   Nav móvil · sombra del header · scroll suave · reveal
   ============================================================ */
(function () {
  'use strict';

  var header = document.querySelector('.site-header');
  var toggle = document.getElementById('navToggle');
  var nav = document.getElementById('navMenu');

  /* --- Menú hamburguesa (móvil) --- */
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var open = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      toggle.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
    });

    /* Cerrar el menú al elegir una sección */
    nav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        if (nav.classList.contains('open')) {
          nav.classList.remove('open');
          toggle.setAttribute('aria-expanded', 'false');
          toggle.setAttribute('aria-label', 'Abrir menú');
        }
      });
    });
  }

  /* --- Sombra del header al hacer scroll --- */
  function onScroll() {
    if (window.scrollY > 8) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* --- Reveal al entrar en viewport --- */
  var reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && reveals.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add('visible'); });
  }

  /* --- Carrusel de ponentes --- */
  var track = document.getElementById('spkTrack');
  if (track) {
    var prevBtn = document.querySelector('.spk-prev');
    var nextBtn = document.querySelector('.spk-next');
    var dotsBox = document.getElementById('spkDots');
    var cards = track.querySelectorAll('.spk-card');

    function cardStep() {
      if (cards.length < 2) { return cards.length ? cards[0].offsetWidth : 0; }
      return cards[1].getBoundingClientRect().left - cards[0].getBoundingClientRect().left;
    }
    function perView() {
      var step = cardStep();
      return step ? Math.max(1, Math.round(track.clientWidth / step)) : 1;
    }

    /* Puntos: uno por "página" visible */
    var dots = [];
    function buildDots() {
      if (!dotsBox) { return; }
      var pages = Math.max(1, Math.ceil(cards.length / perView()));
      dotsBox.innerHTML = '';
      dots = [];
      for (var i = 0; i < pages; i++) {
        var b = document.createElement('button');
        b.className = 'spk-dot';
        b.type = 'button';
        b.setAttribute('aria-label', 'Ir al grupo ' + (i + 1));
        (function (idx) {
          b.addEventListener('click', function () {
            track.scrollTo({ left: idx * perView() * cardStep(), behavior: 'smooth' });
          });
        })(i);
        dotsBox.appendChild(b);
        dots.push(b);
      }
    }

    function update() {
      var max = track.scrollWidth - track.clientWidth;
      if (prevBtn) { prevBtn.disabled = track.scrollLeft <= 8; }
      if (nextBtn) { nextBtn.disabled = track.scrollLeft >= max - 8; }
      if (dots.length) {
        var page = Math.round(track.scrollLeft / (perView() * cardStep())) || 0;
        dots.forEach(function (d, i) { d.classList.toggle('active', i === page); });
      }
    }

    if (prevBtn) {
      prevBtn.addEventListener('click', function () {
        track.scrollBy({ left: -cardStep() * perView(), behavior: 'smooth' });
      });
    }
    if (nextBtn) {
      nextBtn.addEventListener('click', function () {
        track.scrollBy({ left: cardStep() * perView(), behavior: 'smooth' });
      });
    }
    track.addEventListener('scroll', function () {
      window.requestAnimationFrame(update);
    }, { passive: true });

    var rt;
    window.addEventListener('resize', function () {
      clearTimeout(rt);
      rt = setTimeout(function () { buildDots(); update(); }, 150);
    });

    buildDots();
    update();
  }
})();

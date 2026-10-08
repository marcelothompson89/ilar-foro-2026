/* /agenda/ — dibuja la agenda y las biografías a partir de data.js */
(function () {
  'use strict';

  var data = window.FORO_DATA;
  if (!data) { return; }

  var BIO_PROVISIONAL = { es: 'Biografía próxima a publicarse.', en: 'Biography coming soon.' };
  var lang = 'es';
  var byId = {};
  data.speakers.forEach(function (p) { byId[p.id] = p; });

  function el(tag, cls, text) {
    var n = document.createElement(tag);
    if (cls) { n.className = cls; }
    if (text != null) { n.textContent = text; }
    return n;
  }

  function avatar(p, cls) {
    var wrap = el('span', cls);
    if (p.photo) {
      var img = document.createElement('img');
      img.src = '/assets/ponentes/' + p.photo;
      img.alt = p.name;
      img.loading = 'lazy';
      if (p.photoStyle) { img.setAttribute('style', p.photoStyle); }
      wrap.appendChild(img);
    } else {
      wrap.classList.add('sp-initials');
      wrap.setAttribute('aria-hidden', 'true');
      wrap.textContent = p.initials || '';
    }
    return wrap;
  }

  /* ---------- Agenda ---------- */
  var list = document.getElementById('agendaList');
  data.items.forEach(function (it) {
    if (it.type === 'break') {
      var row = el('div', 'agenda-row agenda-break');
      row.appendChild(el('span', 'ag-time', it.time));
      var lab = el('span', 'ag-label', it.label);
      if (it.note) { lab.appendChild(el('span', 'agenda-note', it.note)); }
      row.appendChild(lab);
      list.appendChild(row);
      return;
    }

    var card = el('article', 'card session-card');
    var head = el('div', 'session-head');
    head.appendChild(el('span', 'session-num', it.label));
    head.appendChild(el('span', 'session-time', it.time + ' hrs'));
    card.appendChild(head);
    if (it.title) { card.appendChild(el('h3', null, it.title)); }

    var people = el('div', 'session-people');
    it.speakers.forEach(function (id) {
      var p = byId[id];
      if (!p) { return; }
      var a = el(p.noBio ? 'div' : 'a', p.noBio ? 'session-person' : 'session-person sp-link');
      if (!p.noBio) { a.href = '#ponente-' + p.id; }
      a.appendChild(avatar(p, 'sp-avatar'));
      var info = el('div', 'sp-info');
      info.appendChild(el('p', 'sp-name', p.name));
      info.appendChild(el('p', 'sp-role', p.role));
      a.appendChild(info);
      people.appendChild(a);
    });
    card.appendChild(people);
    list.appendChild(card);
  });

  /* ---------- Biografías ---------- */
  function bioCard(p) {
    var d = el('details', 'bio-card');
    d.id = 'ponente-' + p.id;

    var s = el('summary');
    s.appendChild(avatar(p, 'bio-photo'));
    var info = el('span', 'bio-info');
    info.appendChild(el('span', 'bio-name', p.name));
    info.appendChild(el('span', 'bio-role', p.role));
    s.appendChild(info);
    s.appendChild(el('span', 'bio-chevron'));
    d.appendChild(s);

    var body = el('div', 'bio-body');
    ['es', 'en'].forEach(function (l) {
      var text = l === 'en' ? (p.bioEn || p.bio) : p.bio;
      var txt = el('p', text ? '' : 'bio-pending', text || BIO_PROVISIONAL[l]);
      txt.setAttribute('data-lang', l);
      txt.lang = l;
      if (l === 'en' && !p.bioEn && p.bio) { txt.lang = 'es'; }
      body.appendChild(txt);
    });
    d.appendChild(body);
    return d;
  }

  function fill(id, arr) {
    var box = document.getElementById(id);
    arr.forEach(function (p) { if (!p.noBio) { box.appendChild(bioCard(p)); } });
  }
  fill('bioSpeakers', data.speakers);

  /* Selector de idioma (solo biografías) */
  var grid = document.getElementById('bioSpeakers');
  var langBtns = document.querySelectorAll('.bio-lang button');
  function setLang(l) {
    lang = l;
    grid.setAttribute('data-lang', l);
    langBtns.forEach(function (b) {
      b.setAttribute('aria-pressed', b.getAttribute('data-lang') === l ? 'true' : 'false');
    });
    document.getElementById('bioHint').textContent = l === 'en'
      ? 'Tap the name of any speaker to read their biography.'
      : 'Toca el nombre de cualquier ponente para ver su biografía.';
  }
  langBtns.forEach(function (b) {
    b.addEventListener('click', function () { setLang(b.getAttribute('data-lang')); });
  });
  setLang('es');

  /* Abre la biografía a la que apunta el enlace (#ponente-...) */
  function openFromHash() {
    var h = decodeURIComponent(location.hash.slice(1));
    if (h.indexOf('ponente-') !== 0) { return; }
    var t = document.getElementById(h);
    if (t && t.tagName === 'DETAILS') {
      t.open = true;
      t.scrollIntoView({ block: 'center' });
    }
  }
  window.addEventListener('hashchange', openFromHash);
  openFromHash();
})();

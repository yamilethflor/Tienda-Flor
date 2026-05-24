/* =====================================================
   FLOR — flor.js  (versión corregida y mejorada)
   ===================================================== */

/* ─────────────────────────────────────────
   NAVEGACIÓN ENTRE PÁGINAS
   ───────────────────────────────────────── */
function showPage(pageId) {
  const heroMain = document.getElementById('hero-main');
  if (heroMain) heroMain.style.display = (pageId === 'inicio') ? 'flex' : 'none';

  ['mujer', 'hombre', 'calzado', 'muchomas'].forEach(function(p) {
    const h = document.getElementById('hero-' + p);
    if (h) h.style.display = (p === pageId) ? 'flex' : 'none';
  });

  document.querySelectorAll('.page-section').forEach(function(s) {
    s.classList.remove('active');
  });
  const target = document.getElementById('page-' + pageId);
  if (target) target.classList.add('active');

  document.querySelectorAll('.navbar ul li a').forEach(function(a) {
    a.classList.toggle('active', a.dataset.page === pageId);
  });

  /* Cerrar menú móvil al navegar */
  const nav = document.querySelector('.navbar');
  if (nav) nav.classList.remove('open');

  window.scrollTo({ top: 0, behavior: 'smooth' });
}

/* ─────────────────────────────────────────
   MENÚ HAMBURGUESA (móvil)
   ───────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', function() {
  const hamburger = document.getElementById('hamburger');
  const nav = document.querySelector('.navbar');
  if (hamburger && nav) {
    hamburger.addEventListener('click', function() {
      nav.classList.toggle('open');
      hamburger.classList.toggle('open');
    });
  }
});

/* ─────────────────────────────────────────
   CARRUSEL
   ───────────────────────────────────────── */
var cPos = {};

function visCount() {
  if (window.innerWidth < 600) return 1;
  if (window.innerWidth < 960) return 2;
  return 3;
}

function initCarousel(id) {
  cPos[id] = 0;
  buildDots(id);
}

function buildDots(id) {
  var track  = document.getElementById('carousel-' + id);
  var dotsEl = document.getElementById('dots-' + id);
  if (!track || !dotsEl) return;
  var total = track.children.length;
  var steps = Math.max(1, total - visCount() + 1);
  dotsEl.innerHTML = '';
  for (var i = 0; i < steps; i++) {
    var d = document.createElement('div');
    d.className = 'dot' + (i === 0 ? ' active' : '');
    d.dataset.index = i;
    d.onclick = (function(idx) { return function() { goTo(id, idx); }; })(i);
    dotsEl.appendChild(d);
  }
}

function slide(id, dir) {
  var track = document.getElementById('carousel-' + id);
  if (!track) return;
  var max = Math.max(0, track.children.length - visCount());
  cPos[id] = Math.min(max, Math.max(0, (cPos[id] || 0) + dir));
  renderCarousel(id);
}

function goTo(id, idx) {
  cPos[id] = idx;
  renderCarousel(id);
}

function renderCarousel(id) {
  var track  = document.getElementById('carousel-' + id);
  var dotsEl = document.getElementById('dots-' + id);
  if (!track) return;
  var cardWidth = window.innerWidth < 600 ? 260 : 280;
  var offset = (cPos[id] || 0) * (cardWidth + 24);
  track.style.transform = 'translateX(-' + offset + 'px)';
  if (dotsEl) {
    dotsEl.querySelectorAll('.dot').forEach(function(d, i) {
      d.classList.toggle('active', i === cPos[id]);
    });
  }
}

window.addEventListener('resize', function() {
  Object.keys(cPos).forEach(function(id) {
    cPos[id] = 0;
    buildDots(id);
    renderCarousel(id);
  });
});

/* ─────────────────────────────────────────
   SELECTOR DE TALLAS
   ───────────────────────────────────────── */
function selTalla(btn) {
  var row = btn.closest('.tallas-row');
  row.querySelectorAll('.talla-btn').forEach(function(b) { b.classList.remove('sel'); });
  btn.classList.add('sel');
}

/* ─────────────────────────────────────────
   BOTÓN + (agregar al carrito — visual)
   ───────────────────────────────────────── */
document.addEventListener('click', function(e) {
  if (e.target.classList.contains('add-btn')) {
    const btn = e.target;
    btn.textContent = '✓';
    btn.style.background = 'var(--gold)';
    btn.style.color = 'var(--white)';
    setTimeout(function() {
      btn.textContent = '+';
      btn.style.background = '';
      btn.style.color = '';
    }, 1200);
  }
});

/* ─────────────────────────────────────────
   INICIALIZACIÓN
   ───────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', function() {
  showPage('inicio');
  ['mujer', 'hombre', 'calzado', 'muchomas'].forEach(function(id) {
    initCarousel(id);
  });
});

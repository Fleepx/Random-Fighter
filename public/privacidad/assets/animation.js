// ── Referencias ──
const hamburger = document.getElementById('hamburger');
const sidebar   = document.getElementById('sidebar');
const overlay   = document.getElementById('overlay');
const navBtns   = document.querySelectorAll('.nav-item');
const sections  = Array.from(document.querySelectorAll('.tc-section'));

// ── Hamburger: abrir/cerrar drawer ──
function openDrawer() {
  sidebar.classList.add('open');
  overlay.classList.add('active');
  hamburger.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeDrawer() {
  sidebar.classList.remove('open');
  overlay.classList.remove('active');
  hamburger.classList.remove('open');
  document.body.style.overflow = '';
}

hamburger.addEventListener('click', () => {
  sidebar.classList.contains('open') ? closeDrawer() : openDrawer();
});

overlay.addEventListener('click', closeDrawer);

// ── Navegación: click en ítem del índice ──
navBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const target = document.getElementById(btn.dataset.target);
    if (!target) return;

    if (window.innerWidth <= 680) {
      // Cerrar drawer primero, luego scrollear una vez que la animación terminó
      closeDrawer();
      setTimeout(() => {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 300);
    } else {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// ── Scroll spy: resaltar ítem activo según sección visible ──
function updateActive() {
  let current = sections[0].id;
  sections.forEach(sec => {
    const rect = sec.getBoundingClientRect();
    if (rect.top <= 120) current = sec.id;
  });
  navBtns.forEach(btn => {
    btn.classList.toggle('active', btn.dataset.target === current);
  });
}

window.addEventListener('scroll', updateActive, { passive: true });
updateActive();
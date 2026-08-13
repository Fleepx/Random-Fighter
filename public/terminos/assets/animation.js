/* ─── Documentación legal ─── */
/* Mismo criterio que la landing: nada escucha el scroll. Todo lo que
   depende de dónde está el lector se resuelve con IntersectionObserver,
   que el navegador evalúa por su cuenta y no en cada cuadro. */

const cajon = document.getElementById('sidebar');
const boton = document.getElementById('hamburger');
const velo = document.getElementById('overlay');
const items = Array.from(document.querySelectorAll('.nav-item'));
const secciones = Array.from(document.querySelectorAll('.tc-section'));

const quieto = window.matchMedia('(prefers-reduced-motion: reduce)');
const angosto = () => window.matchMedia('(max-width: 900px)').matches;

/* ─── Cajón lateral ─── */

function abrir() {
  cajon.classList.add('open');
  velo.classList.add('active');
  boton.classList.add('open');
  boton.setAttribute('aria-expanded', 'true');
  document.body.style.overflow = 'hidden';
}

function cerrar() {
  cajon.classList.remove('open');
  velo.classList.remove('active');
  boton.classList.remove('open');
  boton.setAttribute('aria-expanded', 'false');
  document.body.style.overflow = '';
}

boton.addEventListener('click', () => {
  cajon.classList.contains('open') ? cerrar() : abrir();
});

velo.addEventListener('click', cerrar);

// Escape cierra y devuelve el foco, o el lector queda dentro de un cajón
// que ya no se ve.
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && cajon.classList.contains('open')) {
    cerrar();
    boton.focus();
  }
});

/* ─── Índice ─── */

items.forEach((item) => {
  item.addEventListener('click', () => {
    const destino = document.getElementById(item.dataset.target);
    if (!destino) return;

    const ir = () =>
      destino.scrollIntoView({
        behavior: quieto.matches ? 'auto' : 'smooth',
        block: 'start',
      });

    if (angosto()) {
      // Primero cerrar: con el cajón encima el destino queda tapado, y
      // desplazarse mientras se cierra deja las dos animaciones peleando.
      cerrar();
      setTimeout(ir, 260);
    } else {
      ir();
    }
  });
});

/* ─── Sección activa ─── */
/* Una franja fina bajo la barra hace de línea de lectura: la sección que
   la cruza es la que se marca. Con el margen inferior tan alto, solo una
   la cruza a la vez. */

const marcarActiva = (id) => {
  items.forEach((item) => {
    item.classList.toggle('active', item.dataset.target === id);
  });
};

if ('IntersectionObserver' in window && secciones.length) {
  const ultima = secciones[secciones.length - 1];
  const vistas = new Set();
  let enElPie = false;

  /* Un solo lugar decide cual va marcada. Antes lo escribian dos
     observadores por su cuenta y ganaba el que disparara ultimo, que no
     es algo que se pueda predecir. */
  const recalcular = () => {
    if (enElPie) {
      marcarActiva(ultima.id);
      return;
    }
    // La primera en orden de documento: al cruzar dos gana la de arriba y
    // el indice no parpadea entre ambas.
    const cruzando = secciones.find((s) => vistas.has(s.id));
    if (cruzando) {
      marcarActiva(cruzando.id);
      return;
    }

    /* Puede no haber ninguna cruzando: arriba del todo la portada ocupa la
       pantalla entera y la primera seccion queda por debajo de la franja.
       Sin esto el indice se quedaba con lo ultimo que hubiera marcado, asi
       que volver arriba dejaba encendida la seccion final.
       Se marca la ultima que ya paso, y si no paso ninguna, la primera. */
    const limite = window.innerHeight * 0.2;
    let previa = secciones[0];
    secciones.forEach((s) => {
      if (s.getBoundingClientRect().top <= limite) previa = s;
    });
    marcarActiva(previa.id);
  };

  // Una franja fina bajo la barra hace de linea de lectura: la seccion que
  // la cruza es la que se marca.
  const observador = new IntersectionObserver(
    (entradas) => {
      entradas.forEach((e) => {
        if (e.isIntersecting) vistas.add(e.target.id);
        else vistas.delete(e.target.id);
      });
      recalcular();
    },
    { rootMargin: '-20% 0px -75% 0px' }
  );
  secciones.forEach((s) => observador.observe(s));

  /* La ultima seccion no alcanza a cruzar esa franja: al llegar al pie la
     pagina ya no puede desplazarse mas, asi que su inicio se queda por
     debajo y el indice nunca la marca. Un centinela al final avisa que se
     toco fondo y ahi manda ella.
     Va creado desde aca y no en el marcado: es una pieza de este guion,
     no del documento. */
  const centinela = document.createElement('div');
  centinela.setAttribute('aria-hidden', 'true');
  centinela.style.cssText = 'height:1px;margin-top:-1px';
  ultima.after(centinela);

  new IntersectionObserver(
    ([e]) => {
      enElPie = e.isIntersecting;
      recalcular();
    },
    { rootMargin: '0px 0px -10% 0px' }
  ).observe(centinela);

  /* ─── Entrada ─── */
  /* Solo hacia abajo y una vez: al volver hacia arriba el texto ya se
     leyó y no tiene por qué desvanecerse otra vez. */
  if (!quieto.matches) {
    const entrada = new IntersectionObserver(
      (entradas, obs) => {
        entradas.forEach((e) => {
          if (!e.isIntersecting) return;
          e.target.dataset.visible = 'true';
          obs.unobserve(e.target);
        });
      },
      { rootMargin: '0px 0px -12% 0px', threshold: 0.05 }
    );
    secciones.forEach((s) => {
      s.classList.add('revelar');
      entrada.observe(s);
    });
  }
} else {
  // Sin observador no se esconde nada: el documento tiene que leerse igual.
  marcarActiva(secciones[0]?.id);
}

import { useEffect, useMemo, useRef, useState } from "react";
import { NAV_LINKS, PLAY_STORE_URL } from "../data/site";
import { useSeccionActiva } from "../hooks/useSeccionActiva";
import logoRF from "../assets/imgs/LOGO-RF.png";
import "./Navbar.css";

export default function Navbar() {
  const [abierto, setAbierto] = useState(false);
  const [bajando, setBajando] = useState(false);
  const centinela = useRef(null);

  const ids = useMemo(() => NAV_LINKS.map((l) => l.href.slice(1)), []);
  const activa = useSeccionActiva(ids);

  /**
   * Detecta si el lector ya empezo a bajar, observando un centinela de un
   * pixel pegado al tope de la pagina. Mientras se ve, estamos arriba y la
   * barra va ancha y estatica; cuando sale de cuadro, se encoge a isla.
   *
   * Con IntersectionObserver en vez de un listener de scroll, que
   * dispararia en cada frame.
   */
  useEffect(() => {
    const nodo = centinela.current;
    if (!nodo) return;

    const observer = new IntersectionObserver(
      ([entry]) => setBajando(!entry.isIntersecting),
      { threshold: 0 }
    );

    observer.observe(nodo);
    return () => observer.disconnect();
  }, []);

  // Con el menu abierto el fondo no debe scrollear detras del overlay.
  useEffect(() => {
    document.body.style.overflow = abierto ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [abierto]);

  // Escape cierra el menu: es lo que espera quien navega con teclado.
  useEffect(() => {
    if (!abierto) return;
    const alPresionar = (e) => e.key === "Escape" && setAbierto(false);
    window.addEventListener("keydown", alPresionar);
    return () => window.removeEventListener("keydown", alPresionar);
  }, [abierto]);

  return (
    <>
      <div ref={centinela} className="nav__centinela" aria-hidden="true" />

      <header className={`nav ${bajando ? "is-isla" : ""}`}>
        <nav className="nav__isla" aria-label="Navegación principal">
          <a href="#contenido" className="nav__marca">
            <img src={logoRF} alt="Random Fighter" className="nav__logo" />
          </a>

          <ul className="nav__links">
            {NAV_LINKS.map((l) => {
              const esActiva = activa === l.href.slice(1);
              return (
                <li key={l.href}>
                  <a
                    href={l.href}
                    className={esActiva ? "is-activa" : undefined}
                    aria-current={esActiva ? "true" : undefined}
                  >
                    {l.label}
                  </a>
                </li>
              );
            })}
          </ul>

          <a
            href={PLAY_STORE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="nav__cta"
          >
            Descargar
          </a>

          <button
            type="button"
            className={`nav__burger ${abierto ? "is-open" : ""}`}
            onClick={() => setAbierto(true)}
            aria-expanded={abierto}
            aria-controls="menu-movil"
            aria-label="Abrir menú"
          >
            <span className="nav__burger-linea" />
            <span className="nav__burger-linea" />
          </button>
        </nav>

        <div
          id="menu-movil"
          className={`nav__overlay ${abierto ? "is-open" : ""}`}
        >
          {/* Cerrar sin elegir una opcion tiene que ser posible: obligar a
              navegar para salir del menu es una trampa. */}
          <button
            type="button"
            className="nav__cerrar"
            onClick={() => setAbierto(false)}
            aria-label="Cerrar menú"
          >
            <span className="nav__cerrar-linea" />
            <span className="nav__cerrar-linea" />
          </button>

          <ul className="nav__overlay-links">
            {NAV_LINKS.map((l, i) => {
              const esActiva = activa === l.href.slice(1);
              return (
                <li key={l.href} style={{ transitionDelay: `${100 + i * 50}ms` }}>
                  <a
                    href={l.href}
                    className={esActiva ? "is-activa" : undefined}
                    aria-current={esActiva ? "true" : undefined}
                    onClick={() => setAbierto(false)}
                  >
                    {l.label}
                  </a>
                </li>
              );
            })}
            <li style={{ transitionDelay: `${100 + NAV_LINKS.length * 50}ms` }}>
              <a
                href={PLAY_STORE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="nav__overlay-cta"
                onClick={() => setAbierto(false)}
              >
                Descargar en Google Play
              </a>
            </li>
          </ul>
        </div>
      </header>
    </>
  );
}

import { useEffect, useRef } from "react";

/**
 * Marca un elemento con data-visible="true" cuando entra en pantalla.
 *
 * Usa un atributo data y no una clase por un motivo concreto: React
 * reescribe className completo en cada render. Si un componente con
 * estado (la FAQ, por ejemplo) se vuelve a renderizar, se lleva por
 * delante cualquier clase agregada a mano desde aca y el elemento
 * vuelve a opacity 0, o sea desaparece. React solo toca los atributos
 * que renderiza el, asi que data-visible sobrevive.
 *
 * Usa IntersectionObserver en vez de un listener de scroll: el listener
 * dispara en cada frame y, si adentro se leen posiciones, obliga al
 * navegador a recalcular layout constantemente. En un celular de gama
 * media eso se nota como scroll con tirones.
 *
 * Deja de observar apenas revela, porque la animacion ocurre una vez.
 */
export function useReveal({ threshold = 0.15, delay = 0 } = {}) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Quien pidio menos animacion ve el contenido de entrada, sin transicion.
    const sinMovimiento = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (sinMovimiento.matches) {
      el.dataset.visible = "true";
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        if (delay) el.style.transitionDelay = `${delay}ms`;
        el.dataset.visible = "true";
        observer.unobserve(el);
      },
      { threshold }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold, delay]);

  return ref;
}

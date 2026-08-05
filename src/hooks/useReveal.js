import { useEffect, useRef } from "react";

/**
 * Marca un elemento con .is-visible cuando entra en pantalla.
 *
 * Usa IntersectionObserver en vez de un listener de scroll: el listener
 * dispara en cada frame y, si adentro se leen posiciones, obliga al navegador
 * a recalcular layout constantemente. En un celular de gama media eso se nota
 * como scroll con tirones.
 *
 * Deja de observar apenas revela, porque la animacion ocurre una sola vez.
 */
export function useReveal({ threshold = 0.15, delay = 0 } = {}) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Quien pidio menos animacion ve el contenido de entrada, sin transicion.
    const sinMovimiento = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (sinMovimiento.matches) {
      el.classList.add("is-visible");
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        if (delay) el.style.transitionDelay = `${delay}ms`;
        el.classList.add("is-visible");
        observer.unobserve(el);
      },
      { threshold }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold, delay]);

  return ref;
}

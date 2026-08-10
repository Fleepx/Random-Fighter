import { useEffect, useState } from "react";

/**
 * Dice si el sistema pide menos animacion.
 *
 * usePunteroFino ya mira esto, pero mezclado con si hay cursor: sirve para
 * efectos que siguen al puntero, no para los que corren solos. Un fondo
 * animado en bucle hay que apagarlo igual en un escritorio con mouse.
 */
export function useMenosMovimiento() {
  const [quieto, setQuieto] = useState(false);

  useEffect(() => {
    const consulta = window.matchMedia("(prefers-reduced-motion: reduce)");
    const evaluar = () => setQuieto(consulta.matches);
    evaluar();

    consulta.addEventListener("change", evaluar);
    return () => consulta.removeEventListener("change", evaluar);
  }, []);

  return quieto;
}

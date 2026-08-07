import { useEffect, useState } from "react";

/**
 * Dice si conviene correr efectos que siguen al cursor.
 *
 * Devuelve false cuando no hay puntero fino (celular, tablet) o cuando
 * el sistema pide menos animacion. Ambos casos importan: en pantalla
 * tactil un efecto de cursor no se ve nunca pero igual deja un listener
 * de mousemove haciendo trabajo, y prefers-reduced-motion no es una
 * sugerencia.
 */
export function usePunteroFino() {
  const [activo, setActivo] = useState(false);

  useEffect(() => {
    const fino = window.matchMedia("(hover: hover) and (pointer: fine)");
    const quieto = window.matchMedia("(prefers-reduced-motion: reduce)");

    const evaluar = () => setActivo(fino.matches && !quieto.matches);
    evaluar();

    fino.addEventListener("change", evaluar);
    quieto.addEventListener("change", evaluar);
    return () => {
      fino.removeEventListener("change", evaluar);
      quieto.removeEventListener("change", evaluar);
    };
  }, []);

  return activo;
}

import { useEffect, useState } from "react";

/**
 * Devuelve el id de la seccion que el lector esta mirando.
 *
 * El rootMargin recorta la ventana a una franja delgada en el tercio
 * superior: la seccion que cruza esa franja es la activa. Sin eso, con
 * dos secciones en pantalla a la vez, el indicador parpadea entre ambas.
 *
 * Igual que el resto de la pagina, sin listener de scroll.
 */
export function useSeccionActiva(ids) {
  const [activa, setActiva] = useState("");

  useEffect(() => {
    const secciones = ids
      .map((id) => document.getElementById(id))
      .filter(Boolean);

    if (!secciones.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiva(entry.target.id);
        });
      },
      { rootMargin: "-25% 0px -70% 0px", threshold: 0 }
    );

    secciones.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, [ids]);

  return activa;
}

import { useEffect, useRef } from "react";
import "./TaglineReveal.css";

const FRASE =
  "No vuelvas a preguntar cuándo vence tu plan ni a esperar que te confirmen el cupo por WhatsApp.";

export default function TaglineReveal() {
  const contenedor = useRef(null);

  useEffect(() => {
    const nodo = contenedor.current;
    if (!nodo) return;

    const palabras = Array.from(nodo.querySelectorAll(".tagline__palabra"));

    const sinMovimiento = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (sinMovimiento.matches) {
      palabras.forEach((p) => p.classList.add("is-lit"));
      return;
    }

    /**
     * Un observer por palabra, con el borde inferior recortado al 45%.
     * Eso crea una linea de disparo a media pantalla: cada palabra se
     * enciende cuando la cruza, en orden de lectura, en vez de prenderse
     * todo el bloque de golpe.
     */
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-lit");
          observer.unobserve(entry.target);
        });
      },
      { rootMargin: "0px 0px -45% 0px", threshold: 0 }
    );

    palabras.forEach((p) => observer.observe(p));
    return () => observer.disconnect();
  }, []);

  return (
    <section className="tagline" aria-label="Lo que cambia con Random Fighter">
      <p className="tagline__frase" ref={contenedor}>
        {FRASE.split(" ").map((palabra, i) => (
          <span className="tagline__palabra" key={`${palabra}-${i}`}>
            {palabra}{" "}
          </span>
        ))}
      </p>
    </section>
  );
}

import DepthText from "./DepthText";
import { useReveal } from "../hooks/useReveal";
import { usePunteroFino } from "../hooks/usePunteroFino";
import "./TaglineReveal.css";

/**
 * La frase va en dos bloques y no en uno: extruida en capas, un parrafo
 * largo en una sola linea se vuelve ilegible. Cortada donde corta la
 * idea, cada mitad se lee sola.
 */
const LINEAS = [
  "No vuelvas a preguntar",
  "cuándo vence tu plan",
];

const CIERRE = "ni a esperar que te confirmen el cupo por WhatsApp.";

export default function TaglineReveal() {
  const bloque = useReveal({ threshold: 0.25 });
  const conPuntero = usePunteroFino();

  return (
    <section className="tagline" aria-label="Lo que cambia con Random Fighter">
      <div className="tagline__inner rf-reveal" ref={bloque}>
        {/* El texto extruido es decorativo: la frase completa vive en el
            parrafo de abajo, que es lo que lee un lector de pantalla. */}
        <div className="tagline__3d" aria-hidden="true">
          {LINEAS.map((linea) => (
            <DepthText
              key={linea}
              text={linea}
              layers={26}
              depth={2}
              faceColor="#FFFFFF"
              depthColor="#C0392B"
              tilt={9}
              pointerTracking={conPuntero}
              autoOrbit={!conPuntero}
              orbitSpeed={0.25}
              smoothing={0.12}
              perspective={1000}
              fontSize="clamp(2rem, 7vw, 4.5rem)"
              className="tagline__linea"
            />
          ))}
        </div>

        <p className="tagline__cierre">{CIERRE}</p>

        <p className="tagline__sr">
          {LINEAS.join(" ")} {CIERRE}
        </p>
      </div>
    </section>
  );
}

import { BENEFICIOS } from "../data/site";
import { useReveal } from "../hooks/useReveal";
import "./Benefits.css";

/* Tres semillas de rasgado rotando, para que dos tarjetas vecinas nunca
   tengan el mismo contorno. */
const SEMILLAS = ["", " rf-rasgado--2", " rf-rasgado--3"];

function Tarjeta({ beneficio, indice }) {
  const ref = useReveal({ delay: indice * 80 });

  return (
    <article
      className={`beneficio rf-rasgado${SEMILLAS[indice % 3]} rf-reveal`}
      ref={ref}
    >
      <h3 className="beneficio__titulo">{beneficio.titulo}</h3>
      <p className="beneficio__detalle">{beneficio.detalle}</p>
    </article>
  );
}

export default function Benefits() {
  const cabecera = useReveal();

  return (
    <section className="beneficios" id="beneficios">
      <div className="beneficios__inner">
        <header className="beneficios__cabecera rf-reveal" ref={cabecera}>
          <p className="rf-eyebrow">Beneficios</p>
          <h2 className="rf-section-title">
            Lo que cambia cuando<br />
            tu academia está en la app
          </h2>
        </header>

        <div className="beneficios__grid">
          {BENEFICIOS.map((b, i) => (
            <Tarjeta key={b.titulo} beneficio={b} indice={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

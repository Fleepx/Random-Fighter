import { useState } from "react";
import { PREGUNTAS } from "../data/site";
import { useReveal } from "../hooks/useReveal";
import "./Faq.css";

/**
 * Schema de FAQ para que buscadores y asistentes puedan citar las
 * respuestas. El contenido es el mismo que se ve en pantalla.
 */
function schemaFaq() {
  return {
    __html: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: PREGUNTAS.map((p) => ({
        "@type": "Question",
        name: p.pregunta,
        acceptedAnswer: { "@type": "Answer", text: p.respuesta },
      })),
    }),
  };
}

/**
 * Acordeon controlado en vez de details y summary.
 *
 * details no se puede animar: el navegador oculta el contenido con
 * display none y no hay altura intermedia que interpolar. Aca la
 * respuesta vive en una grilla que pasa de 0fr a 1fr, que si transiciona
 * y no obliga a adivinar un max-height.
 *
 * La semantica se mantiene a mano: boton con aria-expanded y aria-controls
 * apuntando al panel, y el panel oculto de verdad cuando esta cerrado.
 */
function Item({ item, indice, abierta, alternar }) {
  const ref = useReveal({ delay: indice * 50 });
  const idPanel = `respuesta-${indice}`;
  const idBoton = `pregunta-${indice}`;

  return (
    <div className={`faq__item rf-reveal ${abierta ? "is-abierta" : ""}`} ref={ref}>
      <h3 className="faq__encabezado">
        <button
          type="button"
          id={idBoton}
          className="faq__pregunta"
          onClick={alternar}
          aria-expanded={abierta}
          aria-controls={idPanel}
        >
          <span>{item.pregunta}</span>
          <span className="faq__cruz" aria-hidden="true" />
        </button>
      </h3>

      <div
        className="faq__panel"
        id={idPanel}
        role="region"
        aria-labelledby={idBoton}
        inert={abierta ? undefined : ""}
      >
        <div className="faq__panel-interior">
          <p className="faq__respuesta">{item.respuesta}</p>
        </div>
      </div>
    </div>
  );
}

export default function Faq() {
  const cabecera = useReveal();
  const [abierta, setAbierta] = useState(null);

  return (
    <section className="faq" id="preguntas">
      <script type="application/ld+json" dangerouslySetInnerHTML={schemaFaq()} />

      <div className="faq__inner">
        <header className="faq__cabecera rf-reveal" ref={cabecera}>
          <p className="rf-eyebrow">Preguntas</p>
          <h2 className="rf-section-title">Lo que suelen preguntar</h2>
        </header>

        <div className="faq__lista">
          {PREGUNTAS.map((p, i) => (
            <Item
              key={p.pregunta}
              item={p}
              indice={i}
              abierta={abierta === i}
              alternar={() => setAbierta(abierta === i ? null : i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

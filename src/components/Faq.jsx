import { PREGUNTAS } from "../data/site";
import { useReveal } from "../hooks/useReveal";
import "./Faq.css";

/**
 * Schema de FAQ para que buscadores y asistentes puedan citar las respuestas
 * directamente. El contenido es el mismo que se ve en pantalla.
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

function Item({ item, indice }) {
  const ref = useReveal({ delay: indice * 50 });

  return (
    <details className="faq__item rf-reveal" ref={ref}>
      <summary className="faq__pregunta">
        {item.pregunta}
        <span className="faq__cruz" aria-hidden="true" />
      </summary>
      <p className="faq__respuesta">{item.respuesta}</p>
    </details>
  );
}

export default function Faq() {
  const cabecera = useReveal();

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
            <Item key={p.pregunta} item={p} indice={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

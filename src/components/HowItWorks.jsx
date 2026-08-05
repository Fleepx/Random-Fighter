import { PASOS } from "../data/site";
import { useReveal } from "../hooks/useReveal";
import mockup from "../assets/imgs/Mobile-Fighter.png";
import "./HowItWorks.css";

function Paso({ paso, indice }) {
  const ref = useReveal({ delay: indice * 100 });

  return (
    <li className="paso rf-reveal" ref={ref}>
      <span className="paso__numero" aria-hidden="true">
        {paso.numero}
      </span>
      <div className="paso__cuerpo">
        <h3 className="paso__titulo">{paso.titulo}</h3>
        <p className="paso__detalle">{paso.detalle}</p>
      </div>
    </li>
  );
}

export default function HowItWorks() {
  const cabecera = useReveal();
  const visual = useReveal({ delay: 150 });

  return (
    <section className="como" id="como-funciona">
      <div className="como__inner">
        <div className="como__texto">
          <header className="rf-reveal" ref={cabecera}>
            <p className="rf-eyebrow">Cómo funciona</p>
            <h2 className="rf-section-title">
              Tres pasos y ya estás<br />
              reservando clases
            </h2>
          </header>

          <ol className="como__pasos">
            {PASOS.map((p, i) => (
              <Paso key={p.numero} paso={p} indice={i} />
            ))}
          </ol>
        </div>

        <div className="como__visual rf-reveal" ref={visual}>
          <img
            src={mockup}
            alt="Random Fighter abierto en un celular, mostrando la pantalla del alumno"
            className="como__mockup"
          />
        </div>
      </div>
    </section>
  );
}

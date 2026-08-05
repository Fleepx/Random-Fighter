import { CONTACTO } from "../data/site";
import { useReveal } from "../hooks/useReveal";
import "./Contacto.css";

export default function Contacto() {
  const ref = useReveal();

  return (
    <section className="contacto" id="contacto">
      <div className="contacto__caja rf-rasgado rf-rasgado--3 rf-reveal" ref={ref}>
        <p className="rf-eyebrow">Consultas</p>

        <h2 className="contacto__titulo">
          ¿Tu academia todavía no está?<br />
          Escríbenos
        </h2>

        <p className="contacto__texto">
          Si tu gimnasio quiere sumarse, o si algo no te funciona como
          esperabas, respondemos directo.
        </p>

        <div className="contacto__vias">
          <a
            href={`mailto:${CONTACTO.contacto}?subject=Consulta%20desde%20randomfighter.cl`}
            className="contacto__principal"
          >
            {CONTACTO.contacto}
          </a>

          <p className="contacto__secundarias">
            Soporte técnico{" "}
            <a href={`mailto:${CONTACTO.soporte}`}>{CONTACTO.soporte}</a>
            <span className="contacto__sep" aria-hidden="true" />
            <a href={CONTACTO.telefonoHref}>{CONTACTO.telefono}</a>
          </p>
        </div>
      </div>
    </section>
  );
}

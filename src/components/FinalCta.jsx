import { PLAY_STORE_URL, MANAGER_URL } from "../data/site";
import { useReveal } from "../hooks/useReveal";
import IconoGooglePlay from "./IconoGooglePlay";
import "./FinalCta.css";

export default function FinalCta() {
  const bloque = useReveal();

  return (
    <section className="cta-final">
      <div className="cta-final__inner rf-reveal" ref={bloque}>
        <h2 className="cta-final__titulo">
          Descarga Random Fighter<br />
          y ordena tu entrenamiento
        </h2>

        <p className="cta-final__sub">
          Gratis para alumnos. Solo necesitas que tu academia esté en la
          plataforma.
        </p>

        <a
          href={PLAY_STORE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="cta-final__boton"
        >
          <IconoGooglePlay />
          Descargar en Google Play
        </a>

        <p className="cta-final__nota">
          iOS en revisión en la App Store
        </p>

        <p className="cta-final__cruzado">
          ¿Tienes una academia?{" "}
          <a href={MANAGER_URL}>Conoce Random Fighter Manager</a>
        </p>
      </div>
    </section>
  );
}

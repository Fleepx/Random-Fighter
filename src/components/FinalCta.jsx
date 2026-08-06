import { PLAY_STORE_URL, MANAGER_URL } from "../data/site";
import { useReveal } from "../hooks/useReveal";
import BotonTienda from "./BotonTienda";
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

        <div className="tiendas cta-final__tiendas">
          <BotonTienda tienda="google" href={PLAY_STORE_URL} />
          <BotonTienda tienda="apple" disponible={false} nota="Próximamente" />
        </div>

        <p className="cta-final__cruzado">
          ¿Tienes una academia?{" "}
          <a href={MANAGER_URL}>Conoce Random Fighter Manager</a>
        </p>
      </div>
    </section>
  );
}

import { PLAY_STORE_URL } from "../data/site";
import { useReveal } from "../hooks/useReveal";
import BotonTienda from "./BotonTienda";
import logo from "../assets/imgs/LOGO-RF.png";
import captura from "../assets/imgs/RF-Screenshot.jpeg";
import "./Hero.css";

export default function Hero() {
  const visual = useReveal({ threshold: 0.1, delay: 200 });

  return (
    <section className="hero">
      <div className="hero__inner">
        <div className="hero__texto">
          <img src={logo} alt="Random Fighter" className="hero__logo" />

          <h1 className="hero__titulo">
            Tus clases, tus pagos<br />
            y tus combates<br />
            en una sola app
          </h1>

          <p className="hero__sub">
            Reserva tus clases y revisa tu plan. Gratis para alumnos.
          </p>

          <div className="tiendas hero__tiendas">
            <BotonTienda tienda="google" href={PLAY_STORE_URL} />
            <BotonTienda tienda="apple" disponible={false} />
          </div>
        </div>

        <div className="hero__visual rf-reveal" ref={visual}>
          <img
            src={captura}
            alt="Pantalla de inicio de Random Fighter mostrando el plan activo con los días restantes, las acciones rápidas y las próximas clases de la semana"
            className="hero__captura"
            width="720"
            height="1600"
          />
        </div>
      </div>
    </section>
  );
}

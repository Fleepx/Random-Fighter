import { useState } from "react";
import { PLAY_STORE_URL } from "../data/site";
import { useReveal } from "../hooks/useReveal";
import { usePunteroFino } from "../hooks/usePunteroFino";
import { useMenosMovimiento } from "../hooks/useMenosMovimiento";
import BotonTienda from "./BotonTienda";
import LightRays from "./LightRays";
import SideRays from "./SideRays";
import SelectorEfecto, { EFECTOS } from "./SelectorEfecto";
import Marca from "./Marca";
import captura from "../assets/imgs/RF-Screenshot.jpeg";
import "./Hero.css";

/* Blanco calido y blanco puro. Los ejemplos de la documentacion vienen en
   cian y amarillo, y la primera prueba iba en el rojo de marca: se leia
   como un filtro rojo encima, no como luz. La luz de un gimnasio es blanca;
   el rojo lo pone la atmosfera que ya esta debajo, y los rayos lo recogen
   al mezclarse en screen. */
const LUZ_CALIDA = "#FFE8CC";
const LUZ_BLANCA = "#FFF6EC";

function Luz({ efecto, conPuntero }) {
  switch (efecto) {
    case "rays":
      return (
        <LightRays
          raysOrigin="top-center"
          raysColor={LUZ_BLANCA}
          raysSpeed={0.7}
          lightSpread={0.9}
          rayLength={1.15}
          fadeDistance={0.9}
          /* Por debajo de 1 el degradado interno del shader se vuelve
             neutro y el color final queda mas cerca del blanco puesto
             arriba. Sin esto los rayos viran a azul en la mitad de abajo. */
          saturation={0.5}
          followMouse={conPuntero}
          mouseInfluence={0.08}
          noiseAmount={0.08}
          distortion={0.03}
        />
      );

    case "side":
      return (
        <SideRays
          speed={1.6}
          rayColor1={LUZ_CALIDA}
          rayColor2={LUZ_BLANCA}
          /* El ejemplo trae intensity 2 sobre un fondo negro y vacio. Aca
             abajo ya hay tatami, focos y viñeta: a ese valor se quema todo
             el cuadrante y el titulo pierde contraste. */
          intensity={1.1}
          spread={1.8}
          origin="top-right"
          tilt={-6}
          saturation={0.9}
          blend={0.6}
          falloff={1.8}
          opacity={0.9}
        />
      );

    default:
      return null;
  }
}

export default function Hero() {
  const visual = useReveal({ threshold: 0.1, delay: 200 });
  const conPuntero = usePunteroFino();
  const quieto = useMenosMovimiento();
  // TEMPORAL: cual luz se esta probando. Sale con el selector.
  const [efecto, setEfecto] = useState(EFECTOS[0].id);

  // Con movimiento reducido no se monta ninguna: es un bucle permanente,
  // no una transicion que se pueda acortar.
  const conLuz = !quieto && efecto !== "nada";
  // La opcion 3 no va en la capa del hero sino pegada a la captura.
  const luzEnCaptura = conLuz && efecto === "captura";
  const luzEnHero = conLuz && !luzEnCaptura;

  return (
    <section className="hero">
      {/* La luz entra desde arriba, en el mismo eje que el foco cenital que
          ya dibuja Atmosfera. Va en su propia capa, encima del tatami y
          debajo del contenido; ver Hero.css para el apilado.
          La key la fuerza a desmontar al cambiar: cada efecto abre su
          propio contexto WebGL y hay que soltar el anterior. */}
      {luzEnHero && (
        <div className="hero__rayos" aria-hidden="true">
          <Luz key={efecto} efecto={efecto} conPuntero={conPuntero} />
        </div>
      )}

      <div className="hero__inner">
        <div className="hero__texto">
          <Marca tamano="hero" />

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

          {/* Un foco propio para el telefono. La caja se estira por encima
              de la imagen para que el origen de los rayos quede fuera de
              cuadro: si nace dentro se ve el punto de luz y parece un
              reflejo pegado, no una lampara colgando arriba. */}
          {luzEnCaptura && (
            <div className="hero__luz-captura" aria-hidden="true">
              <LightRays
                raysOrigin="top-center"
                raysColor={LUZ_BLANCA}
                raysSpeed={0.6}
                lightSpread={0.55}
                rayLength={1.1}
                fadeDistance={0.8}
                saturation={0.45}
                followMouse={conPuntero}
                mouseInfluence={0.05}
                noiseAmount={0.06}
                distortion={0.02}
              />
            </div>
          )}
        </div>
      </div>

      {/* TEMPORAL: andamio de comparacion. */}
      <SelectorEfecto valor={efecto} alCambiar={setEfecto} />
    </section>
  );
}

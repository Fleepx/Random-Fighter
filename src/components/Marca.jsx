import ShinyText from "./ShinyText";
import logo from "../assets/imgs/LOGO-RF.png";
import "./Marca.css";

/**
 * Simbolo mas nombre escrito.
 *
 * "Random Fighter" va en una sola linea, mismo cuerpo y mismo peso en las
 * dos palabras: es un logotipo, no un titular de dos alturas. En esta
 * pagina "Random" va en rojo; en la de Manager el bloque completo va en
 * claro y el color de producto se reserva para la palabra "Manager".
 *
 * tamano: "nav" para la barra, "hero" para la portada, "pie" para el pie.
 *
 * En la barra el nombre se retira al armarse la isla. El envoltorio existe
 * para eso: Navbar.css lo colapsa con una grilla, sin poner tope al ancho
 * desplegado. Ver el comentario alla.
 */
export default function Marca({ tamano = "nav" }) {
  const esHero = tamano === "hero";

  return (
    <span className={`marca marca--${tamano}`}>
      <img src={logo} alt="" className="marca__simbolo" aria-hidden="true" />

      <span className="marca__envoltorio">
        <span className="marca__nombre">
          {/* El brillo solo en la portada. En la barra y el pie un destello
              permanente distrae, y cada instancia se suscribe al bucle de
              animacion. */}
          {esHero ? (
            <span className="marca__titulo">
              <ShinyText
                className="marca__palabra1"
                text="Random"
                color="#C0392B"
                shineColor="#FF7A6B"
                speed={3.2}
                delay={1.6}
                spread={100}
              />{" "}
              <ShinyText
                className="marca__palabra2"
                text="Fighter"
                color="#FFFFFF"
                shineColor="#FFFFFF"
                speed={3.2}
                delay={1.6}
                spread={100}
              />
            </span>
          ) : (
            <span className="marca__titulo">
              <span className="marca__palabra1">Random</span>{" "}
              <span className="marca__palabra2">Fighter</span>
            </span>
          )}
        </span>
      </span>

      {/* El nombre accesible va aparte: el visual son dos spans y un lector
          de pantalla no debe leerlo entrecortado. */}
      <span className="marca__sr">Random Fighter</span>
    </span>
  );
}

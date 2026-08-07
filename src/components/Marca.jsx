import Inclina3D from "./Inclina3D";
import ShinyText from "./ShinyText";
import { usePunteroFino } from "../hooks/usePunteroFino";
import logo from "../assets/imgs/LOGO-RF.png";
import "./Marca.css";

/**
 * Simbolo mas nombre escrito. Hasta ahora la marca solo aparecia como
 * logo, asi que quien no la conocia no sabia como se llama el producto.
 *
 * tamano: "nav" para la barra, "hero" para la portada, "pie" para el pie.
 *
 * En la barra el nombre se retira solo cuando se arma la isla. El
 * envoltorio existe para eso: Navbar.css lo colapsa con una grilla, sin
 * poner tope al ancho desplegado. Ver el comentario alla.
 */
export default function Marca({ tamano = "nav" }) {
  const conPuntero = usePunteroFino();

  const simbolo = (
    <img src={logo} alt="" className="marca__simbolo" aria-hidden="true" />
  );

  return (
    <span className={`marca marca--${tamano}`}>
      {/* Solo en la portada: en la barra o el pie el giro no se nota.
          El iman anterior arrastraba el simbolo fuera de su lugar; esto lo
          gira sobre su eje sin moverlo. Se apaga sin puntero fino. */}
      {tamano === "hero" ? (
        <Inclina3D activo={conPuntero} grados={16}>
          {simbolo}
        </Inclina3D>
      ) : (
        simbolo
      )}

      <span className="marca__envoltorio">
        <span className="marca__nombre">
          {/* El brillo solo en la portada. En la barra y el pie el nombre
              esta siempre a la vista, y un destello permanente ahi
              distrae en vez de aportar; ademas cada instancia se suscribe
              al bucle de animacion. */}
          {tamano === "hero" ? (
            <>
              <ShinyText
                className="marca__linea1"
                text="Random"
                color="#C0392B"
                shineColor="#FF7A6B"
                speed={3.2}
                delay={1.6}
                spread={100}
              />
              <ShinyText
                className="marca__linea2"
                text="Fighter"
                color="#FFFFFF"
                shineColor="#FFFFFF"
                speed={3.2}
                delay={1.6}
                spread={100}
              />
            </>
          ) : (
            <>
              <span className="marca__linea1">Random</span>
              <span className="marca__linea2">Fighter</span>
            </>
          )}
        </span>
      </span>

      {/* El nombre accesible va aparte: el bloque visual lo parte en dos
          lineas y un lector de pantalla no debe leerlo entrecortado. */}
      <span className="marca__sr">Random Fighter</span>
    </span>
  );
}

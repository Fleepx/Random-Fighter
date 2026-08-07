import Magnet from "./Magnet";
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
      {/* El iman solo en la portada: ahi el simbolo es grande y el gesto se
          nota. En la barra o el pie seria un temblor de pocos pixeles.
          Se apaga solo sin puntero fino o con prefers-reduced-motion. */}
      {tamano === "hero" ? (
        <Magnet
          padding={90}
          magnetStrength={5}
          disabled={!conPuntero}
          activeTransition="transform 0.35s cubic-bezier(0.32, 0.72, 0, 1)"
          inactiveTransition="transform 0.8s cubic-bezier(0.32, 0.72, 0, 1)"
        >
          {simbolo}
        </Magnet>
      ) : (
        simbolo
      )}

      <span className="marca__envoltorio">
        <span className="marca__nombre">
          <span className="marca__linea1">Random</span>
          <span className="marca__linea2">Fighter</span>
        </span>
      </span>

      {/* El nombre accesible va aparte: el bloque visual lo parte en dos
          lineas y un lector de pantalla no debe leerlo entrecortado. */}
      <span className="marca__sr">Random Fighter</span>
    </span>
  );
}

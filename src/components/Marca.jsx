import logo from "../assets/imgs/LOGO-RF.png";
import "./Marca.css";

/**
 * Simbolo mas nombre escrito. Hasta ahora la marca solo aparecia como
 * logo, asi que quien no la conocia no sabia como se llama el producto.
 *
 * tamano: "nav" para la barra, "hero" para la portada, "pie" para el pie.
 * El nombre se puede ocultar con soloSimbolo cuando el espacio no da.
 */
export default function Marca({ tamano = "nav", soloSimbolo = false }) {
  return (
    <span className={`marca marca--${tamano}`}>
      <img src={logo} alt="" className="marca__simbolo" aria-hidden="true" />
      {!soloSimbolo && (
        <span className="marca__nombre">
          <span className="marca__linea1">Random</span>
          <span className="marca__linea2">Fighter</span>
        </span>
      )}
      {/* El nombre accesible va aparte: el bloque visual lo parte en dos
          lineas y un lector de pantalla no debe leerlo entrecortado. */}
      <span className="marca__sr">Random Fighter</span>
    </span>
  );
}

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
  return (
    <span className={`marca marca--${tamano}`}>
      <img src={logo} alt="" className="marca__simbolo" aria-hidden="true" />

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

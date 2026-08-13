import { CONTACTO, MANAGER_URL, PLAY_STORE_URL } from "../data/site";
import Marca from "./Marca";
import "./Footer.css";

const ANIO = new Date().getFullYear();

export default function Footer() {
  return (
    <footer className="pie">
      <div className="pie__inner">
        <div className="pie__marca">
          <Marca tamano="pie" />
          <p className="pie__tagline">
            La app para quienes entrenan deportes de contacto.
          </p>
        </div>

        <nav className="pie__col" aria-label="Producto">
          <h2 className="pie__titulo">Producto</h2>
          <ul>
            <li><a href="#beneficios">Beneficios</a></li>
            <li><a href="#como-funciona">Cómo funciona</a></li>
            <li><a href="#preguntas">Preguntas</a></li>
            <li>
              <a href={PLAY_STORE_URL} target="_blank" rel="noopener noreferrer">
                Google Play
              </a>
            </li>
          </ul>
        </nav>

        <nav className="pie__col" aria-label="Contacto">
          <h2 className="pie__titulo">Contacto</h2>
          <ul>
            <li><a href={CONTACTO.telefonoHref}>{CONTACTO.telefono}</a></li>
            <li><a href={`mailto:${CONTACTO.soporte}`}>{CONTACTO.soporte}</a></li>
            <li><a href={`mailto:${CONTACTO.contacto}`}>{CONTACTO.contacto}</a></li>
          </ul>
        </nav>

        <nav className="pie__col" aria-label="Legal">
          <h2 className="pie__titulo">Legal</h2>
          <ul>
            <li><a href={`${import.meta.env.BASE_URL}terminos/`}>Términos y condiciones</a></li>
            <li><a href={`${import.meta.env.BASE_URL}privacidad/`}>Política de privacidad</a></li>
            <li><a href={MANAGER_URL}>Random Fighter Manager</a></li>
          </ul>
        </nav>
      </div>

      <div className="pie__base">
        <p>© {ANIO} MPDM. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
}

import { useState } from "react";
import { CONTACTO } from "../data/site";
import { useReveal } from "../hooks/useReveal";
import "./Contacto.css";

const TIPOS = [
  { valor: "consulta", etiqueta: "Una consulta" },
  { valor: "pago", etiqueta: "Un problema con un pago" },
  { valor: "reclamo", etiqueta: "Un reclamo" },
];

const VACIO = { nombre: "", correo: "", tipo: "consulta", mensaje: "" };

/**
 * Valida en el cliente antes de dejar enviar. Devuelve un objeto con un
 * mensaje por campo con problema, vacio si esta todo bien.
 *
 * Los mensajes son concretos: dicen que falta, no "campo invalido".
 */
function validar(datos) {
  const errores = {};

  if (datos.nombre.trim().length < 2) {
    errores.nombre = "Escribe tu nombre para saber con quién hablamos.";
  }

  // Suficiente para atajar tipeos: algo, arroba, algo, punto, algo.
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(datos.correo.trim())) {
    errores.correo = "Revisa el correo, ahí no podemos responderte.";
  }

  if (datos.mensaje.trim().length < 15) {
    errores.mensaje = "Cuéntanos un poco más, con detalle lo resolvemos antes.";
  }

  return errores;
}

export default function Contacto() {
  const ref = useReveal();
  const [datos, setDatos] = useState(VACIO);
  const [errores, setErrores] = useState({});
  const [estado, setEstado] = useState("listo"); // listo | enviando | enviado

  const cambiar = (campo) => (e) => {
    setDatos((d) => ({ ...d, [campo]: e.target.value }));
    // Limpia el error del campo apenas lo tocan: regañar mientras escriben
    // es molesto y no ayuda.
    if (errores[campo]) setErrores((x) => ({ ...x, [campo]: undefined }));
  };

  const enviar = (e) => {
    e.preventDefault();

    const fallas = validar(datos);
    setErrores(fallas);
    if (Object.keys(fallas).length > 0) return;

    setEstado("enviando");

    /*
     * Transporte provisorio: abre el cliente de correo con todo escrito.
     * Funciona hoy y no finge un envio que no ocurre.
     *
     * Reemplazar por una escritura a Firestore (coleccion de consultas)
     * o por un endpoint propio cuando el proyecto tenga backend. Ahi
     * tambien conviene guardar fecha y estado para poder darles
     * seguimiento a los reclamos.
     */
    const asunto = TIPOS.find((t) => t.valor === datos.tipo).etiqueta;
    const cuerpo = [
      `Nombre: ${datos.nombre.trim()}`,
      `Correo: ${datos.correo.trim()}`,
      `Motivo: ${asunto}`,
      "",
      datos.mensaje.trim(),
    ].join("\n");

    window.location.href =
      `mailto:${CONTACTO.contacto}` +
      `?subject=${encodeURIComponent(`${asunto} desde randomfighter.cl`)}` +
      `&body=${encodeURIComponent(cuerpo)}`;

    setEstado("enviado");
  };

  if (estado === "enviado") {
    return (
      <section className="contacto" id="contacto">
        <div className="contacto__caja rf-rasgado rf-rasgado--3">
          <p className="rf-eyebrow">Listo</p>
          <h2 className="contacto__titulo">Tu mensaje quedó armado</h2>
          <p className="contacto__texto">
            Se abrió tu correo con todo escrito. Dale enviar y te
            respondemos a {datos.correo.trim()}.
          </p>
          <button
            type="button"
            className="contacto__volver"
            onClick={() => {
              setDatos(VACIO);
              setEstado("listo");
            }}
          >
            Escribir otro mensaje
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="contacto" id="contacto">
      <div className="contacto__caja rf-rasgado rf-rasgado--3 rf-reveal" ref={ref}>
        <p className="rf-eyebrow">Contacto</p>

        {/* "Cuentanos" y no "Dinoslo de frente": el reto sirve para hablar
            de entrenar, no para atender a alguien que viene con un
            problema. Repite el verbo de la etiqueta del mensaje, mas abajo
            en este mismo formulario. */}
        <h2 className="contacto__titulo">
          ¿Algo no te cuadra?<br />
          Cuéntanos
        </h2>

        <p className="contacto__texto">
          Un pago que no aparece, una duda con tu matrícula o algo que
          podríamos hacer mejor. Escríbenos y te respondemos.
        </p>

        <form className="contacto__form" onSubmit={enviar} noValidate>
          <div className="campo">
            <label htmlFor="nombre">Tu nombre</label>
            <input
              id="nombre"
              name="nombre"
              type="text"
              autoComplete="name"
              value={datos.nombre}
              onChange={cambiar("nombre")}
              aria-invalid={!!errores.nombre}
              aria-describedby={errores.nombre ? "error-nombre" : undefined}
              className={errores.nombre ? "tiene-error" : undefined}
            />
            {errores.nombre && (
              <p className="campo__error" id="error-nombre" role="alert">
                {errores.nombre}
              </p>
            )}
          </div>

          <div className="campo">
            <label htmlFor="correo">Tu correo</label>
            <input
              id="correo"
              name="correo"
              type="email"
              autoComplete="email"
              value={datos.correo}
              onChange={cambiar("correo")}
              aria-invalid={!!errores.correo}
              aria-describedby={errores.correo ? "error-correo" : undefined}
              className={errores.correo ? "tiene-error" : undefined}
            />
            {errores.correo && (
              <p className="campo__error" id="error-correo" role="alert">
                {errores.correo}
              </p>
            )}
          </div>

          <div className="campo">
            <label htmlFor="tipo">¿De qué se trata?</label>
            <select
              id="tipo"
              name="tipo"
              value={datos.tipo}
              onChange={cambiar("tipo")}
            >
              {TIPOS.map((t) => (
                <option key={t.valor} value={t.valor}>
                  {t.etiqueta}
                </option>
              ))}
            </select>
          </div>

          <div className="campo">
            <label htmlFor="mensaje">Cuéntanos qué pasó</label>
            <textarea
              id="mensaje"
              name="mensaje"
              rows={5}
              value={datos.mensaje}
              onChange={cambiar("mensaje")}
              aria-invalid={!!errores.mensaje}
              aria-describedby={errores.mensaje ? "error-mensaje" : undefined}
              className={errores.mensaje ? "tiene-error" : undefined}
            />
            {errores.mensaje && (
              <p className="campo__error" id="error-mensaje" role="alert">
                {errores.mensaje}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="contacto__enviar"
            disabled={estado === "enviando"}
          >
            {estado === "enviando" ? "Preparando…" : "Enviar mensaje"}
          </button>
        </form>

        <p className="contacto__secundarias">
          O directo a{" "}
          <a href={`mailto:${CONTACTO.contacto}`}>{CONTACTO.contacto}</a>
          <span className="contacto__sep" aria-hidden="true" />
          <a href={CONTACTO.telefonoHref}>{CONTACTO.telefono}</a>
        </p>
      </div>
    </section>
  );
}

import { useReveal } from "../hooks/useReveal";
import "./Problem.css";

const ANTES = [
  "Preguntas en recepción cuándo vence tu plan",
  "Escribes al WhatsApp del gimnasio para saber si hay cupo",
  "Guardas capturas de pantalla como comprobante de pago",
  "Tus combates quedan anotados en el cuaderno del profe",
];

const DESPUES = [
  "El contador de días está en tu pantalla de inicio",
  "Ves el horario de la semana y reservas tu lugar",
  "Cada mensualidad queda con su fecha y su monto",
  "Tu historial de combates vive en tu perfil",
];

export default function Problem() {
  const bloque = useReveal();

  return (
    <section className="problema">
      <div className="problema__inner rf-reveal" ref={bloque}>
        <p className="rf-eyebrow">El cambio</p>
        <h2 className="rf-section-title">
          Entrenar es tu parte.<br />
          La administración no debería serlo.
        </h2>

        <div className="problema__grid">
          <div className="problema__col">
            <h3 className="problema__col-titulo problema__col-titulo--antes">
              Hoy
            </h3>
            <ul className="problema__lista">
              {ANTES.map((t) => (
                <li key={t}>
                  <span className="problema__marca problema__marca--antes" aria-hidden="true" />
                  {t}
                </li>
              ))}
            </ul>
          </div>

          <div className="problema__col">
            <h3 className="problema__col-titulo problema__col-titulo--despues">
              Con Random Fighter
            </h3>
            <ul className="problema__lista">
              {DESPUES.map((t) => (
                <li key={t}>
                  <span className="problema__marca problema__marca--despues" aria-hidden="true" />
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

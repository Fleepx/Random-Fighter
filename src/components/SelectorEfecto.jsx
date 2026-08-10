import { useEffect, useRef, useState } from "react";
import "./SelectorEfecto.css";

/* TEMPORAL: andamio para elegir el efecto de luz del hero. Sale entero
   cuando quede decidido, junto con la prop del hero y los descartados. */
export const EFECTOS = [
  { id: "rays", numero: "1", nombre: "Light Rays" },
  { id: "side", numero: "2", nombre: "Side Rays" },
  { id: "captura", numero: "3", nombre: "Luz sobre la app" },
  { id: "nada", numero: "0", nombre: "Sin efecto" },
];

export default function SelectorEfecto({ valor, alCambiar }) {
  const [abierto, setAbierto] = useState(false);
  const cajaRef = useRef(null);
  const botonRef = useRef(null);
  const actual = EFECTOS.find((e) => e.id === valor) ?? EFECTOS[0];

  // Cerrar con Escape o al tocar fuera. El foco vuelve al boton solo con
  // Escape: si el clic fue afuera, el usuario ya eligio adonde ir.
  useEffect(() => {
    if (!abierto) return;

    const alTeclear = (e) => {
      if (e.key === "Escape") {
        setAbierto(false);
        botonRef.current?.focus();
      }
    };
    const alTocar = (e) => {
      if (!cajaRef.current?.contains(e.target)) setAbierto(false);
    };

    document.addEventListener("keydown", alTeclear);
    document.addEventListener("pointerdown", alTocar);
    return () => {
      document.removeEventListener("keydown", alTeclear);
      document.removeEventListener("pointerdown", alTocar);
    };
  }, [abierto]);

  return (
    <div className="selefecto" ref={cajaRef}>
      <button
        ref={botonRef}
        type="button"
        className="selefecto__boton"
        aria-expanded={abierto}
        aria-haspopup="listbox"
        onClick={() => setAbierto((v) => !v)}
      >
        <span className="selefecto__numero">{actual.numero}</span>
        {/* El nombre se despliega al acercar el puntero. El envoltorio es
            una grilla que va de 0fr a 1fr: asi el ancho lo calcula el
            navegador con el texto real, sin numeros a ojo que despues
            recortan la ultima letra. */}
        <span className="selefecto__envoltorio">
          <span className="selefecto__texto">{actual.nombre}</span>
        </span>
      </button>

      {abierto && (
        <ul className="selefecto__lista" role="listbox" aria-label="Efecto de luz del hero">
          {EFECTOS.map((e) => (
            <li key={e.id} role="none">
              <button
                type="button"
                role="option"
                aria-selected={e.id === valor}
                className="selefecto__opcion"
                onClick={() => {
                  alCambiar(e.id);
                  setAbierto(false);
                }}
              >
                <span className="selefecto__numero">{e.numero}</span>
                <span className="selefecto__texto">{e.nombre}</span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

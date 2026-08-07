import { useRef } from "react";
import "./Inclina3D.css";

/**
 * Inclina su contenido en 3D siguiendo al puntero, y vuelve al centro al
 * salir.
 *
 * Reemplaza al iman de React Bits, que arrastraba el logo detras del
 * cursor: el simbolo se despegaba de su lugar y quedaba raro. Esto no lo
 * mueve, lo gira sobre su propio eje.
 *
 * Escribe el angulo en variables CSS en vez de estado de React: asi el
 * movimiento no dispara un render por cada pixel del mouse. Lee la caja
 * una sola vez al entrar, no en cada movimiento, que es lo que obliga al
 * navegador a recalcular layout.
 */
export default function Inclina3D({
  children,
  grados = 14,
  activo = true,
  className = "",
}) {
  const ref = useRef(null);
  const caja = useRef(null);

  const alEntrar = () => {
    if (!activo || !ref.current) return;
    caja.current = ref.current.getBoundingClientRect();
  };

  const alMover = (e) => {
    if (!activo || !ref.current || !caja.current) return;
    const { left, top, width, height } = caja.current;
    const x = (e.clientX - left) / width - 0.5;
    const y = (e.clientY - top) / height - 0.5;
    ref.current.style.setProperty("--giro-y", `${x * grados * 2}deg`);
    ref.current.style.setProperty("--giro-x", `${-y * grados * 2}deg`);
  };

  const alSalir = () => {
    if (!ref.current) return;
    ref.current.style.setProperty("--giro-y", "0deg");
    ref.current.style.setProperty("--giro-x", "0deg");
  };

  return (
    <span
      ref={ref}
      className={`inclina3d ${activo ? "is-activo" : ""} ${className}`}
      onPointerEnter={alEntrar}
      onPointerMove={alMover}
      onPointerLeave={alSalir}
    >
      <span className="inclina3d__cara">{children}</span>
    </span>
  );
}

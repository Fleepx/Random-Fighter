import "./Atmosfera.css";

/**
 * Ambiente de la pagina, en tres capas apiladas de atras hacia adelante:
 *
 *   -3  fondo    negro base y textura de cemento          fija
 *   -2  tatami   textura del piso, primeras dos pantallas  scrollea
 *   -1  frente   luces rojas, viñeta y grano               fija
 *
 * El orden importa: el tatami tiene que quedar sobre el cemento pero
 * debajo de las luces, si no la iluminacion no lo toca y se ve pegado.
 *
 * Las capas fijas usan position fixed en vez de background-attachment
 * fixed, que iOS ignora y que en Android repinta en cada scroll. El
 * tatami en cambio va absoluto, para que se desplace con la pagina: dentro
 * de un contenedor fijo quedaba recortado al alto de la ventana.
 */
export default function Atmosfera() {
  return (
    <>
      <div className="atm-fondo" aria-hidden="true">
        <div className="atm-fondo__cemento" />
      </div>

      <div className="atm-tatami" aria-hidden="true" />

      <div className="atm-frente" aria-hidden="true">
        <div className="atm-frente__luces" />
        <div className="atm-frente__vineta" />
        <div className="atm-frente__grano" />
      </div>
    </>
  );
}

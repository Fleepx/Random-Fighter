import "./BotonTienda.css";

/**
 * Insignias de tienda con la composicion oficial (icono, linea chica
 * arriba, nombre grande abajo) pero con los colores invertidos: caja
 * blanca y texto negro, como pidio el equipo.
 *
 * El icono de Google Play conserva sus colores de marca porque es el
 * icono, no el fondo de la insignia. La manzana si pasa a negro para que
 * se lea sobre blanco.
 *
 * Cuando la tienda todavia no tiene la app publicada se pasa
 * disponible={false}: entonces no es un enlace sino un span apagado, para
 * no dejar un boton que no lleva a ninguna parte.
 */

function IconoGooglePlay() {
  return (
    <svg viewBox="0 0 512 512" aria-hidden="true" focusable="false">
      <path fill="#00A0FF" d="M50 15c-6 6-9 15-9 27v428c0 12 3 21 9 27l1 1 240-240v-4L51 14z" />
      <path fill="#FFBC00" d="M370 337l-80-81v-4l80-81 2 1 95 54c27 15 27 40 0 56l-95 54z" />
      <path fill="#FF3A44" d="M372 336l-82-82L50 494c9 9 24 10 40 1l282-159" />
      <path fill="#00C853" d="M372 176L90 17C74 8 59 9 50 18l240 236z" />
    </svg>
  );
}

function IconoApple() {
  return (
    <svg viewBox="0 0 384 512" aria-hidden="true" focusable="false">
      <path
        fill="currentColor"
        d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z"
      />
    </svg>
  );
}

export default function BotonTienda({ tienda, href, disponible = true }) {
  const esGoogle = tienda === "google";
  const nombre = esGoogle ? "Google Play" : "App Store";

  /* La linea chica es la que avisa el estado. Antes esto era una etiqueta
     aparte flotando debajo, pero quedaba a otra alineacion que el resto
     del bloque y descuadraba todo. Dentro de la insignia se explica sola
     y no arrastra nada. */
  const lineaChica = !disponible
    ? esGoogle
      ? "Próximamente en"
      : "Próximamente en el"
    : esGoogle
    ? "Disponible en"
    : "Disponible en el";

  const contenido = (
    <>
      <span className="tienda__icono">
        {esGoogle ? <IconoGooglePlay /> : <IconoApple />}
      </span>

      <span className="tienda__texto">
        <span className="tienda__linea-chica">{lineaChica}</span>
        <span className="tienda__linea-grande">{nombre}</span>
      </span>
    </>
  );

  if (!disponible) {
    return (
      <span
        className="tienda tienda--apagada"
        aria-label={`${nombre}: próximamente`}
      >
        {contenido}
      </span>
    );
  }

  return (
    <a
      className="tienda"
      href={href}
      target="_blank"
      rel="noopener noreferrer"
    >
      {contenido}
    </a>
  );
}

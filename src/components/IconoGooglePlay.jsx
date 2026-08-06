/**
 * Icono de Google Play, dibujado inline para no pedir un archivo mas.
 * Son cuatro caras del triangulo plegado, cada una con su color.
 *
 * Va marcado aria-hidden: el texto del boton ya dice a donde lleva, y
 * repetirlo en un lector de pantalla solo estorba.
 */
export default function IconoGooglePlay({ tamano = 20 }) {
  return (
    <svg
      width={tamano}
      height={tamano}
      viewBox="0 0 512 512"
      aria-hidden="true"
      focusable="false"
      style={{ flexShrink: 0 }}
    >
      <path
        fill="#00A0FF"
        d="M50 15c-6 6-9 15-9 27v428c0 12 3 21 9 27l1 1 240-240v-4L51 14z"
      />
      <path
        fill="#FFBC00"
        d="M370 337l-80-81v-4l80-81 2 1 95 54c27 15 27 40 0 56l-95 54z"
      />
      <path
        fill="#FF3A44"
        d="M372 336l-82-82L50 494c9 9 24 10 40 1l282-159"
      />
      <path
        fill="#00C853"
        d="M372 176L90 17C74 8 59 9 50 18l240 236z"
      />
    </svg>
  );
}

/**
 * Filtros SVG que usa el resto de la pagina. Se montan una sola vez y se
 * invocan desde CSS con filter: url(#id).
 *
 * El borde rasgado se consigue desplazando los pixeles del borde con
 * ruido: feTurbulence genera la textura y feDisplacementMap la usa como
 * mapa para correr cada pixel. El resultado es un contorno irregular,
 * como cuando arrancas un trozo de hoja.
 *
 * Importante: el filtro se aplica al fondo de la tarjeta, nunca al
 * elemento completo. Aplicado al elemento tambien deformaria el texto.
 *
 * Las tres variantes usan semillas distintas para que dos tarjetas
 * vecinas no se rasguen exactamente igual.
 */
export default function EfectosSvg() {
  return (
    <svg className="efectos-svg" aria-hidden="true" focusable="false">
      <defs>
        {[
          { id: "rasgado-1", seed: 3 },
          { id: "rasgado-2", seed: 17 },
          { id: "rasgado-3", seed: 41 },
        ].map(({ id, seed }) => (
          <filter
            key={id}
            id={id}
            x="-8%"
            y="-8%"
            width="116%"
            height="116%"
            filterUnits="objectBoundingBox"
          >
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.014 0.055"
              numOctaves="4"
              seed={seed}
              result="ruido"
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="ruido"
              scale="11"
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
        ))}
      </defs>
    </svg>
  );
}

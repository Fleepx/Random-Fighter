# Random Fighter — landing

App de artes marciales para alumnos. Esta es la página pública; la de
gimnasios es Random Fighter Manager, un repositorio aparte con la misma
estructura y paleta azul.

React 18 + Vite 5. **Sin Tailwind**: cada componente tiene su `.css` al
lado y todo sale de los tokens de `src/styles/global.css`.

```
npm install
npm run dev      # 5174, con --strictPort
npm run build
```

## Idioma

Nombres de componentes, variables y comentarios en **español**. Mensajes de
commit en **inglés**. La interfaz es español de Chile.

## Paleta

Solo desde `global.css`. Nunca un color escrito a mano en un componente.

```
--red #C0392B   --red-dark #922B21
--bg  #0A0A0A   --bg-warm  #1A0505
--surface #140606   --surface-border #2A1010
--text-light #DECBCB   --text-gray #9E9E9E
--ease-out cubic-bezier(0.32, 0.72, 0, 1)
```

## Reglas que costaron caro

Cada una viene de un error real. Romperlas los trae de vuelta.

**Nunca `window.addEventListener('scroll')`.** Todo lo que dependa de dónde
está el lector va con `IntersectionObserver` — ver `useReveal` y
`useSeccionActiva`.

**Estado imperativo en el DOM va en `data-*`, no en `classList`.** React
reescribe `className` en cada render y se lleva puesta la clase agregada a
mano. Pasó con la FAQ: las preguntas desaparecían al hacer clic.

**Para animar un colapso, grilla de `1fr` a `0fr`.** Nunca un `max-width`
estimado: el del logotipo quedó a 1.7px del ancho real y cortaba la última
letra.

**Respetar `prefers-reduced-motion` siempre.** `useMenosMovimiento` para lo
que corre en bucle, `usePunteroFino` para lo que sigue al cursor — el
segundo además apaga los efectos donde no hay mouse.

**Los componentes de React Bits se bajan del registro a mano**, con
`curl https://reactbits.dev/r/NOMBRE-JS-CSS.json`. El CLI de shadcn falla:
el registro etiqueta los `.css` como `registry:component` y el CLI intenta
parsearlos como JavaScript.

**Los fondos con shader hay que recalibrarlos según la forma de la caja.**
Sus parámetros de alcance se normalizan contra *un solo eje*, casi siempre
el corto. Los valores de la documentación asumen un bloque cuadrado y
fallan en cajas muy anchas o muy altas: `rayLength` medía contra el ancho y
la luz no llegaba al teléfono, la viñeta del Scanner apagaba todo menos el
centro, el `fadeFar` del túnel borraba las dos puntas.

**Un contenedor con `overflow-x: auto` necesita `overflow-y` explícito.** Si
el otro eje queda en `visible`, el navegador lo convierte a `auto` y el
contenedor se traga los gestos verticales.

## Despliegue

GitHub Actions publica en Pages con cada push a `main`. `dev` no despliega.

`base: './'` en `vite.config.js`: Pages sirve los proyectos bajo `/<repo>/`
y con rutas absolutas la página carga sin ningún script. Los enlaces
absolutos dentro de componentes tienen que pasar por
`import.meta.env.BASE_URL`.

En *Settings → Pages*, **Source tiene que decir "GitHub Actions"**. El
`enablement` del workflow no alcanza para cambiarlo si ya estaba fijado a
una rama, y mientras tanto ganan los despliegues de rama, que publican el
repositorio crudo.

## Documentos legales

`public/terminos/` y `public/privacidad/` son HTML estático, copiados de los
repositorios `Termns-Conditions-RF` y `Politicas-privacidad--RF`.

**Están duplicados y se sincronizan a mano.** Nada lo verifica. Las copias
de acá llevan además el enlace de vuelta al sitio y el favicon, que en los
repositorios de origen no van.

## Andamiaje temporal

En el hero, **la captura del teléfono es un botón**: cada pulsación cambia
la luz del fondo entre Light Rays, Side Rays y apagado. Es para comparar
mientras se decide.

Sale cuando se elija: la captura es contenido, no un control, y ahora mismo
un visitante que le haga clic cambia la iluminación de la página.

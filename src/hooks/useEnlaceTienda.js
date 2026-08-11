import { useEffect, useState } from "react";

const WEB = { target: "_blank", rel: "noopener noreferrer" };

/**
 * Convierte la direccion web de la tienda en un enlace que abre la app
 * nativa, para que en el celular no haya que pasar por el navegador.
 *
 * Arranca siempre con la URL https y recien la cambia despues de montar.
 * Esa es la que funciona en escritorio, sin JavaScript y si el esquema no
 * tiene quien lo atienda; el enlace nunca queda roto mientras se decide.
 *
 * El esquema se decide por el HOST de la URL y no solo por el sistema del
 * visitante. Las dos cosas tienen que coincidir: en un iPhone la insignia
 * de Google Play sigue siendo una direccion de Google Play, y mandarla a
 * itms-apps:// solo por estar en iOS la rompe. Cuando no coinciden se
 * queda la URL web, que es exactamente lo que corresponde.
 *
 * Si Android no tuviera Play Store el esquema falla, pero entonces tampoco
 * habria como instalar una app que se distribuye solo por ahi.
 */
export function useEnlaceTienda(urlWeb) {
  const [enlace, setEnlace] = useState({ href: urlWeb, ...WEB });

  useEffect(() => {
    if (!urlWeb) return;

    let host;
    try {
      host = new URL(urlWeb).hostname;
    } catch {
      return;
    }

    const ua = navigator.userAgent;
    const android = /Android/i.test(ua);
    // iPadOS se presenta como Mac: se distingue por el tactil.
    const ios =
      /iPad|iPhone|iPod/.test(ua) ||
      (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);

    let nativo = null;
    if (android && host.endsWith("play.google.com")) {
      // El identificador se saca de la propia URL en vez de guardarlo
      // aparte: dos copias del mismo dato terminan separandose.
      const id = new URL(urlWeb).searchParams.get("id");
      if (id) nativo = `market://details?id=${id}`;
    } else if (ios && host.endsWith("apps.apple.com")) {
      nativo = urlWeb.replace(/^https:\/\//, "itms-apps://");
    }

    // Sin target ni rel: al esquema lo atiende el sistema operativo, y una
    // pestaña nueva se quedaria abierta en blanco porque no carga nada.
    if (nativo) setEnlace({ href: nativo, target: undefined, rel: undefined });
  }, [urlWeb]);

  return enlace;
}

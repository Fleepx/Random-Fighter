import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "node:path";
import fs from "node:fs";

/**
 * Sirve el index.html de las carpetas sueltas de public/ (los terminos y la
 * politica de privacidad, que son HTML estatico aparte de la app).
 *
 * En desarrollo Vite atiende "/terminos/index.html" pero deja pasar
 * "/terminos/" al fallback de la SPA, asi que devolvia la landing con el
 * documento en la URL. Esto lo resuelve antes de que llegue ahi, y de paso
 * hace que desarrollo se comporte igual que un host estatico.
 */
function indicesDePublic() {
  return {
    name: "indices-de-public",
    configureServer(servidor) {
      servidor.middlewares.use((req, _res, siguiente) => {
        const ruta = req.url.split("?")[0];
        if (ruta.endsWith("/") && ruta !== "/") {
          const archivo = path.join(
            servidor.config.publicDir,
            ruta.slice(1),
            "index.html"
          );
          if (fs.existsSync(archivo)) req.url = ruta + "index.html";
        }
        siguiente();
      });
    },
  };
}

export default defineConfig({
  /* Rutas relativas en el build. GitHub Pages publica los proyectos bajo
     /<repositorio>/, y con rutas absolutas el HTML pedia /assets/... a la
     raiz del dominio: cargaba la pagina y ningun script, o sea en blanco.
     Relativa tambien sirve tal cual si algun dia esto cuelga de
     randomfighter.cl en la raiz, sin volver a tocar esto. */
  base: "./",

  plugins: [react(), indicesDePublic()],
  resolve: {
    // El alias tiene que existir aca ademas de en jsconfig.json: jsconfig
    // solo guia al editor y a shadcn, quien resuelve en el build es Vite.
    alias: {
      "@": path.resolve(new URL(".", import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, "$1"), "src"),
    },
  },
  server: { historyApiFallback: true },
  preview: { historyApiFallback: true },
});

// @ts-check
import { defineConfig } from 'astro/config';

// Dominio público del sitio (ej: 'https://midominio.com').
// Con esto se generan las URLs canónicas, og:url y el sitemap.
// Se puede definir aquí o con la variable de entorno SITE_URL al hacer build.
const SITE_URL = process.env.SITE_URL || undefined;

// https://astro.build/config
export default defineConfig({
  site: SITE_URL,
  redirects: {
    // El listado de proyectos vive en la home
    '/work': '/',
  },
});

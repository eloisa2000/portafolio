// @ts-check
import { defineConfig } from 'astro/config';

// Dominio público del sitio.
// Con esto se generan las URLs canónicas, og:url y el sitemap.
// Se puede cambiar aquí o con la variable de entorno SITE_URL al hacer build.
const SITE_URL = process.env.SITE_URL || 'https://elo.pm';

// https://astro.build/config
export default defineConfig({
  site: SITE_URL,
  redirects: {
    // El listado de proyectos vive en la home
    '/work': '/',
    '/es/work': '/es',
    // Acceso rápido al CMS (Sanity Studio)
    '/admin': 'https://portafolio-elo.sanity.studio/',
  },
});

// Esquema de la colección "Workshops" para el Studio de Sanity.
//
// Este archivo NO lo usa el sitio: es una copia de referencia para el Studio,
// que vive en otra carpeta (D:\PORTAFOLIO). Para activarlo:
//   1. Copia este archivo a la carpeta de esquemas del Studio (schemaTypes/).
//   2. En schemaTypes/index.ts agrégalo a la lista:
//        import workshop from './workshop'
//        export const schemaTypes = [ ...los que ya hay, workshop ]
//   3. Publica el Studio:  npx sanity deploy
//
// Tiene los mismos campos que "project", pero en vez de role + sector usa "tags".
import { defineArrayMember, defineField, defineType } from 'sanity'

export default defineType({
  name: 'workshop',
  title: 'Workshops',
  type: 'document',
  fields: [
    defineField({ name: 'title_es', title: 'Título (ES)', type: 'string' }),
    defineField({ name: 'title_en', title: 'Título (EN)', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'slug_es', title: 'Slug (ES)', type: 'slug', options: { source: 'title_es' } }),
    defineField({
      name: 'slug_en',
      title: 'Slug (EN)',
      description: 'Define la dirección de la página: elo.pm/workshops/<slug>',
      type: 'slug',
      options: { source: 'title_en' },
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'published',
      title: 'Publicado (on/off)',
      description: 'On = visible en el sitio. Off = se oculta de la grilla y de su página, sin borrar el contenido.',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      description: 'Son las etiquetas de la tarjeta y los filtros de la página Workshops.',
      type: 'array',
      of: [defineArrayMember({ type: 'string' })],
      options: {
        list: [
          { title: 'Video and Cinema', value: 'video-and-cinema' },
          { title: 'Design', value: 'design' },
        ],
      },
    }),
    defineField({
      name: 'headline_en',
      title: 'Frase del encabezado',
      type: 'string',
      description: 'Opcional. Una línea que resume el proyecto; aparece junto a la foto al entrar a su página. Pon *asteriscos* alrededor de las palabras que van en la tipografía alterna. Si queda vacío, se usa la frase de la sección.',
    }),
    defineField({
      name: 'headline_es',
      title: 'Frase del encabezado (ES)',
      type: 'string',
      description: 'Opcional. Una línea que resume el proyecto; aparece junto a la foto al entrar a su página. Pon *asteriscos* alrededor de las palabras que van en la tipografía alterna. Si queda vacío, se usa la frase de la sección.',
    }),
    defineField({ name: 'year', title: 'Año', type: 'number' }),
    defineField({ name: 'agency', title: 'Institución / Agencia', type: 'string' }),
    defineField({ name: 'featured', title: 'Destacado (va primero)', type: 'boolean', initialValue: false }),
    defineField({ name: 'order', title: 'Orden', description: 'Número menor = aparece antes.', type: 'number' }),
    defineField({ name: 'coverImage', title: 'Portada', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'contextAndChallenge_es', title: 'Contexto y desafío (ES)', type: 'text', rows: 5 }),
    defineField({ name: 'contextAndChallenge_en', title: 'Contexto y desafío (EN)', type: 'text', rows: 5 }),
    defineField({ name: 'solution_es', title: 'Solución (ES)', type: 'text', rows: 5 }),
    defineField({ name: 'solution_en', title: 'Solución (EN)', type: 'text', rows: 5 }),
    defineField({ name: 'results_es', title: 'Resultados (ES)', type: 'array', of: [defineArrayMember({ type: 'string' })] }),
    defineField({ name: 'results_en', title: 'Resultados (EN)', type: 'array', of: [defineArrayMember({ type: 'string' })] }),
    defineField({
      name: 'gallery',
      title: 'Galería',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'image',
          options: { hotspot: true },
          fields: [
            defineField({ name: 'caption', title: 'Pie de foto', type: 'string' }),
            defineField({ name: 'halfWidth', title: 'Media fila (para imágenes verticales)', type: 'boolean', initialValue: false }),
            defineField({ name: 'showInPreview', title: 'Mostrar en la miniatura (hover)', type: 'boolean', initialValue: false }),
          ],
        }),
        defineArrayMember({
          name: 'galleryVideo',
          title: 'Video',
          type: 'object',
          fields: [
            defineField({ name: 'videoUrl', title: 'URL del video', description: 'Archivo .mp4 o enlace de Vimeo/YouTube para incrustar.', type: 'string' }),
            defineField({ name: 'caption', title: 'Pie de video', type: 'string' }),
            defineField({ name: 'isPortrait', title: 'Vertical (media fila)', type: 'boolean', initialValue: false }),
          ],
          preview: { select: { title: 'caption', subtitle: 'videoUrl' } },
        }),
      ],
    }),
    defineField({ name: 'link', title: 'Enlace', type: 'url' }),
    defineField({ name: 'linkLabel', title: 'Etiqueta del enlace', description: 'Ej: Site, Prototype. Por defecto: Site.', type: 'string' }),
    defineField({
      name: 'credits',
      title: 'Créditos',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({ name: 'role_es', title: 'Rol (ES)', type: 'string' }),
            defineField({ name: 'role_en', title: 'Rol (EN)', type: 'string' }),
            defineField({ name: 'names', title: 'Nombres', type: 'array', of: [defineArrayMember({ type: 'string' })] }),
          ],
          preview: { select: { title: 'role_en', subtitle: 'role_es' } },
        }),
      ],
    }),
  ],
  preview: {
    select: { title: 'title_en', subtitle: 'year', media: 'coverImage' },
    prepare: ({ title, subtitle, media }) => ({ title, subtitle: subtitle ? String(subtitle) : '', media }),
  },
})

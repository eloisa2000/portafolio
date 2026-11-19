// Esquema de "Proyecto (Work)" para el Studio de Sanity.
//
// Este archivo NO lo usa el sitio: es una copia de referencia del que vive en la
// carpeta del Studio (schemaTypes/project.ts), que ya está publicado.
// Proyectos de la sección WORK — bilingüe ES/EN

import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'project',
  title: 'Proyecto (Work)',
  type: 'document',

  groups: [
    { name: 'general', title: 'General', default: true },
    { name: 'es', title: '🇨🇱 Español' },
    { name: 'en', title: '🇬🇧 English' },
    { name: 'media', title: 'Imágenes' },
    { name: 'config', title: 'Configuración' },
  ],

  fields: [
    // ── GENERAL (no se traduce) ────────────────────────────
    defineField({
      name: 'coverImage',
      title: 'Imagen de portada',
      type: 'image',
      options: { hotspot: true },
      group: 'general',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'year',
      title: 'Año',
      type: 'number',
      group: 'general',
      validation: (Rule) => Rule.required().min(2000).max(2100),
    }),
    defineField({
      name: 'agency',
      title: 'Agency / Studio',
      type: 'string',
      group: 'general',
    }),
    defineField({
      name: 'role',
      title: 'Role',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        list: [
          { title: 'UI Design', value: 'ui-design' },
          { title: 'Art Direction', value: 'art-direction' },
          { title: 'Development', value: 'development' },
          { title: 'Brand Identity', value: 'brand-identity' },
          { title: 'Web Design', value: 'web-design' },
          { title: 'UX Research', value: 'ux-research' },
          { title: 'Community Management', value: 'community-management' },
          { title: 'Graphic Design', value: 'graphic-design' },
          { title: 'Editorial Design', value: 'editorial-design' },
          { title: 'Motion Design', value: 'motion-design' },
          { title: 'Workshops', value: 'workshops' },
        ],
        layout: 'checkbox',
      },
      group: 'general',
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: 'sector',
      title: 'Sector',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        list: [
          { title: 'B2B', value: 'b2b' },
          { title: 'Education', value: 'education' },
          { title: 'Culture', value: 'culture' },
          { title: 'Health', value: 'health' },
          { title: 'Tech', value: 'tech' },
          { title: 'Social Impact', value: 'social-impact' },
          { title: 'E-commerce', value: 'ecommerce' },
          { title: 'Industry', value: 'industry' },
        ],
        layout: 'tags',
      },
      group: 'general',
    }),
    defineField({
      name: 'link',
      title: 'Link externo',
      type: 'url',
      group: 'general',
    }),
    defineField({
      name: 'linkLabel',
      title: 'Tipo de link',
      type: 'string',
      description: 'Define la etiqueta que se muestra sobre el link.',
      options: {
        list: [
          { title: 'Site (sitio en vivo)', value: 'Site' },
          { title: 'Prototype (prototipo)', value: 'Prototype' },
          { title: 'Record (registro)', value: 'Record' },
        ],
        layout: 'radio',
      },
      initialValue: 'Site',
      group: 'general',
    }),
    defineField({
      name: 'credits',
      title: 'Credits',
      type: 'array',
      description: 'Roles del proyecto y las personas detrás. Cada rol puede tener varios nombres.',
      of: [
        {
          type: 'object',
          name: 'credit',
          fields: [
            defineField({ name: 'role_en', title: 'Role (EN)', type: 'string' }),
            defineField({ name: 'role_es', title: 'Rol (ES)', type: 'string' }),
            defineField({
              name: 'names',
              title: 'Nombres',
              type: 'array',
              of: [{ type: 'string' }],
            }),
          ],
          preview: {
            select: { role: 'role_en', names: 'names' },
            prepare({ role, names }) {
              return {
                title: role || 'Crédito',
                subtitle: Array.isArray(names) ? names.join(', ') : '',
              }
            },
          },
        },
      ],
      group: 'general',
    }),

    defineField({
      name: 'screenings',
      title: 'Muestras y proyecciones',
      type: 'array',
      description: 'Muestras, proyecciones y exhibiciones del proyecto. Se muestran ordenadas por año, más recientes primero.',
      of: [
        {
          type: 'object',
          name: 'screeningItem',
          title: 'Muestra',
          fields: [
            defineField({
              name: 'year',
              title: 'Año',
              type: 'number',
              validation: (Rule) => Rule.required().min(1900).max(2100),
            }),
            defineField({
              name: 'title',
              title: 'Título',
              type: 'string',
              description: 'Nombre de la muestra, ciclo o festival.',
              validation: (Rule) => Rule.required(),
            }),
            defineField({ name: 'venue', title: 'Lugar / Institución', type: 'string' }),
            defineField({ name: 'city', title: 'Ciudad', type: 'string' }),
          ],
          preview: {
            select: { title: 'title', year: 'year', venue: 'venue', city: 'city' },
            prepare({ title, year, venue, city }: any) {
              return { title: [year, title].filter(Boolean).join(' · '), subtitle: [venue, city].filter(Boolean).join(', ') }
            },
          },
        },
      ],
      group: 'general',
    }),
    defineField({
      name: 'awards',
      title: 'Reconocimientos',
      type: 'array',
      description: 'Premios y reconocimientos del proyecto.',
      of: [
        {
          type: 'object',
          name: 'awardItem',
          title: 'Reconocimiento',
          fields: [
            defineField({ name: 'year', title: 'Año', type: 'number' }),
            defineField({
              name: 'title',
              title: 'Premio',
              type: 'string',
              description: 'Ej: Primer Lugar y Premio del Público.',
              validation: (Rule) => Rule.required(),
            }),
            defineField({ name: 'detail', title: 'Concurso / Institución', type: 'string' }),
          ],
          preview: {
            select: { title: 'title', year: 'year', detail: 'detail' },
            prepare({ title, year, detail }: any) {
              return { title: [year, title].filter(Boolean).join(' · '), subtitle: detail }
            },
          },
        },
      ],
      group: 'general',
    }),

    // ── ESPAÑOL ────────────────────────────────────────────
    defineField({
      name: 'title_es',
      title: 'Nombre del proyecto',
      type: 'string',
      group: 'es',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug_es',
      title: 'Slug (URL en español)',
      type: 'slug',
      options: { source: 'title_es', maxLength: 96 },
      group: 'es',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'contextAndChallenge_es',
      title: 'Contexto y Desafío',
      type: 'text',
      rows: 6,
      group: 'es',
    }),
    defineField({
      name: 'solution_es',
      title: 'Solución',
      type: 'text',
      rows: 6,
      group: 'es',
    }),
    defineField({
      name: 'results_es',
      title: 'Resultados',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Lista de resultados o quotes. Uno por ítem.',
      group: 'es',
    }),

    // ── ENGLISH ────────────────────────────────────────────
    defineField({
      name: 'title_en',
      title: 'Project name',
      type: 'string',
      group: 'en',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug_en',
      title: 'Slug (URL in English)',
      type: 'slug',
      options: { source: 'title_en', maxLength: 96 },
      group: 'en',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'contextAndChallenge_en',
      title: 'Context & Challenge',
      type: 'text',
      rows: 6,
      group: 'en',
    }),
    defineField({
      name: 'solution_en',
      title: 'Solution',
      type: 'text',
      rows: 6,
      group: 'en',
    }),
    defineField({
      name: 'results_en',
      title: 'Results',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'List of results or client quotes. One per item.',
      group: 'en',
    }),

    // ── IMÁGENES ───────────────────────────────────────────
    defineField({
      name: 'gallery',
      title: 'Galería',
      type: 'array',
      of: [
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            defineField({ name: 'caption', title: 'Caption', type: 'string' }),
            defineField({
              name: 'halfWidth',
              title: 'Media columna',
              type: 'boolean',
              initialValue: false,
              description: 'Actívalo para que esta imagen ocupe media fila y comparta con la de al lado. Para emparejar dos, enciéndelo en ambas y ponlas seguidas.',
            }),
          ],
        },
        {
          type: 'object',
          name: 'galleryVideo',
          title: 'Video',
          fields: [
            defineField({
              name: 'videoUrl',
              title: 'URL del video',
              type: 'url',
              description: 'Embed de YouTube/Vimeo, enlace directo a un .mp4, o ruta local como /sitio-full.mp4 si el archivo está en la carpeta public/',
              validation: (Rule) =>
                Rule.required().uri({ scheme: ['http', 'https'], allowRelative: true }),
            }),
            defineField({
              name: 'caption',
              title: 'Caption',
              type: 'string',
            }),
            defineField({
              name: 'isPortrait',
              title: '¿Formato vertical? (portrait)',
              type: 'boolean',
              initialValue: false,
              description: 'Actívalo si el video es más alto que ancho — queda en media columna como las imágenes verticales.',
            }),
          ],
          preview: {
            select: { url: 'videoUrl', caption: 'caption' },
            prepare({ url, caption }: { url: string; caption: string }) {
              return { title: caption || 'Video', subtitle: url }
            },
          },
        },
      ],
      group: 'media',
    }),

    // ── CONFIGURACIÓN ──────────────────────────────────────
    defineField({
      name: 'published',
      title: 'Publicado (on/off)',
      type: 'boolean',
      description: 'On = visible en el sitio. Off = se oculta de la grilla y de su página, sin borrar el contenido.',
      initialValue: true,
      group: 'config',
    }),
    defineField({
      name: 'featured',
      title: 'Destacado',
      type: 'boolean',
      initialValue: false,
      group: 'config',
    }),
    defineField({
      name: 'order',
      title: 'Orden',
      type: 'number',
      description: 'Número menor = aparece antes.',
      group: 'config',
    }),
  ],

  preview: {
    select: { title: 'title_es', year: 'year', media: 'coverImage' },
    prepare({ title, year, media }) {
      return { title: title || 'Sin título', subtitle: year ? `Work · ${year}` : 'Work', media }
    },
  },

  orderings: [
    {
      title: 'Destacados primero',
      name: 'featuredFirst',
      by: [
        { field: 'featured', direction: 'desc' },
        { field: 'order', direction: 'asc' },
        { field: 'year', direction: 'desc' },
      ],
    },
  ],
})
// Esquema de las categorías de "Art" para el Studio de Sanity.
//
// Este archivo NO lo usa el sitio: es una copia de referencia del que vive en la
// carpeta del Studio (schemaTypes/artCategory.ts), que ya está publicado.
// Página "Art": cada documento es una categoría (Photography, Digital Drawing...)
// con su lista de piezas. Para sumar una categoría nueva basta crear otro documento.
// En cada lista se pueden arrastrar varias imágenes de una vez y reordenarlas.
import { defineArrayMember, defineField, defineType } from 'sanity'

const pieceFields = [
  defineField({ name: 'title', title: 'Título', description: 'Opcional.', type: 'string' }),
  defineField({
    name: 'details',
    title: 'Detalles',
    description: 'Opcional. Técnica, formato, lugar... Ej: "Óleo sobre tela, 50 × 40 cm".',
    type: 'string',
  }),
  defineField({ name: 'year', title: 'Año', type: 'number' }),
  defineField({
    name: 'description_en',
    title: 'Descripción (EN)',
    description: 'Opcional. Se lee al abrir la pieza en grande. Si una obra tiene varias imágenes, basta ponerla en la primera.',
    type: 'text',
    rows: 4,
  }),
  defineField({ name: 'description_es', title: 'Descripción (ES)', type: 'text', rows: 4 }),
  defineField({ name: 'link', title: 'Enlace', description: 'Opcional. Sitio, video completo, fanzine...', type: 'url' }),
  defineField({
    name: 'linkLabel',
    title: 'Texto del enlace',
    description: 'Ej: Visit site, Watch video, Read zine. Por defecto: Visit.',
    type: 'string',
  }),
  defineField({ name: 'hidden', title: 'Ocultar del sitio', type: 'boolean', initialValue: false }),
]

export default defineType({
  name: 'artCategory',
  title: 'Art — Categorías',
  type: 'document',
  fields: [
    defineField({
      name: 'title_en',
      title: 'Nombre (EN)',
      description: 'Como aparece en el sitio. Ej: Photography.',
      type: 'string',
      validation: (r) => r.required(),
    }),
    defineField({ name: 'title_es', title: 'Nombre (ES)', type: 'string' }),
    defineField({
      name: 'slug',
      title: 'Slug',
      description: 'Define el enlace directo: /art#<slug>',
      type: 'slug',
      options: { source: 'title_en' },
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'order',
      title: 'Orden',
      description: 'Número menor = aparece antes. La primera categoría es la que se ve al entrar.',
      type: 'number',
    }),
    defineField({
      name: 'layout',
      title: 'Presentación',
      description:
        'Muro: todas las piezas en columnas. Por obra: cada obra en un bloque con su título, su texto y sus piezas en una fila (se agrupan las piezas seguidas que comparten título).',
      type: 'string',
      options: {
        list: [
          { title: 'Muro', value: 'wall' },
          { title: 'Por obra', value: 'rows' },
        ],
        layout: 'radio',
      },
      initialValue: 'wall',
    }),
    defineField({
      name: 'published',
      title: 'Publicada (on/off)',
      description: 'Off = la categoría no aparece en el sitio. Una categoría sin piezas tampoco aparece.',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'items',
      title: 'Piezas',
      description: 'Se muestran en este orden. Arrastra para reordenar.',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'image',
          options: { hotspot: true },
          fields: pieceFields,
        }),
        defineArrayMember({
          type: 'object',
          name: 'artVideo',
          title: 'Video',
          fields: [
            defineField({
              name: 'file',
              title: 'Archivo de video',
              description: 'MP4 liviano (idealmente bajo 30 MB).',
              type: 'file',
              options: { accept: 'video/mp4,video/webm' },
              validation: (r) => r.required(),
            }),
            defineField({
              name: 'poster',
              title: 'Portada',
              description: 'Un cuadro del video. Se ve mientras carga y define su proporción.',
              type: 'image',
            }),
            ...pieceFields,
          ],
          preview: {
            select: { title: 'title', media: 'poster', name: 'file.asset.originalFilename' },
            prepare({ title, media, name }) {
              return { title: title || name || 'Video', subtitle: 'Video', media }
            },
          },
        }),
      ],
    }),
  ],
  orderings: [{ title: 'Orden', name: 'order', by: [{ field: 'order', direction: 'asc' }] }],
  preview: {
    select: { title: 'title_en', items: 'items', order: 'order', media: 'items.0' },
    prepare({ title, items, order, media }) {
      const count = Array.isArray(items) ? items.length : 0
      return {
        title: title || 'Sin nombre',
        subtitle: `Art · ${count} ${count === 1 ? 'pieza' : 'piezas'}${order != null ? ` · orden ${order}` : ''}`,
        media,
      }
    },
  },
})

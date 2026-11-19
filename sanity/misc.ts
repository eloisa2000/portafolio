// Esquema de la página "Misc" para el Studio de Sanity.
//
// Este archivo NO lo usa el sitio: es una copia de referencia del que vive en la
// carpeta del Studio (schemaTypes/misc.ts), que ya está publicado.
// Página "Misc": un espacio para mirar imágenes y videos sueltos.
// Es un documento único con una lista: se pueden arrastrar varias imágenes
// de una vez y reordenarlas arrastrando.
import { defineArrayMember, defineField, defineType } from 'sanity'

export default defineType({
  name: 'misc',
  title: 'Misc',
  type: 'document',
  fields: [
    defineField({
      name: 'intro_en',
      title: 'Texto de la página (EN)',
      description: 'Opcional. Una línea que aparece en la columna izquierda.',
      type: 'string',
    }),
    defineField({
      name: 'intro_es',
      title: 'Texto de la página (ES)',
      description: 'Opcional. Lo mismo, para la versión en español.',
      type: 'string',
    }),
    defineField({
      name: 'items',
      title: 'Imágenes y videos',
      description: 'Se muestran en este orden. Arrastra para reordenar.',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'image',
          options: { hotspot: true },
          fields: [
            defineField({ name: 'caption', title: 'Pie de foto', type: 'string' }),
            defineField({ name: 'year', title: 'Año', type: 'number' }),
            defineField({ name: 'hidden', title: 'Ocultar del sitio', type: 'boolean', initialValue: false }),
          ],
        }),
        defineArrayMember({
          type: 'object',
          name: 'miscVideo',
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
            defineField({ name: 'caption', title: 'Pie de video', type: 'string' }),
            defineField({ name: 'year', title: 'Año', type: 'number' }),
            defineField({ name: 'hidden', title: 'Ocultar del sitio', type: 'boolean', initialValue: false }),
          ],
          preview: {
            select: { caption: 'caption', media: 'poster', name: 'file.asset.originalFilename' },
            prepare({ caption, media, name }) {
              return { title: caption || name || 'Video', subtitle: 'Video', media }
            },
          },
        }),
      ],
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Misc', subtitle: 'Imágenes y videos sueltos' }
    },
  },
})

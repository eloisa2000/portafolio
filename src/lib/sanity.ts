// src/lib/sanity.ts
import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'
import type { SanityImageSource } from '@sanity/image-url/lib/types/types'

export const client = createClient({
  projectId: 'wzn09rti',
  dataset: 'production',
  useCdn: true,
  apiVersion: '2024-01-01',
})

const builder = imageUrlBuilder(client)

export function urlFor(source: SanityImageSource) {
  return builder.image(source)
}

// Datos extra de cada imagen: miniatura borrosa (lqip) y dimensiones,
// para reservar el espacio y animar la carga.
export const IMG_META = `"lqip": asset->metadata.lqip, "dims": asset->metadata.dimensions`

// ── Perfil ─────────────────────────────────────────────────
export async function getProfile() {
  return client.fetch(`*[_type == "profile"][0]{
    ...,
    aboutImages[]{ ..., ${IMG_META} }
  }`)
}

// ── Work y Workshops ───────────────────────────────────────
// Son dos colecciones distintas en Sanity ("project" y "workshop") con la misma
// estructura. La diferencia: los proyectos se etiquetan con role + sector,
// y los workshops con tags ("video-and-cinema", "design").
export type Collection = 'project' | 'workshop'

// El rol "workshops" de un proyecto no se ofrece como filtro: Workshops tiene su propia página
export const WORKSHOP_ROLE = 'workshops'

const CARD_FIELDS = `
  _id,
  _type,
  title_es,
  title_en,
  slug_es,
  slug_en,
  year,
  role,
  sector,
  tags,
  featured,
  coverImage{ ..., ${IMG_META} },
  // Imágenes que se muestran al hacer hover sobre la portada:
  // las marcadas en Sanity con "showInPreview"; si no hay ninguna marcada,
  // las primeras 4 de la galería.
  "previews": select(
    count(gallery[_type == "image" && defined(asset) && showInPreview == true]) > 0 =>
      gallery[_type == "image" && defined(asset) && showInPreview == true][0...6]{ asset, crop, hotspot },
    gallery[_type == "image" && defined(asset)][0...4]{ asset, crop, hotspot }
  )
`

function getCollection(type: Collection) {
  return client.fetch(
    `*[_type == $type && published != false] | order(featured desc, order asc, year desc) { ${CARD_FIELDS} }`,
    { type }
  )
}

export async function getProjects() {
  return getCollection('project')
}

export async function getWorkshops() {
  return getCollection('workshop')
}

/** Un proyecto o workshop completo, para su página. Busca por slug_en y, si no, por slug_es. */
export async function getEntry(type: Collection, slug: string) {
  return client.fetch(
    `*[_type == $type && (slug_en.current == $slug || slug_es.current == $slug)]
      | order(select(slug_en.current == $slug => 0, 1) asc)[0]{
      _id, _type, title_en, title_es, slug_en, slug_es,
      year, agency, role, sector, tags,
      contextAndChallenge_en, solution_en, results_en,
      contextAndChallenge_es, solution_es, results_es,
      gallery[]{ _type, _key, caption, asset, crop, hotspot, videoUrl, isPortrait, halfWidth, ${IMG_META} },
      link, linkLabel,
      coverImage{ ..., ${IMG_META} },
      credits[]{ role_en, role_es, names }
    }`,
    { type, slug }
  )
}

export function slugOf(entry: any): string | undefined {
  return entry?.slug_en?.current ?? entry?.slug_es?.current
}

// ── Art ────────────────────────────────────────────────────
export async function getArtWorks() {
  return client.fetch(`
    *[_type == "artWork"] | order(category asc, order asc, year desc) {
      _id,
      title_es,
      title_en,
      slug_es,
      slug_en,
      year,
      category,
      brief_es,
      brief_en,
      coverImage,
      videoUrl,
      externalLink
    }
  `)
}

export async function getArtWork(slug: string) {
  return client.fetch(`
    *[_type == "artWork" && slug_es.current == $slug][0]
  `, { slug })
}

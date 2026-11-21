// src/lib/sanity.ts
import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'
import type { SanityImageSource } from '@sanity/image-url/lib/types/types'

export const client = createClient({
  projectId: 'wzn09rti',
  dataset: 'production',
  // El sitio es estático: los datos se leen una sola vez, al construir. Sin CDN se
  // lee directo de la API, así un build disparado justo después de publicar en el
  // Studio no toma una respuesta vieja que la CDN todavía tenga en caché.
  useCdn: false,
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
  // Imágenes que se muestran al hacer hover sobre la portada. Solo las horizontales:
  // llenan el marco de la portada sin perder casi nada al recortarse.
  // Van las marcadas en Sanity con "showInPreview"; si no hay ninguna marcada
  // (o ninguna horizontal entre ellas), las primeras 4 horizontales de la galería.
  "previews": select(
    count(gallery[_type == "image" && defined(asset) && showInPreview == true && asset->metadata.dimensions.aspectRatio > 1.1]) > 0 =>
      gallery[_type == "image" && defined(asset) && showInPreview == true && asset->metadata.dimensions.aspectRatio > 1.1][0...6]{ asset, crop, hotspot },
    gallery[_type == "image" && defined(asset) && asset->metadata.dimensions.aspectRatio > 1.1][0...4]{ asset, crop, hotspot }
  )
`

function getCollection(type: Collection) {
  return client.fetch(
    // Los workshops van por fecha, del más reciente al más antiguo; los proyectos, por orden manual
    type === 'workshop'
      ? `*[_type == $type && published != false] | order(year desc, order asc) { ${CARD_FIELDS} }`
      : `*[_type == $type && published != false] | order(featured desc, order asc, year desc) { ${CARD_FIELDS} }`,
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
      _id, _type, title_en, title_es, slug_en, slug_es, headline_en, headline_es,
      year, agency, role, sector, tags,
      contextAndChallenge_en, solution_en, results_en,
      contextAndChallenge_es, solution_es, results_es,
      gallery[]{ _type, _key, caption, caption_es, asset, crop, hotspot, videoUrl, isPortrait, halfWidth, ${IMG_META} },
      works[]{
        _key, title, authors, link,
        items[]{ _key, _type, asset, crop, hotspot, ${IMG_META}, "videoUrl": file.asset->url, poster{ asset, ${IMG_META} } }
      },
      link, linkLabel,
      coverImage{ ..., ${IMG_META} },
      credits[]{ role_en, role_es, names },
      screenings[]{ year, title, venue, city },
      awards[]{ year, title, detail }
    }`,
    { type, slug }
  )
}

export function slugOf(entry: any): string | undefined {
  return entry?.slug_en?.current ?? entry?.slug_es?.current
}

// ── Misc ───────────────────────────────────────────────────
// Documento único con imágenes y videos sueltos, en el orden en que se ven.
export async function getMisc() {
  return client.fetch(`*[_type == "misc"][0]{
    intro_en, intro_es,
    items[hidden != true]{
      _key, _type, caption, caption_es, year,
      asset, crop, hotspot, ${IMG_META},
      "videoUrl": file.asset->url,
      poster{ asset, ${IMG_META} }
    }
  }`)
}

// ── Art ────────────────────────────────────────────────────
// Cada categoría ("artCategory") trae su lista de piezas, en el orden en que se ven.
export async function getArtCategories() {
  return client.fetch(`*[_type == "artCategory" && published != false] | order(order asc, title_en asc) {
    _id, title_en, title_es, layout,
    "slug": slug.current,
    items[hidden != true]{
      _key, _type, title, title_es, details, details_es, year,
      description_en, description_es, link, linkLabel, linkLabel_es,
      moreLinks[]{ label, label_es, url }, sideBySide,
      asset, crop, hotspot, ${IMG_META},
      "videoUrl": file.asset->url,
      poster{ asset, ${IMG_META} }
    }
  }`)
}

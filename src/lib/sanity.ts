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

// ── Proyectos Work ─────────────────────────────────────────
export async function getProjects() {
  return client.fetch(`
    *[_type == "project" && published != false] | order(featured desc, order asc, year desc) {
      _id,
      title_es,
      title_en,
      slug_es,
      slug_en,
      year,
      role,
      sector,
      featured,
      contextAndChallenge_en,
      coverImage{ ..., ${IMG_META} },
      // primeras imágenes de la galería, para el preview al hacer hover
      "previews": gallery[_type == "image" && defined(asset)][0...4]{ asset, crop, hotspot }
    }
  `)
}

export async function getProject(slug: string) {
  return client.fetch(`
    *[_type == "project" && slug_es.current == $slug][0] {
      _id,
      title_es,
      title_en,
      slug_es,
      slug_en,
      year,
      agency,
      role,
      sector,
      contextAndChallenge_es,
      contextAndChallenge_en,
      solution_es,
      solution_en,
      results_es,
      results_en,
      gallery,
      link,
      coverImage
    }
  `, { slug })
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

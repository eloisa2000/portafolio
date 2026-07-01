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

// ── Perfil ─────────────────────────────────────────────────
export async function getProfile() {
  return client.fetch(`*[_type == "profile"][0]`)
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
      coverImage
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

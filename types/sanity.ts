// src/lib/sanity.ts
// Cliente de Sanity para conectar Astro con el CMS

import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'
import type { SanityImageSource } from '@sanity/image-url/lib/types/types'

export const client = createClient({
  projectId: 'wzn09rti',
  dataset: 'production',
  useCdn: true,
  apiVersion: '2024-01-01',
})

// Helper para construir URLs de imágenes optimizadas
const builder = imageUrlBuilder(client)

export function urlFor(source: SanityImageSource) {
  return builder.image(source)
}

// ── Queries GROQ ───────────────────────────────────────────
// Estos son los "fetch" que usarás en cada página de Astro

// Perfil completo (para header + About)
export async function getProfile() {
  return client.fetch(`*[_type == "profile"][0]`)
}

// Todos los proyectos de Work, ordenados
export async function getProjects() {
  return client.fetch(`
    *[_type == "project"] | order(featured desc, order asc, year desc) {
      _id,
      title,
      slug,
      year,
      role,
      sector,
      featured,
      coverImage
    }
  `)
}

// Un proyecto individual por slug (para la página interna)
export async function getProject(slug: string) {
  return client.fetch(`
    *[_type == "project" && slug.current == $slug][0] {
      _id,
      title,
      slug,
      year,
      agency,
      role,
      sector,
      contextAndChallenge,
      solution,
      results,
      gallery,
      link,
      coverImage
    }
  `, { slug })
}

// Todas las obras de Art, ordenadas por categoría
export async function getArtWorks() {
  return client.fetch(`
    *[_type == "artWork"] | order(category asc, order asc, year desc) {
      _id,
      title,
      slug,
      year,
      category,
      brief,
      coverImage,
      videoUrl,
      externalLink
    }
  `)
}

// Una obra individual por slug
export async function getArtWork(slug: string) {
  return client.fetch(`
    *[_type == "artWork" && slug.current == $slug][0]
  `, { slug })
}

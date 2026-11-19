// Los roles vienen de Sanity como slugs (web-design, ui-design...).
// Los sectores ya vienen como label ("Arts & Culture") y se muestran tal cual.
const roleLabels: Record<string, string> = {
  'web-design': 'Web Design',
  'ui-design': 'UI Design',
  'brand-identity': 'Brand Identity',
  'branding': 'Branding',
  'graphic-design': 'Graphic Design',
  'art-direction': 'Art Direction',
  'motion-design': 'Motion Design',
  'development': 'Development',
  'ux-research': 'UX Research',
  'community-management': 'Community Management',
  'type-design': 'Type Design',
  'lettering': 'Lettering',
  'workshops': 'Workshops',
  // tags de la colección Workshops
  'video-and-cinema': 'Video and Cinema',
  'design': 'Design',
}

const roleLabelsEs: Record<string, string> = {
  'web-design': 'Diseño web',
  'ui-design': 'Diseño UI',
  'brand-identity': 'Identidad de marca',
  'branding': 'Branding',
  'graphic-design': 'Diseño gráfico',
  'editorial-design': 'Diseño editorial',
  'art-direction': 'Dirección de arte',
  'motion-design': 'Motion design',
  'development': 'Desarrollo',
  'ux-research': 'Investigación UX',
  'community-management': 'Community management',
  'type-design': 'Diseño tipográfico',
  'lettering': 'Lettering',
  'workshops': 'Talleres',
  'video-and-cinema': 'Video y cine',
  'design': 'Diseño',
}

export function fmtRole(val: string, lang: 'en' | 'es' = 'en') {
  const fallback = val.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())
  return lang === 'es' ? roleLabelsEs[val] ?? roleLabels[val] ?? fallback : roleLabels[val] ?? fallback
}

/** Recorta un texto para usarlo como meta description (~155 caracteres, sin cortar palabras). */
export function excerpt(text: string | undefined, max = 155) {
  const clean = (text ?? '').replace(/\s+/g, ' ').trim()
  if (clean.length <= max) return clean
  const cut = clean.slice(0, max)
  return cut.slice(0, cut.lastIndexOf(' ')).replace(/[,;:.\s]+$/, '') + '…'
}

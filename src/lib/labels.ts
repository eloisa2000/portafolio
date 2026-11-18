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

export function fmtRole(val: string) {
  return roleLabels[val] ?? val.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())
}

/** Recorta un texto para usarlo como meta description (~155 caracteres, sin cortar palabras). */
export function excerpt(text: string | undefined, max = 155) {
  const clean = (text ?? '').replace(/\s+/g, ' ').trim()
  if (clean.length <= max) return clean
  const cut = clean.slice(0, max)
  return cut.slice(0, cut.lastIndexOf(' ')).replace(/[,;:.\s]+$/, '') + '…'
}

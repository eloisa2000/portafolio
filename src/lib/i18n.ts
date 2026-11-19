// Idiomas del sitio. El inglés vive en la raíz (/about) y el español bajo /es (/es/about).
// Las páginas de /es reutilizan los mismos componentes: cada uno deduce el idioma de la URL.
export type Lang = 'en' | 'es'

export function langOf(url: URL | string): Lang {
  const path = typeof url === 'string' ? url : url.pathname
  return path === '/es' || path.startsWith('/es/') ? 'es' : 'en'
}

/** Ruta interna en el idioma dado: href('/about', 'es') → '/es/about' */
export function href(path: string, lang: Lang): string {
  if (lang === 'en') return path
  return path === '/' ? '/es' : `/es${path}`
}

/** La misma ruta en el otro idioma (para el selector de idioma y hreflang). */
export function switchPath(pathname: string, to: Lang): string {
  const bare = pathname.replace(/^\/es(?=\/|$)/, '') || '/'
  return href(bare, to)
}

/**
 * Campo traducido de un documento de Sanity: loc(project, 'title', 'es') lee title_es
 * y, si está vacío, cae en el otro idioma para no dejar huecos.
 */
export function loc(obj: any, field: string, lang: Lang): any {
  const other: Lang = lang === 'en' ? 'es' : 'en'
  const empty = (v: any) => v == null || v === '' || (Array.isArray(v) && v.length === 0)
  const value = obj?.[`${field}_${lang}`]
  return empty(value) ? obj?.[`${field}_${other}`] : value
}

/** Slug de un proyecto o workshop en el idioma dado (cae en el otro si falta). */
export function slugFor(entry: any, lang: Lang): string | undefined {
  return lang === 'es'
    ? entry?.slug_es?.current ?? entry?.slug_en?.current
    : entry?.slug_en?.current ?? entry?.slug_es?.current
}

// ── Textos de la interfaz ──────────────────────────────────
export const ui = {
  en: {
    nav: { work: 'Work', workshops: 'Workshops', art: 'Art', misc: 'Misc', about: 'About' },
    navLabel: 'Main',
    switchTo: 'ES',
    switchLabel: 'Ver en español',
    homeTitle: 'Web & UI Designer in Santiago, Chile',
    siteDescription: (name: string) =>
      `${name} is a web and UI designer based in Santiago, Chile, seeking beauty and functionality in the digital world. Web design, brand identity and art direction.`,
    jobTitle: 'Web & UI Designer',
    defaultHeadline: 'seeking *beauty* and *functionality* in the digital world',
    selectedWork: 'Selected work',
    workshopsDescription: 'Workshops by Eloísa Nieto on design, video and cinema.',
    all: 'All',
    filterByDiscipline: 'Filter by discipline',
    filterBySector: 'Filter by sector',
    empty: 'Nothing here yet.',
    role: 'Role',
    type: 'Type',
    sector: 'Sector',
    agency: 'Agency',
    site: 'Site',
    visit: 'Visit',
    results: 'Results',
    screenings: 'Screenings & Exhibitions',
    awards: 'Awards',
    credits: 'Credits',
    backTo: 'Back to',
    aProject: 'A project',
    aWorkshop: 'A workshop',
    by: 'by',
    image: 'image',
    about: 'About',
    likes: 'Likes',
    exhibitions: 'Exhibitions & Screenings',
    artDescription: (names: string[]) =>
      names.length ? `Personal work by Eloísa Nieto: ${names.join(', ')}.` : 'Personal work by Eloísa Nieto.',
    artCategories: 'Art categories',
    miscDescription: 'Loose images and videos by Eloísa Nieto: posters, animations and other odds and ends.',
    miscLabel: 'Loose images and videos',
    filterByType: 'Filter by type',
    images: 'Images',
    videos: 'Videos',
    open: 'Open',
    video: 'Video',
    viewer: 'Viewer',
    close: 'Close',
    previous: 'Previous',
    next: 'Next',
    scrollBack: 'Scroll back',
    scrollForward: 'Scroll forward',
    meditate: 'meditate for free',
    copy: 'copy',
    copied: 'copied',
    pressCopy: 'press ⌘C',
    fontToggle: 'Change typography',
    themeToggle: 'Toggle dark mode',
  },
  es: {
    nav: { work: 'Trabajo', workshops: 'Talleres', art: 'Arte', misc: 'Misc', about: 'Sobre mí' },
    navLabel: 'Principal',
    switchTo: 'EN',
    switchLabel: 'View in English',
    homeTitle: 'Diseñadora web y UI en Santiago, Chile',
    siteDescription: (name: string) =>
      `${name} es diseñadora web y UI en Santiago, Chile, y busca belleza y funcionalidad en el mundo digital. Diseño web, identidad de marca y dirección de arte.`,
    jobTitle: 'Diseñadora web y UI',
    defaultHeadline: 'buscando *belleza* y *funcionalidad* en el mundo digital',
    selectedWork: 'Trabajos seleccionados',
    workshopsDescription: 'Talleres de Eloísa Nieto sobre diseño, video y cine.',
    all: 'Todos',
    filterByDiscipline: 'Filtrar por disciplina',
    filterBySector: 'Filtrar por sector',
    empty: 'Todavía no hay nada aquí.',
    role: 'Rol',
    type: 'Tipo',
    sector: 'Sector',
    agency: 'Agencia',
    site: 'Sitio',
    visit: 'Ver',
    results: 'Resultados',
    screenings: 'Proyecciones y exposiciones',
    awards: 'Reconocimientos',
    credits: 'Créditos',
    backTo: 'Volver a',
    aProject: 'Un proyecto',
    aWorkshop: 'Un taller',
    by: 'de',
    image: 'imagen',
    about: 'Sobre mí',
    likes: 'Intereses',
    exhibitions: 'Exposiciones y proyecciones',
    artDescription: (names: string[]) =>
      names.length ? `Obra personal de Eloísa Nieto: ${names.join(', ')}.` : 'Obra personal de Eloísa Nieto.',
    artCategories: 'Categorías de arte',
    miscDescription: 'Imágenes y videos sueltos de Eloísa Nieto: afiches, animaciones y otras cosas varias.',
    miscLabel: 'Imágenes y videos sueltos',
    filterByType: 'Filtrar por tipo',
    images: 'Imágenes',
    videos: 'Videos',
    open: 'Abrir',
    video: 'Video',
    viewer: 'Visor',
    close: 'Cerrar',
    previous: 'Anterior',
    next: 'Siguiente',
    scrollBack: 'Retroceder',
    scrollForward: 'Avanzar',
    meditate: 'medita gratis',
    copy: 'copiar',
    copied: 'copiado',
    pressCopy: 'presiona ⌘C',
    fontToggle: 'Cambiar tipografía',
    themeToggle: 'Cambiar modo oscuro',
  },
} as const

// ── Etiquetas que vienen de Sanity como valores fijos ──────
// Los sectores se guardan con su nombre en inglés ("Arts & Culture").
const sectorsEs: Record<string, string> = {
  'Arts & Culture': 'Arte y cultura',
  'Social Impact': 'Impacto social',
  Education: 'Educación',
  Health: 'Salud',
  B2B: 'B2B',
  Industry: 'Industria',
  Tech: 'Tecnología',
  'E-Commerce': 'E-commerce',
}
export const fmtSector = (sector: string, lang: Lang) => (lang === 'es' ? sectorsEs[sector] ?? sector : sector)

// Etiqueta sobre el enlace externo de un proyecto ("Site", "Prototype"...)
const linkLabelsEs: Record<string, string> = {
  Site: 'Sitio',
  Prototype: 'Prototipo',
  Record: 'Registro',
}
export const fmtLinkLabel = (label: string | undefined, lang: Lang) => {
  const value = label ?? 'Site'
  return lang === 'es' ? linkLabelsEs[value] ?? value : value
}

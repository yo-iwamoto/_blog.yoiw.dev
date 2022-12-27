import type { Query as Query0 } from '../pages/search/index.page'

export const pagesPath = {
  "categories": {
    _name: (name: string | number) => ({
      $url: (url?: { hash?: string }) => ({ pathname: '/categories/[name]' as const, query: { name }, hash: url?.hash })
    })
  },
  "entries": {
    _slug: (slug: string | number) => ({
      $url: (url?: { hash?: string }) => ({ pathname: '/entries/[slug]' as const, query: { slug }, hash: url?.hash })
    })
  },
  "search": {
    $url: (url: { query: Query0, hash?: string }) => ({ pathname: '/search' as const, query: url.query, hash: url.hash })
  },
  $url: (url?: { hash?: string }) => ({ pathname: '/' as const, hash: url?.hash })
}

export type PagesPath = typeof pagesPath

export const staticPath = {
  _gitkeep: '/.gitkeep',
  img: {
    info_svg: '/img/info.svg'
  }
} as const

export type StaticPath = typeof staticPath

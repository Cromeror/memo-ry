export interface Card {
  name: string
  slug: string
  uuid: string
  space: 'animals'
  locale: 'es'
  available_locales: Array<'es'>
  image: {
    url: string
    uuid: string
    title: string
    alt_text: string
    description: string
    content_type: string
  }
}

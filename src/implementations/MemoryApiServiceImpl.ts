import { MemoryApiService } from '../abstractions/MemoryApiService'
import { Card } from '../abstractions/domine/Card'
import { HttpClient } from '../abstractions/HttpClient'

interface EntriesDataSource {
  entries: Array<{
    meta: {
      name: string
      slug: string
      uuid: string
      space: 'animals'
      locale: 'es'
      available_locales: Array<'es'>
    }
    fields: {
      image: {
        url: string
        uuid: string
        title: string
        alt_text: string
        description: string
        content_type: string
      }
    }
  }>
}

export class MemoryApiServiceImpl implements MemoryApiService {
  _HttpClient: HttpClient
  _defaultPerPage = 20
  constructor(httpClient: HttpClient) {
    this._HttpClient = httpClient
  }

  async getCards(perPage?: number): Promise<Card[]> {
    // TODO: improvement the pagination
    const resource = `content/spaces/animals/types/game/entries${
      perPage && perPage > 0
        ? '?per_page=' + perPage
        : '?per_page=' + this._defaultPerPage
    }`
    const { entries } = await this._HttpClient.get<EntriesDataSource>(resource)

    // TODO: check the API model to validate the optional fields.
    return entries.map((entry) => {
      const { fields, meta } = entry
      return {
        name: meta.name,
        locale: meta.locale,
        available_locales: meta.available_locales,
        uuid: meta.uuid,
        slug: meta.slug,
        space: meta.space,
        image: {
          url: fields.image.url,
          uuid: fields.image.uuid,
          alt_text: fields.image.alt_text,
          title: fields.image.title,
          content_type: fields.image.content_type,
          description: fields.image.description,
        },
      }
    }) as Card[]
  }
}

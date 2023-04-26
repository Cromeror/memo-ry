import { HttpClient } from '../abstractions/HttpClient'
import axios, { AxiosInstance } from 'axios'

export class HttpClientImpl implements HttpClient {
  client: AxiosInstance

  constructor(baseUrl: string) {
    this.client = axios.create({
      baseURL: baseUrl,
      timeout: 1000,
    })
  }

  get<T>(resource: string): Promise<T> {
    return this.client.get<T>(resource).then((r) => r.data)
  }
}

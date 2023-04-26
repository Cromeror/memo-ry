export interface HttpClient {
  get<T>(resource: string): Promise<T>
}

import { API_URL } from './base-url'

export async function apiFetch<T>(
  input: RequestInfo,
  init?: RequestInit,
): Promise<T> {
  const res = await fetch(`${API_URL}/api${input}`, init)

  const contentType = res.headers.get('content-type')
  const isJson = contentType?.includes('application/json')

  const data = isJson ? await res.json() : null

  if (!res.ok) {
    throw (
      data ?? {
        success: false,
        message: `Request failed with status ${res.status}`,
      }
    )
  }

  return data as T
}

import { SessionType } from '@repo/types'
import { API_URL } from './base-url'
import { getAllCookies } from './cookies'

export async function getUserSession(): Promise<SessionType> {
  const res = await fetch(`${API_URL}/api/session/get-user-session`, {
    method: 'GET',
    headers: {
      Cookie: await getAllCookies(),
    },
    credentials: 'include',
  })
  if (!res.ok) {
    return null
  }
  const data = await res.json()

  return data.session
}

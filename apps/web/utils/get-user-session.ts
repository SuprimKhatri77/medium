import { SessionType } from '@repo/types'
import { API_URL } from './base-url'
import { cookies } from 'next/headers'

export async function getUserSession(): Promise<SessionType> {
  const cookieStore = await cookies()
  const allCookies = cookieStore
    .getAll()
    .map((cookie) => `${cookie.name}=${cookie.value}`)
    .join(';')
  const res = await fetch(`${API_URL}/api/session/get-user-session`, {
    method: 'GET',
    headers: {
      Cookie: allCookies,
    },
    credentials: 'include',
  })
  if (!res.ok) {
    return null
  }
  const data = await res.json()

  return data.session
}

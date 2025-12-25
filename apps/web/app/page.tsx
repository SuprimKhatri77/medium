import { Landing } from '@/modules/landing/landing'
import { API_URL } from '@/utils/base-url'
import { cookies } from 'next/headers'

export default async function Home() {
  try {
    const cookieStore = await cookies()
    const cookieHeader = cookieStore
      .getAll()
      .map((cookie) => `${cookie.name}=${cookie.value}`)
      .join('; ')
    console.log('all cookies: ', cookieHeader)
    const response = await fetch(`${API_URL}/api/session/get-user-session`, {
      method: 'GET',
      headers: {
        Cookie: cookieHeader,
      },
      credentials: 'include',
    })

    if (!response.ok) {
      throw new Error('Failed to fetch session')
    }

    const data = await response.json()
    console.log('data: ', data)
    return <Landing session={data.session} />
  } catch (error) {
    console.error('Error fetching session:', error)
    return <Landing session={null} />
  }
}

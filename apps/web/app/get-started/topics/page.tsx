import { SelectTopics } from '@/modules/get-started/select-topics'
import { API_URL } from '@/utils/base-url'
import { getAllCookies } from '@/utils/cookies'
import { UserInterest } from '@repo/types'
import { redirect } from 'next/navigation'

export default async function Page() {
  const response = await fetch(`${API_URL}/api/user/interests`, {
    method: 'GET',
    headers: {
      Cookie: await getAllCookies(),
    },
  })
  console.log('response: ', response)

  if (response.status === 401) redirect('/')

  if (!response.ok) {
    throw new Error('Failed to fetch user interests')
  }

  const { interests } = (await response.json()) as UserInterest

  console.log('user interests: ', interests)

  return <SelectTopics userInterests={interests} />
}

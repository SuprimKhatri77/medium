import { SetUsername, SetUsernameResponse } from '@repo/types'
import { db } from '../../db'
import { user } from '../../db/schema'
import { eq } from 'drizzle-orm'
import { generateUsername } from '../../utils/generate-user-name'
import { auth } from '../../utils/auth'
import { fromNodeHeaders } from 'better-auth/node'

export async function setUsername(
  input: SetUsername,
  headers: ReturnType<typeof fromNodeHeaders>,
): Promise<SetUsernameResponse> {
  try {
    const username = generateUsername(input.name)
    console.log('username: ', username)

    const { headers: responseHeaders } = await auth.api.updateUser({
      body: {
        name: input.name,
        username,
        displayUsername: username,
      },
      headers,
      returnHeaders: true,
    })
    console.log('headers: ', responseHeaders)

    return {
      success: true,
    }
  } catch (error) {
    console.log('error: ', error)
    return { success: false, message: 'Failed to set the name.' }
  }
}

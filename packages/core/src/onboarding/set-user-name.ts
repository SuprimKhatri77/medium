import { SetUsername, SetUsernameResponse } from '@repo/contracts'
import { generateUsername, auth, fromNodeHeaders } from '@repo/auth'
import { HeadersType } from '../types/headers.type'

export async function setUsername(
  input: SetUsername,
  headers: HeadersType,
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

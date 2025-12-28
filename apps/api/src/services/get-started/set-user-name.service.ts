import { SetUsername, SetUsernameResponse } from '@repo/types'
import { db } from '../../db'
import { user } from '../../db/schema'
import { eq } from 'drizzle-orm'
import fa from 'zod/v4/locales/fa.js'

export async function setUsername(
  input: SetUsername,
  userId: string,
): Promise<SetUsernameResponse> {
  try {
    await db
      .update(user)
      .set({
        ...input,
      })
      .where(eq(user.id, userId))
    return {
      success: true,
    }
  } catch (error) {
    console.log('error: ', error)
    return { success: false, message: 'Failed to set the name.' }
  }
}

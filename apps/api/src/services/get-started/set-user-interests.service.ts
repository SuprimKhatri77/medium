import { SetUserInterest, SetUserInterestsResponse } from '@repo/types'
import { db } from '../../db'
import { userInterests } from '../../db/schema'
import { eq } from 'drizzle-orm'

export async function setUserInterest(
  input: SetUserInterest,
  userId: string,
): Promise<SetUserInterestsResponse> {
  try {
    await db.delete(userInterests).where(eq(userInterests.userId, userId))
    await db.insert(userInterests).values(
      input.topics.map((t) => ({
        topic: t,
        userId,
      })),
    )
    return { success: true, message: 'Topics set successfully.' }
  } catch (error) {
    console.log('error: ', error)
    return { success: false, message: 'Failed to save the selected topics.' }
  }
}

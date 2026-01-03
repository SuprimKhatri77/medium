import { SetUserInterest, SetUserInterestsResponse } from '@repo/contracts'
import { user, userInterests, db, eq } from '@repo/database'

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
    await db
      .update(user)
      .set({
        hasCompletedOnboarding: true,
      })
      .where(eq(user.id, userId))

    return { success: true, message: 'Topics set successfully.' }
  } catch (error) {
    console.log('error: ', error)
    return { success: false, message: 'Failed to save the selected topics.' }
  }
}

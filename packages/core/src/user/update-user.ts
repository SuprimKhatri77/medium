import { UpdateUser, UpdateUserResponse } from '@repo/contracts'
import { db, user, eq, DrizzleQueryError } from '@repo/database'

export async function updateUser(
  input: UpdateUser,
  userID: string,
): Promise<UpdateUserResponse> {
  try {
    await db
      .update(user)
      .set({ ...input, displayUsername: input.username })
      .where(eq(user.id, userID))

    return { success: true, message: 'Profile updated.' }
  } catch (error) {
    console.log('error: ', error)

    if (error instanceof DrizzleQueryError) {
      const cause = error.cause as any

      if (cause?.code === '23505') {
        if (cause.constraint === 'user_username_unique') {
          return {
            success: false,
            message: 'Username already taken',
          }
        }

        return {
          success: false,
          message: 'Duplicate value',
        }
      }
    }

    return { success: false, message: 'Failed to update profile.' }
  }
}

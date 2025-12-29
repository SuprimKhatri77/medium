import { nanoid } from 'nanoid'

const MAX_USERNAME_LENGTH = 30
const SUFFIX_LENGTH = 5
const SEPARATOR = '-'

export function generateUsername(name: string) {
  // 1. Normalize name
  let base = name
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '')
    .replace(/[^a-z0-9]/g, '')

  // 2. Trim base so final length <= 30
  const maxBaseLength = MAX_USERNAME_LENGTH - SEPARATOR.length - SUFFIX_LENGTH

  if (base.length > maxBaseLength) {
    base = base.slice(0, maxBaseLength)
  }

  // 3. Append nanoid
  return `${base}${SEPARATOR}${nanoid(SUFFIX_LENGTH)}`
}

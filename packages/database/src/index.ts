import { drizzle, NeonHttpDatabase } from 'drizzle-orm/neon-http'
import { neon, NeonQueryFunction } from '@neondatabase/serverless'
import * as schema from './schema'
import { configDotenv } from 'dotenv'

configDotenv({ path: '.env' })

const sql: NeonQueryFunction<boolean, boolean> = neon(process.env.DATABASE_URL!)

export const db: NeonHttpDatabase<typeof schema> = drizzle(sql, { schema })
export type DATABASE = typeof db

export { sql }

export * as schema from './schema'
export * from './schema'

export {
  eq,
  ne,
  gt,
  gte,
  lt,
  lte,
  and,
  or,
  not,
  inArray,
  isNull,
  isNotNull,
  like,
  ilike,
  DrizzleQueryError,
} from 'drizzle-orm'

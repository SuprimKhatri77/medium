import { betterAuth } from 'better-auth'
import { magicLink } from 'better-auth/plugins'
import { db } from '../db'
import * as schema from '../db/schema'
import { drizzleAdapter } from 'better-auth/adapters/drizzle'
import { getMagicLinkEmail } from '../emails/send-magic-link'
import { sendMail } from './send-mail'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY as string)

const frontendUrl =
  process.env.FRONTEND_URL || 'https://medium.suprimkhatri.online'
const backendUrl =
  process.env.BACKEND_URL || 'https://api.medium.suprimkhatri.online'

const trustedOrigins = [
  'http://localhost:5000',
  'http://localhost:3000',
  frontendUrl,
  backendUrl,
]
export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: 'pg',
    schema,
  }),
  baseURL: process.env.BETTER_AUTH_URL || 'http://localhost:5000',
  trustedOrigins,
  emailAndPassword: {
    enabled: true,
    autoSignIn: true,
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      prompt: 'select_account consent',
      accessType: 'offline',
    },
    github: {
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
      prompt: 'select_account consent',
    },
  },

  account: {
    accountLinking: {
      enabled: true,
      trustedProviders: ['google', 'github'],
    },
  },

  plugins: [
    magicLink({
      sendMagicLink: async ({ email, token, url }, ctx) => {
        const customMagicLinkUrl = `${process.env.FRONTEND_URL}/verify/magic-link?token=${token}`

        if (process.env.NODE_ENV === 'production') {
          await resend.emails.send({
            from: 'Medium <auth@suprimkhatri.online>',
            to: email,
            subject: 'Your secure authenticated link',
            html: getMagicLinkEmail(customMagicLinkUrl),
          })
        } else {
          await sendMail({
            to: email,
            subject: 'Your secure login link',
            text: `Click this link to sign in: ${customMagicLinkUrl}`,
            html: getMagicLinkEmail(customMagicLinkUrl),
          })
        }
      },
    }),
  ],
})

export type Session = Awaited<ReturnType<typeof auth.api.getSession>>

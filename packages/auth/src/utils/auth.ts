import { betterAuth } from 'better-auth'
import { magicLink, oAuthProxy, username } from 'better-auth/plugins'
import { db, schema } from '@repo/database'
import { drizzleAdapter } from 'better-auth/adapters/drizzle'
import { getMagicLinkEmail } from '../emails/send-magic-link'
import { sendMail } from './send-mail'
import { Resend } from 'resend'
import { generateUsername } from './generate-user-name'

const resend = new Resend(process.env.RESEND_API_KEY)

const frontendUrl =
  process.env.FRONTEND_URL || 'https://medium.suprimkhatri.online'
const backendUrl =
  process.env.BACKEND_URL || 'https://api.medium.suprimkhatri.online'

console.log('backend url: ', backendUrl)

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

  baseURL: backendUrl || 'http://localhost:5000',
  trustedOrigins,
  disablePaths: ['/is-username-available'],

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
      redirectURI: `${backendUrl}/api/auth/callback/google`,
      mapProfileToUser: (profile) => {
        const nameFromEmail = profile.email.split('@')[0] as string
        console.log('name from email: ', nameFromEmail)
        const randomUsername = generateUsername(nameFromEmail)
        console.log('random username: ', randomUsername)

        return {
          username: randomUsername,
          displayUsername: randomUsername,
        }
      },
    },
    github: {
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
      prompt: 'select_account consent',
      redirectURI: `${backendUrl}/api/auth/callback/github`,
      mapProfileToUser: (profile) => {
        const nameFromEmail = profile.email.split('@')[0] as string
        const randomUsername = generateUsername(nameFromEmail)

        return {
          username: randomUsername,
          displayUsername: randomUsername,
        }
      },
    },
  },

  account: {
    accountLinking: {
      enabled: true,
      trustedProviders: ['google', 'github'],
    },
  },

  advanced: {
    useSecureCookies: process.env.NODE_ENV === 'production',
    defaultCookieAttributes: {
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
      httpOnly: true,
      path: '/',
    },

    crossSubDomainCookies: {
      enabled: process.env.NODE_ENV === 'production',
      domain: 'suprimkhatri.online',
    },
  },

  plugins: [
    magicLink({
      expiresIn: 300,
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

    username({
      minUsernameLength: 3,
      maxUsernameLength: 30,
      usernameValidator: (username) => {
        return /^[a-zA-Z0-9._-]+$/.test(username)
      },
    }),

    oAuthProxy({
      currentURL: backendUrl,
      productionURL: frontendUrl,
    }),
  ],
})

export type AUTH = typeof auth
export type Session = Awaited<ReturnType<typeof auth.api.getSession>>

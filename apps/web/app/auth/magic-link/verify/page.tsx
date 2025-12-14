import { VerifyMagicLink } from '@/modules/auth/verify-magic-link'

type Params = {
  searchParams: Promise<{ token: string; callbackURL: string }>
}
export default async function Page({ searchParams }: Params) {
  const { token, callbackURL } = await searchParams
  if (!token || !callbackURL) {
    return (
      <div>
        <h1>Missing required credentials</h1>
      </div>
    )
  }

  return <VerifyMagicLink token={token} callbackURL={callbackURL} />
}

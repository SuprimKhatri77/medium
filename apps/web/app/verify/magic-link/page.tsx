import { VerifyMagicLink } from '@/modules/auth/verify-magic-link'

type Params = {
  searchParams: Promise<{ token: string }>
}
export default async function Page({ searchParams }: Params) {
  const { token } = await searchParams
  if (!token) {
    return (
      <div>
        <h1>Missing required credentials</h1>
      </div>
    )
  }

  return <VerifyMagicLink token={token} />
}

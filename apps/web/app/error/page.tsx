export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ error: string }>
}) {
  const { error } = await searchParams
  return (
    <div className="min-h-screen flex items-center justify-center">
      <h1 className="text-xl flex gap-2">
        error message:
        <span className="text-red-600">{error}</span>
      </h1>
    </div>
  )
}

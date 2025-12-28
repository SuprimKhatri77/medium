import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import ReactQueryProvider from '@/components/providers/query-client'
import { Toaster } from 'sonner'

const inter = Inter({
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Medium',
  description: 'Let the world know your writing.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className}`}>
        <ReactQueryProvider>
          {children}
          <Toaster />
        </ReactQueryProvider>
      </body>
    </html>
  )
}

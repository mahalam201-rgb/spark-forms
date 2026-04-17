import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Spark Forms - AI-Powered Form Builder',
  description: 'Create, share, and analyze forms in seconds. Let AI generate your questions or build them yourself.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-gradient-to-br from-purple-50 to-blue-50">
        {children}
      </body>
    </html>
  )
}

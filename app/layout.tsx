import { ClerkProvider } from '@clerk/nextjs/dist/components.server'
import './globals.css'
import { Montserrat } from 'next/font/google'

const montserrat = Montserrat({ subsets: ['latin'] })

export const metadata = {
  title: 'Explore | Gymlink',
  description: 'Explore the Gymlink community.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={montserrat.className}>{children}</body>
      </html>
    </ClerkProvider>
  )
}

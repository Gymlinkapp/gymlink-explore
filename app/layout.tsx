import { ClerkProvider } from '@clerk/nextjs/dist/components.server'
import './globals.css'
import { Montserrat } from 'next/font/google'
import { dark } from '@clerk/themes'

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
    <ClerkProvider appearance={{
      baseTheme: dark,
    }}>
      <html lang="en" className='bg-dark-500'>
        <body className={montserrat.className}>{children}</body>
      </html>
    </ClerkProvider>
  )
}

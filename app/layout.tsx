import '@/app/globals.css'

import { Geist } from 'next/font/google'
import { ThemeProvider } from 'next-themes'

import { Providers } from '@/app/providers'
import { cn } from '@/lib/utils'

const geist = Geist({ subsets: ['latin'], variable: '--font-geist-sans' })

export const metadata = {
  title: 'Todo App',
  description: 'A simple todo app built with Next.js and React Query',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn(geist.variable, 'font-sans antialiased')}>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}

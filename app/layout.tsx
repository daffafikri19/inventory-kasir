import { cn } from '@/lib/utils/utils'
import './globals.css'
import type { Metadata } from 'next'
import { Montserrat } from 'next/font/google'
import { Toaster } from '@/components/ui/toaster'

const monserrat = Montserrat({
  subsets: ['latin'],
  weight: '500'
})

export const metadata: Metadata = {
  title: 'Aplikasi Inventory dan Kasir by Teh Solo',
  description: 'Aplikasi Inventory dan Kasir by Teh Solo guys',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="id">
      <body suppressHydrationWarning
        className={cn("min-h-screen", monserrat.className)}>
          {children}
          <Toaster />
      </body>
    </html>
  )
}

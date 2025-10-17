import type { Metadata } from 'next'
import './globals.css'
import LottieBackground from '@/components/LottieBackground'

export const metadata: Metadata = {
  title: 'Portfolio V3',
  description: 'Modern portfolio website with Sanity CMS',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="antialiased">
        <LottieBackground />
        <div style={{position: 'relative', zIndex: 1}}>
          {children}
        </div>
      </body>
    </html>
  )
}


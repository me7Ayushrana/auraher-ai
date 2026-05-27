import type { Metadata, Viewport } from 'next'
import { Poppins } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const poppins = Poppins({ 
  subsets: ["latin"],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-poppins',
})

export const metadata: Metadata = {
  title: 'AuraHer AI - Your AI Wellness Companion',
  description: 'AuraHer AI is your personal AI-powered wellness companion designed for women. Track your mood, cycle, pregnancy, and mental wellness with a beautiful, calming experience.',
  keywords: ['wellness', 'AI', 'women health', 'period tracker', 'mood tracker', 'mental health', 'self-care'],
  authors: [{ name: 'AuraHer AI' }],
  openGraph: {
    title: 'AuraHer AI - Your AI Wellness Companion',
    description: 'Your personal AI-powered wellness companion designed for women.',
    type: 'website',
  },
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#f8e8f0' },
    { media: '(prefers-color-scheme: dark)', color: '#1a1020' },
  ],
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="bg-background">
      <body className={`${poppins.variable} font-sans antialiased`}>
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}

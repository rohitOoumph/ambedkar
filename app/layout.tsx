import type { Metadata } from 'next'
import { Poppins, Lora } from 'next/font/google'
import './globals.css'
import NavigationMenu from '@/components/NavigationMenu'
import AskAmbedkar from '@/components/AskAmbedkar'

const poppins = Poppins({ 
  subsets: ['latin'], 
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-poppins' 
})

const lora = Lora({ 
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-lora' 
})

export const metadata: Metadata = {
  title: 'Dr. B.R. Ambedkar - Architect of Modern India',
  description: 'An interactive journey through the life, mission, and legacy of Dr. Bhimrao Ramji Ambedkar',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${poppins.variable} ${lora.variable} font-sans antialiased`}>
        <NavigationMenu />
        {children}
        <AskAmbedkar />
      </body>
    </html>
  )
}


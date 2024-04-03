import { Inter, Bebas_Neue } from 'next/font/google'
import { Providers } from "@/components/theme-provider"
import './globals.css'
import NavBar from '@/components/navbar'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Стойностна шамандура',
  description: 'Шамандура създадена за опознаване и разичаването на нашите океани',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers
          attribute="class" defaultTheme="dark"
          // enableSystem
          disableTransitionOnChange
        >
          <NavBar />
          {children}
        </Providers>
      </body>
    </html>
  )
}

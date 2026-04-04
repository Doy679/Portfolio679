import type { Metadata } from 'next'
import { Inter, Montserrat, Poppins } from 'next/font/google'
import './globals.css'
import Script from 'next/script'
import '../app/lib/gsap';
import IntroLoader from './components/IntroLoader';
import SmoothScroll from './components/SmoothScroll';

const inter = Inter({ subsets: ['latin'] })
const montserrat = Montserrat({ 
  subsets: ['latin'],
  variable: '--font-montserrat',
  weight: ['400', '500', '600', '700', '800', '900']
})
const poppins = Poppins({
  subsets: ['latin'],
  variable: '--font-poppins',
  weight: ['400', '500', '600', '700']
})

export const metadata: Metadata = {
  title: 'Rondether Gonzales - Portfolio',
  description: 'Personal Portfolio of Rondether Gonzales, showcasing expertise in web development and software engineering.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" data-theme="dark">
      <body className={`${inter.className} ${montserrat.variable} ${poppins.variable} font-sans`}>
        <IntroLoader />
        <SmoothScroll>
          {children}
        </SmoothScroll>

        <Script src="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/js/all.min.js" strategy="lazyOnload" />
      </body>
    </html>
  )
}
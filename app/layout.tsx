import type { Metadata, Viewport } from 'next'
import { Inter, Montserrat, Poppins } from 'next/font/google'
import './globals.css'
import Script from 'next/script'
import CustomCursor from './components/CustomCursor';
import IntroLoader from './components/IntroLoader';

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
  metadataBase: new URL('https://rgonzales.netlify.app/'),
  title: {
    default: 'Rondether Gonzales | Junior Frontend Developer',
    template: '%s | Rondether Gonzales'
  },
  description: 'Aspiring Junior Frontend Developer specializing in React, Next.js, and high-performance web animations. Explore my portfolio of digital solutions.',
  icons: {
    icon: '/Favicon.jpeg',
    shortcut: '/favicon.ico',
    apple: '/Favicon.jpeg',
  },
  keywords: ['Frontend Developer', 'React Developer', 'Web Development', 'Next.js', 'GSAP Animations', 'Portfolio'],
  authors: [{ name: 'Rondether Gonzales' }],
  creator: 'Rondether Gonzales',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://rgonzales.netlify.app/',
    title: 'Rondether Gonzales | Junior Frontend Developer',
    description: 'Explore high-performance digital experiences and web solutions.',
    siteName: 'Rondether Gonzales Portfolio',
    images: [
      {
        url: '/og-image.png', // You should create this image later
        width: 1200,
        height: 630,
        alt: 'Rondether Gonzales Portfolio Preview',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Rondether Gonzales | Junior Frontend Developer',
    description: 'Building the future of the web with React and Next.js.',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5, // Allow zoom for accessibility but keep it stable
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" data-theme="dark" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://cdnjs.cloudflare.com" />
      </head>
      <body className={`${inter.className} ${montserrat.variable} ${poppins.variable} font-sans antialiased w-full relative bg-[#1d232a] text-base-content`}>
        <IntroLoader />
        <CustomCursor />
        <div className="flex flex-col min-h-screen w-full relative">
          {children}
        </div>

        <Script src="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/js/all.min.js" strategy="lazyOnload" />
      </body>
    </html>
  )
}

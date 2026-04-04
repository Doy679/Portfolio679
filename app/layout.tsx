import type { Metadata } from 'next'
import './globals.css'
import Script from 'next/script'
import '../app/lib/gsap';

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
      <body className="font-sans">
        {children}

        <Script src="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/js/all.min.js" strategy="lazyOnload" />
      </body>
    </html>
  )
}
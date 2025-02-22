import { Inter, Montserrat } from 'next/font/google'
import { Analytics } from '@vercel/analytics/react'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import './globals.css'
import { getOrganizationSchema } from '@/lib/schema'
import { ToastProvider } from '@/components/ui/toast'
import { Toaster } from 'sonner'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
  display: 'swap',
})

export const metadata = {
  metadataBase: new URL('https://www.plakordivisiones.es'),
  title: {
    default: 'Plakor Divisiones - Especialistas en Pladur y Reformas en Tarragona',
    template: '%s | Plakor Divisiones - Expertos en Construcción'
  },
  description: 'Empresa líder en instalación de pladur, reformas y construcción en Tarragona. Más de 15 años de experiencia en montaje de tabiques, techos, aislamientos y reformas integrales. Presupuesto sin compromiso.',
  keywords: [
    'pladur Tarragona',
    'reformas integrales',
    'construcción en seco',
    'tabiques divisorios',
    'techos desmontables',
    'aislamientos térmicos',
    'aislamientos acústicos',
    'reformas locales comerciales',
    'reformas viviendas Tarragona',
    'empresa construcción Tarragona'
  ],
  authors: [{ 
    name: 'Plakor Divisiones',
    url: 'https://www.plakordivisiones.es'
  }],
  creator: 'Plakor Divisiones',
  publisher: 'Plakor Divisiones',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: 'https://www.plakordivisiones.es',
    languages: {
      'es-ES': 'https://www.plakordivisiones.es',
    },
  },
  openGraph: {
    title: 'Plakor Divisiones - Especialistas en Pladur y Reformas en Tarragona',
    description: 'Expertos en instalación de pladur y reformas integrales en Tarragona. Más de 15 años transformando espacios con calidad y profesionalidad.',
    url: 'https://www.plakordivisiones.es',
    siteName: 'Plakor Divisiones',
    locale: 'es_ES',
    type: 'website',
    images: [
      {
        url: 'https://www.plakordivisiones.es/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Plakor Divisiones - Especialistas en Pladur y Reformas',
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Plakor Divisiones - Especialistas en Pladur y Reformas',
    description: 'Expertos en instalación de pladur y reformas integrales en Tarragona',
    images: ['https://www.plakordivisiones.es/twitter-image.jpg'],
    creator: '@PlakorDivisiones',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-image-preview': 'large',
      'notranslate': true,
    },
  },
  verification: {
    google: 'your-google-verification-code',
    yandex: 'yandex-verification-code',
    bing: 'bing-verification-code',
  },
  category: 'construction',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html 
      lang="es" 
      className="scroll-smooth"
      suppressHydrationWarning
    >
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        <meta name="theme-color" content="#0369a1" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(getOrganizationSchema()),
          }}
        />
        <link rel="alternate" hrefLang="es-ES" href="https://www.plakordivisiones.es" />
        <meta name="geo.region" content="ES-CT" />
        <meta name="geo.placename" content="Tarragona" />
        <meta name="geo.position" content="41.1054;1.0489" />
        <meta name="ICBM" content="41.1054, 1.0489" />
        <meta name="format-detection" content="telephone=no" />
      </head>
      <body 
        className={`${inter.variable} ${montserrat.variable} font-sans antialiased`}
      >
        <ToastProvider>
          <Header />
          <main id="main-content">
            {children}
          </main>
          <Footer />
          <Analytics />
          <Toaster position="top-right" expand={true} richColors />
        </ToastProvider>
      </body>
    </html>
  )
} 
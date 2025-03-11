import { Inter, Montserrat } from 'next/font/google'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import './globals.css'
import { getOrganizationSchema } from '@/lib/schema'
import { ToastProvider } from '@/components/ui/toast'
import { Toaster } from 'sonner'
import { LoadingScreen } from '@/components/ui/loading-screen'
import { cn } from '@/lib/utils'
import { Metadata } from 'next'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
  preload: true,
  fallback: ['system-ui', 'arial'],
})

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
  display: 'swap',
  preload: true,
  fallback: ['system-ui', 'arial'],
})

export const metadata: Metadata = {
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
      'notranslate': true,
    },
  },
  verification: {
    google: 'your-google-verification-code',
    yandex: 'yandex-verification-code',
    bing: 'bing-verification-code',
  },
  category: 'construction',
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 5,
    userScalable: true,
  },
  themeColor: '#0369a1',
  manifest: '/manifest.json',
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
}

// Конфигурация автоматического скролла при навигации
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html 
      lang="es" 
      className={cn(
        'scroll-smooth',
        inter.variable,
        montserrat.variable
      )}
      suppressHydrationWarning
    >
      <head>
        <link 
          rel="preconnect" 
          href="https://fonts.googleapis.com" 
          crossOrigin="anonymous"
        />
        <link 
          rel="preconnect" 
          href="https://fonts.gstatic.com" 
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          as="image"
          href="/og-image.jpg"
          type="image/jpeg"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5, viewport-fit=cover" />
        <meta name="theme-color" content="#0369a1" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
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
        className={cn(
          'min-h-screen bg-background font-sans antialiased',
          inter.variable,
          montserrat.variable
        )}
      >
        <LoadingScreen />
        <ToastProvider>
          <Header />
          <main id="main-content" className="flex-grow">
            {children}
          </main>
          <Footer />
          <Toaster 
            position="top-right" 
            expand={true} 
            richColors 
            closeButton
            theme="light"
          />
        </ToastProvider>
      </body>
    </html>
  )
} 
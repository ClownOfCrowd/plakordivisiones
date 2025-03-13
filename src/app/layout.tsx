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
import { ScrollReset } from '@/components/layout/scroll-reset'
import { ErrorBoundary } from '@/components/error-boundary'
import { CookieConsent } from '@/components/ui/cookie-consent'

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
    telephone: true,
    email: true,
    address: false,
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
        url: '/logo.svg',
        width: 512,
        height: 512,
        alt: 'Plakor Divisiones Logo'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Plakor Divisiones - Especialistas en Pladur y Reformas',
    description: 'Expertos en instalación de pladur y reformas integrales en Tarragona',
    creator: '@PlakorDivisiones',
    images: ['/logo.svg'],
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
  category: 'construction',
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 2,
    userScalable: true,
    viewportFit: 'cover',
  },
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#000000' }
  ],
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Plakor Divisiones',
  },
  manifest: '/manifest.json',
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon.ico', sizes: 'any' }
    ],
    shortcut: '/favicon.svg',
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }
    ],
    other: [
      {
        rel: 'mask-icon',
        url: '/favicon.svg',
        color: '#2563EB'
      }
    ]
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html 
      lang="es" 
      className={cn(
        inter.variable,
        montserrat.variable,
        'touch-manipulation'
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
        <meta name="google-site-verification" content="your-google-verification-code" />
        <meta name="yandex-verification" content="yandex-verification-code" />
        <link
          rel="preload"
          as="image"
          href="/og-image.jpg"
          type="image/jpeg"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(getOrganizationSchema()),
          }}
        />
        <link 
          rel="preload" 
          href="/fonts/inter-var.woff2" 
          as="font" 
          type="font/woff2" 
          crossOrigin="anonymous" 
        />
        <link 
          rel="dns-prefetch" 
          href="https://fonts.googleapis.com" 
        />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="theme-color" media="(prefers-color-scheme: light)" content="#ffffff" />
        <meta name="theme-color" media="(prefers-color-scheme: dark)" content="#000000" />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body 
        className={cn(
          'min-h-screen bg-background font-sans antialiased overscroll-none',
          inter.variable,
          montserrat.variable
        )}
        suppressHydrationWarning
      >
        <ErrorBoundary>
          <div suppressHydrationWarning>
            <ScrollReset />
            <LoadingScreen>
              <ToastProvider>
                <Header />
                <main id="main-content" className="flex-grow overflow-x-hidden">
                  {children}
                </main>
                <Footer />
                <CookieConsent />
                <Toaster 
                  position="bottom-center"
                  expand={true} 
                  richColors 
                  closeButton
                  theme="light"
                />
              </ToastProvider>
            </LoadingScreen>
          </div>
        </ErrorBoundary>
      </body>
    </html>
  )
} 
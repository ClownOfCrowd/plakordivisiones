export const seoConfig = {
  default: {
    title: 'Plakor Divisiones - Especialistas en Pladur y Reformas',
    description: 'Empresa líder en instalación de pladur, reformas y construcción en Tarragona. Más de 15 años de experiencia en montaje de tabiques, techos y aislamientos.',
    keywords: [
      'pladur',
      'instalación pladur',
      'montaje pladur',
      'reformas',
      'construcción',
      'tabiques',
      'techos desmontables',
      'aislamientos',
      'Tarragona',
      'Catalunya',
      'obra nueva',
      'reformas integrales',
      'tabiques divisorios',
      'trasdosados',
      'techos fijos',
      'aislamientos acústicos',
      'aislamientos térmicos',
      'albañilería',
      'alicatados',
      'fontanería',
      'electricidad'
    ],
    openGraph: {
      type: 'website',
      locale: 'es_ES',
      url: 'https://www.plakordivisiones.es',
      siteName: 'Plakor Divisiones',
      images: [
        {
          url: '/og-image.jpg',
          width: 1200,
          height: 630,
          alt: 'Plakor Divisiones - Especialistas en Pladur y Reformas'
        }
      ]
    },
    twitter: {
      handle: '@plakordivisiones',
      site: '@plakordivisiones',
      cardType: 'summary_large_image'
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1
      }
    },
    alternates: {
      canonical: 'https://www.plakordivisiones.es'
    }
  }
}; 
// Структурированные данные для SEO
export const getOrganizationSchema = () => ({
  "@context": "https://schema.org",
  "@type": "HomeAndConstructionBusiness",
  "name": "Plakor Divisiones",
  "image": "https://www.plakordivisiones.es/logo.png",
  "description": "Especialistas en instalación de pladur, reformas integrales y construcción en Tarragona y Catalunya. Más de 15 años de experiencia.",
  "@id": "https://www.plakordivisiones.es",
  "url": "https://www.plakordivisiones.es",
  "telephone": "+34977350508",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Camí de Sant Joan, 4",
    "addressLocality": "Vinyols i els Arcs",
    "postalCode": "43391",
    "addressRegion": "Tarragona",
    "addressCountry": "ES"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 41.1054,
    "longitude": 1.0489
  },
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      "opens": "08:00",
      "closes": "19:00"
    }
  ],
  "sameAs": [
    "https://www.facebook.com/share/15Z69wo3CD/",
    "https://www.instagram.com/constructora_plakor_divisiones"
  ],
  "priceRange": "€€",
  "areaServed": ["Tarragona", "Catalunya"],
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Servicios de construcción",
    "itemListElement": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Instalación de Pladur",
          "description": "Montaje profesional de tabiques, techos y trasdosados en pladur"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Reformas Integrales",
          "description": "Servicios completos de reforma y rehabilitación"
        }
      }
    ]
  }
});

export function getFaqSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "¿Cuánto cuesta una reforma completa en Tarragona?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "El coste depende de varios factores como el tamaño del espacio, materiales seleccionados y complejidad del proyecto. Ofrecemos presupuestos personalizados sin compromiso, incluyendo materiales de primera calidad y mano de obra profesional. Contacta con nosotros para una evaluación gratuita de tu proyecto."
        }
      },
      {
        "@type": "Question",
        "name": "¿Por qué elegir Pladur para la construcción en seco?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "El Pladur ofrece múltiples ventajas: excelente aislamiento térmico y acústico, instalación más rápida que materiales tradicionales, acabado perfecto, ideal para ocultar instalaciones, versatilidad en diseños, y mejor relación calidad-precio. Además, es un material sostenible y permite reformas más limpias."
        }
      },
      {
        "@type": "Question",
        "name": "¿Cuál es el plazo medio de una reforma integral en Tarragona?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Los plazos varían según el proyecto. Una reforma básica puede completarse en 2-3 semanas, mientras que una reforma integral puede llevar 2-3 meses. Proporcionamos un cronograma detallado antes de comenzar, incluyendo todas las fases: demolición, instalaciones, acabados y limpieza final."
        }
      },
      {
        "@type": "Question",
        "name": "¿Qué garantía ofrecen en sus trabajos de construcción y reforma?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Todos nuestros trabajos cuentan con una garantía de 5 años en instalación. Utilizamos materiales de primera calidad de marcas líderes y trabajamos con profesionales cualificados. Además, ofrecemos servicio post-venta y mantenimiento para asegurar la durabilidad de nuestros trabajos."
        }
      },
      {
        "@type": "Question",
        "name": "¿Gestionan los permisos necesarios para obras en Tarragona?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Sí, nos encargamos de toda la gestión administrativa y permisos necesarios para tu proyecto en Tarragona. Trabajamos con arquitectos y aparejadores para asegurar el cumplimiento de toda la normativa local y garantizar que tu proyecto cumpla con todos los requisitos legales."
        }
      }
    ]
  };
} 
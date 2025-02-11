import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title: string;
  description: string;
  image?: string;
  url?: string;
  type?: string;
  keywords?: string;
  openGraph?: {
    locality?: string;
    region?: string;
    phoneNumbers?: string[];
    emails?: string[];
  };
}

/**
 * SEO component for managing meta tags
 * Implements OpenGraph and Twitter card tags
 */
export const SEO = ({ 
  title, 
  description, 
  image = '/images/og-image.jpg',
  url = 'https://plakordivisiones.es',
  type = 'website',
  keywords,
  openGraph
}: SEOProps) => {
  // Добавляем название компании, если его нет в заголовке
  const fullTitle = title.includes('Plakor Divisiones') 
    ? title 
    : `${title} | Plakor Divisiones`;

  return (
    <Helmet>
      {/* Basic meta tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <link rel="canonical" href={url} />

      {/* OpenGraph tags */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content={type} />

      {/* Twitter Card tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* Additional SEO tags */}
      <meta name="robots" content="index, follow" />
      <meta name="googlebot" content="index, follow" />
      <meta name="theme-color" content="#0891b2" />
      
      {/* Structured data for local business */}
      <script type="application/ld+json">
        {`
          {
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "name": "Plakor Divisiones",
            "image": "${image}",
            "description": "${description}",
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
              "latitude": 41.0788,
              "longitude": 1.0603
            },
            "url": "https://plakordivisiones.es",
            "telephone": "+34977350508"
          }
        `}
      </script>

      {/* Добавляем локальные бизнес-теги если они есть */}
      {openGraph?.locality && (
        <meta property="business:locality" content={openGraph.locality} />
      )}
      {openGraph?.region && (
        <meta property="business:region" content={openGraph.region} />
      )}
      
      {/* Добавляем контактную информацию если она есть */}
      {openGraph?.phoneNumbers?.map(phone => (
        <meta key={phone} property="business:contact_data:phone_number" content={phone} />
      ))}
      {openGraph?.emails?.map(email => (
        <meta key={email} property="business:contact_data:email" content={email} />
      ))}
    </Helmet>
  );
};

export default SEO; 
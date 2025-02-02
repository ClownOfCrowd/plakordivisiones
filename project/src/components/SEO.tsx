import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
}

const SEO = ({ 
  title = 'Plakor Divisiones - Expertos en Pladur',
  description = 'Expertos en construcción en seco, reformas y remodelaciones. Servicios profesionales de pladur en Tarragona.',
  keywords = 'pladur, construcción, reformas, Tarragona, aislamientos, tabiques',
  image = '/images/og-image.jpg',
  url = 'https://plakordivisiones.es'
}: SEOProps) => {
  return (
    <Helmet>
      {/* Основные мета-теги */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />

      {/* Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content="website" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* Локализация */}
      <meta property="og:locale" content="es_ES" />
      <link rel="canonical" href={url} />

      {/* Дополнительные мета-теги */}
      <meta name="robots" content="index, follow" />
      <meta name="googlebot" content="index, follow" />
      <meta name="format-detection" content="telephone=no" />
    </Helmet>
  );
};

export default SEO; 
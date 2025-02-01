import { Helmet } from 'react-helmet';

const SEO = () => {
  return (
    <Helmet>
      <html lang="es" />
      <title>Servicios de Pladur y Reformas en [Ciudad] | [Nombre Empresa]</title>
      <meta name="description" content="Especialistas en instalación de pladur, reformas integrales, techos y tabiques. Servicios profesionales de construcción en [Ciudad]." />
      <meta name="keywords" content="pladur, reforma integral, techos de pladur, tabiques, construcción, [Ciudad]" />
      
      {/* Структурированные данные */}
      <script type="application/ld+json">
        {`
          {
            "@context": "https://schema.org",
            "@type": "ConstructionBusiness",
            "name": "[Nombre Empresa]",
            "description": "Servicios profesionales de pladur y reformas",
            "areaServed": "[Ciudad]",
            "priceRange": "€€"
          }
        `}
      </script>
    </Helmet>
  );
}; 
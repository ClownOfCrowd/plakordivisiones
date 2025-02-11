import SEO from '../components/SEO';
import { motion } from 'framer-motion';

/**
 * Contact page component
 * Provides multiple contact methods and form
 */
const Contact = () => {
  return (
    <>
      <SEO 
        title="Contacto y Presupuestos Gratuitos | Plakor Divisiones"
        description="¿Necesita una reforma o construcción en Tarragona? Contacte con Plakor Divisiones para un presupuesto sin compromiso. Expertos en pladur, reformas integrales y construcción."
        keywords="contacto Plakor, reformas Tarragona, presupuesto construcción, empresa pladur, reformas integrales, contactar constructor"
        type="website"
        openGraph={{
          locality: "Tarragona",
          region: "Cataluña",
          phoneNumbers: ["+34 977 35 05 08"],
          emails: ["plakordivisiones@hotmail.com"]
        }}
      />
      <div className="container mx-auto px-4 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold mb-4">¿Necesita una Reforma o Construcción?</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Contáctenos hoy mismo para discutir su proyecto y obtener un presupuesto personalizado sin compromiso
          </p>
        </motion.div>
        {/* ... rest of the content ... */}
      </div>
    </>
  );
};

export default Contact; 
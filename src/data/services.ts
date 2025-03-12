import { 
  Layers, 
  Home, 
  Shield, 
  Wrench, 
  Paintbrush 
} from 'lucide-react';

export const servicesData = [
  {
    id: 1,
    title: "Construcción en Seco",
    description: "Soluciones modernas y eficientes en sistemas de construcción en seco, incluyendo montajes de Pladur y tabiques divisorios.",
    shortDescription: "Soluciones modernas y eficientes en sistemas de construcción en seco.",
    image: "/images/services/construccion-seco.jpg",
    icon: Layers,
    features: [
      "Montajes de Pladur",
      "Tabiques divisorios",
      "Techos fijos y desmontables",
      "Trasdosados",
      "Sistemas acústicos",
      "Acabados de alta calidad"
    ],
    longDescription: "Nuestro servicio de construcción en seco ofrece soluciones modernas y eficientes para todo tipo de espacios. Utilizamos materiales de primera calidad y técnicas avanzadas para garantizar resultados duraderos y estéticamente atractivos.",
    benefits: [
      "Mayor rapidez de ejecución",
      "Excelente aislamiento térmico y acústico",
      "Versatilidad en diseño",
      "Limpieza en obra",
      "Ahorro en costes",
      "Sostenibilidad ambiental"
    ],
    process: [
      {
        title: "Evaluación inicial",
        description: "Analizamos sus necesidades y el espacio disponible para proponer la mejor solución."
      },
      {
        title: "Planificación detallada",
        description: "Desarrollamos un plan de trabajo preciso y un cronograma de ejecución."
      },
      {
        title: "Ejecución profesional",
        description: "Realizamos la instalación con personal cualificado y materiales de primera calidad."
      },
      {
        title: "Control de calidad",
        description: "Supervisamos cada etapa para garantizar un acabado perfecto."
      }
    ]
  },
  {
    id: 2,
    title: "Reformas y Remodelaciones",
    description: "Transformamos espacios con reformas integrales y remodelaciones personalizadas para hogares y negocios.",
    shortDescription: "Transformamos espacios con reformas integrales y remodelaciones personalizadas.",
    image: "/images/services/reformas.jpg",
    icon: Home,
    features: [
      "Reformas integrales",
      "Remodelaciones de cocinas y baños",
      "Renovación de espacios comerciales",
      "Ampliaciones",
      "Rehabilitación de edificios",
      "Acabados personalizados"
    ],
    longDescription: "Ofrecemos servicios completos de reforma y remodelación, adaptándonos a sus necesidades y presupuesto. Nos especializamos en transformar espacios antiguos en modernos y funcionales, manteniendo la esencia del lugar.",
    benefits: [
      "Aumento del valor de la propiedad",
      "Mejora de la funcionalidad",
      "Actualización estética",
      "Optimización de espacios",
      "Eficiencia energética",
      "Garantía de calidad"
    ],
    process: [
      {
        title: "Consulta inicial",
        description: "Escuchamos sus ideas y evaluamos el espacio a reformar."
      },
      {
        title: "Diseño y presupuesto",
        description: "Creamos una propuesta detallada con opciones y costes."
      },
      {
        title: "Gestión de permisos",
        description: "Nos encargamos de toda la documentación necesaria."
      },
      {
        title: "Ejecución y seguimiento",
        description: "Realizamos la obra con supervisión constante y comunicación fluida."
      }
    ]
  },
  {
    id: 3,
    title: "Aislamientos",
    description: "Soluciones profesionales de aislamiento térmico y acústico para mejorar el confort y la eficiencia energética.",
    shortDescription: "Soluciones profesionales de aislamiento térmico y acústico.",
    image: "/images/services/aislamientos.jpg",
    icon: Shield,
    features: [
      "Aislamiento térmico",
      "Aislamiento acústico",
      "Impermeabilización",
      "Sistemas SATE",
      "Corrección acústica",
      "Ahorro energético"
    ],
    longDescription: "Implementamos soluciones de aislamiento avanzadas para mejorar el confort y la eficiencia energética de su espacio. Utilizamos materiales de última generación y técnicas probadas para garantizar resultados óptimos.",
    benefits: [
      "Reducción de costes energéticos",
      "Mayor confort térmico",
      "Mejor aislamiento acústico",
      "Prevención de humedades",
      "Sostenibilidad ambiental",
      "Durabilidad garantizada"
    ],
    process: [
      {
        title: "Diagnóstico técnico",
        description: "Evaluamos las necesidades específicas de aislamiento."
      },
      {
        title: "Propuesta de soluciones",
        description: "Recomendamos los sistemas más adecuados."
      },
      {
        title: "Instalación profesional",
        description: "Aplicamos los sistemas seleccionados con precisión."
      },
      {
        title: "Verificación de resultados",
        description: "Comprobamos la efectividad del aislamiento instalado."
      }
    ]
  },
  {
    id: 4,
    title: "Instalaciones",
    description: "Instalaciones completas y actualizaciones de sistemas eléctricos, fontanería, climatización y más.",
    shortDescription: "Instalaciones completas y actualizaciones de sistemas.",
    image: "/images/services/instalaciones.jpg",
    icon: Wrench,
    features: [
      "Instalaciones eléctricas",
      "Fontanería",
      "Climatización",
      "Ventilación",
      "Sistemas de seguridad",
      "Domótica"
    ],
    longDescription: "Realizamos todo tipo de instalaciones y actualizaciones para su hogar o negocio. Nuestro equipo de profesionales garantiza instalaciones seguras y eficientes, cumpliendo con todas las normativas vigentes.",
    benefits: [
      "Seguridad garantizada",
      "Eficiencia energética",
      "Cumplimiento normativo",
      "Modernización de sistemas",
      "Mantenimiento preventivo",
      "Servicio post-instalación"
    ],
    process: [
      {
        title: "Evaluación técnica",
        description: "Analizamos sus necesidades y el estado actual de las instalaciones."
      },
      {
        title: "Diseño de sistemas",
        description: "Planificamos las instalaciones según normativas y necesidades."
      },
      {
        title: "Ejecución especializada",
        description: "Realizamos las instalaciones con personal cualificado."
      },
      {
        title: "Certificación y garantías",
        description: "Entregamos toda la documentación y certificados necesarios."
      }
    ]
  },
  {
    id: 5,
    title: "Acabados y Decoración",
    description: "Servicios especializados en acabados de alta calidad y soluciones decorativas personalizadas.",
    shortDescription: "Acabados de alta calidad y soluciones decorativas personalizadas.",
    image: "/images/services/acabados.jpg",
    icon: Paintbrush,
    features: [
      "Pintura decorativa",
      "Revestimientos",
      "Pavimentos",
      "Carpintería",
      "Iluminación",
      "Mobiliario a medida"
    ],
    longDescription: "Damos vida a sus espacios con acabados de alta calidad y soluciones decorativas personalizadas. Combinamos funcionalidad y estética para crear ambientes únicos y acogedores.",
    benefits: [
      "Acabados personalizados",
      "Materiales de calidad",
      "Diseño exclusivo",
      "Durabilidad",
      "Facilidad de mantenimiento",
      "Asesoramiento experto"
    ],
    process: [
      {
        title: "Consulta de diseño",
        description: "Definimos el estilo y las preferencias del cliente."
      },
      {
        title: "Selección de materiales",
        description: "Escogemos los mejores materiales y acabados."
      },
      {
        title: "Aplicación profesional",
        description: "Ejecutamos los trabajos con precisión y cuidado."
      },
      {
        title: "Detalles finales",
        description: "Cuidamos cada detalle para un acabado perfecto."
      }
    ]
  }
]; 
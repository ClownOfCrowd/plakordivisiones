export async function submitContactForm(data: {
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
  requestStatus: string;
}) {
  console.log('Contact form submitted:', data);
  return { success: true };
}

export async function submitReview(data: {
  name: string;
  rating: number;
  comment: string;
  service: string;
}) {
  console.log('Review submitted:', data);
  return { success: true };
}

export async function getReviews() {
  return {
    data: [
      {
        id: 1,
        attributes: {
          name: "Juan García",
          rating: 5,
          comment: "Excelente trabajo con la instalación de pladur. El equipo fue muy profesional y limpio.",
          service: "Instalación de Pladur",
          createdAt: "2024-01-15"
        }
      },
      {
        id: 2,
        attributes: {
          name: "María López",
          rating: 5,
          comment: "La reforma quedó perfecta, muy contentos con el resultado final.",
          service: "Reforma Integral",
          createdAt: "2024-01-10"
        }
      }
    ],
    meta: {
      pagination: {
        page: 1,
        pageSize: 10,
        pageCount: 1,
        total: 2
      }
    }
  };
}

export async function getServices() {
  return {
    data: [
      {
        id: 1,
        attributes: {
          title: "Construcción en Seco",
          description: "Servicios profesionales de instalación de pladur y sistemas de construcción en seco.",
          slug: "construccion-seco"
        }
      },
      {
        id: 2,
        attributes: {
          title: "Reformas y Remodelaciones",
          description: "Servicios integrales de reforma y remodelación para espacios residenciales y comerciales.",
          slug: "reformas-remodelaciones"
        }
      }
    ]
  };
}

export async function getProjects() {
  return {
    data: [
      {
        id: 1,
        attributes: {
          title: "Reforma Integral Apartamento",
          description: "Reforma completa de apartamento en el centro de Madrid",
          images: {
            data: []
          }
        }
      }
    ]
  };
}

export async function getServiceCategories() {
  return {
    data: [
      {
        id: 1,
        attributes: {
          name: "Residencial",
          services: {
            data: []
          }
        }
      }
    ]
  };
}

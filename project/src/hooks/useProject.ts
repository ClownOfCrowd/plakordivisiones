import { useState, useEffect } from 'react';
import { api } from '../lib/api';

interface Project {
  title: string;
  description: string;
  image: string;
  slug: string;
}

export const useProject = (slug: string | undefined) => {
  const [project, setProject] = useState<Project>({
    title: 'Proyecto',
    description: 'Detalles del proyecto de construcción y reforma',
    image: '/default-project-image.jpg',
    slug: ''
  });

  useEffect(() => {
    const fetchProject = async () => {
      if (!slug) return;
      
      try {
        const data = await api.projects.getBySlug(slug);
        if (data) {
          setProject({
            title: data.attributes.title,
            description: data.attributes.description || 'Detalles del proyecto de construcción y reforma',
            image: data.attributes.images?.data?.[0]?.attributes?.url || '/default-project-image.jpg',
            slug: data.attributes.slug
          });
        }
      } catch (error) {
        console.error('Error fetching project:', error);
      }
    };

    fetchProject();
  }, [slug]);

  return project;
}; 
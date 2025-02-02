import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useProject } from '../hooks/useProject';
import SEO from '../components/SEO';
import { logProjectView } from '../lib/analytics';

const ProjectDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const project = useProject(slug);

  useEffect(() => {
    if (project.title) {
      logProjectView(project.title);
    }
  }, [project.title]);

  if (!project) {
    return <div>Cargando...</div>;
  }

  return (
    <div>
      <SEO 
        title={`${project.title} - Plakor Divisiones`}
        description={project.description}
        image={project.image}
        url={`https://plakordivisiones.es/proyectos/${project.slug}`}
      />
      {/* ... существующий код ... */}
    </div>
  );
};

export default ProjectDetail; 
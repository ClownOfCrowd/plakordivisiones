import { writeFileSync } from 'fs';
import { resolve } from 'path';

const SITE_URL = 'https://plakordivisiones.es';

const pages = [
  '',
  '/servicios',
  '/proyectos',
  '/contacto',
  '/sobre-nosotros'
];

const generateSitemap = () => {
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${pages
    .map(page => `
    <url>
      <loc>${SITE_URL}${page}</loc>
      <lastmod>${new Date().toISOString()}</lastmod>
      <changefreq>weekly</changefreq>
      <priority>${page === '' ? '1.0' : '0.8'}</priority>
    </url>
  `).join('')}
</urlset>`;

  writeFileSync(resolve(process.cwd(), 'dist', 'sitemap.xml'), sitemap);
  console.log('✅ Sitemap generated successfully');
};

generateSitemap(); 
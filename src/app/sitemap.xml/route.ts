import { NextResponse } from 'next/server';

export async function GET() {
  const baseUrl = 'https://www.plakordivisiones.es';
  const today = new Date().toISOString().split('T')[0];

  const routes = [
    {
      loc: baseUrl,
      lastmod: today,
      changefreq: 'weekly',
      priority: '1.0'
    },
    {
      loc: `${baseUrl}/servicios`,
      lastmod: today,
      changefreq: 'weekly',
      priority: '0.9'
    },
    {
      loc: `${baseUrl}/proyectos`,
      lastmod: today,
      changefreq: 'weekly',
      priority: '0.8'
    },
    {
      loc: `${baseUrl}/resenas`,
      lastmod: today,
      changefreq: 'weekly',
      priority: '0.7'
    },
    {
      loc: `${baseUrl}/contacto`,
      lastmod: today,
      changefreq: 'monthly',
      priority: '0.7'
    },
    {
      loc: `${baseUrl}/faq`,
      lastmod: today,
      changefreq: 'monthly',
      priority: '0.6'
    }
  ];

  const urlElements = routes.map(route => 
    `  <url>
    <loc>${route.loc}</loc>
    <lastmod>${route.lastmod}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
  </url>`
  ).join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlElements}
</urlset>`;

  return new NextResponse(xml, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600'
    }
  });
} 
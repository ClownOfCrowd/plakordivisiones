import lighthouse from 'lighthouse';
import chromeLauncher from 'chrome-launcher';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const urls = [
  'https://www.plakordivisiones.es',
  'https://www.plakordivisiones.es/servicios',
  'https://www.plakordivisiones.es/proyectos',
  'https://www.plakordivisiones.es/contacto'
];

const options = {
  logLevel: 'info',
  output: 'html',
  onlyCategories: ['performance', 'accessibility', 'best-practices', 'seo'],
  formFactor: 'desktop',
  throttling: {
    rttMs: 40,
    throughputKbps: 10240,
    cpuSlowdownMultiplier: 1,
  },
};

async function runLighthouse(url, opts, config = null) {
  const chrome = await chromeLauncher.launch({ chromeFlags: ['--headless'] });
  opts.port = chrome.port;

  try {
    const results = await lighthouse(url, opts, config);
    const reportHtml = results.report;
    
    // Создаем директорию для отчетов, если она не существует
    const reportsDir = path.join(__dirname, '../reports');
    if (!fs.existsSync(reportsDir)) {
      fs.mkdirSync(reportsDir);
    }

    // Сохраняем отчет
    const fileName = `lighthouse-${new URL(url).pathname.replace(/\//g, '-') || 'home'}-${Date.now()}.html`;
    fs.writeFileSync(path.join(reportsDir, fileName), reportHtml);

    console.log(`Report for ${url}:`);
    console.log('Performance:', results.lhr.categories.performance.score * 100);
    console.log('Accessibility:', results.lhr.categories.accessibility.score * 100);
    console.log('Best Practices:', results.lhr.categories['best-practices'].score * 100);
    console.log('SEO:', results.lhr.categories.seo.score * 100);
    console.log('Report saved:', fileName);
    console.log('-------------------');

  } catch (error) {
    console.error(`Error testing ${url}:`, error);
  }

  await chrome.kill();
}

async function runAllTests() {
  console.log('Starting performance tests...');
  
  for (const url of urls) {
    await runLighthouse(url, options);
  }
  
  console.log('All tests completed!');
}

runAllTests(); 
const { analyze } = require('source-map-explorer');
const path = require('path');

async function analyzeBuild() {
  const result = await analyze(
    'dist/**/*.js',
    {
      output: { format: 'html', filename: './bundle-analysis.html' },
      gzip: true
    }
  );
  
  console.log('Bundle analysis complete. Check bundle-analysis.html');
}

analyzeBuild(); 
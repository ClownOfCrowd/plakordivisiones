import { useEffect } from 'react';

const FontLoader = () => {
  useEffect(() => {
    // Загрузка основного шрифта
    const fontMain = new FontFace(
      'Inter',
      'url(/fonts/inter-var.woff2) format("woff2-variations")',
      { weight: '100 900' }
    );

    // Загрузка жирного начертания
    const fontBold = new FontFace(
      'Inter',
      'url(/fonts/inter-bold.woff2) format("woff2")',
      { weight: '700' }
    );

    Promise.all([fontMain.load(), fontBold.load()])
      .then(fonts => {
        fonts.forEach(font => {
          document.fonts.add(font);
        });
      })
      .catch(err => console.error('Error loading fonts:', err));
  }, []);

  return null;
};

export default FontLoader; 
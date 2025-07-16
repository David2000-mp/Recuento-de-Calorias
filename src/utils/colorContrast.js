// Calcula la luminancia relativa de un color según la fórmula WCAG.
function getLuminance(hex) {
  let color = hex.replace('#', '');
  if (color.length === 3) {
    color = color.split('').map(x => x + x).join('');
  }

  const r = parseInt(color.substr(0, 2), 16);
  const g = parseInt(color.substr(2, 2), 16);
  const b = parseInt(color.substr(4, 2), 16);

  const srgb = [r, g, b].map(val => {
    const s = val / 255;
    return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
  });

  return srgb[0] * 0.2126 + srgb[1] * 0.7152 + srgb[2] * 0.0722;
}

// Devuelve el color de texto (blanco o negro) que proporciona el mejor contraste.
export function getContrastColor(bgHex) {
  const bgLuminance = getLuminance(bgHex);
  
  // Luminancia del blanco y negro
  const whiteLuminance = 1; 
  const blackLuminance = 0;

  // Calcula el contraste con blanco y negro
  const contrastWithWhite = (whiteLuminance + 0.05) / (bgLuminance + 0.05);
  const contrastWithBlack = (bgLuminance + 0.05) / (blackLuminance + 0.05);
  
  // Devuelve el color que tenga mayor ratio de contraste
  return contrastWithWhite > contrastWithBlack ? '#FFFFFF' : '#000000';
}

// Devuelve true si el contraste entre dos colores es bajo.
export function isLowContrast(bgHex, textHex) {
  const lum1 = getLuminance(bgHex);
  const lum2 = getLuminance(textHex);

  const lighterLum = Math.max(lum1, lum2);
  const darkerLum = Math.min(lum1, lum2);
  
  const contrastRatio = (lighterLum + 0.05) / (darkerLum + 0.05);

  // Un ratio menor a 4.5 es considerado bajo para texto de tamaño normal.
  return contrastRatio < 4.5;
} 
export const calcColorContrast = (hex?: string) => {
  if (!hex) {
    return '#000000';
  }
  const [r, g, b] = hexToRGB(hex);
  const yiq = (r * 299 + g * 587 + b * 114) / 1000;
  console.log(r, g, b);
  return yiq >= 140
    ? 'rgb(0,0,0)'
    : 'rgb(255,255,255)'
}

const hexToRGB = (H: string): [number, number, number] => {
  // Convert hex to RGB first
  let r = 0, g = 0, b = 0;
  if (H.length === 4) {
    r = Number("0x" + H[1] + H[1]);
    g = Number("0x" + H[2] + H[2]);
    b = Number("0x" + H[3] + H[3]);
  } else if (H.length === 7) {
    r = Number("0x" + H[1] + H[2]);
    g = Number("0x" + H[3] + H[4]);
    b = Number("0x" + H[5] + H[6]);
  }
  return [r, g, b];
}
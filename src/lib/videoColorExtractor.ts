/**
 * Utility to extract dominant color from video frames
 */

export interface ColorRGB {
  r: number;
  g: number;
  b: number;
}

export interface ColorHSL {
  h: number;
  s: number;
  l: number;
}

/**
 * Convert RGB to HSL
 */
function rgbToHsl(r: number, g: number, b: number): ColorHSL {
  r /= 255;
  g /= 255;
  b /= 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }
    h /= 6;
  }

  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    l: Math.round(l * 100)
  };
}

/**
 * Extract dominant color from video element
 */
export async function extractDominantColor(videoElement: HTMLVideoElement): Promise<ColorRGB> {
  return new Promise((resolve, reject) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    if (!ctx) {
      reject(new Error('Could not get canvas context'));
      return;
    }

    // Set canvas size to match video
    canvas.width = videoElement.videoWidth || 320;
    canvas.height = videoElement.videoHeight || 240;

    // Draw current video frame to canvas
    ctx.drawImage(videoElement, 0, 0, canvas.width, canvas.height);

    // Get image data
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;

    // Sample pixels (every 10th pixel for performance)
    const colorCounts: { [key: string]: number } = {};
    const sampleRate = 10;

    for (let i = 0; i < data.length; i += 4 * sampleRate) {
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];
      
      // Skip very dark or very light pixels
      const brightness = (r + g + b) / 3;
      if (brightness < 30 || brightness > 225) continue;

      // Quantize colors to reduce noise
      const quantizedR = Math.round(r / 16) * 16;
      const quantizedG = Math.round(g / 16) * 16;
      const quantizedB = Math.round(b / 16) * 16;
      
      const colorKey = `${quantizedR},${quantizedG},${quantizedB}`;
      colorCounts[colorKey] = (colorCounts[colorKey] || 0) + 1;
    }

    // Find the most common color
    let maxCount = 0;
    let dominantColor = { r: 0, g: 0, b: 0 };

    for (const [colorKey, count] of Object.entries(colorCounts)) {
      if (count > maxCount) {
        maxCount = count;
        const [r, g, b] = colorKey.split(',').map(Number);
        dominantColor = { r, g, b };
      }
    }

    resolve(dominantColor);
  });
}

/**
 * Convert RGB color to CSS string
 */
export function rgbToCss(rgb: ColorRGB): string {
  return `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;
}

/**
 * Convert RGB color to HSL CSS string
 */
export function rgbToHslCss(rgb: ColorRGB): string {
  const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
  return `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`;
}

/**
 * Create a gradient background from a base color
 */
export function createGradientFromColor(rgb: ColorRGB): string {
  const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
  
  // Create variations of the color for gradient
  const lighter = `hsl(${hsl.h}, ${Math.max(0, hsl.s - 20)}%, ${Math.min(100, hsl.l + 15)}%)`;
  const darker = `hsl(${hsl.h}, ${Math.min(100, hsl.s + 20)}%, ${Math.max(0, hsl.l - 15)}%)`;
  
  return `linear-gradient(135deg, ${lighter}, ${darker})`;
}

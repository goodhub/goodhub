import WebFont from "webfontloader";
import { suspend } from "suspend-react";
import { useEffect } from "react";

export const useFont = (fonts: (string | undefined)[], suspend: boolean = false) => {
  const cleanFonts = fonts.filter(Boolean) as string[];
  if (suspend) return useSuspendFont(cleanFonts);
  return useFontAsync(cleanFonts);
}

export const useSuspendFont = (fonts: string[] = []) => {
  suspend(() => {
    return new Promise<void>((resolve, reject) => {
      if (fonts.length === 0) return;
      WebFont.load({
        google: {
          families: fonts,
        },
        active: () => {
          resolve();
        },
        fontinactive: () => {
          reject()
        }
      });
    });
  }, fonts);
  return { fontFamily: fonts.map(f => `"${f}"`).join(', ') };
};

export const useFontAsync = (fonts: string[] = []) => {
  useEffect(() => {
    if (fonts.length === 0) return;
    WebFont.load({
      google: {
        families: fonts,
      }
    });
    
  }, [fonts]);
  return { fontFamily: fonts.map(f => `"${f}"`).join(', ') };
}
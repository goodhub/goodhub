import { useState, useEffect, FC, useLayoutEffect }  from 'react';
import { useMeasure } from 'react-use';

interface TextProps {
  vertical?: boolean,
  minFontSize?: number,
  maxFontSize?: number
  children: string
}
 
const Text: FC<TextProps> = ({ children, vertical = false, minFontSize = 0, maxFontSize = 100 }) => {

  const [container, containerMeasurements] = useMeasure<HTMLDivElement>();
  const [text, textMeasurements] = useMeasure<HTMLSpanElement>();
  const [fontSize, setFontSize] = useState<number>(maxFontSize);

  useLayoutEffect(() => {
    // If the text is taller than the container, reduce the size by 10%
    if (textMeasurements.height >= containerMeasurements.height) {
      setFontSize(fontSize - (fontSize / 10))
    }

    // If the text is smaller than the 60% of container's height (to stop rubber banding), increase the size by 10%
    if (textMeasurements.height <= containerMeasurements.height * 0.6) {
      setFontSize(fontSize + (fontSize / 10))
    }
  }, [containerMeasurements, textMeasurements, setFontSize, maxFontSize, minFontSize])

  return <div ref={container} style={{ flexGrow: 1, display: 'flex', alignItems: 'center', width: '100%', overflow: 'hidden' }}>
    <span ref={text} style={{ fontSize: `${fontSize}rem`, width: '100%', whiteSpace: 'normal' }}>{ children }</span>
  </div>
}
export default Text;
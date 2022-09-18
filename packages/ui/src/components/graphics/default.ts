import type { Configuration } from "."
import { getRandomPattern } from "./components/Backgrounds"

export interface GraphicParams {
  backgroundColor: string
  backgroundStyle?: string
  backgroundPattern?: string
  primaryFont?: string
  secondaryFont?: string
  backgroundImage?: string
  logo?: string
}

export const defaultConfiguration: Configuration<GraphicParams> = {
  backgroundColor: { type: 'string', optional: true, default: 'red' },
  backgroundImage: { type: 'string', optional: true },
  primaryFont: { type: 'string', optional: true, default: 'Josefin Sans' },
  secondaryFont: { type: 'string', optional: true, default: 'Lato' },
  backgroundStyle: { type: 'string', optional: true },
  backgroundPattern: { type: 'string', optional: true, default: getRandomPattern() },
  logo: { type: 'string', optional: true }
}

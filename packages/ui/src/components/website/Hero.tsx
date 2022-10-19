import { IWebsiteHero, IWebsiteHeroStyle } from '../../../../shared';
import { CSSProperties, FC } from 'react';
import BackgroundImage from '../generic/BackgroundImage';
import Button, { ButtonStyle } from '../generic/Button';

interface HeroProps {
  hero: IWebsiteHero
}

interface Style {
  text?: [string?, CSSProperties?]
  background?: [string?, CSSProperties?]
  picture?: [string?, CSSProperties?],
  button?: ButtonStyle
  title?: string
}

const getStylesForHeroPosition = (heroStyle?: IWebsiteHeroStyle): Style => {
  switch (heroStyle?.position) {
    default:
    case 'center':
      return {
        text: ['m-auto items-center text-center', {}]
      }

    case 'leading':
      return {
        title: 'sm:text-5xl text-4xl font-bold',
        text: ['h-full w-full md:w-1/2 justify-center items-center md:items-start text-center md:text-left']
      }

    case 'trailing':
      return {
        title: 'sm:text-5xl text-4xl font-bold',
        text: ['h-full w-full md:w-1/2 right-0 absolute justify-center items-center md:items-end text-center md:text-right']
      }
    }
}

const getStylesForHeroStyle = (heroStyle?: IWebsiteHeroStyle): Style => {
  switch (heroStyle?.style) {
    default:
    case 'tinted':
      return {
        background: ['bg-primary-700'],
        picture: ['', { filter: 'grayscale(1)', mixBlendMode: 'multiply' }],
        text: ['text-white']
      }
    case 'greyscale':
      return {
        background: ['bg-gray-800'],
        picture: ['opacity-75', { filter: 'grayscale(1)' }],
        text: ['text-white'],
        button: 'plain'
      }
    
    case 'light':
      return {
        background: ['bg-white'],
        picture: ['opacity-25'],
        text: ['text-gray-900'],
        button: 'plain'
      }

    case 'dark':
      return {
        background: ['bg-black'],
        picture: ['opacity-25'],
        text: ['text-white'],
        button: 'plain'
      }
  
  }
}

const mix = (a: [string?, CSSProperties?] = [], b: [string?, CSSProperties?] = []): [string?, CSSProperties?] => {
  const className = `${a[0] ? a[0] : ''} ${b[0] ? b[0] : ''}`;
  return [className, {...a[1], ...b[1]}]
}

const Hero: FC<HeroProps> = ({ hero }) => {
  const heroStyle = getStylesForHeroStyle(hero.style);
  const heroPosition = getStylesForHeroPosition(hero.style);

  const [className, style] = mix(heroStyle.text, heroPosition.text);

  return <div className="flex flex-col h-96 bg-white overflow-hidden relative">
    { hero.image ? <BackgroundImage pictureStyle={mix(heroStyle.picture, heroPosition.picture)} backgroundStyle={mix(heroStyle.background, heroPosition.background)} image={hero.image}>
      <div className="flex m-auto max-w-6xl w-full h-full">
        <div className={`flex flex-col px-3.5 sm:px-8 lg:px-8 ${className}`} style={{...style}}>
          <h1 className={heroPosition.title ? heroPosition.title : 'sm:text-6xl text-5xl font-bold'}>{hero.title}</h1>
          <h2 className="sm:text-2xl text-xl">{hero.subtitle}</h2>
          <Button to="/about" mode={heroStyle.button ? heroStyle.button : 'primary'} className="mt-4">Learn more</Button>
        </div>
      </div>
    </BackgroundImage> : null }
  </div>;
}

export default Hero;
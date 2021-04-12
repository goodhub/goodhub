import { FC, ReactNode } from 'react';

export interface BannerProps {
  mode?: 'standard' | 'warning'
  message: ReactNode | string
}

const getStyleForMode = (mode: 'standard' | 'warning') => {
  switch (mode) {
    case 'standard':
      return 'bg-primary'
    case 'warning':
      return 'bg-orange-500'
  }
}
 
const Banner: FC<BannerProps> = ({ mode = 'standard', message }) => {

  return <div className={`${getStyleForMode(mode)} flex items-center justify-center`}>
    <p className="text-primary-appropriate font-semibold text-center p-3">{ message }</p>
  </div>;
}

export default Banner;
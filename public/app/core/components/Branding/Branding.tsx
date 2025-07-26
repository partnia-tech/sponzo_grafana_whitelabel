import { css, cx } from '@emotion/css';
import { FC } from 'react';

import { colorManipulator } from '@grafana/data';
import { useTheme2 } from '@grafana/ui';

export interface BrandComponentProps {
  className?: string;
  children?: JSX.Element | JSX.Element[];
}

export const LoginLogo: FC<BrandComponentProps & { logo?: string }> = ({ className, logo }) => {
  const theme = useTheme2();
  const defaultLogo = theme.isDark 
    ? 'public/img/Sponzo_IsotipoRGB_Neg+Color_FondoOscuro.png' 
    : 'public/img/Sponzo_IsotipoRGB-Positivo.png';
  return <img className={className} src={`${logo ? logo : defaultLogo}`} alt="Sponzo Dashboard" />;
};

const LoginBackground: FC<BrandComponentProps> = ({ className, children }) => {
  const theme = useTheme2();

  const background = css({
    '&:before': {
      content: '""',
      position: 'fixed',
      left: 0,
      right: 0,
      bottom: 0,
      top: 0,
      background: theme.isDark 
        ? 'linear-gradient(135deg, #141423 0%, #5733FF 100%)'
        : 'linear-gradient(135deg, #9AF073 0%, #84E860 100%)',
      backgroundPosition: 'center',
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',

      opacity: 0.1,
      transition: 'opacity 3s ease-in-out',

      [theme.breakpoints.up('md')]: {
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        opacity: 0.15,
      },
    },
  });

  return <div className={cx(background, className)}>{children}</div>;
};

const MenuLogo: FC<BrandComponentProps> = ({ className }) => {
  const theme = useTheme2();
  const logoSrc = theme.isDark 
    ? "public/img/Sponzo_IsotipoRGB_Neg+Color_FondoOscuro.png" 
    : "public/img/Sponzo_IsotipoRGB-Positivo.png";
  return <img className={className} src={logoSrc} alt="Sponzo Dashboard" />;
};

const LoginBoxBackground = () => {
  const theme = useTheme2();
  return css({
    background: theme.isDark 
      ? colorManipulator.alpha('#141423', 0.85)
      : colorManipulator.alpha('#ffffff', 0.9),
    backgroundSize: 'cover',
    border: theme.isDark 
      ? `1px solid ${colorManipulator.alpha('#9AF073', 0.3)}`
      : `1px solid ${colorManipulator.alpha('#5733FF', 0.2)}`,
    borderRadius: '8px',
    backdropFilter: 'blur(10px)',
  });
};

export class Branding {
  static LoginLogo = LoginLogo;
  static LoginBackground = LoginBackground;
  static MenuLogo = MenuLogo;
  static LoginBoxBackground = LoginBoxBackground;
  static AppTitle = 'Sponzo Dashboard';
  static LoginTitle = 'Welcome to Sponzo Dashboard';
  static HideEdition = false;
  static GetLoginSubTitle = (): null | string => {
    return null;
  };
}

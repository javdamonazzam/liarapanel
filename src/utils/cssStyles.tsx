import { Theme, alpha } from '@mui/material/styles';

// ----------------------------------------------------------------------

function getDirection(value = 'bottom') {
  return {
    top: 'to top',
    right: 'to right',
    bottom: 'to bottom',
    left: 'to left',
  }[value];
}

// ----------------------------------------------------------------------

type CssStylesProps = {
  color?: string;
  blur?: number;
  opacity?: number;
  startColor?: string;
  endColor?: string;
  url?: string;
} & CSSStyleDeclaration;
export default function cssStyles(theme?: Theme) {
  return {
    bgBlur: (props?: CssStylesProps) => {
      const color = props?.color || theme?.palette.background.default || '#000000';

      const blur = props?.blur || 6;
      const opacity = props?.opacity || 0.8;

      return {
        backdropFilter: `blur(${blur}px)`,
        WebkitBackdropFilter: `blur(${blur}px)`, // Fix on Mobile
        backgroundColor: alpha(color, opacity),
      };
    },
    bgGradient: (props: CssStylesProps) => {
      const direction = getDirection(props?.direction);
      const startColor = props?.startColor || `${alpha('#000000', 0)} 0%`;
      const endColor = props?.endColor || '#000000 75%';

      return {
        background: `linear-gradient(${direction}, ${startColor}, ${endColor});`,
      };
    },
    bgImage: (props: CssStylesProps) => {
      const url = props?.url || 'https://minimal-assets-api.vercel.app/assets/images/bg_gradient.jpg';
      const direction = getDirection(props?.direction);
      const startColor = props?.startColor || alpha(theme?.palette.grey[900] || '#000000', 0.88);
      const endColor = props?.endColor || alpha(theme?.palette.grey[900] || '#000000', 0.88);

      return {
        background: `linear-gradient(${direction}, ${startColor}, ${endColor}), url(${url})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center center',
      };
    },
  };
}

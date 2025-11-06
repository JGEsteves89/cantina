import { createTheme } from '@mui/material/styles';
import resolveConfig from 'tailwindcss/resolveConfig';
import type { Config } from 'tailwindcss';
import tailwindConfig from './theme.config.js';

// Get the full Tailwind config with all colors resolved
const fullConfig = resolveConfig(tailwindConfig as unknown as Config);

// Helper function to safely access color values
const getColor = (colorPath: any): string => {
  if (typeof colorPath === 'string') {
    return colorPath;
  }
  // If it's an object with shades, return a default shade
  if (typeof colorPath === 'object' && colorPath !== null) {
    return colorPath['500'] || colorPath.DEFAULT || Object.values(colorPath)[0] as string;
  }
  return '#000000'; // fallback
};

const theme = createTheme({
  palette: {
    primary: {
      main: getColor(fullConfig.theme?.colors?.primary),
      light: getColor(fullConfig.theme?.colors?.primary),
      dark: getColor(fullConfig.theme?.colors?.primary),
    },
    secondary: {
      main: getColor(fullConfig.theme?.colors?.secondary),
    },
    error: {
      main: getColor(fullConfig.theme?.colors?.destructive) ||
        getColor(fullConfig.theme?.colors?.red),
    },
    background: {
      default: getColor(fullConfig.theme?.colors?.background),
      paper: getColor(fullConfig.theme?.colors?.card) ||
        getColor(fullConfig.theme?.colors?.white),
    },
    text: {
      primary: getColor(fullConfig.theme?.colors?.foreground),
      secondary: getColor(fullConfig.theme?.colors?.['muted-foreground']),
    },
  },
  shape: {
    borderRadius: parseInt(fullConfig.theme?.borderRadius?.DEFAULT as string) || 8,
  },
});

export default theme;

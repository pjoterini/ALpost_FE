import { extendTheme, withDefaultColorScheme } from "@chakra-ui/react";

const fonts = { mono: `'Menlo', monospace` };

const breakpoints = {
  sm: "40em",
  md: "52em",
  lg: "64em",
  xl: "80em",
};

const theme = extendTheme(
  // withDefaultColorScheme({
  //   colorScheme: "blackAlpha",
  //   components: ["Button"],
  // }),
  {
    semanticTokens: {
      colors: {
        text: {
          default: "#16161D",
          _dark: "#ade3b8",
        },
        heroGradientStart: {
          default: "#7928CA",
          _dark: "#e3a7f9",
        },
        heroGradientEnd: {
          default: "#FF0080",
          _dark: "#fbec8f",
        },
      },
      radii: {
        button: "12px",
      },
    },
    colors: {
      dark1: "#404040",
      dark2: "#595959",
      primary: "#eae7dc",
      secondary: "#d8c3a5",
      gray: "#8e8d8a",
      // accent: "#e98074",
      accent: "#e64d00",
      red: "#e85a4f",
      green: "#509550",
    },
    fonts,
    breakpoints,
  }
);

export default theme;

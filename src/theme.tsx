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
      white1: "#e6e6e6",
      white2: "#bfbfbf",
      primary: "#02122B",
      secondary: "#452040",
      accent: "#E2B887",
      gray: "#C1C1C1",
      red: "#cb2d6f",
      green: "#14a098",
    },
    fonts,
    breakpoints,
  }
);

export default theme;

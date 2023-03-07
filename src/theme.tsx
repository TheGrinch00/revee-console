import { responsiveFontSizes } from "@material-ui/core";
import { createTheme } from "@material-ui/core/styles";

const FS = 16;
const toRem = (fsPix: number) => `${(fsPix / FS).toFixed(3)}rem`;
interface IPalette {
  light?: string;
  main: string;
  dark?: string;
  contrastText?: string;
}

const primary: IPalette = {
  main: "#E20074",
  dark: "#E20074",
  light: "#E20074",
};

const secondary: IPalette = {
  main: "#241D2D",
  dark: "#241D2D",
  light: "#241D2D",
};

const theme = responsiveFontSizes(
  createTheme({
    palette: {
      primary: primary,
      secondary: secondary,
    },
    overrides: {
      MuiButton: {
        containedSecondary: {
          color: "white",
        },
        contained: {},
        outlined: {},
        text: {},
      },
      MuiTabs: {
        indicator: {
          backgroundColor: primary.main,
        },
      },
      MuiTab: {
        root: {
          backgroundColor: "white",
          "&$selected": {
            color: primary.main,
            fontWeight: "bold",
          },
        },
      },
    },
    typography: {
      fontSize: FS,
      fontFamily: "Poppins, sans-serif",
      h1: {
        fontSize: toRem(32),
        lineHeight: "1.35",
        fontStyle: "normal",
        letterSpacing: "0.1px",
        fontWeight: 800,
        color: "#241D2D",
      },
      h2: {
        fontWeight: 900,
        fontSize: toRem(24),
        color: "#241D2D",
      },
      h3: {
        fontSize: toRem(19),
        color: "#241D2D",
      },
      h4: {
        fontSize: toRem(16),
        color: "#241D2D",
      },
      h5: {
        fontSize: toRem(13),
        color: "#241D2D",
      },
      h6: {
        fontSize: toRem(12),
        color: "#241D2D",
      },
      caption: {
        color: "#241D2D",
      },
      subtitle1: {
        color: "#241D2D",
      },
      subtitle2: {
        color: "#241D2D",
      },
      body1: {
        color: "#241D2D",
      },
      body2: {
        color: "#241D2D",
      },
    }, 
  }),
  {
    factor: 3,
  },
 
);

export default theme;

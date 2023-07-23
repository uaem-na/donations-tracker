import darkScrollbar from "@mui/material/darkScrollbar";
import { experimental_extendTheme as extendTheme } from "@mui/material/styles";

const theme = extendTheme({
  colorSchemes: {
    light: {
      palette: {
        primary: {
          main: "hsl(215, 28%, 28%)",
        },
        secondary: {
          main: "hsl(215, 28%, 52%)",
        },
      },
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        styleOverrides: (themeParam) => ({
          body: themeParam.palette.mode === "dark" ? darkScrollbar() : null,
        }),
      },
    },
  },
});

export default theme;

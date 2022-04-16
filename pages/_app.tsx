import { Container, CssBaseline } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { indigo, teal } from "@mui/material/colors";

import type { AppProps } from "next/app";

const theme = createTheme({
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: teal[50],
        },
      },
    },
  },
  palette: {
    primary: {
      main: teal[500],
    },
    secondary: {
      main: indigo["A400"],
    },
  },
  typography: {
    fontFamily: ["Roboto", '"sans serif"'].join(","),
  },
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <Container>
        <CssBaseline />
        <Component {...pageProps} />
      </Container>
    </ThemeProvider>
  );
}

export default MyApp;

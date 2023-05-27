import { ReactElement } from "react";
import { render as rtlRender } from "@testing-library/react";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ThemeProvider, createTheme } from "@mui/material";

const queryClient = new QueryClient();
const theme = createTheme();

const render = (ui: ReactElement, { client = queryClient, ...options } = {}) =>
  rtlRender(ui, {
    wrapper: ({ children }) => (
      <ThemeProvider theme={theme}>
        <QueryClientProvider client={client}>{children}</QueryClientProvider>
      </ThemeProvider>
    ),
    ...options,
  });

// eslint-disable-next-line react-refresh/only-export-components
export * from "@testing-library/react";
// override React Testing Library's render with our own
export { render as customRender };

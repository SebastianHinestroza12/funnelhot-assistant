"use client";

import { ThemeProvider, CssBaseline } from "@mui/material";
import { muiTheme } from "@/theme/muiTheme";

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <ThemeProvider theme={muiTheme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}

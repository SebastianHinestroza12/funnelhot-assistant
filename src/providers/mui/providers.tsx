"use client";

import { ThemeProvider, CssBaseline } from "@mui/material";
import { muiTheme } from "@/theme/muiTheme";
import { ToastContainer } from "react-toastify";

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <ThemeProvider theme={muiTheme}>
      <CssBaseline />
      {children}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        draggable
        theme="light"
      />
    </ThemeProvider>
  );
};

import { createTheme } from "@mui/material/styles";

export const muiTheme = createTheme({
  palette: {
    primary: {
      main: "#2563EB",
    },
    secondary: {
      main: "#0F172A",
    },
    success: {
      main: "#22C55E",
    },
    error: {
      main: "#EF4444",
    },
    background: {
      default: "#F8FAFC",
    },
  },
  shape: {
    borderRadius: 12,
  },
  typography: {
    fontFamily: "Inter, system-ui, sans-serif",
    h6: {
      fontWeight: 600,
    },
    button: {
      textTransform: "none",
      fontWeight: 500,
    },
  },
});

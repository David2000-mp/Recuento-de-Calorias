import React from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";

import { getContrastRatio } from '@mui/material/styles';

export default function ThemeProviderCustom({ children, primary, secondary }) {
  // Detecta si el color primario es oscuro
  function isDark(hex) {
    if (!hex) return false;
    // getContrastRatio compara con blanco y negro
    return getContrastRatio(hex, '#000') < getContrastRatio(hex, '#fff');
  }
  const mode = isDark(primary) ? 'dark' : 'light';
  const theme = createTheme({
    palette: {
      mode,
      primary: { main: primary || "#1976d2" },
      secondary: { main: secondary || "#9c27b0" },
      background: {
        default: mode === 'dark' ? '#181818' : '#fff',
        paper: mode === 'dark' ? '#232323' : '#fff',
      },
    },
  });
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}

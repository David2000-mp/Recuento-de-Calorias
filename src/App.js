import React, { useState, useMemo } from "react";
import { Container, Typography, IconButton, Box } from "@mui/material";
import Dashboard from "./components/dashboard/Dashboard";
import { ThemeProvider, CssBaseline } from '@mui/material';
import { getTheme } from './theme';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';

function App() {
  const savedMode = localStorage.getItem('themeMode') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  const [mode, setMode] = useState(savedMode);
  const theme = useMemo(() => getTheme(mode), [mode]);
  const toggleMode = () => {
    const newMode = mode === 'light' ? 'dark' : 'light';
    setMode(newMode);
    localStorage.setItem('themeMode', newMode);
  };
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="md">
        <Box sx={{ my: 4 }}>
          <Typography variant="h4" component="h1" align="center" gutterBottom>
            Inventario y Consumo de Alimentos
            <IconButton sx={{ ml: 2 }} onClick={toggleMode} color="inherit">
              {mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
            </IconButton>
          </Typography>
          <Dashboard />
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default App;

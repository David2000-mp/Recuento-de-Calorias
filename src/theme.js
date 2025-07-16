import { createTheme } from '@mui/material/styles';

export const getTheme = (mode = 'light') => createTheme({
  palette: {
    mode,
    primary: {
      main: mode === 'dark' ? '#90caf9' : '#1976d2',
    },
    secondary: {
      main: mode === 'dark' ? '#f48fb1' : '#9c27b0',
    },
    background: {
      default: mode === 'dark' ? '#121212' : '#fafafa',
      paper: mode === 'dark' ? '#1e1e1e' : '#fff',
    },
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 18,
          boxShadow: mode === 'dark' ? '0 2px 12px #0006' : '0 2px 8px #1976d222',
        },
      },
    },
  },
});

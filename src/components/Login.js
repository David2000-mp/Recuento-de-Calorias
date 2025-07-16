import React from "react";
import { Button, Box, Typography } from "@mui/material";
import { useAuth } from "./AuthProvider";

export default function Login() {
  const { login } = useAuth();
  return (
    <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" minHeight="40vh">
      <Typography variant="h6" gutterBottom>
        Inicia sesión con Google para continuar
      </Typography>
      <Button variant="contained" color="primary" onClick={login}>
        Iniciar sesión con Google
      </Button>
    </Box>
  );
}

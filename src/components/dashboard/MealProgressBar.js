import React from "react";
import { Box, LinearProgress, Typography } from "@mui/material";

/**
 * Barra de progreso visual para mostrar avance de porciones por comida.
 * Props:
 *  - label: nombre de la comida (ej: "Desayuno")
 *  - value: porciones actuales
 *  - max: meta de porciones (opcional, default: 5)
 *  - color: color de la barra (opcional)
 */
export default function MealProgressBar({ label, value, max = 5, color = "primary" }) {
  const percent = Math.min(100, (value / max) * 100);
  return (
    <Box mb={1}>
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <Typography variant="body2" fontWeight="bold">{label}</Typography>
        <Typography variant="body2">{value} / {max}</Typography>
      </Box>
      <LinearProgress
        variant="determinate"
        value={percent}
        color={color}
        sx={{ height: 12, borderRadius: 8, mt: 0.5, backgroundColor: color === 'primary' ? '#e3f2fd' : undefined }}
      />
    </Box>
  );
}

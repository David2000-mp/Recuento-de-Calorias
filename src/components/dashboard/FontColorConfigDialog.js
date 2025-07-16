import React, { useState } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Box, TextField, Typography, Alert } from "@mui/material";
import { isLowContrast } from '../../utils/colorContrast';

const DEFAULTS = {
  primary: "#222",
  secondary: "#666",
  text: "#222",
  disabled: "#aaa"
};

export default function FontColorConfigDialog({ open, onClose, onSave, initialColors }) {
  const [colors, setColors] = useState(initialColors || DEFAULTS);

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Colores de letras</DialogTitle>
      <DialogContent>
        <Box display="flex" flexDirection="column" gap={2}>
          <Box display="flex" alignItems="center" gap={2}>
            <TextField
              label="Primario"
              type="color"
              value={colors.primary}
              onChange={e => setColors({ ...colors, primary: e.target.value })}
              sx={{ width: 70 }}
            />
            <Typography color="primary.main" sx={{ml:1}}>Ejemplo primario</Typography>
          </Box>
          <Box display="flex" alignItems="center" gap={2}>
            <TextField
              label="Secundario"
              type="color"
              value={colors.secondary}
              onChange={e => setColors({ ...colors, secondary: e.target.value })}
              sx={{ width: 70 }}
            />
            <Typography color="secondary.main" sx={{ml:1}}>Ejemplo secundario</Typography>
          </Box>
          <Box display="flex" alignItems="center" gap={2}>
            <TextField
              label="Texto principal"
              type="color"
              value={colors.text}
              onChange={e => setColors({ ...colors, text: e.target.value })}
              sx={{ width: 70 }}
            />
            <Typography sx={{ml:1, color: colors.text}}>Ejemplo texto</Typography>
          </Box>
          <Box display="flex" alignItems="center" gap={2}>
            <TextField
              label="Deshabilitado"
              type="color"
              value={colors.disabled}
              onChange={e => setColors({ ...colors, disabled: e.target.value })}
              sx={{ width: 70 }}
            />
            <Typography sx={{ml:1, color: colors.disabled}}>Ejemplo deshabilitado</Typography>
          </Box>
          {/* ADVERTENCIAS DE CONTRASTE */}
          {isLowContrast('#fff', colors.primary) && <Alert severity="warning">El color primario tiene bajo contraste sobre fondo claro.</Alert>}
          {isLowContrast('#fff', colors.secondary) && <Alert severity="warning">El color secundario tiene bajo contraste sobre fondo claro.</Alert>}
          {isLowContrast('#fff', colors.text) && <Alert severity="warning">El color de texto tiene bajo contraste sobre fondo claro.</Alert>}
          {isLowContrast('#fff', colors.disabled) && <Alert severity="warning">El color deshabilitado tiene bajo contraste sobre fondo claro.</Alert>}
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancelar</Button>
        <Button variant="contained" onClick={() => onSave(colors)}>Guardar</Button>
      </DialogActions>
    </Dialog>
  );
}

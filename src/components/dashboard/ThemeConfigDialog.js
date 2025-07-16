import React, { useState } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, MenuItem, Box } from "@mui/material";

const COLOR_PRESETS = [
  { name: "Azul", primary: "#1976d2", secondary: "#9c27b0" },
  { name: "Verde", primary: "#388e3c", secondary: "#fbc02d" },
  { name: "Rosa", primary: "#e91e63", secondary: "#ff9800" },
  { name: "Oscuro", primary: "#333", secondary: "#607d8b" },
];

export default function ThemeConfigDialog({ open, onClose, onSave, initialName, initialColors }) {
  const [name, setName] = useState(initialName || "Calorie Tracker");
  const [primary, setPrimary] = useState(initialColors?.primary || "#1976d2");
  const [secondary, setSecondary] = useState(initialColors?.secondary || "#9c27b0");

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Personaliza tu app</DialogTitle>
      <DialogContent>
        <TextField
          label="Nombre de la página"
          value={name}
          onChange={e => setName(e.target.value)}
          fullWidth
          margin="normal"
        />
        <Box display="flex" gap={2} alignItems="center" mt={1}>
          <TextField
            label="Color primario"
            type="color"
            value={primary}
            onChange={e => setPrimary(e.target.value)}
            sx={{ width: 70 }}
          />
          <TextField
            label="Color secundario"
            type="color"
            value={secondary}
            onChange={e => setSecondary(e.target.value)}
            sx={{ width: 70 }}
          />
          <TextField
            select
            label="Preset"
            value=""
            onChange={e => {
              const preset = COLOR_PRESETS.find(p => p.name === e.target.value);
              if (preset) {
                setPrimary(preset.primary);
                setSecondary(preset.secondary);
              }
            }}
            sx={{ minWidth: 120 }}
          >
            <MenuItem value="">Personalizado</MenuItem>
            {COLOR_PRESETS.map(p => (
              <MenuItem key={p.name} value={p.name}>{p.name}</MenuItem>
            ))}
          </TextField>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancelar</Button>
        <Button variant="contained" onClick={() => onSave({ name, primary, secondary })}>Guardar</Button>
      </DialogActions>
    </Dialog>
  );
}

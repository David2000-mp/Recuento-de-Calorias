import React, { useState } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, IconButton, Box } from "@mui/material";
import SettingsIcon from '@mui/icons-material/Settings';

const DEFAULT_MEALS = [
  { key: 'desayuno', label: 'Desayuno', hour: '07:00' },
  { key: 'media_manana', label: 'Media mañana', hour: '09:39' },
  { key: 'comida', label: 'Comida', hour: '12:00' },
  { key: 'merienda', label: 'Merienda', hour: '15:00' },
  { key: 'cena', label: 'Cena', hour: '18:00' },
  { key: 'noche', label: 'Noche', hour: '21:00' },
];

export function getMealsConfig() {
  return JSON.parse(localStorage.getItem('meals_config') || 'null') || DEFAULT_MEALS;
}

export default function ConfigDialog({ open, onClose, onSave }) {
  const [meals, setMeals] = useState(getMealsConfig());

  const handleChange = (idx, field, value) => {
    const updated = meals.map((m, i) => i === idx ? { ...m, [field]: value } : m);
    setMeals(updated);
  };

  const handleSave = () => {
    localStorage.setItem('meals_config', JSON.stringify(meals));
    onSave && onSave(meals);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Configuración de comidas</DialogTitle>
      <DialogContent>
        {meals.map((meal, idx) => (
          <Box key={meal.key} display="flex" gap={1} alignItems="center" mb={1}>
            <TextField
              label="Nombre"
              value={meal.label}
              onChange={e => handleChange(idx, 'label', e.target.value)}
              size="small"
              style={{ minWidth: 120 }}
            />
            <TextField
              label="Hora"
              type="time"
              value={meal.hour}
              onChange={e => handleChange(idx, 'hour', e.target.value)}
              size="small"
              style={{ width: 90 }}
              inputProps={{ step: 60 }}
            />
          </Box>
        ))}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancelar</Button>
        <Button variant="contained" onClick={handleSave}>Guardar</Button>
      </DialogActions>
    </Dialog>
  );
}

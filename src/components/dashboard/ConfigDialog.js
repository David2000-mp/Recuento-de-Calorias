import React, { useState } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, IconButton, Box, Typography } from "@mui/material";
import SettingsIcon from '@mui/icons-material/Settings';

import { FOOD_GROUPS } from '../../constants/foodGroups';

const DEFAULT_MEALS = [
  { key: 'desayuno', label: 'Desayuno', hour: '07:00' },
  { key: 'media_manana', label: 'Media mañana', hour: '09:39' },
  { key: 'comida', label: 'Comida', hour: '12:00' },
  { key: 'merienda', label: 'Merienda', hour: '15:00' },
  { key: 'cena', label: 'Cena', hour: '18:00' },
  { key: 'noche', label: 'Noche', hour: '21:00' },
];

const DEFAULT_GROUPS_META = FOOD_GROUPS.map(g => ({ key: g.key, label: g.label, meta: g.meta }));

export function getMealsConfig() {
  return JSON.parse(localStorage.getItem('meals_config') || 'null') || DEFAULT_MEALS;
}

export default function ConfigDialog({ open, onClose, onSave }) {
  const [metaTotal, setMetaTotal] = useState(() => Number(localStorage.getItem('meta_total_porciones')) || 18);
  const [meals, setMeals] = useState(getMealsConfig());
  const [groupsMeta, setGroupsMeta] = useState(() => {
    const saved = localStorage.getItem('food_groups_meta');
    return saved ? JSON.parse(saved) : DEFAULT_GROUPS_META;
  });

  const handleChange = (idx, field, value) => {
    const updated = meals.map((m, i) => i === idx ? { ...m, [field]: value } : m);
    setMeals(updated);
  };

  const handleSave = () => {
    localStorage.setItem('meals_config', JSON.stringify(meals));
    localStorage.setItem('meta_total_porciones', metaTotal);
    localStorage.setItem('food_groups_meta', JSON.stringify(groupsMeta));
    onSave && onSave(meals, metaTotal, groupsMeta);
    onClose();
    setTimeout(() => window.location.reload(), 300); // recarga para forzar actualización de grupos
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Configuración de comidas</DialogTitle>
      <DialogContent>
        <TextField
          label="Meta diaria de porciones"
          type="number"
          value={metaTotal}
          onChange={e => setMetaTotal(Number(e.target.value))}
          fullWidth
          margin="normal"
          inputProps={{ min: 1 }}
        />
        <Box mt={2} mb={1}>
          <Typography variant="subtitle2">Meta por grupo de alimento</Typography>
          {groupsMeta.map((group, idx) => (
            <Box key={group.key} display="flex" gap={1} alignItems="center" mb={1}>
              <TextField
                label={group.label}
                type="number"
                value={group.meta ?? ''}
                onChange={e => {
                  const value = e.target.value === '' ? '' : Number(e.target.value);
                  setGroupsMeta(groupsMeta.map((g, i) => i === idx ? { ...g, meta: value } : g));
                }}
                size="small"
                inputProps={{ min: 0, step: 0.1 }}
                style={{ width: 120 }}
              />
              <Typography variant="body2">porciones</Typography>
            </Box>
          ))}
        </Box>
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

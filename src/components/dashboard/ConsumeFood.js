import React, { useState } from "react";
import { Box, TextField, Button, MenuItem, Snackbar, Autocomplete } from "@mui/material";
import { useTheme } from '@mui/material/styles';
import { getContrastColor } from '../../utils/colorContrast';

const MEALS = [
  { key: 'desayuno', label: 'Desayuno' },
  { key: 'media_manana', label: 'Media mañana' },
  { key: 'comida', label: 'Comida' },
  { key: 'merienda', label: 'Merienda' },
  { key: 'cena', label: 'Cena' },
  { key: 'noche', label: 'Noche' },
];

function getFoodSuggestions() {
  return JSON.parse(localStorage.getItem('food_suggestions') || '[]');
}
function saveFoodSuggestion(name) {
  let foods = getFoodSuggestions();
  if (name && !foods.includes(name)) {
    foods = [name, ...foods].slice(0, 30); // máximo 30 sugerencias
    localStorage.setItem('food_suggestions', JSON.stringify(foods));
  }
}

export default function ConsumeFood({ setHistory, dateStr }) {
  // CORRECCIÓN: Usar el theme para obtener el fondo real
  const theme = useTheme();
  const bgColor = theme.palette.background.default || '#fff';
  const textColor = getContrastColor(bgColor);
  const [food, setFood] = useState('');
  const [group, setGroup] = useState('verduras');
  const [meal, setMeal] = useState(MEALS[0].key);
  const [portions, setPortions] = useState(1);
  const [error, setError] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [foodOptions, setFoodOptions] = useState(getFoodSuggestions());

  const handleConsume = (dateStrOverride) => {
    if (!group || portions <= 0) {
      setError("Selecciona grupo y porciones válidas");
      return;
    }
    setError("");
    const foodName = food.trim();
    if (foodName) {
      saveFoodSuggestion(foodName);
      setFoodOptions(getFoodSuggestions());
    }
    const newEntry = {
      id: Date.now(),
      food: foodName,
      group,
      meal,
      portions,
      date: dateStrOverride + "T" + new Date().toISOString().slice(11, 19)
    };
    const history = JSON.parse(localStorage.getItem("history") || "[]");
    const updatedHistory = [newEntry, ...history];
    setHistory(updatedHistory);
    localStorage.setItem("history", JSON.stringify(updatedHistory));
    setFood("");
    setPortions(1);
    setMeal(MEALS[0].key);
    setSnackbarOpen(true);
  };

  return (
    <Box mb={3}>
      <Box display="flex" gap={1} mb={1} alignItems="center">
        <Autocomplete
          freeSolo
          options={foodOptions}
          value={food}
          onInputChange={(e, newValue) => setFood(newValue)}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Alimento (opcional)"
              size="small"
              sx={{
                minWidth: 140,
                background: bgColor,
                color: textColor,
                '& input': { color: textColor },
                '& .MuiInputLabel-root': { color: textColor },
                '& .MuiOutlinedInput-notchedOutline': { borderColor: textColor },
              }}
            />
          )}
          sx={{
            minWidth: 140,
            background: bgColor,
            color: textColor,
            '& .MuiInputBase-root': {
              background: bgColor,
              color: textColor,
            }
          }}
        />
        <TextField
          select
          label="Grupo"
          value={group}
          onChange={e => setGroup(e.target.value)}
          size="small"
          sx={{
            minWidth: 120,
            background: bgColor,
            color: textColor,
            '& .MuiInputLabel-root': { color: textColor },
            '& .MuiOutlinedInput-notchedOutline': { borderColor: textColor },
            '& .MuiInputBase-input': { color: textColor }
          }}
        >
          {require('../../constants/foodGroups').FOOD_GROUPS.map(g => (
            <MenuItem key={g.key} value={g.key}>{g.label}</MenuItem>
          ))}
        </TextField>
        <TextField
          select
          label="Comida"
          value={meal}
          onChange={e => setMeal(e.target.value)}
          size="small"
          sx={{
            minWidth: 120,
            background: bgColor,
            color: textColor,
            '& .MuiInputLabel-root': { color: textColor },
            '& .MuiOutlinedInput-notchedOutline': { borderColor: textColor },
            '& .MuiInputBase-input': { color: textColor }
          }}
        >
          {MEALS.map(m => (
            <MenuItem key={m.key} value={m.key}>{m.label}</MenuItem>
          ))}
        </TextField>
        <TextField
          label="Porciones"
          type="number"
          value={portions}
          onChange={e => setPortions(Number(e.target.value))}
          size="small"
          sx={{
            width: 100,
            background: bgColor,
            color: textColor,
            '& .MuiInputLabel-root': { color: textColor },
            '& .MuiOutlinedInput-notchedOutline': { borderColor: textColor },
            '& .MuiInputBase-input': { color: textColor }
          }}
        />
        <Button variant="contained" onClick={() => handleConsume(dateStr)}>Consumir</Button>
        <Snackbar
          open={snackbarOpen}
          autoHideDuration={2000}
          onClose={() => setSnackbarOpen(false)}
          message="¡Consumo registrado!"
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        />
      </Box>
      {error && <Typography color="error">{error}</Typography>}
    </Box>
  );
}

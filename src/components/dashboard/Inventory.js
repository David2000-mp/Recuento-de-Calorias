import React, { useEffect, useState } from "react";
import { Box, Typography, List, ListItem, ListItemText, IconButton, TextField, Button, MenuItem } from "@mui/material";
import { FOOD_GROUPS } from "../../constants/foodGroups";

function getFoodsFromStorage() {
  return JSON.parse(localStorage.getItem("foods") || "[]");
}
function saveFoodsToStorage(foods) {
  localStorage.setItem("foods", JSON.stringify(foods));
}

export default function Inventory() {
  const [foods, setFoods] = useState(getFoodsFromStorage());
  const [newFood, setNewFood] = useState("");
  const [newGroup, setNewGroup] = useState(FOOD_GROUPS[0].key);

  useEffect(() => {
    saveFoodsToStorage(foods);
  }, [foods]);

  const handleAdd = () => {
    if (newFood && newGroup) {
      setFoods([
        ...foods,
        { id: Date.now(), name: newFood, portions: 1, group: newGroup }
      ]);
      setNewFood("");
      setNewGroup(FOOD_GROUPS[0].key);
    }
  };

  const handleDelete = (id) => {
    setFoods(foods.filter(f => f.id !== id));
  };

  return (
    <Box mb={3}>
      <Typography variant="h6" gutterBottom>Inventario de alimentos</Typography>
      <Box display="flex" gap={1} mb={2}>
        <TextField label="Alimento" value={newFood} onChange={e => setNewFood(e.target.value)} size="small" />
        <TextField
          select
          label="Grupo"
          value={newGroup}
          onChange={e => setNewGroup(e.target.value)}
          size="small"
          style={{ minWidth: 160 }}
        >
          {FOOD_GROUPS.map(group => (
            <MenuItem key={group.key} value={group.key}>{group.label}</MenuItem>
          ))}
        </TextField>
        <Button variant="contained" onClick={handleAdd}>Agregar</Button>
      </Box>
      <List>
        {foods.map(food => (
          <ListItem key={food.id} secondaryAction={
            <IconButton edge="end" aria-label="delete" onClick={() => handleDelete(food.id)}>
              🗑️
            </IconButton>
          }>
            <ListItemText primary={`${food.name} — ${food.portions} porciones`} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
}

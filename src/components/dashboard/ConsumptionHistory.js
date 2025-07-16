import React, { useEffect, useState } from "react";
import { Box, Typography, List, ListItem, ListItemText, IconButton, Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, MenuItem, Snackbar } from "@mui/material";
import UndoIcon from '@mui/icons-material/Undo';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MealProgressBar from "./MealProgressBar";
import FadeListItem from "./FadeListItem";

// Asumo que tienes esta constante en otro archivo, pero la pongo aquí para que no de error
const GROUPS = [
 { key: 'frutas', label: 'Frutas' },
 { key: 'verduras', label: 'Verduras' },
 { key: 'proteinas', label: 'Proteínas' },
 { key: 'carbohidratos', label: 'Carbohidratos' },
 { key: 'grasas', label: 'Grasas' },
];

function getHistoryFromStorage() {
  return JSON.parse(localStorage.getItem("history") || "[]");
}

function saveHistoryToStorage(history) {
  localStorage.setItem("history", JSON.stringify(history));
}

const MEAL_LABELS = {
  desayuno: 'Desayuno',
  media_manana: 'Media mañana',
  comida: 'Comida',
  merienda: 'Merienda',
  cena: 'Cena',
  noche: 'Noche',
};

function groupByMeal(history, dateStr) {
  const grouped = {};
  history.filter(item => item.date && item.date.startsWith(dateStr)).forEach(item => {
    const meal = item.meal || 'otros';
    if (!grouped[meal]) grouped[meal] = [];
    grouped[meal].push(item);
  });
  return grouped;
}

export default function ConsumptionHistory({ history, setHistory, dateStr }) {
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const [editData, setEditData] = useState({ food: '', group: '', meal: '', portions: 1 });
  const [snackbar, setSnackbar] = useState({ open: false, msg: '' });
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    saveHistoryToStorage(history);
  }, [history]);

  const handleOpenEdit = (item) => {
    setSelected(item);
    setEditData({
      food: item.food,
      group: item.group,
      meal: item.meal,
      portions: item.portions
    });
    setEditOpen(true);
  };

  const handleOpenDelete = (item) => {
    setSelected(item);
    setDeleteOpen(true);
  };

  const handleSaveEdit = () => {
    if (!selected) return;
    const updated = history.map(e => e.id === selected.id ? { ...e, ...editData } : e);
    setHistory(updated);
    setSnackbar({ open: true, msg: "¡Consumo editado!" });
    setEditOpen(false);
  };

  const handleDelete = () => {
      if (!selected) return;
      const updated = history.filter(e => e.id !== selected.id);
      setHistory(updated);
      setSnackbar({ open: true, msg: "¡Consumo eliminado!" });
      setDeleteOpen(false);
  };

  const handleUndo = (item) => {
    const updatedHistory = history.filter(h => h.id !== item.id);
    setHistory(updatedHistory);
  };

  const grouped = groupByMeal(history, dateStr);
  const mealOrder = ['desayuno','media_manana','comida','merienda','cena','noche','otros'];

  return (
    <>
      <Box mb={3}>
        <Box display="flex" alignItems="center" gap={1}>
          <Typography variant="h6" gutterBottom sx={{ flex: 1 }}>Historial de consumos del día</Typography>
          <IconButton onClick={() => setCollapsed(c => !c)} size="small">
            {collapsed ? <ExpandMoreIcon /> : <ExpandLessIcon />}
          </IconButton>
        </Box>

        {(() => {
          const todayEntries = history.filter(e => e.date && e.date.startsWith(dateStr));
          const totalPorciones = todayEntries.reduce((acc, e) => acc + (e.portions || 0), 0);
          const metaTotal = 18;
          return (
            <MealProgressBar label="Total del día" value={totalPorciones} max={metaTotal} color="success" />
          );
        })()}

        {!collapsed && (
          history.filter(e => e.date && e.date.startsWith(dateStr)).length === 0 ? (
            <Typography variant="body2" sx={{mt: 2}}>No hay consumos registrados para este día.</Typography>
          ) : (
            mealOrder.filter(m => grouped[m]).map(mealKey => {
              const colorMap = { desayuno: "primary", media_manana: "info", comida: "success", merienda: "warning", cena: "secondary", noche: "error", otros: "inherit" };
              return (
                <Box key={mealKey} mb={2}>
                  <MealProgressBar label={MEAL_LABELS[mealKey] || mealKey.charAt(0).toUpperCase() + mealKey.slice(1)} value={grouped[mealKey].reduce((acc, e) => acc + (e.portions || 0), 0)} max={5} color={colorMap[mealKey] || "primary"} />
                  <List>
                    {grouped[mealKey].map((entry, i) => (
                      <FadeListItem key={entry.id} delay={i*60} secondaryAction={
                        <Box>
                          <IconButton edge="end" aria-label="editar" onClick={() => handleOpenEdit(entry)}>
                            <EditIcon />
                          </IconButton>
                          <IconButton edge="end" aria-label="eliminar" onClick={() => handleOpenDelete(entry)}>
                            <DeleteIcon />
                          </IconButton>
                          <IconButton edge="end" aria-label="deshacer" onClick={() => handleUndo(entry)}>
                            <UndoIcon />
                          </IconButton>
                        </Box>
                      }>
                        <ListItemText
                          primary={<span><b>{entry.food || 'Alimento'}</b> <span style={{color:'#888'}}>({entry.group})</span> - <b>{entry.portions}</b> porciones</span>}
                          secondary={`Hora: ${entry.date.slice(11,16)}`}
                        />
                      </FadeListItem>
                    ))}
                  </List>
                </Box>
              );
            })
          )
        )}
      </Box>

      <Dialog open={editOpen} onClose={() => setEditOpen(false)}>
        <DialogTitle>Editar consumo</DialogTitle>
        <DialogContent sx={{ minWidth: 260 }}>
          <TextField label="Alimento" value={editData.food} onChange={e => setEditData({ ...editData, food: e.target.value })} fullWidth margin="dense"/>
          <TextField select label="Grupo" value={editData.group} onChange={e => setEditData({ ...editData, group: e.target.value })} fullWidth margin="dense">
            {GROUPS.map(g => <MenuItem key={g.key} value={g.key}>{g.label}</MenuItem>)}
          </TextField>
          <TextField select label="Comida" value={editData.meal} onChange={e => setEditData({ ...editData, meal: e.target.value })} fullWidth margin="dense">
            {Object.entries(MEAL_LABELS).map(([k, v]) => <MenuItem key={k} value={k}>{v}</MenuItem>)}
          </TextField>
          <TextField label="Porciones" type="number" value={editData.portions} onChange={e => setEditData({ ...editData, portions: Number(e.target.value) })} fullWidth margin="dense"/>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditOpen(false)}>Cancelar</Button>
          <Button variant="contained" onClick={handleSaveEdit}>Guardar</Button>
        </DialogActions>
      </Dialog>

      <Dialog open={deleteOpen} onClose={() => setDeleteOpen(false)}>
        <DialogTitle>¿Eliminar consumo?</DialogTitle>
        <DialogActions>
          <Button onClick={() => setDeleteOpen(false)}>Cancelar</Button>
          <Button variant="contained" color="error" onClick={handleDelete}>Eliminar</Button>
        </DialogActions>
      </Dialog>

      <Snackbar open={snackbar.open} autoHideDuration={2000} onClose={() => setSnackbar({ ...snackbar, open: false })} message={snackbar.msg} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}/>
    </>
  );
}
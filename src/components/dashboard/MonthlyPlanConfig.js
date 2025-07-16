import React, { useState } from "react";
import { Box, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from "@mui/material";

function getPlansFromStorage() {
  return JSON.parse(localStorage.getItem("plans") || "[]");
}
function savePlansToStorage(plans) {
  localStorage.setItem("plans", JSON.stringify(plans));
}

export default function MonthlyPlanConfig() {
  const [open, setOpen] = useState(false);
  const [planName, setPlanName] = useState("");
  const [planFoods, setPlanFoods] = useState("");
  const [plans, setPlans] = useState(getPlansFromStorage());

  const handleSave = () => {
    if (!planName || !planFoods) return;
    const newPlan = {
      name: planName,
      foods: planFoods,
      date: new Date().toISOString()
    };
    const updatedPlans = [newPlan, ...plans];
    setPlans(updatedPlans);
    savePlansToStorage(updatedPlans);
    setOpen(false);
    setPlanName("");
    setPlanFoods("");
  };

  return (
    <Box mb={3}>
      <Button variant="outlined" onClick={() => setOpen(true)}>Configurar plan nutricional mensual</Button>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Plan nutricional del mes</DialogTitle>
        <DialogContent>
          <TextField label="Nombre del plan" fullWidth margin="normal" value={planName} onChange={e => setPlanName(e.target.value)} />
          <TextField label="Alimentos y porciones (ej: 30 huevos, 20 yogurts)" fullWidth margin="normal" value={planFoods} onChange={e => setPlanFoods(e.target.value)} />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancelar</Button>
          <Button onClick={handleSave} variant="contained">Guardar</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

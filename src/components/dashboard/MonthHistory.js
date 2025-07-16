import React, { useState } from "react";
import { Box, Typography, List, ListItem, ListItemText, IconButton, Divider, Button, Paper } from "@mui/material";
import { FOOD_GROUPS } from "../../constants/foodGroups";

function getDaysInMonth(year, month) {
  return new Date(year, month + 1, 0).getDate();
}

function groupHistoryByDay(history, year, month) {
  const days = {};
  for (let d = 1; d <= getDaysInMonth(year, month); d++) {
    const dayStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
    days[dayStr] = [];
  }
  history.forEach(item => {
    const dateKey = item.date.slice(0, 10);
    if (dateKey in days) days[dateKey].push(item);
  });
  return days;
}

export default function MonthHistory({ history }) {
  const now = new Date();
  const [year, setYear] = useState(now.getFullYear());
  const [month, setMonth] = useState(now.getMonth());
  const days = groupHistoryByDay(history, year, month);

  return (
    <Box mb={3}>
      <Typography variant="h6" gutterBottom>Historial mensual</Typography>
      <Paper sx={{ p: 2, mb: 2, display: 'flex', gap: 2 }}>
        <Button onClick={() => setMonth(m => m > 0 ? m - 1 : 11)}>Anterior</Button>
        <Typography variant="subtitle1" sx={{ flexGrow: 1, textAlign: 'center' }}>
          {now.toLocaleString('es-MX', { month: 'long' })} {year}
        </Typography>
        <Button onClick={() => setMonth(m => m < 11 ? m + 1 : 0)}>Siguiente</Button>
      </Paper>
      {Object.entries(days).map(([date, items]) => (
        <Box key={date} mb={1}>
          <Typography variant="subtitle2" color="primary" gutterBottom>
            {new Date(date).toLocaleDateString('es-MX', { weekday: 'long', day: 'numeric', month: 'short' })}
          </Typography>
          {items.length === 0 ? (
            <Typography variant="body2" color="text.secondary">Sin registros</Typography>
          ) : (
            <List dense>
              {items.map(item => (
                <ListItem key={item.id}>
                  <ListItemText
                    primary={`${item.food} (${item.portions} porciones)`}
                    secondary={FOOD_GROUPS.find(g => g.key === item.group)?.label || "-"}
                  />
                </ListItem>
              ))}
            </List>
          )}
          <Divider sx={{ my: 1 }} />
        </Box>
      ))}
    </Box>
  );
}

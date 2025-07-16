import React, { useState } from "react";
import { Box, Typography, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField } from "@mui/material";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { getMealsConfig } from "./ConfigDialog";

function groupByDayAndMeal(history, monthStr) {
  const byDay = {};
  history.forEach(entry => {
    if (entry.date && entry.date.startsWith(monthStr)) {
      const day = entry.date.slice(0, 10);
      const meal = entry.meal || "otros";
      if (!byDay[day]) byDay[day] = {};
      if (!byDay[day][meal]) byDay[day][meal] = [];
      byDay[day][meal].push(entry);
    }
  });
  return byDay;
}

export default function MonthlyReport({ history }) {
  const [month, setMonth] = useState(() => new Date().toISOString().slice(0, 7));
  const meals = getMealsConfig();
  const mealOrder = meals.map(m => m.key).concat(["otros"]);
  const byDay = groupByDayAndMeal(history, month);
  const days = Object.keys(byDay).sort();

  const handlePDF = () => {
    const doc = new jsPDF();
    doc.text(`Reporte mensual de consumos - ${month}`, 10, 10);
    const tableData = [];
    days.forEach(day => {
      mealOrder.forEach(mealKey => {
        const entries = byDay[day][mealKey] || [];
        entries.forEach(entry => {
          tableData.push([
            day,
            meals.find(m => m.key === mealKey)?.label || mealKey,
            entry.food,
            entry.group,
            entry.portions,
            entry.date.slice(11, 16)
          ]);
        });
      });
    });
    autoTable(doc, {
      head: [["Día", "Comida", "Alimento", "Grupo", "Porciones", "Hora"]],
      body: tableData,
    });
    doc.save(`reporte_consumos_${month}.pdf`);
  };

  return (
    <Box mb={4}>
      <Typography variant="h6" gutterBottom>Reporte mensual de consumos</Typography>
      <Box display="flex" alignItems="center" gap={2} mb={2}>
        <TextField
          label="Mes"
          type="month"
          value={month}
          onChange={e => setMonth(e.target.value)}
          size="small"
          InputLabelProps={{ shrink: true }}
        />
        <Button variant="contained" onClick={handlePDF}>Descargar PDF</Button>
      </Box>
      <TableContainer component={Paper}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Día</TableCell>
              <TableCell>Comida</TableCell>
              <TableCell>Alimento</TableCell>
              <TableCell>Grupo</TableCell>
              <TableCell>Porciones</TableCell>
              <TableCell>Hora</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {days.length === 0 && (
              <TableRow><TableCell colSpan={6}>No hay registros para este mes.</TableCell></TableRow>
            )}
            {days.map(day => (
              mealOrder.map(mealKey => (
                (byDay[day][mealKey] || []).map((entry, idx) => (
                  <TableRow key={day + mealKey + idx}>
                    <TableCell>{day}</TableCell>
                    <TableCell>{meals.find(m => m.key === mealKey)?.label || mealKey}</TableCell>
                    <TableCell>{entry.food}</TableCell>
                    <TableCell>{entry.group}</TableCell>
                    <TableCell>{entry.portions}</TableCell>
                    <TableCell>{entry.date.slice(11, 16)}</TableCell>
                  </TableRow>
                ))
              ))
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

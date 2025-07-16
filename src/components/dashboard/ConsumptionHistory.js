import React, { useState } from "react";
import { Box, Typography, TextField, IconButton } from "@mui/material";
// 1. AÑADIMOS LAS IMPORTACIONES DE MUI PARA EL TEMA
import { ThemeProvider, createTheme } from "@mui/material/styles";
import ThemeConfigDialog from "./ThemeConfigDialog";
import PaletteIcon from '@mui/icons-material/Palette';
// 2. ELIMINAMOS LA LÍNEA QUE DABA ERROR
// import ThemeProviderCustom from '../ThemeProviderCustom'; 

import ConsumptionHistory from "./ConsumptionHistory";
import MonthlyPlanConfig from "./MonthlyPlanConfig";
import DailySummary from "./DailySummary";
import MonthHistory from "./MonthHistory";
import MonthlyReport from "./MonthlyReport";
import ConsumeFood from "./ConsumeFood";
import SummaryRapido from "./SummaryRapido";
import ConfigDialog from "./ConfigDialog";
import SettingsIcon from '@mui/icons-material/Settings';

function getFoodsFromStorage() {
  return JSON.parse(localStorage.getItem("foods") || "[]");
}
function getHistoryFromStorage() {
  return JSON.parse(localStorage.getItem("history") || "[]");
}

export default function Dashboard() {
  const [foods, setFoods] = useState(getFoodsFromStorage());
  const [history, setHistory] = useState(getHistoryFromStorage());
  const [dateStr, setDateStr] = useState(new Date().toISOString().slice(0, 10));
  const [configOpen, setConfigOpen] = useState(false);
  const [themeOpen, setThemeOpen] = useState(false);
  const [themeConfig, setThemeConfig] = useState(() => {
    return JSON.parse(localStorage.getItem("themeConfig") || '{"name":"Calorie Tracker","primary":"#1976d2","secondary":"#9c27b0"}');
  });

  const handleConfigSave = () => {
    setConfigOpen(false);
  };
  const handleThemeSave = (cfg) => {
    setThemeConfig(cfg);
    localStorage.setItem("themeConfig", JSON.stringify(cfg));
    setThemeOpen(false);
  };

  // 3. CREAMOS EL TEMA AQUÍ MISMO
  const customTheme = createTheme({
    palette: {
      primary: { main: themeConfig.primary || "#1976d2" },
      secondary: { main: themeConfig.secondary || "#9c27b0" },
    },
  });

  return (
    // 4. USAMOS EL THEMEPROVIDER OFICIAL DE MUI
    <ThemeProvider theme={customTheme}>
      <Box>
        <Box display="flex" flexDirection="column" alignItems="center" mb={2} gap={1}>
          <Box display="flex" alignItems="center" gap={1}>
            <IconButton onClick={() => setConfigOpen(true)}><SettingsIcon /></IconButton>
            <Typography variant="h5" fontWeight="bold" color="primary" sx={{ mr: 1 }}>
              {themeConfig.name}
            </Typography>
            <IconButton onClick={() => setThemeOpen(true)} title="Personalizar colores y nombre">
              <PaletteIcon />
            </IconButton>
            <SummaryRapido history={history} dateStr={dateStr} />
          </Box>
          <Box display="flex" gap={2} alignItems="center">
            <TextField
              label="Fecha"
              type="date"
              value={dateStr}
              onChange={e => setDateStr(e.target.value)}
              size="small"
              InputLabelProps={{ shrink: true }}
            />
          </Box>
        </Box>
        <MonthlyPlanConfig />
        <DailySummary history={history} dateStr={dateStr} />
        <ConsumeFood setHistory={setHistory} dateStr={dateStr} />
        <ConsumptionHistory history={history} setHistory={setHistory} dateStr={dateStr} />
        <MonthHistory history={history} />
        <MonthlyReport history={history} />
        <ConfigDialog open={configOpen} onClose={() => setConfigOpen(false)} onSave={handleConfigSave} />
        <ThemeConfigDialog open={themeOpen} onClose={() => setThemeOpen(false)} onSave={handleThemeSave} initialName={themeConfig.name} initialColors={{ primary: themeConfig.primary, secondary: themeConfig.secondary }} />
      </Box>
    </ThemeProvider>
  );
}
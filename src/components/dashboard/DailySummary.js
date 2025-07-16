import React, { useMemo } from "react";
import { Box, Typography, LinearProgress, Card, CardContent, Grid, Avatar } from "@mui/material";
import { FOOD_GROUPS } from "../../constants/foodGroups";
import SpaIcon from '@mui/icons-material/Spa';
import EmojiNatureIcon from '@mui/icons-material/EmojiNature';
import EggIcon from '@mui/icons-material/Egg';
import GrainIcon from '@mui/icons-material/Grain';
import WaterDropIcon from '@mui/icons-material/WaterDrop';
import CakeIcon from '@mui/icons-material/Cake';
import LocalDiningIcon from '@mui/icons-material/LocalDining';

const groupIcons = {
  verduras: <SpaIcon color="success" />,
  frutas: <EmojiNatureIcon color="warning" />,
  proteinas: <EggIcon color="secondary" />,
  cereales: <GrainIcon color="primary" />,
  grasas: <LocalDiningIcon color="info" />,
  azucares: <CakeIcon color="error" />,
  agua: <WaterDropIcon color="primary" />,
};

function getDailyTotals(history, dateStr) {
  const totals = {};
  FOOD_GROUPS.forEach(g => (totals[g.key] = 0));
  history
    .filter(item => item.date.slice(0, 10) === dateStr)
    .forEach(item => {
      if (item.group && totals[item.group] !== undefined) {
        totals[item.group] += Number(item.portions);
      }
    });
  return totals;
}

export default function DailySummary({ history, dateStr }) {
  const totals = useMemo(() => getDailyTotals(history, dateStr), [history, dateStr]);
  return (
    <Box mb={3}>
      <Typography variant="h6" gutterBottom>Resumen diario por grupo</Typography>
      <Grid container spacing={2}>
        {FOOD_GROUPS.map(group => (
          <Grid item xs={12} sm={6} md={4} key={group.key}>
            <Card elevation={3}>
              <CardContent>
                <Typography variant="subtitle1" fontWeight="bold">{group.label}</Typography>
                <Box display="flex" alignItems="center" gap={1} mb={1}>
                  <Avatar sx={{ bgcolor: '#fff', color: 'primary.main', width: 36, height: 36, border: '2px solid #e0e0e0' }}>
                    {groupIcons[group.key] || <LocalDiningIcon />}
                  </Avatar>
                  <Typography variant="h5" fontWeight="bold" color={totals[group.key] >= group.meta ? 'success.main' : 'text.primary'}>
                    {totals[group.key] || 0}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">/ {group.meta ? group.meta : '—'} porciones</Typography>
                  {group.meta && totals[group.key] >= group.meta && (
                    <Typography variant="body2" color="success.main" fontWeight="bold">¡Meta lograda!</Typography>
                  )}
                </Box>
                {group.meta ? (
                  <LinearProgress
                    variant="determinate"
                    value={Math.min((totals[group.key] || 0) / group.meta * 100, 100)}
                    sx={{
                      height: 16,
                      borderRadius: 8,
                      backgroundColor: '#eee',
                      '& .MuiLinearProgress-bar': {
                        backgroundColor:
                          totals[group.key] > group.meta
                            ? 'error.main'
                            : totals[group.key] === group.meta
                            ? 'success.main'
                            : 'primary.main',
                      },
                    }}
                  />
                ) : (
                  <Typography variant="body2">Suficiente</Typography>
                )}
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

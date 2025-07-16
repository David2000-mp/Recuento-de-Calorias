import React from "react";
import { Box, Typography, Avatar, Tooltip } from "@mui/material";
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
  history.forEach(item => {
    if (item.date && item.date.startsWith(dateStr)) {
      totals[item.group] = (totals[item.group] || 0) + item.portions;
    }
  });
  return totals;
}

export default function SummaryRapido({ history, dateStr }) {
  const totals = getDailyTotals(history, dateStr);
  let cumplidos = 0;
  FOOD_GROUPS.forEach(g => {
    if (g.meta && totals[g.key] >= g.meta) cumplidos++;
  });
  const totalConMeta = FOOD_GROUPS.filter(g => g.meta).length;

  return (
    <Box display="flex" alignItems="center" gap={2}>
      <Typography variant="subtitle1" fontWeight="bold" color={cumplidos === totalConMeta ? 'success.main' : 'primary.main'}>
        Hoy llevas {cumplidos}/{totalConMeta} grupos cumplidos
      </Typography>
      <Box display="flex" gap={0.5}>
        {FOOD_GROUPS.filter(g => g.meta).map(group => (
          <Tooltip title={group.label} key={group.key}>
            <Avatar sx={{ bgcolor: totals[group.key] >= group.meta ? 'success.main' : 'grey.300', width: 32, height: 32 }}>
              {groupIcons[group.key] || <LocalDiningIcon />}
            </Avatar>
          </Tooltip>
        ))}
      </Box>
    </Box>
  );
}

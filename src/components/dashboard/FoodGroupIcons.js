import React from "react";
import EmojiNatureIcon from '@mui/icons-material/EmojiNature'; // Frutas
import SpaIcon from '@mui/icons-material/Spa'; // Verduras
import EggIcon from '@mui/icons-material/Egg'; // Proteínas
import LocalDrinkIcon from '@mui/icons-material/LocalDrink'; // Lácteos
import GrainIcon from '@mui/icons-material/Grain'; // Cereales
import FastfoodIcon from '@mui/icons-material/Fastfood'; // Grasas
import CakeIcon from '@mui/icons-material/Cake'; // Azúcares

const GROUP_ICONS = [
  { key: 'frutas', icon: <EmojiNatureIcon fontSize="inherit" color="warning" />, label: 'Frutas' },
  { key: 'verduras', icon: <SpaIcon fontSize="inherit" color="success" />, label: 'Verduras' },
  { key: 'proteinas', icon: <EggIcon fontSize="inherit" color="secondary" />, label: 'Proteínas' },
  { key: 'lacteos', icon: <LocalDrinkIcon fontSize="inherit" color="info" />, label: 'Lácteos' },
  { key: 'cereales', icon: <GrainIcon fontSize="inherit" color="primary" />, label: 'Cereales' },
  { key: 'grasas', icon: <FastfoodIcon fontSize="inherit" color="error" />, label: 'Grasas' },
  { key: 'azucares', icon: <CakeIcon fontSize="inherit" color="secondary" />, label: 'Azúcares' },
];

export default function FoodGroupIcons({ size = 64, animate = false }) {
  return (
    <div style={{ display: 'flex', gap: size * 0.2, justifyContent: 'center', alignItems: 'center' }}>
      {GROUP_ICONS.map((g, i) => (
        <span
          key={g.key}
          style={{
            fontSize: size,
            opacity: animate ? 0.4 + 0.6 * Math.abs(Math.sin(Date.now()/400 + i)) : 1,
            transform: animate ? `translateY(${Math.sin(Date.now()/400 + i)*8}px)` : 'none',
            transition: 'all 0.5s cubic-bezier(.4,2,.6,1)',
          }}
        >
          {g.icon}
        </span>
      ))}
    </div>
  );
}

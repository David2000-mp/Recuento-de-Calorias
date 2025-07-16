import React, { useEffect, useState } from "react";
import { Box, Fade } from "@mui/material";
import FoodGroupIcons from "./FoodGroupIcons";

export default function PageIntroAnimation({ show }) {
  const [tick, setTick] = useState(0);
  useEffect(() => {
    if (!show) return;
    const interval = setInterval(() => setTick(t => t + 1), 80);
    return () => clearInterval(interval);
  }, [show]);
  return (
    <Fade in={show} timeout={800}>
      <Box
        sx={{
          width: '100vw',
          height: '100vh',
          bgcolor: 'background.paper',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 2000,
          position: 'fixed',
          left: 0,
          top: 0,
          transition: 'opacity 0.7s',
        }}
      >
        <FoodGroupIcons size={72} animate={true} />
      </Box>
    </Fade>
  );
}

import React from "react";
import { ListItem } from "@mui/material";
import { styled } from "@mui/material/styles";
import { getContrastColor } from '../../utils/colorContrast';

const FadeInListItem = styled(ListItem)(({ theme, animate, size, i }) => ({
  opacity: 0,
  transform: "translateY(16px)",
  animation: `fadeInUp 0.5s ease forwards`,
  animationDelay: ({ delay }) => `${delay}ms`,
  '@keyframes fadeInUp': {
    to: {
      opacity: 1,
      transform: "none"
    }
  },
  style: {
    fontSize: size,
    opacity: animate ? 0.4 + 0.6 * Math.abs(Math.sin(Date.now()/400 + i)) : 1,
    transform: animate ? `translateY(${Math.sin(Date.now()/400 + i)*8}px)` : 'none',
    transition: 'all 0.5s cubic-bezier(.4,2,.6,1)',
    color: typeof window !== 'undefined' ? getContrastColor(window.getComputedStyle(document.body).backgroundColor || '#fff') : '#222'
  }
}));

/**
 * ListItem animado con fade+slide up.
 * Props: delay (ms, opcional)
 */
export default function FadeListItem({ children, delay = 0, ...props }) {
  return <FadeInListItem delay={delay} {...props}>{children}</FadeInListItem>;
}

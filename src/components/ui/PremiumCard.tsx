import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useTheme } from '../../contexts/ThemeContext';

interface PremiumCardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  tiltEnabled?: boolean;
  glowOnHover?: boolean;
}

export const PremiumCard: React.FC<PremiumCardProps> = ({
  children,
  className = '',
  onClick,
  tiltEnabled = true,
  glowOnHover = false
}) => {
  const { theme } = useTheme();
  const ref = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { mass: 0.5, stiffness: 120, damping: 20 });
  const mouseYSpring = useSpring(y, { mass: 0.5, stiffness: 120, damping: 20 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['5deg', '-5deg']);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-5deg', '5deg']);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!tiltEnabled || !ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      className={`relative overflow-hidden ${className}`}
      style={{
        rotateX: tiltEnabled ? rotateX : 0,
        rotateY: tiltEnabled ? rotateY : 0,
        transformStyle: 'preserve-3d',
        backgroundColor: theme.bgSecondary,
        border: `1px solid ${theme.border}`,
        boxShadow: isHovered ? theme.elevationHover : theme.elevation,
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      whileHover={{ 
        y: -3,
        transition: { duration: 0.3, ease: 'easeOut' }
      }}
      whileTap={{ 
        scale: 0.98,
        transition: { duration: 0.1 }
      }}
      animate={{
        transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] }
      }}
    >
      {glowOnHover && isHovered && (
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `radial-gradient(circle at center, ${theme.dominance}22, transparent 70%)`,
            backdropFilter: 'blur(12px)',
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        />
      )}
      <div className="relative z-10">
        {children}
      </div>
    </motion.div>
  );
};
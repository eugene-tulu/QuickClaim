import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../../contexts/ThemeContext';

interface PremiumButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  icon?: React.ReactNode;
}

export const PremiumButton: React.FC<PremiumButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  onClick,
  disabled = false,
  className = '',
  icon
}) => {
  const { theme } = useTheme();

  const variants = {
    primary: {
      backgroundColor: theme.dominance,
      color: '#FFFFFF',
      border: 'none',
    },
    secondary: {
      backgroundColor: 'transparent',
      color: theme.text,
      border: `1px solid ${theme.border}`,
    },
    ghost: {
      backgroundColor: 'transparent',
      color: theme.textSecondary,
      border: 'none',
    }
  };

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg'
  };

  return (
    <motion.button
      className={`
        inline-flex items-center justify-center gap-2 font-medium rounded-xl
        transition-all duration-300 ease-out
        focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-opacity-50
        disabled:opacity-50 disabled:cursor-not-allowed
        ${sizes[size]} ${className}
      `}
      style={{
        ...variants[variant],
        boxShadow: variant === 'primary' ? theme.elevation : 'none',
        focusRingColor: theme.dominance,
      }}
      onClick={onClick}
      disabled={disabled}
      whileHover={!disabled ? { 
        y: -3,
        boxShadow: variant === 'primary' ? theme.elevationHover : theme.elevation,
        transition: { duration: 0.3, ease: 'easeOut' }
      } : {}}
      whileTap={!disabled ? { 
        scale: 0.98,
        y: -1,
        transition: { duration: 0.1 }
      } : {}}
      animate={{
        scale: 1,
        transition: { 
          type: 'spring',
          mass: 0.5,
          stiffness: 120,
          damping: 20
        }
      }}
    >
      {icon && (
        <motion.span
          initial={{ scale: 1 }}
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.2 }}
        >
          {icon}
        </motion.span>
      )}
      {children}
    </motion.button>
  );
};
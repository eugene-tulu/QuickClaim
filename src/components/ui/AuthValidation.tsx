import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, X } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';

interface ValidationRule {
  id: string;
  label: string;
  validator: (value: string) => boolean;
}

interface AuthValidationProps {
  value: string;
  rules: ValidationRule[];
  className?: string;
}

export const AuthValidation: React.FC<AuthValidationProps> = ({
  value,
  rules,
  className = ''
}) => {
  const { theme } = useTheme();
  const [validationState, setValidationState] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const newState: Record<string, boolean> = {};
    rules.forEach(rule => {
      newState[rule.id] = rule.validator(value);
    });
    setValidationState(newState);
  }, [value, rules]);

  const iconVariants = {
    hidden: { scale: 0, rotate: -180 },
    visible: { 
      scale: 1, 
      rotate: 0,
      transition: {
        type: 'spring',
        mass: 0.5,
        stiffness: 120,
        damping: 15
      }
    }
  };

  return (
    <div className={`space-y-3 ${className}`}>
      {rules.map((rule) => {
        const isValid = validationState[rule.id];
        const hasValue = value.length > 0;
        
        return (
          <motion.div
            key={rule.id}
            className="flex items-center gap-3"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >
            <div className="relative w-5 h-5">
              <AnimatePresence mode="wait">
                {hasValue && (
                  <motion.div
                    key={isValid ? 'valid' : 'invalid'}
                    className="absolute inset-0 flex items-center justify-center"
                    variants={iconVariants}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                  >
                    {isValid ? (
                      <motion.div
                        className="w-5 h-5 rounded-full flex items-center justify-center"
                        style={{ backgroundColor: '#10B981' }}
                        whileHover={{ scale: 1.1 }}
                      >
                        <Check size={12} color="white" />
                      </motion.div>
                    ) : (
                      <motion.div
                        className="w-5 h-5 rounded-full flex items-center justify-center"
                        style={{ backgroundColor: '#EF4444' }}
                        whileHover={{ scale: 1.1 }}
                      >
                        <X size={12} color="white" />
                      </motion.div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
              
              {!hasValue && (
                <div 
                  className="w-5 h-5 rounded-full border-2"
                  style={{ borderColor: theme.border }}
                />
              )}
            </div>

            <motion.span
              className="text-sm font-medium"
              animate={{
                color: hasValue ? (isValid ? '#10B981' : '#EF4444') : theme.textSecondary
              }}
              transition={{ duration: 0.3 }}
            >
              {rule.label}
            </motion.span>
          </motion.div>
        );
      })}
    </div>
  );
};

// Common validation rules
export const passwordRules: ValidationRule[] = [
  {
    id: 'length',
    label: 'At least 8 characters',
    validator: (value) => value.length >= 8
  },
  {
    id: 'uppercase',
    label: 'One uppercase letter',
    validator: (value) => /[A-Z]/.test(value)
  },
  {
    id: 'lowercase',
    label: 'One lowercase letter',
    validator: (value) => /[a-z]/.test(value)
  },
  {
    id: 'number',
    label: 'One number',
    validator: (value) => /\d/.test(value)
  }
];

export const emailRules: ValidationRule[] = [
  {
    id: 'format',
    label: 'Valid email format',
    validator: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
  }
];
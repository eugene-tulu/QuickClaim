import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';

interface GlassModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export const GlassModal: React.FC<GlassModalProps> = ({
  isOpen,
  onClose,
  children,
  title,
  size = 'md'
}) => {
  const { theme } = useTheme();

  const sizeClasses = {
    sm: 'max-w-md',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl'
  };

  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { duration: 0.3 }
    }
  };

  const modalVariants = {
    hidden: { 
      opacity: 0, 
      scale: 0.95, 
      y: 20 
    },
    visible: { 
      opacity: 1, 
      scale: 1, 
      y: 0,
      transition: {
        type: 'spring',
        mass: 0.5,
        stiffness: 120,
        damping: 20,
        delay: 0.1
      }
    },
    exit: { 
      opacity: 0, 
      scale: 0.95, 
      y: 20,
      transition: { duration: 0.2 }
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0"
            style={{
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              backdropFilter: 'blur(12px)',
            }}
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            className={`
              relative w-full ${sizeClasses[size]} max-h-[90vh] overflow-hidden
              rounded-2xl shadow-2xl
            `}
            style={{
              backgroundColor: theme.glass,
              backdropFilter: 'blur(12px)',
              border: `1px solid ${theme.border}`,
            }}
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            {title && (
              <div 
                className="flex items-center justify-between p-6 border-b"
                style={{ borderColor: theme.border }}
              >
                <h2 
                  className="text-2xl font-bold"
                  style={{ color: theme.text }}
                >
                  {title}
                </h2>
                <motion.button
                  className="p-2 rounded-xl transition-colors"
                  style={{ 
                    color: theme.textSecondary,
                    backgroundColor: 'transparent'
                  }}
                  onClick={onClose}
                  whileHover={{ 
                    backgroundColor: theme.border,
                    scale: 1.1
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  <X size={20} />
                </motion.button>
              </div>
            )}

            {/* Content */}
            <div className="overflow-y-auto max-h-[calc(90vh-80px)]">
              {children}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
import React, { useEffect, useRef } from 'react';
import { motion, useInView, useAnimation } from 'framer-motion';
import { useTheme } from '../../contexts/ThemeContext';

interface TimelineStep {
  id: string;
  title: string;
  description: string;
  status: 'completed' | 'current' | 'pending';
  timestamp?: string;
}

interface StatusTimelineProps {
  steps: TimelineStep[];
  className?: string;
}

export const StatusTimeline: React.FC<StatusTimelineProps> = ({ steps, className = '' }) => {
  const { theme } = useTheme();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    }
  }, [isInView, controls]);

  const lineVariants = {
    hidden: { pathLength: 0 },
    visible: {
      pathLength: 1,
      transition: {
        duration: 2,
        ease: 'easeInOut',
        delay: 0.5
      }
    }
  };

  const dotVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: (i: number) => ({
      scale: 1,
      opacity: 1,
      transition: {
        delay: 0.5 + (i * 0.3),
        duration: 0.5,
        type: 'spring',
        mass: 0.5,
        stiffness: 120
      }
    })
  };

  const pulseVariants = {
    pulse: {
      scale: [1, 1.2, 1],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: 'easeInOut'
      }
    }
  };

  return (
    <div ref={ref} className={`relative ${className}`}>
      {/* SVG Line */}
      <svg
        className="absolute left-6 top-0 h-full w-0.5"
        style={{ zIndex: 0 }}
      >
        <motion.path
          d={`M 1 0 L 1 ${steps.length * 120}`}
          stroke={theme.border}
          strokeWidth="2"
          fill="none"
          variants={lineVariants}
          initial="hidden"
          animate={controls}
        />
      </svg>

      {/* Timeline Steps */}
      <div className="space-y-12">
        {steps.map((step, index) => (
          <motion.div
            key={step.id}
            className="relative flex items-start gap-6"
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{
              delay: 0.8 + (index * 0.2),
              duration: 0.6,
              type: 'spring',
              mass: 0.5,
              stiffness: 120
            }}
          >
            {/* Status Dot */}
            <motion.div
              className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full"
              style={{
                backgroundColor: step.status === 'completed' 
                  ? theme.dominance 
                  : step.status === 'current' 
                    ? theme.trust 
                    : theme.border
              }}
              variants={dotVariants}
              initial="hidden"
              animate={controls}
              custom={index}
            >
              {step.status === 'current' && (
                <motion.div
                  className="absolute inset-0 rounded-full"
                  style={{ backgroundColor: theme.trust }}
                  variants={pulseVariants}
                  animate="pulse"
                />
              )}
              
              <div className="relative z-10">
                {step.status === 'completed' ? (
                  <motion.svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ delay: 1 + (index * 0.3), duration: 0.5 }}
                  >
                    <motion.path
                      d="M3 8l3 3 7-7"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </motion.svg>
                ) : step.status === 'current' ? (
                  <div 
                    className="h-2 w-2 rounded-full"
                    style={{ backgroundColor: 'white' }}
                  />
                ) : (
                  <div 
                    className="h-2 w-2 rounded-full"
                    style={{ backgroundColor: theme.textSecondary }}
                  />
                )}
              </div>
            </motion.div>

            {/* Content */}
            <div className="flex-1 min-w-0 pb-8">
              <div className="flex items-center justify-between mb-2">
                <h3 
                  className="text-lg font-semibold"
                  style={{ color: theme.text }}
                >
                  {step.title}
                </h3>
                {step.timestamp && (
                  <span 
                    className="text-sm"
                    style={{ color: theme.textSecondary }}
                  >
                    {step.timestamp}
                  </span>
                )}
              </div>
              <p 
                className="text-base leading-relaxed"
                style={{ color: theme.textSecondary }}
              >
                {step.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
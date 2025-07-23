import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, Check, X } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';

interface FileUploadProps {
  onFileSelect: (file: File) => void;
  accept?: string;
  maxSize?: number;
  className?: string;
  disabled?: boolean;
}

export const FileUpload: React.FC<FileUploadProps> = ({
  onFileSelect,
  accept = 'image/*,.pdf',
  maxSize = 10 * 1024 * 1024, // 10MB
  className = '',
  disabled = false
}) => {
  const { theme } = useTheme();
  const [isDragOver, setIsDragOver] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'uploading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    if (!disabled) setIsDragOver(true);
  }, [disabled]);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    
    if (disabled) return;

    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      handleFileSelection(files[0]);
    }
  }, [disabled]);

  const handleFileSelection = (file: File) => {
    setErrorMessage('');
    
    if (file.size > maxSize) {
      setErrorMessage(`File size must be less than ${maxSize / 1024 / 1024}MB`);
      setUploadStatus('error');
      return;
    }

    setUploadStatus('uploading');
    
    // Simulate upload process
    setTimeout(() => {
      setUploadStatus('success');
      onFileSelect(file);
      
      // Reset after 2 seconds
      setTimeout(() => {
        setUploadStatus('idle');
      }, 2000);
    }, 1500);
  };

  const iconVariants = {
    idle: { scale: 1, rotate: 0 },
    uploading: { scale: 1.1, rotate: 360 },
    success: { scale: 1.2, rotate: 0 },
    error: { scale: 1.1, rotate: 0 }
  };

  const containerVariants = {
    idle: { 
      borderColor: theme.border,
      backgroundColor: 'transparent'
    },
    dragOver: { 
      borderColor: theme.dominance,
      backgroundColor: `${theme.dominance}08`,
      scale: 1.02
    },
    uploading: {
      borderColor: theme.trust,
      backgroundColor: `${theme.trust}08`
    },
    success: {
      borderColor: '#10B981',
      backgroundColor: '#10B98108'
    },
    error: {
      borderColor: '#EF4444',
      backgroundColor: '#EF444408'
    }
  };

  return (
    <motion.div
      className={`
        relative border-2 border-dashed rounded-2xl p-12 text-center cursor-pointer
        transition-all duration-300 ease-out
        ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
        ${className}
      `}
      variants={containerVariants}
      animate={
        uploadStatus !== 'idle' ? uploadStatus :
        isDragOver ? 'dragOver' : 'idle'
      }
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      whileHover={!disabled ? { scale: 1.01 } : {}}
      transition={{
        type: 'spring',
        mass: 0.5,
        stiffness: 120,
        damping: 20
      }}
    >
      <input
        type="file"
        accept={accept}
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) handleFileSelection(file);
        }}
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        disabled={disabled}
      />

      <AnimatePresence mode="wait">
        <motion.div
          key={uploadStatus}
          className="flex flex-col items-center gap-4"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div
            className="w-16 h-16 rounded-2xl flex items-center justify-center"
            style={{
              backgroundColor: 
                uploadStatus === 'success' ? '#10B98110' :
                uploadStatus === 'error' ? '#EF444410' :
                uploadStatus === 'uploading' ? `${theme.trust}10` :
                `${theme.dominance}10`
            }}
            variants={iconVariants}
            animate={uploadStatus}
            transition={{
              duration: uploadStatus === 'uploading' ? 1 : 0.3,
              repeat: uploadStatus === 'uploading' ? Infinity : 0,
              ease: 'linear'
            }}
          >
            {uploadStatus === 'success' ? (
              <Check size={32} color="#10B981" />
            ) : uploadStatus === 'error' ? (
              <X size={32} color="#EF4444" />
            ) : (
              <Upload 
                size={32} 
                color={
                  uploadStatus === 'uploading' ? theme.trust : theme.dominance
                } 
              />
            )}
          </motion.div>

          <div>
            <motion.h3
              className="text-xl font-semibold mb-2"
              style={{ color: theme.text }}
              animate={{
                color: 
                  uploadStatus === 'success' ? '#10B981' :
                  uploadStatus === 'error' ? '#EF4444' :
                  theme.text
              }}
            >
              {uploadStatus === 'uploading' ? 'Uploading...' :
               uploadStatus === 'success' ? 'Upload Complete!' :
               uploadStatus === 'error' ? 'Upload Failed' :
               'Drop files here or click to browse'}
            </motion.h3>
            
            {uploadStatus === 'error' && errorMessage ? (
              <p className="text-sm" style={{ color: '#EF4444' }}>
                {errorMessage}
              </p>
            ) : (
              <p className="text-sm" style={{ color: theme.textSecondary }}>
                {accept.includes('image') ? 'PNG, JPG' : 'PDF'} up to {maxSize / 1024 / 1024}MB
              </p>
            )}
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Progress indicator for uploading state */}
      {uploadStatus === 'uploading' && (
        <motion.div
          className="absolute bottom-0 left-0 h-1 rounded-b-2xl"
          style={{ backgroundColor: theme.trust }}
          initial={{ width: '0%' }}
          animate={{ width: '100%' }}
          transition={{ duration: 1.5, ease: 'easeInOut' }}
        />
      )}
    </motion.div>
  );
};
import React, { useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Check, Star, Shield, Zap } from 'lucide-react';
import { SignInForm } from "../SignInForm";
import { PremiumButton } from './ui/PremiumButton';
import { PremiumCard } from './ui/PremiumCard';
import { GlassModal } from './ui/GlassModal';
import { useTheme } from '../contexts/ThemeContext';

export function LandingPage() {
  const [showAuth, setShowAuth] = useState(false);
  const { theme, isDark, toggleTheme } = useTheme();
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);

  const testimonials = [
    {
      name: "Maria Rodriguez",
      role: "Rideshare Driver",
      content: "Got my unemployment benefits in 3 days. No endless forms, no waiting in lines.",
      amount: "$1,800",
      rating: 5
    },
    {
      name: "James Chen",
      role: "Freelance Designer", 
      content: "The health insurance subsidy saved me $600/month. Process was incredibly smooth.",
      amount: "$600/mo",
      rating: 5
    },
    {
      name: "Sarah Johnson",
      role: "Food Delivery",
      content: "Housing assistance came through when I needed it most. Simple upload, fast approval.",
      amount: "$1,200",
      rating: 5
    }
  ];

  const features = [
    {
      icon: <Zap size={24} />,
      title: "Instant Matching",
      description: "AI-powered benefit discovery based on your profile"
    },
    {
      icon: <Shield size={24} />,
      title: "Bank-Level Security",
      description: "Your data is encrypted and protected at all times"
    },
    {
      icon: <Check size={24} />,
      title: "Real-Time Tracking",
      description: "Monitor your application status with live updates"
    }
  ];

  return (
    <div className="min-h-screen" style={{ backgroundColor: theme.bgPrimary }}>
      {/* Navigation */}
      <motion.nav 
        className="fixed top-0 w-full z-50 transition-all duration-500"
        style={{
          backgroundColor: `${theme.glass}`,
          backdropFilter: 'blur(12px)',
          borderBottom: `1px solid ${theme.border}`,
        }}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, type: 'spring', mass: 0.5, stiffness: 120 }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex justify-between items-center h-20">
            <motion.div 
              className="flex items-center space-x-3"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <div 
                className="w-10 h-10 rounded-2xl flex items-center justify-center"
                style={{ backgroundColor: theme.dominance }}
              >
                <span className="text-white font-bold text-lg">Q</span>
              </div>
              <span 
                className="text-2xl font-bold"
                style={{ color: theme.text }}
              >
                QuickClaim
              </span>
            </motion.div>
            
            <div className="flex items-center space-x-4">
              <motion.button
                onClick={toggleTheme}
                className="p-3 rounded-xl transition-all duration-300"
                style={{ 
                  backgroundColor: theme.border,
                  color: theme.textSecondary 
                }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                {isDark ? '☀️' : '🌙'}
              </motion.button>
              
              <PremiumButton
                variant="ghost"
                onClick={() => setShowAuth(true)}
              >
                Sign In
              </PremiumButton>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section className="pt-32 pb-24 px-6 relative overflow-hidden">
        <motion.div 
          className="absolute inset-0 opacity-30"
          style={{ y }}
        >
          <div 
            className="absolute top-20 left-20 w-96 h-96 rounded-full blur-3xl"
            style={{ backgroundColor: `${theme.dominance}20` }}
          />
          <div 
            className="absolute bottom-20 right-20 w-96 h-96 rounded-full blur-3xl"
            style={{ backgroundColor: `${theme.trust}20` }}
          />
        </motion.div>

        <div className="max-w-6xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, type: 'spring', mass: 0.5, stiffness: 120 }}
          >
            <h1 
              className="text-display mb-8 leading-tight tracking-tight"
              style={{ color: theme.text }}
            >
              Get your benefits.<br />
              <span style={{ color: theme.dominance }}>Fast. No paperwork.</span>
            </h1>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, type: 'spring', mass: 0.5, stiffness: 120 }}
          >
            <p 
              className="text-body mb-12 max-w-3xl mx-auto font-light"
              style={{ color: theme.textSecondary }}
            >
              Discover, apply for, and track benefit claims in minutes. 
              Built for informal workers who deserve instant access to support.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, type: 'spring', mass: 0.5, stiffness: 120 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6"
          >
            <PremiumButton
              size="lg"
              onClick={() => setShowAuth(true)}
              icon={<ArrowRight size={20} />}
            >
              Check Eligibility
            </PremiumButton>
            
            <PremiumButton
              variant="secondary"
              size="lg"
            >
              Watch Demo
            </PremiumButton>
          </motion.div>
          
          <motion.p 
            className="text-sm"
            style={{ color: theme.textSecondary }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            Free • No commitment • 2 min setup
          </motion.p>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24" style={{ backgroundColor: theme.bgSecondary }}>
        <div className="max-w-6xl mx-auto px-6">
          <motion.div 
            className="text-center mb-20"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, type: 'spring', mass: 0.5, stiffness: 120 }}
          >
            <h2 
              className="text-heading mb-6"
              style={{ color: theme.text }}
            >
              Three steps to benefits
            </h2>
            <p 
              className="text-xl font-light"
              style={{ color: theme.textSecondary }}
            >
              No forms. No waiting. No confusion.
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-3 gap-12">
            {[
              {
                step: "01",
                icon: "👤",
                title: "Tell us about you",
                description: "Share your work type and location. We instantly match you with eligible benefits."
              },
              {
                step: "02", 
                icon: "📱",
                title: "Upload documents",
                description: "Simple photo uploads. Our AI extracts the data you need automatically."
              },
              {
                step: "03",
                icon: "✨",
                title: "Get approved",
                description: "Track your claim in real-time. Get notified the moment you're approved."
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                className="text-center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ 
                  duration: 0.8, 
                  delay: index * 0.2,
                  type: 'spring', 
                  mass: 0.5, 
                  stiffness: 120 
                }}
              >
                <div className="relative mb-8">
                  <div 
                    className="w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-4"
                    style={{ backgroundColor: `${theme.dominance}10` }}
                  >
                    <span className="text-4xl">{item.icon}</span>
                  </div>
                  <div 
                    className="absolute -top-2 -right-2 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold text-white"
                    style={{ backgroundColor: theme.dominance }}
                  >
                    {item.step}
                  </div>
                </div>
                
                <h3 
                  className="text-2xl font-semibold mb-4"
                  style={{ color: theme.text }}
                >
                  {item.title}
                </h3>
                <p 
                  className="leading-relaxed font-light"
                  style={{ color: theme.textSecondary }}
                >
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div 
            className="text-center mb-20"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, type: 'spring', mass: 0.5, stiffness: 120 }}
          >
            <h2 
              className="text-heading mb-6"
              style={{ color: theme.text }}
            >
              Built for trust and speed
            </h2>
          </motion.div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <PremiumCard
                key={index}
                className="p-8 text-center"
                tiltEnabled={true}
                glowOnHover={true}
              >
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div 
                    className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6"
                    style={{ 
                      backgroundColor: `${theme.dominance}10`,
                      color: theme.dominance 
                    }}
                  >
                    {feature.icon}
                  </div>
                  <h3 
                    className="text-xl font-semibold mb-4"
                    style={{ color: theme.text }}
                  >
                    {feature.title}
                  </h3>
                  <p 
                    className="leading-relaxed"
                    style={{ color: theme.textSecondary }}
                  >
                    {feature.description}
                  </p>
                </motion.div>
              </PremiumCard>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24" style={{ backgroundColor: theme.bgSecondary }}>
        <div className="max-w-6xl mx-auto px-6">
          <motion.div 
            className="text-center mb-20"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, type: 'spring', mass: 0.5, stiffness: 120 }}
          >
            <h2 
              className="text-heading mb-6"
              style={{ color: theme.text }}
            >
              Real people, real results
            </h2>
            <p 
              className="text-xl font-light"
              style={{ color: theme.textSecondary }}
            >
              Join thousands who've already received their benefits
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <PremiumCard
                key={index}
                className="p-8"
                tiltEnabled={true}
              >
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="flex items-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star 
                        key={i} 
                        size={16} 
                        fill={theme.dominance}
                        color={theme.dominance}
                      />
                    ))}
                  </div>
                  
                  <div className="mb-6">
                    <div 
                      className="text-3xl font-bold mb-3"
                      style={{ color: theme.dominance }}
                    >
                      {testimonial.amount}
                    </div>
                    <p 
                      className="leading-relaxed mb-6"
                      style={{ color: theme.text }}
                    >
                      "{testimonial.content}"
                    </p>
                  </div>
                  
                  <div className="flex items-center">
                    <div 
                      className="w-12 h-12 rounded-full flex items-center justify-center mr-4"
                      style={{ backgroundColor: `${theme.dominance}10` }}
                    >
                      <span 
                        className="font-semibold"
                        style={{ color: theme.dominance }}
                      >
                        {testimonial.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div>
                      <div 
                        className="font-semibold"
                        style={{ color: theme.text }}
                      >
                        {testimonial.name}
                      </div>
                      <div 
                        className="text-sm"
                        style={{ color: theme.textSecondary }}
                      >
                        {testimonial.role}
                      </div>
                    </div>
                  </div>
                </motion.div>
              </PremiumCard>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6" style={{ backgroundColor: theme.text }}>
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, type: 'spring', mass: 0.5, stiffness: 120 }}
          >
            <h2 
              className="text-heading mb-8"
              style={{ color: theme.bgPrimary }}
            >
              Ready to claim your benefits?
            </h2>
            <p 
              className="text-xl mb-12 font-light"
              style={{ color: theme.textSecondary }}
            >
              Join thousands of workers who've already received support
            </p>
            <PremiumButton
              size="lg"
              onClick={() => setShowAuth(true)}
              icon={<ArrowRight size={20} />}
            >
              Get Started Now
            </PremiumButton>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16" style={{ backgroundColor: theme.bgSecondary, borderTop: `1px solid ${theme.border}` }}>
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-12">
            <div className="md:col-span-2">
              <div className="flex items-center space-x-3 mb-6">
                <div 
                  className="w-10 h-10 rounded-2xl flex items-center justify-center"
                  style={{ backgroundColor: theme.dominance }}
                >
                  <span className="text-white font-bold text-lg">Q</span>
                </div>
                <span 
                  className="text-2xl font-bold"
                  style={{ color: theme.text }}
                >
                  QuickClaim
                </span>
              </div>
              <p 
                className="leading-relaxed font-light max-w-md"
                style={{ color: theme.textSecondary }}
              >
                Making benefits accessible for everyone. Fast, trustworthy, and built for the modern workforce.
              </p>
            </div>
            
            <div>
              <h4 
                className="font-semibold mb-4"
                style={{ color: theme.text }}
              >
                Legal
              </h4>
              <ul className="space-y-3">
                {['Privacy Policy', 'Terms of Service', 'Security'].map((item) => (
                  <li key={item}>
                    <a 
                      href="#" 
                      className="transition-colors duration-200"
                      style={{ 
                        color: theme.textSecondary,
                        textDecoration: 'none'
                      }}
                      onMouseEnter={(e) => e.target.style.color = theme.dominance}
                      onMouseLeave={(e) => e.target.style.color = theme.textSecondary}
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h4 
                className="font-semibold mb-4"
                style={{ color: theme.text }}
              >
                Support
              </h4>
              <ul className="space-y-3">
                {['Help Center', 'Contact Us', 'Status'].map((item) => (
                  <li key={item}>
                    <a 
                      href="#" 
                      className="transition-colors duration-200"
                      style={{ 
                        color: theme.textSecondary,
                        textDecoration: 'none'
                      }}
                      onMouseEnter={(e) => e.target.style.color = theme.dominance}
                      onMouseLeave={(e) => e.target.style.color = theme.textSecondary}
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          <div 
            className="mt-12 pt-8 text-center"
            style={{ 
              borderTop: `1px solid ${theme.border}`,
              color: theme.textSecondary 
            }}
          >
            <p>&copy; 2025 QuickClaim. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Auth Modal */}
      <GlassModal
        isOpen={showAuth}
        onClose={() => setShowAuth(false)}
        title="Welcome back"
        size="md"
      >
        <div className="p-8">
          <SignInForm />
        </div>
      </GlassModal>

      {/* Mobile CTA - Sticky */}
      <motion.div 
        className="fixed bottom-6 left-6 right-6 md:hidden z-40"
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        transition={{ delay: 1, duration: 0.6, type: 'spring', mass: 0.5, stiffness: 120 }}
      >
        <PremiumButton
          onClick={() => setShowAuth(true)}
          className="w-full"
          size="lg"
        >
          Check Eligibility
        </PremiumButton>
      </motion.div>
    </div>
  );
}
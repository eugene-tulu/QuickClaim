import { SignInForm } from "../SignInForm";
import { useState } from "react";

export function LandingPage() {
  const [showAuth, setShowAuth] = useState(false);

  const testimonials = [
    {
      name: "Maria Rodriguez",
      role: "Rideshare Driver",
      content: "Got my unemployment benefits in 3 days. No endless forms, no waiting in lines.",
      amount: "$1,800"
    },
    {
      name: "James Chen",
      role: "Freelance Designer",
      content: "The health insurance subsidy saved me $600/month. Process was incredibly smooth.",
      amount: "$600/mo"
    },
    {
      name: "Sarah Johnson",
      role: "Food Delivery",
      content: "Housing assistance came through when I needed it most. Simple upload, fast approval.",
      amount: "$1,200"
    }
  ];

  return (
    <div className="min-h-screen bg-porcelain">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md border-b border-white/20 z-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-imperial-purple rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">Q</span>
              </div>
              <span className="text-xl font-bold text-charcoal">QuickClaim</span>
            </div>
            <button
              onClick={() => setShowAuth(true)}
              className="btn-ghost text-sm"
            >
              Sign In
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <div className="animate-in">
            <h1 className="text-6xl lg:text-7xl font-bold text-charcoal mb-8 leading-tight tracking-tight">
              Get your benefits.<br />
              <span className="text-imperial-purple">Fast. No paperwork.</span>
            </h1>
          </div>
          
          <div className="animate-in stagger-1">
            <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed font-light">
              Discover, apply for, and track benefit claims in minutes. 
              Built for informal workers who deserve instant access to support.
            </p>
          </div>

          <div className="animate-in stagger-2">
            <button
              onClick={() => setShowAuth(true)}
              className="btn-primary text-lg px-12 py-5 mb-4"
            >
              Check Eligibility
            </button>
            <p className="text-sm text-gray-500">Free • No commitment • 2 min setup</p>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-4xl lg:text-5xl font-bold text-charcoal mb-6">
              Three steps to benefits
            </h2>
            <p className="text-xl text-gray-600 font-light">
              No forms. No waiting. No confusion.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-16">
            <div className="text-center animate-in">
              <div className="w-20 h-20 bg-imperial-purple/10 rounded-2xl flex items-center justify-center mx-auto mb-8">
                <span className="text-3xl">👤</span>
              </div>
              <div className="w-8 h-1 bg-imperial-purple rounded-full mx-auto mb-6"></div>
              <h3 className="text-2xl font-semibold text-charcoal mb-4">
                Tell us about you
              </h3>
              <p className="text-gray-600 leading-relaxed font-light">
                Share your work type and location. We instantly match you with eligible benefits.
              </p>
            </div>
            
            <div className="text-center animate-in stagger-1">
              <div className="w-20 h-20 bg-trust-blue/10 rounded-2xl flex items-center justify-center mx-auto mb-8">
                <span className="text-3xl">📱</span>
              </div>
              <div className="w-8 h-1 bg-trust-blue rounded-full mx-auto mb-6"></div>
              <h3 className="text-2xl font-semibold text-charcoal mb-4">
                Upload documents
              </h3>
              <p className="text-gray-600 leading-relaxed font-light">
                Simple photo uploads. Our AI extracts the data you need automatically.
              </p>
            </div>
            
            <div className="text-center animate-in stagger-2">
              <div className="w-20 h-20 bg-imperial-purple/10 rounded-2xl flex items-center justify-center mx-auto mb-8">
                <span className="text-3xl">✨</span>
              </div>
              <div className="w-8 h-1 bg-imperial-purple rounded-full mx-auto mb-6"></div>
              <h3 className="text-2xl font-semibold text-charcoal mb-4">
                Get approved
              </h3>
              <p className="text-gray-600 leading-relaxed font-light">
                Track your claim in real-time. Get notified the moment you're approved.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-porcelain">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-4xl lg:text-5xl font-bold text-charcoal mb-6">
              Real people, real results
            </h2>
            <p className="text-xl text-gray-600 font-light">
              Join thousands who've already received their benefits
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className={`card p-8 animate-in stagger-${index + 1}`}>
                <div className="mb-6">
                  <div className="text-3xl font-bold text-imperial-purple mb-2">
                    {testimonial.amount}
                  </div>
                  <p className="text-gray-700 leading-relaxed mb-6">
                    "{testimonial.content}"
                  </p>
                </div>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-imperial-purple/10 rounded-full flex items-center justify-center mr-4">
                    <span className="text-imperial-purple font-semibold">
                      {testimonial.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div>
                    <div className="font-semibold text-charcoal">{testimonial.name}</div>
                    <div className="text-sm text-gray-500">{testimonial.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Preview */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-4xl lg:text-5xl font-bold text-charcoal mb-6">
              Benefits you can claim
            </h2>
            <p className="text-xl text-gray-600 font-light">
              Instant access to the support you deserve
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="card-solid p-8 animate-in">
              <div className="w-12 h-12 bg-imperial-purple/10 rounded-xl flex items-center justify-center mb-6">
                <span className="text-2xl">💼</span>
              </div>
              <h3 className="text-xl font-semibold text-charcoal mb-4">
                Unemployment Insurance
              </h3>
              <p className="text-3xl font-bold text-imperial-purple mb-4">
                Up to $2,000
              </p>
              <p className="text-gray-600 leading-relaxed">
                Financial support for workers who have lost their jobs through no fault of their own.
              </p>
            </div>
            
            <div className="card-solid p-8 animate-in stagger-1">
              <div className="w-12 h-12 bg-trust-blue/10 rounded-xl flex items-center justify-center mb-6">
                <span className="text-2xl">🏥</span>
              </div>
              <h3 className="text-xl font-semibold text-charcoal mb-4">
                Health Insurance Subsidy
              </h3>
              <p className="text-3xl font-bold text-trust-blue mb-4">
                Up to $800/mo
              </p>
              <p className="text-gray-600 leading-relaxed">
                Reduce the cost of health insurance premiums for gig and freelance workers.
              </p>
            </div>
            
            <div className="card-solid p-8 animate-in stagger-2">
              <div className="w-12 h-12 bg-imperial-purple/10 rounded-xl flex items-center justify-center mb-6">
                <span className="text-2xl">🏠</span>
              </div>
              <h3 className="text-xl font-semibold text-charcoal mb-4">
                Housing Assistance
              </h3>
              <p className="text-3xl font-bold text-imperial-purple mb-4">
                Up to $1,500
              </p>
              <p className="text-gray-600 leading-relaxed">
                Financial assistance for rent and housing costs for low-income workers.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-charcoal">
        <div className="max-w-4xl mx-auto text-center px-6">
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-8">
            Ready to claim your benefits?
          </h2>
          <p className="text-xl text-gray-300 mb-12 font-light">
            Join thousands of workers who've already received support
          </p>
          <button
            onClick={() => setShowAuth(true)}
            className="btn-primary text-lg px-12 py-5"
          >
            Get Started Now
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-100 py-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-12">
            <div className="md:col-span-2">
              <div className="flex items-center space-x-2 mb-6">
                <div className="w-8 h-8 bg-imperial-purple rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">Q</span>
                </div>
                <span className="text-xl font-bold text-charcoal">QuickClaim</span>
              </div>
              <p className="text-gray-600 leading-relaxed font-light max-w-md">
                Making benefits accessible for everyone. Fast, trustworthy, and built for the modern workforce.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold text-charcoal mb-4">Legal</h4>
              <ul className="space-y-3 text-gray-600">
                <li><a href="#" className="hover:text-imperial-purple transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-imperial-purple transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-imperial-purple transition-colors">Security</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-charcoal mb-4">Support</h4>
              <ul className="space-y-3 text-gray-600">
                <li><a href="#" className="hover:text-imperial-purple transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-imperial-purple transition-colors">Contact Us</a></li>
                <li><a href="#" className="hover:text-imperial-purple transition-colors">Status</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-100 mt-12 pt-8 text-center text-gray-500">
            <p>&copy; 2025 QuickClaim. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Auth Modal */}
      {showAuth && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-md w-full p-8 animate-scale-in">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-bold text-charcoal">Welcome back</h2>
              <button
                onClick={() => setShowAuth(false)}
                className="text-gray-400 hover:text-gray-600 text-2xl"
              >
                ×
              </button>
            </div>
            <SignInForm />
          </div>
        </div>
      )}

      {/* Mobile CTA - Sticky */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 p-4 md:hidden z-40">
        <button
          onClick={() => setShowAuth(true)}
          className="btn-primary w-full"
        >
          Check Eligibility
        </button>
      </div>
    </div>
  );
}
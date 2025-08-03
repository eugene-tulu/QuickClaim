interface LandingPageProps {
  onShowAuth: () => void;
}

export function LandingPage({ onShowAuth }: LandingPageProps) {
  return (
    <div className="min-h-screen bg-porcelain">
      {/* Header */}
      <header className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-imperial-purple">QuickClaim</h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-charcoal">
                Instant benefits. No paperwork.
              </span>
              <button
                onClick={onShowAuth}
                className="bg-imperial-purple text-white px-4 py-2 rounded-lg hover:bg-opacity-90 transition-colors"
              >
                Sign In
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-6xl font-bold text-charcoal mb-6 leading-tight">
            Instant benefits.<br />
            <span className="text-imperial-purple">No paperwork.</span>
          </h1>
          <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed">
            Discover, apply for, and track benefit claims in minutes. 
            Built for informal workers who deserve better access to support.
          </p>
          
          <div className="flex justify-center space-x-4">
            <button
              onClick={onShowAuth}
              className="bg-imperial-purple text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-opacity-90 transition-colors"
            >
              Get Started
            </button>
            <button
              onClick={() => document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' })}
              className="border border-imperial-purple text-imperial-purple px-8 py-4 rounded-lg text-lg font-semibold hover:bg-imperial-purple hover:text-white transition-colors"
            >
              Learn More
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-charcoal mb-16">
            Why choose QuickClaim?
          </h2>
          
          <div className="grid md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="w-16 h-16 bg-imperial-purple rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-6">
                ⚡
              </div>
              <h3 className="text-xl font-semibold text-charcoal mb-4">
                Instant Notifications
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Get real-time email updates on your claim status. Never miss an important update again.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-trust-blue rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-6">
                🤖
              </div>
              <h3 className="text-xl font-semibold text-charcoal mb-4">
                AI-Powered Processing
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Our AI extracts data from your documents automatically, making applications effortless.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-imperial-purple rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-6">
                📧
              </div>
              <h3 className="text-xl font-semibold text-charcoal mb-4">
                Smart Email System
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Receive personalized emails with claim updates, reminders, and next steps.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 bg-porcelain">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-charcoal mb-16">
            How it works
          </h2>
          
          <div className="grid md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="w-16 h-16 bg-imperial-purple rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-6">
                1
              </div>
              <h3 className="text-xl font-semibold text-charcoal mb-4">
                Tell us about yourself
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Share your work type and location. We'll instantly match you with eligible benefits and send you a welcome email.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-trust-blue rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-6">
                2
              </div>
              <h3 className="text-xl font-semibold text-charcoal mb-4">
                Upload documents
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Simple photo uploads. Our AI extracts the data you need automatically. Get confirmation emails for each step.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-imperial-purple rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-6">
                3
              </div>
              <h3 className="text-xl font-semibold text-charcoal mb-4">
                Get approved
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Track your claim in real-time. Get instant email notifications the moment you're approved.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Preview */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-charcoal mb-16">
            Benefits you can claim
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-porcelain p-8 rounded-lg border border-gray-100">
              <h3 className="text-xl font-semibold text-charcoal mb-4">
                Unemployment Insurance
              </h3>
              <p className="text-3xl font-bold text-imperial-purple mb-4">
                Up to $2,000
              </p>
              <p className="text-gray-600 mb-4">
                Financial support for workers who have lost their jobs.
              </p>
              <p className="text-sm text-trust-blue">
                ✓ Email updates every step of the way
              </p>
            </div>
            
            <div className="bg-porcelain p-8 rounded-lg border border-gray-100">
              <h3 className="text-xl font-semibold text-charcoal mb-4">
                Health Insurance Subsidy
              </h3>
              <p className="text-3xl font-bold text-trust-blue mb-4">
                Up to $800
              </p>
              <p className="text-gray-600 mb-4">
                Reduce the cost of health insurance premiums.
              </p>
              <p className="text-sm text-trust-blue">
                ✓ Instant approval notifications
              </p>
            </div>
            
            <div className="bg-porcelain p-8 rounded-lg border border-gray-100">
              <h3 className="text-xl font-semibold text-charcoal mb-4">
                Housing Assistance
              </h3>
              <p className="text-3xl font-bold text-imperial-purple mb-4">
                Up to $1,500
              </p>
              <p className="text-gray-600 mb-4">
                Financial assistance for rent and housing costs.
              </p>
              <p className="text-sm text-trust-blue">
                ✓ Document reminders via email
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-imperial-purple">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to claim your benefits?
          </h2>
          <p className="text-xl text-purple-100 mb-8">
            Join thousands of workers who've already received their benefits through QuickClaim.
          </p>
          <button
            onClick={onShowAuth}
            className="bg-white text-imperial-purple px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-colors"
          >
            Start Your Application
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-charcoal text-white py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-2xl font-bold text-imperial-purple mb-4">QuickClaim</h3>
              <p className="text-gray-400">
                Making benefits accessible for everyone.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Features</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Email Notifications</li>
                <li>AI Document Processing</li>
                <li>Real-time Tracking</li>
                <li>Instant Approvals</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Benefits</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Unemployment Insurance</li>
                <li>Health Subsidies</li>
                <li>Housing Assistance</li>
                <li>More Coming Soon</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Help Center</li>
                <li>Contact Us</li>
                <li>Privacy Policy</li>
                <li>Terms of Service</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 QuickClaim. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

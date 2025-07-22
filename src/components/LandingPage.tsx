import { SignInForm } from "../SignInForm";

export function LandingPage() {
  return (
    <div className="min-h-screen bg-porcelain">
      {/* Header */}
      <header className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-imperial-purple">QuickClaim</h1>
            </div>
            <div className="text-sm text-charcoal">
              Instant benefits. No paperwork.
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
          
          {/* Sign In Form */}
          <div className="max-w-md mx-auto">
            <SignInForm />
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-white">
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
                Share your work type and location. We'll instantly match you with eligible benefits.
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
                Simple photo uploads. Our AI extracts the data you need automatically.
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
                Track your claim in real-time. Get notified the moment you're approved.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Preview */}
      <section className="py-20 bg-porcelain">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-charcoal mb-16">
            Benefits you can claim
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg border border-gray-100">
              <h3 className="text-xl font-semibold text-charcoal mb-4">
                Unemployment Insurance
              </h3>
              <p className="text-3xl font-bold text-imperial-purple mb-4">
                Up to $2,000
              </p>
              <p className="text-gray-600">
                Financial support for workers who have lost their jobs.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-lg border border-gray-100">
              <h3 className="text-xl font-semibold text-charcoal mb-4">
                Health Insurance Subsidy
              </h3>
              <p className="text-3xl font-bold text-trust-blue mb-4">
                Up to $800
              </p>
              <p className="text-gray-600">
                Reduce the cost of health insurance premiums.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-lg border border-gray-100">
              <h3 className="text-xl font-semibold text-charcoal mb-4">
                Housing Assistance
              </h3>
              <p className="text-3xl font-bold text-imperial-purple mb-4">
                Up to $1,500
              </p>
              <p className="text-gray-600">
                Financial assistance for rent and housing costs.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-charcoal text-white py-12">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h3 className="text-2xl font-bold text-imperial-purple mb-4">QuickClaim</h3>
          <p className="text-gray-400">
            Making benefits accessible for everyone.
          </p>
        </div>
      </footer>
    </div>
  );
}

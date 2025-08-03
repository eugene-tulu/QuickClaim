import { SignInForm } from "../SignInForm";

interface AuthPageProps {
  onBackToLanding: () => void;
}

export function AuthPage({ onBackToLanding }: AuthPageProps) {
  return (
    <div className="min-h-screen bg-porcelain">
      {/* Header */}
      <header className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <button
                onClick={onBackToLanding}
                className="text-imperial-purple hover:text-opacity-80 mr-4"
              >
                ← Back
              </button>
              <h1 className="text-2xl font-bold text-imperial-purple">QuickClaim</h1>
            </div>
          </div>
        </div>
      </header>

      {/* Auth Section */}
      <section className="py-20 px-4">
        <div className="max-w-md mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-charcoal mb-4">
              Welcome back
            </h1>
            <p className="text-gray-600">
              Sign in to access your benefits dashboard
            </p>
          </div>
          
          <div className="bg-white rounded-lg border border-gray-100 p-8">
            <SignInForm />
          </div>

          <div className="text-center mt-6">
            <p className="text-sm text-gray-600">
              New to QuickClaim?{" "}
              <button
                onClick={onBackToLanding}
                className="text-imperial-purple hover:text-opacity-80 font-medium"
              >
                Learn more
              </button>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

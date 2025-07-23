import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { SignOutButton } from "../SignOutButton";
import { ClaimTimeline } from "./ClaimTimeline";
import { BenefitsGrid } from "./BenefitsGrid";
import { TasksList } from "./TasksList";
import { useState } from "react";

interface DashboardProps {
  showAdminToggle?: boolean;
  onToggleAdmin?: () => void;
}

export function Dashboard({ showAdminToggle, onToggleAdmin }: DashboardProps = {}) {
  const [darkMode, setDarkMode] = useState(false);
  const user = useQuery(api.users.getCurrentUser);
  const claims = useQuery(api.claims.getUserClaims);
  const benefits = useQuery(api.benefits.getEligibleBenefits);

  const totalAmount = claims?.reduce((sum, claim) => sum + (claim.amount || 0), 0) || 0;
  const approvedClaims = claims?.filter(claim => claim.status === 'approved' || claim.status === 'paid').length || 0;

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'bg-charcoal' : 'bg-porcelain'}`}>
      {/* Header */}
      <header className={`sticky top-0 z-40 backdrop-blur-md border-b transition-colors duration-300 ${
        darkMode ? 'bg-charcoal/80 border-gray-800' : 'bg-white/80 border-gray-100'
      }`}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <div className="w-8 h-8 bg-imperial-purple rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">Q</span>
              </div>
              <span className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-charcoal'}`}>
                QuickClaim
              </span>
              <span className="text-gray-400">|</span>
              <span className={`${darkMode ? 'text-gray-300' : 'text-charcoal'}`}>
                Dashboard
              </span>
            </div>
            
            <div className="flex items-center space-x-6">
              <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                Welcome back, {user?.name}
              </span>
              
              {/* Dark Mode Toggle */}
              <button
                onClick={() => setDarkMode(!darkMode)}
                className={`p-2 rounded-lg transition-colors ${
                  darkMode ? 'bg-gray-800 text-gray-300 hover:bg-gray-700' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {darkMode ? '☀️' : '🌙'}
              </button>
              
              {showAdminToggle && (
                <button
                  onClick={onToggleAdmin}
                  className="text-sm text-imperial-purple hover:text-opacity-80 font-medium"
                >
                  Admin Panel
                </button>
              )}
              
              {/* Avatar Dropdown */}
              <div className="relative">
                <div className="w-8 h-8 bg-imperial-purple/10 rounded-full flex items-center justify-center">
                  <span className="text-imperial-purple font-semibold text-sm">
                    {user?.name?.split(' ').map(n => n[0]).join('') || 'U'}
                  </span>
                </div>
              </div>
              
              <SignOutButton />
            </div>
          </div>
        </div>
      </header>

      {/* Stats Bar */}
      <div className={`border-b transition-colors duration-300 ${
        darkMode ? 'bg-charcoal border-gray-800' : 'bg-white border-gray-100'
      }`}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center md:text-left">
              <div className="text-3xl font-bold text-imperial-purple mb-1">
                ${totalAmount.toLocaleString()}
              </div>
              <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Total claimed
              </div>
            </div>
            <div className="text-center">
              <div className={`text-3xl font-bold mb-1 ${darkMode ? 'text-white' : 'text-charcoal'}`}>
                {claims?.length || 0}
              </div>
              <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Active claims
              </div>
            </div>
            <div className="text-center md:text-right">
              <div className="text-3xl font-bold text-trust-blue mb-1">
                {approvedClaims}
              </div>
              <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Approved
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Timeline */}
          <div className="lg:col-span-2">
            <ClaimTimeline claims={claims || []} darkMode={darkMode} />
          </div>

          {/* Right Column - Tasks & Actions */}
          <div className="space-y-8">
            <TasksList darkMode={darkMode} />
            <BenefitsGrid benefits={benefits || []} darkMode={darkMode} />
          </div>
        </div>
      </div>
    </div>
  );
}
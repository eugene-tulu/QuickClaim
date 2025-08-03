import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { SignOutButton } from "../SignOutButton";
import { ClaimTimeline } from "./ClaimTimeline";
import { BenefitsGrid } from "./BenefitsGrid";
import { TasksList } from "./TasksList";
import { EmailPreferences } from "./EmailPreferences";
import { useState } from "react";

interface DashboardProps {
  showAdminToggle?: boolean;
  onToggleAdmin?: () => void;
}

export function Dashboard({ showAdminToggle, onToggleAdmin }: DashboardProps = {}) {
  const [showEmailPrefs, setShowEmailPrefs] = useState(false);
  const user = useQuery(api.users.getCurrentUser);
  const claims = useQuery(api.claims.getUserClaims);
  const benefits = useQuery(api.benefits.getEligibleBenefits);

  return (
    <div className="min-h-screen bg-porcelain">
      {/* Header */}
      <header className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold text-imperial-purple">QuickClaim</h1>
              <span className="text-gray-400">|</span>
              <span className="text-charcoal">Dashboard</span>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">
                Welcome, {user?.name}
              </span>
              <button
                onClick={() => setShowEmailPrefs(true)}
                className="text-sm text-gray-600 hover:text-imperial-purple"
                title="Email Preferences"
              >
                📧
              </button>
              {showAdminToggle && (
                <button
                  onClick={onToggleAdmin}
                  className="text-sm text-imperial-purple hover:text-opacity-80"
                >
                  Admin Panel
                </button>
              )}
              <SignOutButton />
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Overview */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg border border-gray-100 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Claims</p>
                <p className="text-2xl font-bold text-charcoal">{claims?.length || 0}</p>
              </div>
              <div className="text-3xl">📋</div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg border border-gray-100 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Approved</p>
                <p className="text-2xl font-bold text-green-600">
                  {claims?.filter(c => c.status === 'approved' || c.status === 'paid').length || 0}
                </p>
              </div>
              <div className="text-3xl">✅</div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg border border-gray-100 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Value</p>
                <p className="text-2xl font-bold text-imperial-purple">
                  ${claims?.reduce((sum, claim) => sum + (claim.amount || 0), 0).toLocaleString() || '0'}
                </p>
              </div>
              <div className="text-3xl">💰</div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg border border-gray-100 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Available Benefits</p>
                <p className="text-2xl font-bold text-trust-blue">{benefits?.length || 0}</p>
              </div>
              <div className="text-3xl">🎯</div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Timeline */}
          <div className="lg:col-span-2">
            <ClaimTimeline claims={claims || []} />
          </div>

          {/* Right Column - Tasks & Actions */}
          <div className="space-y-8">
            <TasksList />
            <BenefitsGrid benefits={benefits || []} />
          </div>
        </div>
      </div>

      {/* Email Preferences Modal */}
      {showEmailPrefs && (
        <EmailPreferences onClose={() => setShowEmailPrefs(false)} />
      )}
    </div>
  );
}

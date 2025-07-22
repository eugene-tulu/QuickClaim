import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { SignOutButton } from "../SignOutButton";
import { ClaimTimeline } from "./ClaimTimeline";
import { BenefitsGrid } from "./BenefitsGrid";
import { TasksList } from "./TasksList";

interface DashboardProps {
  showAdminToggle?: boolean;
  onToggleAdmin?: () => void;
}

export function Dashboard({ showAdminToggle, onToggleAdmin }: DashboardProps = {}) {
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
    </div>
  );
}

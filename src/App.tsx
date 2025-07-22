import { Authenticated, Unauthenticated, useQuery } from "convex/react";
import { api } from "../convex/_generated/api";
import { SignInForm } from "./SignInForm";
import { SignOutButton } from "./SignOutButton";
import { Toaster } from "sonner";
import { Dashboard } from "./components/Dashboard";
import { Onboarding } from "./components/Onboarding";
import { LandingPage } from "./components/LandingPage";
import { AdminPanel } from "./components/AdminPanel";
import { useState } from "react";

export default function App() {
  return (
    <div className="min-h-screen bg-porcelain">
      <Toaster />
      <Authenticated>
        <AuthenticatedApp />
      </Authenticated>
      <Unauthenticated>
        <LandingPage />
      </Unauthenticated>
    </div>
  );
}

function AuthenticatedApp() {
  const [showAdmin, setShowAdmin] = useState(false);
  const user = useQuery(api.users.getCurrentUser);

  if (user === undefined) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-imperial-purple"></div>
      </div>
    );
  }

  // Check for admin access (simple check - in production you'd have proper role management)
  const isAdmin = user?.email?.includes("admin") || window.location.search.includes("admin=true");

  if (showAdmin && isAdmin) {
    return <AdminPanel />;
  }

  if (!user?.onboardingComplete) {
    return <Onboarding />;
  }

  return <Dashboard showAdminToggle={isAdmin} onToggleAdmin={() => setShowAdmin(!showAdmin)} />;
}

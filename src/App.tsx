import { Authenticated, Unauthenticated, useQuery } from "convex/react";
import { api } from "../convex/_generated/api";
import { Toaster } from "sonner";
import { Dashboard } from "./components/Dashboard";
import { Onboarding } from "./components/Onboarding";
import { LandingPage } from "./components/LandingPage";
import { AuthPage } from "./components/AuthPage";
import { AdminPanel } from "./components/AdminPanel";
import { useState } from "react";

export default function App() {
  return (
    <div className="min-h-screen bg-porcelain">
      <Toaster position="top-right" />
      <Authenticated>
        <AuthenticatedApp />
      </Authenticated>
      <Unauthenticated>
        <UnauthenticatedApp />
      </Unauthenticated>
    </div>
  );
}

function UnauthenticatedApp() {
  const [showAuth, setShowAuth] = useState(false);

  if (showAuth) {
    return <AuthPage onBackToLanding={() => setShowAuth(false)} />;
  }

  return <LandingPage onShowAuth={() => setShowAuth(true)} />;
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

  // Check for admin access
  const isAdmin = user?.email?.includes("admin") || window.location.search.includes("admin=true");

  if (showAdmin && isAdmin) {
    return <AdminPanel onBackToDashboard={() => setShowAdmin(false)} />;
  }

  if (!user?.onboardingComplete) {
    return <Onboarding />;
  }

  return <Dashboard showAdminToggle={isAdmin} onToggleAdmin={() => setShowAdmin(!showAdmin)} />;
}

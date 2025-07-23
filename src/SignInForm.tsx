"use client";
import { useAuthActions } from "@convex-dev/auth/react";
import { useState } from "react";
import { toast } from "sonner";

export function SignInForm() {
  const { signIn } = useAuthActions();
  const [flow, setFlow] = useState<"signIn" | "signUp">("signIn");
  const [submitting, setSubmitting] = useState(false);

  return (
    <div className="w-full">
      <form
        className="space-y-6"
        onSubmit={(e) => {
          e.preventDefault();
          setSubmitting(true);
          const formData = new FormData(e.target as HTMLFormElement);
          formData.set("flow", flow);
          void signIn("password", formData).catch((error) => {
            let toastTitle = "";
            if (error.message.includes("Invalid password")) {
              toastTitle = "Invalid password. Please try again.";
            } else {
              toastTitle =
                flow === "signIn"
                  ? "Could not sign in, did you mean to sign up?"
                  : "Could not sign up, did you mean to sign in?";
            }
            toast.error(toastTitle);
            setSubmitting(false);
          });
        }}
      >
        <div>
          <input
            className="input-field"
            type="email"
            name="email"
            placeholder="Enter your email"
            required
          />
        </div>
        
        <div>
          <input
            className="input-field"
            type="password"
            name="password"
            placeholder="Enter your password"
            required
          />
        </div>
        
        <button 
          className="btn-primary w-full" 
          type="submit" 
          disabled={submitting}
        >
          {submitting ? "Please wait..." : (flow === "signIn" ? "Sign in" : "Create account")}
        </button>
        
        <div className="text-center">
          <button
            type="button"
            className="text-gray-600 hover:text-imperial-purple transition-colors font-medium"
            onClick={() => setFlow(flow === "signIn" ? "signUp" : "signIn")}
          >
            {flow === "signIn"
              ? "Don't have an account? Sign up"
              : "Already have an account? Sign in"}
          </button>
        </div>
      </form>
      
      <div className="flex items-center my-8">
        <hr className="flex-1 border-gray-200" />
        <span className="mx-4 text-gray-500 text-sm">or</span>
        <hr className="flex-1 border-gray-200" />
      </div>
      
      <button 
        className="btn-secondary w-full" 
        onClick={() => void signIn("anonymous")}
      >
        Continue as guest
      </button>
    </div>
  );
}
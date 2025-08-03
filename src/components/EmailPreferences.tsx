import { useState } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { toast } from "sonner";

interface EmailPreferencesProps {
  onClose: () => void;
}

export function EmailPreferences({ onClose }: EmailPreferencesProps) {
  const user = useQuery(api.users.getCurrentUser);
  const updateEmailPreferences = useMutation(api.users.updateEmailPreferences);
  
  const [preferences, setPreferences] = useState({
    claimUpdates: user?.emailPreferences?.claimUpdates ?? true,
    marketing: user?.emailPreferences?.marketing ?? true,
    reminders: user?.emailPreferences?.reminders ?? true,
  });

  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    try {
      await updateEmailPreferences(preferences);
      toast.success("Email preferences updated!");
      onClose();
    } catch (error) {
      toast.error("Failed to update preferences");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-md w-full">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-charcoal">
              Email Preferences
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600"
            >
              ✕
            </button>
          </div>

          <div className="space-y-6">
            <div>
              <p className="text-sm text-gray-600 mb-4">
                Choose which emails you'd like to receive from QuickClaim.
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <input
                  type="checkbox"
                  id="claimUpdates"
                  checked={preferences.claimUpdates}
                  onChange={(e) => setPreferences(prev => ({
                    ...prev,
                    claimUpdates: e.target.checked
                  }))}
                  className="mt-1 h-4 w-4 text-imperial-purple focus:ring-imperial-purple border-gray-300 rounded"
                />
                <div>
                  <label htmlFor="claimUpdates" className="font-medium text-charcoal">
                    Claim Updates
                  </label>
                  <p className="text-sm text-gray-600">
                    Get notified when your claim status changes, approvals, and payment confirmations.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <input
                  type="checkbox"
                  id="reminders"
                  checked={preferences.reminders}
                  onChange={(e) => setPreferences(prev => ({
                    ...prev,
                    reminders: e.target.checked
                  }))}
                  className="mt-1 h-4 w-4 text-imperial-purple focus:ring-imperial-purple border-gray-300 rounded"
                />
                <div>
                  <label htmlFor="reminders" className="font-medium text-charcoal">
                    Reminders & Tasks
                  </label>
                  <p className="text-sm text-gray-600">
                    Receive reminders about missing documents, deadlines, and action items.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <input
                  type="checkbox"
                  id="marketing"
                  checked={preferences.marketing}
                  onChange={(e) => setPreferences(prev => ({
                    ...prev,
                    marketing: e.target.checked
                  }))}
                  className="mt-1 h-4 w-4 text-imperial-purple focus:ring-imperial-purple border-gray-300 rounded"
                />
                <div>
                  <label htmlFor="marketing" className="font-medium text-charcoal">
                    Product Updates
                  </label>
                  <p className="text-sm text-gray-600">
                    Learn about new benefits, features, and tips to maximize your claims.
                  </p>
                </div>
              </div>
            </div>

            <div className="border-t border-gray-200 pt-4">
              <p className="text-xs text-gray-500">
                You can update these preferences at any time. Critical security and account notifications will always be sent.
              </p>
            </div>
          </div>

          <div className="flex space-x-3 mt-8">
            <button
              onClick={onClose}
              className="flex-1 border border-gray-300 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              disabled={saving}
              className="flex-1 bg-imperial-purple text-white py-3 rounded-lg font-semibold hover:bg-opacity-90 transition-colors disabled:opacity-50"
            >
              {saving ? "Saving..." : "Save Preferences"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

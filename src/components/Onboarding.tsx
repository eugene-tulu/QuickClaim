import { useState } from "react";
import { useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { toast } from "sonner";

export function Onboarding() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    region: "",
    workType: "",
  });
  const [uploading, setUploading] = useState(false);

  const updateProfile = useMutation(api.users.updateProfile);
  const uploadIdDocument = useMutation(api.users.uploadIdDocument);
  const generateUploadUrl = useMutation(api.users.generateUploadUrl);
  const completeOnboarding = useMutation(api.users.completeOnboarding);

  const handleProfileSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateProfile(formData);
      setStep(2);
    } catch (error) {
      toast.error("Failed to update profile");
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const uploadUrl = await generateUploadUrl();
      
      const result = await fetch(uploadUrl, {
        method: "POST",
        headers: { "Content-Type": file.type },
        body: file,
      });

      if (!result.ok) throw new Error("Upload failed");

      const { storageId } = await result.json();
      await uploadIdDocument({ storageId });
      
      setStep(3);
    } catch (error) {
      toast.error("Failed to upload document");
    } finally {
      setUploading(false);
    }
  };

  const handleComplete = async () => {
    try {
      await completeOnboarding();
      toast.success("Welcome to QuickClaim!");
    } catch (error) {
      toast.error("Failed to complete onboarding");
    }
  };

  return (
    <div className="min-h-screen bg-porcelain flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between text-sm text-gray-500 mb-2">
            <span>Step {step} of 3</span>
            <span>{Math.round((step / 3) * 100)}% complete</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-imperial-purple h-2 rounded-full transition-all duration-300"
              style={{ width: `${(step / 3) * 100}%` }}
            />
          </div>
        </div>

        {step === 1 && (
          <div className="bg-white p-8 rounded-lg border border-gray-100">
            <h2 className="text-2xl font-bold text-charcoal mb-6">
              Tell us about yourself
            </h2>
            
            <form onSubmit={handleProfileSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-charcoal mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-imperial-purple focus:ring-1 focus:ring-imperial-purple outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-charcoal mb-2">
                  Region
                </label>
                <select
                  required
                  value={formData.region}
                  onChange={(e) => setFormData({ ...formData, region: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-imperial-purple focus:ring-1 focus:ring-imperial-purple outline-none"
                >
                  <option value="">Select your region</option>
                  <option value="California">California</option>
                  <option value="New York">New York</option>
                  <option value="Texas">Texas</option>
                  <option value="Florida">Florida</option>
                  <option value="Illinois">Illinois</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-charcoal mb-2">
                  Work Type
                </label>
                <select
                  required
                  value={formData.workType}
                  onChange={(e) => setFormData({ ...formData, workType: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-imperial-purple focus:ring-1 focus:ring-imperial-purple outline-none"
                >
                  <option value="">Select your work type</option>
                  <option value="full-time">Full-time</option>
                  <option value="part-time">Part-time</option>
                  <option value="contract">Contract</option>
                  <option value="gig">Gig work</option>
                  <option value="freelance">Freelance</option>
                  <option value="seasonal">Seasonal</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full bg-imperial-purple text-white py-3 rounded-lg font-semibold hover:bg-opacity-90 transition-colors"
              >
                Continue
              </button>
            </form>
          </div>
        )}

        {step === 2 && (
          <div className="bg-white p-8 rounded-lg border border-gray-100">
            <h2 className="text-2xl font-bold text-charcoal mb-6">
              Upload ID Document
            </h2>
            
            <p className="text-gray-600 mb-6">
              Upload a photo of your government-issued ID to verify your identity.
            </p>

            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
              <input
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                disabled={uploading}
                className="hidden"
                id="id-upload"
              />
              <label
                htmlFor="id-upload"
                className={`cursor-pointer ${uploading ? 'opacity-50' : ''}`}
              >
                <div className="text-4xl text-gray-400 mb-4">📄</div>
                <p className="text-lg font-medium text-charcoal mb-2">
                  {uploading ? "Uploading..." : "Click to upload ID"}
                </p>
                <p className="text-sm text-gray-500">
                  PNG, JPG up to 10MB
                </p>
              </label>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="bg-white p-8 rounded-lg border border-gray-100 text-center">
            <div className="text-6xl mb-6">🎉</div>
            <h2 className="text-2xl font-bold text-charcoal mb-4">
              You're all set!
            </h2>
            <p className="text-gray-600 mb-8">
              Your profile is complete. Let's find the benefits you're eligible for.
            </p>
            
            <button
              onClick={handleComplete}
              className="w-full bg-imperial-purple text-white py-3 rounded-lg font-semibold hover:bg-opacity-90 transition-colors"
            >
              Enter Dashboard
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

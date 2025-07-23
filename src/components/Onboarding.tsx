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
    <div className="min-h-screen bg-porcelain flex items-center justify-center p-6">
      <div className="max-w-lg w-full">
        {/* Progress Bar */}
        <div className="mb-12">
          <div className="flex justify-between text-sm text-gray-500 mb-4">
            <span className="font-medium">Step {step} of 3</span>
            <span>{Math.round((step / 3) * 100)}% complete</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-1">
            <div 
              className="bg-imperial-purple h-1 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${(step / 3) * 100}%` }}
            />
          </div>
        </div>

        {step === 1 && (
          <div className="card-solid p-10 animate-in">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-charcoal mb-4">
                Tell us about yourself
              </h2>
              <p className="text-gray-600 font-light">
                We'll match you with the right benefits
              </p>
            </div>
            
            <form onSubmit={handleProfileSubmit} className="space-y-8">
              <div>
                <label className="block text-sm font-medium text-charcoal mb-3">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="input-field-boxed"
                  placeholder="Enter your full name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-charcoal mb-3">
                  Region
                </label>
                <select
                  required
                  value={formData.region}
                  onChange={(e) => setFormData({ ...formData, region: e.target.value })}
                  className="input-field-boxed"
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
                <label className="block text-sm font-medium text-charcoal mb-3">
                  Work Type
                </label>
                <select
                  required
                  value={formData.workType}
                  onChange={(e) => setFormData({ ...formData, workType: e.target.value })}
                  className="input-field-boxed"
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
                className="btn-primary w-full text-lg py-5"
              >
                Continue
              </button>
            </form>
          </div>
        )}

        {step === 2 && (
          <div className="card-solid p-10 animate-in">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-charcoal mb-4">
                Upload ID Document
              </h2>
              <p className="text-gray-600 font-light">
                We need to verify your identity for security
              </p>
            </div>

            <div className="border-2 border-dashed border-gray-200 rounded-2xl p-12 text-center hover:border-imperial-purple transition-colors">
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
                <div className="w-16 h-16 bg-imperial-purple/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <span className="text-3xl">📄</span>
                </div>
                <p className="text-xl font-medium text-charcoal mb-3">
                  {uploading ? "Uploading..." : "Click to upload ID"}
                </p>
                <p className="text-gray-500">
                  PNG, JPG up to 10MB
                </p>
              </label>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="card-solid p-10 text-center animate-in">
            <div className="w-20 h-20 bg-imperial-purple/10 rounded-2xl flex items-center justify-center mx-auto mb-8">
              <span className="text-4xl">🎉</span>
            </div>
            <h2 className="text-3xl font-bold text-charcoal mb-4">
              You're all set!
            </h2>
            <p className="text-gray-600 mb-10 font-light text-lg">
              Your profile is complete. Let's find the benefits you're eligible for.
            </p>
            
            <button
              onClick={handleComplete}
              className="btn-primary w-full text-lg py-5"
            >
              Enter Dashboard
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
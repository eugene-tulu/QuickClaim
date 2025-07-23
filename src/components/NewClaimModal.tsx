import { useState } from "react";
import { useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { Doc } from "../../convex/_generated/dataModel";
import { toast } from "sonner";

interface NewClaimModalProps {
  benefit: Doc<"benefits">;
  onClose: () => void;
  darkMode?: boolean;
}

export function NewClaimModal({ benefit, onClose, darkMode = false }: NewClaimModalProps) {
  const [step, setStep] = useState(1);
  const [description, setDescription] = useState("");
  const [uploading, setUploading] = useState(false);
  const [claimId, setClaimId] = useState<string | null>(null);

  const createClaim = useMutation(api.claims.createClaim);
  const submitClaim = useMutation(api.claims.submitClaim);
  const uploadClaimDocument = useMutation(api.claims.uploadClaimDocument);
  const generateUploadUrl = useMutation(api.users.generateUploadUrl);

  const handleCreateClaim = async () => {
    try {
      const id = await createClaim({
        type: benefit.type,
        description,
      });
      setClaimId(id);
      setStep(2);
    } catch (error) {
      toast.error("Failed to create claim");
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !claimId) return;

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
      await uploadClaimDocument({
        claimId: claimId as any,
        name: file.name,
        storageId,
      });
      
      toast.success("Document uploaded successfully");
    } catch (error) {
      toast.error("Failed to upload document");
    } finally {
      setUploading(false);
    }
  };

  const handleSubmitClaim = async () => {
    if (!claimId) return;
    
    try {
      await submitClaim({ claimId: claimId as any });
      toast.success("Claim submitted successfully!");
      onClose();
    } catch (error) {
      toast.error("Failed to submit claim");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className={`rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto animate-scale-in ${
        darkMode ? 'bg-gray-900 border border-gray-800' : 'bg-white'
      }`}>
        <div className="p-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-charcoal'}`}>
              Apply for {benefit.name}
            </h2>
            <button
              onClick={onClose}
              className={`text-2xl ${darkMode ? 'text-gray-400 hover:text-gray-300' : 'text-gray-400 hover:text-gray-600'}`}
            >
              ×
            </button>
          </div>

          {step === 1 && (
            <div>
              <div className={`rounded-2xl p-6 mb-8 ${
                darkMode ? 'bg-imperial-purple/10' : 'bg-imperial-purple/5'
              }`}>
                <h3 className={`font-semibold mb-3 ${darkMode ? 'text-white' : 'text-charcoal'}`}>
                  {benefit.name}
                </h3>
                <p className="text-3xl font-bold text-imperial-purple mb-3">
                  Up to ${benefit.maxAmount.toLocaleString()}
                </p>
                <p className={`text-sm mb-4 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  {benefit.description}
                </p>
                <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  Processing time: {benefit.processingTime}
                </p>
              </div>

              <div className="mb-8">
                <label className={`block text-sm font-medium mb-3 ${darkMode ? 'text-white' : 'text-charcoal'}`}>
                  Tell us about your situation (optional)
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe your circumstances..."
                  className={`w-full px-4 py-4 rounded-xl border transition-colors ${
                    darkMode 
                      ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-400 focus:border-imperial-purple' 
                      : 'bg-white border-gray-200 text-charcoal placeholder-gray-400 focus:border-imperial-purple'
                  } focus:ring-1 focus:ring-imperial-purple outline-none`}
                  rows={4}
                />
              </div>

              <div className="mb-8">
                <h4 className={`font-medium mb-4 ${darkMode ? 'text-white' : 'text-charcoal'}`}>
                  Required Documents:
                </h4>
                <ul className="space-y-3">
                  {benefit.requiredDocuments.map((doc, index) => (
                    <li key={index} className="flex items-center text-sm">
                      <span className="w-2 h-2 bg-imperial-purple rounded-full mr-4 flex-shrink-0" />
                      <span className={darkMode ? 'text-gray-300' : 'text-gray-600'}>
                        {doc}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <button
                onClick={handleCreateClaim}
                className="btn-primary w-full text-lg py-4"
              >
                Start Application
              </button>
            </div>
          )}

          {step === 2 && (
            <div>
              <h3 className={`text-xl font-semibold mb-4 ${darkMode ? 'text-white' : 'text-charcoal'}`}>
                Upload Documents
              </h3>
              
              <p className={`mb-8 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                Upload the required documents for your {benefit.name} claim.
              </p>

              <div className={`border-2 border-dashed rounded-2xl p-8 text-center mb-8 transition-colors ${
                darkMode 
                  ? 'border-gray-700 hover:border-imperial-purple' 
                  : 'border-gray-300 hover:border-imperial-purple'
              }`}>
                <input
                  type="file"
                  accept="image/*,.pdf"
                  onChange={handleFileUpload}
                  disabled={uploading}
                  className="hidden"
                  id="doc-upload"
                />
                <label
                  htmlFor="doc-upload"
                  className={`cursor-pointer ${uploading ? 'opacity-50' : ''}`}
                >
                  <div className="w-16 h-16 bg-imperial-purple/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <span className="text-3xl">📄</span>
                  </div>
                  <p className={`text-lg font-medium mb-2 ${darkMode ? 'text-white' : 'text-charcoal'}`}>
                    {uploading ? "Uploading..." : "Click to upload documents"}
                  </p>
                  <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    PNG, JPG, PDF up to 10MB
                  </p>
                </label>
              </div>

              <div className="flex space-x-4">
                <button
                  onClick={() => setStep(1)}
                  className="btn-secondary flex-1"
                >
                  Back
                </button>
                <button
                  onClick={handleSubmitClaim}
                  className="btn-primary flex-1"
                >
                  Submit Claim
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
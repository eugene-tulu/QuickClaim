import { useState } from "react";
import { useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { Doc } from "../../convex/_generated/dataModel";
import { toast } from "sonner";

interface NewClaimModalProps {
  benefit: Doc<"benefits">;
  onClose: () => void;
}

export function NewClaimModal({ benefit, onClose }: NewClaimModalProps) {
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
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-charcoal">
              Apply for {benefit.name}
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600"
            >
              ✕
            </button>
          </div>

          {step === 1 && (
            <div>
              <div className="bg-imperial-purple bg-opacity-5 rounded-lg p-4 mb-6">
                <h3 className="font-semibold text-charcoal mb-2">
                  {benefit.name}
                </h3>
                <p className="text-2xl font-bold text-imperial-purple mb-2">
                  Up to ${benefit.maxAmount.toLocaleString()}
                </p>
                <p className="text-sm text-gray-600 mb-3">
                  {benefit.description}
                </p>
                <p className="text-xs text-gray-500">
                  Processing time: {benefit.processingTime}
                </p>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-charcoal mb-2">
                  Tell us about your situation (optional)
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe your circumstances..."
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-imperial-purple focus:ring-1 focus:ring-imperial-purple outline-none"
                  rows={4}
                />
              </div>

              <div className="mb-6">
                <h4 className="font-medium text-charcoal mb-3">
                  Required Documents:
                </h4>
                <ul className="space-y-2">
                  {benefit.requiredDocuments.map((doc, index) => (
                    <li key={index} className="flex items-center text-sm text-gray-600">
                      <span className="w-2 h-2 bg-imperial-purple rounded-full mr-3" />
                      {doc}
                    </li>
                  ))}
                </ul>
              </div>

              <button
                onClick={handleCreateClaim}
                className="w-full bg-imperial-purple text-white py-3 rounded-lg font-semibold hover:bg-opacity-90 transition-colors"
              >
                Start Application
              </button>
            </div>
          )}

          {step === 2 && (
            <div>
              <h3 className="text-lg font-semibold text-charcoal mb-4">
                Upload Documents
              </h3>
              
              <p className="text-gray-600 mb-6">
                Upload the required documents for your {benefit.name} claim.
              </p>

              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center mb-6">
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
                  <div className="text-3xl text-gray-400 mb-3">📄</div>
                  <p className="font-medium text-charcoal mb-2">
                    {uploading ? "Uploading..." : "Click to upload documents"}
                  </p>
                  <p className="text-sm text-gray-500">
                    PNG, JPG, PDF up to 10MB
                  </p>
                </label>
              </div>

              <div className="flex space-x-3">
                <button
                  onClick={() => setStep(1)}
                  className="flex-1 border border-gray-300 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
                >
                  Back
                </button>
                <button
                  onClick={handleSubmitClaim}
                  className="flex-1 bg-imperial-purple text-white py-3 rounded-lg font-semibold hover:bg-opacity-90 transition-colors"
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

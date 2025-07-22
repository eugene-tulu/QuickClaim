import { useState } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { Doc } from "../../convex/_generated/dataModel";

export function AdminPanel() {
  const [statusFilter, setStatusFilter] = useState<string>("");
  const [selectedClaim, setSelectedClaim] = useState<Doc<"claims"> | null>(null);
  
  const claims = useQuery(api.claims.getAllClaims, 
    statusFilter ? { status: statusFilter } : {}
  );
  const updateClaimStatus = useMutation(api.claims.updateClaimStatus);
  const seedBenefits = useMutation(api.benefits.seedBenefits);

  const handleStatusUpdate = async (
    claimId: string, 
    status: string, 
    amount?: number, 
    notes?: string
  ) => {
    try {
      await updateClaimStatus({
        claimId: claimId as any,
        status,
        amount,
        adminNotes: notes,
      });
      setSelectedClaim(null);
    } catch (error) {
      console.error("Failed to update claim status:", error);
    }
  };

  const handleSeedBenefits = async () => {
    try {
      await seedBenefits();
      alert("Benefits seeded successfully!");
    } catch (error) {
      console.error("Failed to seed benefits:", error);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "submitted": return "bg-blue-100 text-trust-blue";
      case "under_review": return "bg-yellow-100 text-yellow-700";
      case "approved": return "bg-green-100 text-green-700";
      case "rejected": return "bg-red-100 text-red-700";
      case "paid": return "bg-imperial-purple bg-opacity-10 text-imperial-purple";
      default: return "bg-gray-100 text-gray-600";
    }
  };

  if (selectedClaim) {
    return (
      <div className="min-h-screen bg-porcelain p-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg border border-gray-100 p-6">
            <div className="flex items-center justify-between mb-6">
              <button
                onClick={() => setSelectedClaim(null)}
                className="text-imperial-purple hover:text-opacity-80"
              >
                ← Back to Claims
              </button>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(selectedClaim.status)}`}>
                {selectedClaim.status.replace('_', ' ')}
              </span>
            </div>

            <h1 className="text-2xl font-bold text-charcoal mb-6 capitalize">
              {selectedClaim.type.replace('_', ' ')} Claim
            </h1>

            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold text-charcoal mb-4">Claim Details</h3>
                <div className="space-y-3">
                  <div>
                    <span className="text-sm text-gray-500">Submitted:</span>
                    <p className="font-medium">
                      {selectedClaim.submittedAt 
                        ? new Date(selectedClaim.submittedAt).toLocaleString()
                        : "Not submitted"
                      }
                    </p>
                  </div>
                  {selectedClaim.description && (
                    <div>
                      <span className="text-sm text-gray-500">Description:</span>
                      <p className="font-medium">{selectedClaim.description}</p>
                    </div>
                  )}
                  {selectedClaim.amount && (
                    <div>
                      <span className="text-sm text-gray-500">Amount:</span>
                      <p className="font-medium text-imperial-purple">
                        ${selectedClaim.amount.toLocaleString()}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-charcoal mb-4">Update Status</h3>
                <div className="space-y-4">
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleStatusUpdate(selectedClaim._id, "under_review")}
                      className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                    >
                      Under Review
                    </button>
                    <button
                      onClick={() => handleStatusUpdate(selectedClaim._id, "approved", 1500)}
                      className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                    >
                      Approve ($1,500)
                    </button>
                    <button
                      onClick={() => handleStatusUpdate(selectedClaim._id, "rejected", undefined, "Insufficient documentation")}
                      className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                    >
                      Reject
                    </button>
                  </div>
                  <button
                    onClick={() => handleStatusUpdate(selectedClaim._id, "paid")}
                    className="w-full px-4 py-2 bg-imperial-purple text-white rounded hover:bg-opacity-90"
                    disabled={selectedClaim.status !== "approved"}
                  >
                    Mark as Paid
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-porcelain p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-charcoal">Admin Panel</h1>
          <button
            onClick={handleSeedBenefits}
            className="px-4 py-2 bg-imperial-purple text-white rounded hover:bg-opacity-90"
          >
            Seed Benefits
          </button>
        </div>

        <div className="bg-white rounded-lg border border-gray-100 p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-charcoal">Claims Management</h2>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2 border border-gray-200 rounded-lg focus:border-imperial-purple outline-none"
            >
              <option value="">All Claims</option>
              <option value="submitted">Submitted</option>
              <option value="under_review">Under Review</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
              <option value="paid">Paid</option>
            </select>
          </div>

          {claims === undefined ? (
            <div className="animate-pulse space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-16 bg-gray-200 rounded"></div>
              ))}
            </div>
          ) : claims.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600">No claims found</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-semibold text-charcoal">Type</th>
                    <th className="text-left py-3 px-4 font-semibold text-charcoal">Status</th>
                    <th className="text-left py-3 px-4 font-semibold text-charcoal">Amount</th>
                    <th className="text-left py-3 px-4 font-semibold text-charcoal">Submitted</th>
                    <th className="text-left py-3 px-4 font-semibold text-charcoal">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {claims.map((claim) => (
                    <tr key={claim._id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-4 capitalize">
                        {claim.type.replace('_', ' ')}
                      </td>
                      <td className="py-3 px-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(claim.status)}`}>
                          {claim.status.replace('_', ' ')}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        {claim.amount ? `$${claim.amount.toLocaleString()}` : "-"}
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-600">
                        {claim.submittedAt 
                          ? new Date(claim.submittedAt).toLocaleDateString()
                          : "Not submitted"
                        }
                      </td>
                      <td className="py-3 px-4">
                        <button
                          onClick={() => setSelectedClaim(claim)}
                          className="text-imperial-purple hover:text-opacity-80 font-medium"
                        >
                          Review
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

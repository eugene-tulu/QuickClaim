import { useState } from "react";
import { Doc } from "../../convex/_generated/dataModel";
import { ClaimDetails } from "./ClaimDetails";

interface ClaimTimelineProps {
  claims: Doc<"claims">[];
}

export function ClaimTimeline({ claims }: ClaimTimelineProps) {
  const [selectedClaim, setSelectedClaim] = useState<Doc<"claims"> | null>(null);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "draft": return "bg-gray-100 text-gray-600";
      case "submitted": return "bg-blue-100 text-trust-blue";
      case "under_review": return "bg-yellow-100 text-yellow-700";
      case "approved": return "bg-green-100 text-green-700";
      case "rejected": return "bg-red-100 text-red-700";
      case "paid": return "bg-imperial-purple bg-opacity-10 text-imperial-purple";
      default: return "bg-gray-100 text-gray-600";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "draft": return "📝";
      case "submitted": return "📤";
      case "under_review": return "👀";
      case "approved": return "✅";
      case "rejected": return "❌";
      case "paid": return "💰";
      default: return "📄";
    }
  };

  if (selectedClaim) {
    return (
      <ClaimDetails 
        claim={selectedClaim} 
        onBack={() => setSelectedClaim(null)} 
      />
    );
  }

  return (
    <div className="bg-white rounded-lg border border-gray-100 p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-charcoal">Your Claims</h2>
        <span className="text-sm text-gray-500">
          {claims.length} total claims
        </span>
      </div>

      {claims.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-4xl mb-4">📋</div>
          <h3 className="text-lg font-medium text-charcoal mb-2">
            No claims yet
          </h3>
          <p className="text-gray-600">
            Start by exploring eligible benefits in the sidebar.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {claims.map((claim) => (
            <div
              key={claim._id}
              onClick={() => setSelectedClaim(claim)}
              className="border border-gray-200 rounded-lg p-4 hover:border-imperial-purple cursor-pointer transition-colors"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">{getStatusIcon(claim.status)}</span>
                  <div>
                    <h3 className="font-medium text-charcoal capitalize">
                      {claim.type.replace('_', ' ')} Claim
                    </h3>
                    <p className="text-sm text-gray-500">
                      Created {new Date(claim._creationTime).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(claim.status)}`}>
                  {claim.status.replace('_', ' ')}
                </span>
              </div>

              {claim.amount && (
                <div className="text-lg font-semibold text-imperial-purple">
                  ${claim.amount.toLocaleString()}
                </div>
              )}

              {claim.description && (
                <p className="text-sm text-gray-600 mt-2 line-clamp-2">
                  {claim.description}
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

import { useState } from "react";
import { Doc } from "../../convex/_generated/dataModel";
import { ClaimDetails } from "./ClaimDetails";

interface ClaimTimelineProps {
  claims: Doc<"claims">[];
  darkMode?: boolean;
}

export function ClaimTimeline({ claims, darkMode = false }: ClaimTimelineProps) {
  const [selectedClaim, setSelectedClaim] = useState<Doc<"claims"> | null>(null);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "draft": return "status-draft";
      case "submitted": return "status-submitted";
      case "under_review": return "status-processing";
      case "approved": return "status-approved";
      case "rejected": return "status-rejected";
      case "paid": return "status-paid";
      default: return "status-draft";
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
        darkMode={darkMode}
      />
    );
  }

  return (
    <div className={`rounded-2xl border transition-colors duration-300 ${
      darkMode 
        ? 'bg-gray-900/50 border-gray-800' 
        : 'bg-white border-gray-100'
    }`}>
      <div className="p-8">
        <div className="flex justify-between items-center mb-8">
          <h2 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-charcoal'}`}>
            Your Claims
          </h2>
          <span className={`text-sm px-3 py-1 rounded-full ${
            darkMode ? 'bg-gray-800 text-gray-400' : 'bg-gray-100 text-gray-500'
          }`}>
            {claims.length} total
          </span>
        </div>

        {claims.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-20 h-20 bg-imperial-purple/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <span className="text-4xl">📋</span>
            </div>
            <h3 className={`text-xl font-semibold mb-3 ${darkMode ? 'text-white' : 'text-charcoal'}`}>
              No claims yet
            </h3>
            <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'} font-light`}>
              Start by exploring eligible benefits in the sidebar.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {claims.map((claim, index) => (
              <div
                key={claim._id}
                onClick={() => setSelectedClaim(claim)}
                className={`border rounded-xl p-6 cursor-pointer transition-all duration-200 hover:shadow-lg animate-in ${
                  darkMode 
                    ? 'border-gray-800 hover:border-imperial-purple bg-gray-900/30' 
                    : 'border-gray-200 hover:border-imperial-purple bg-white'
                }`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-imperial-purple/10 rounded-xl flex items-center justify-center">
                      <span className="text-2xl">{getStatusIcon(claim.status)}</span>
                    </div>
                    <div>
                      <h3 className={`font-semibold capitalize ${darkMode ? 'text-white' : 'text-charcoal'}`}>
                        {claim.type.replace('_', ' ')} Claim
                      </h3>
                      <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                        Created {new Date(claim._creationTime).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <span className={`status-badge ${getStatusColor(claim.status)}`}>
                    {claim.status.replace('_', ' ')}
                  </span>
                </div>

                {claim.amount && (
                  <div className="text-2xl font-bold text-imperial-purple mb-2">
                    ${claim.amount.toLocaleString()}
                  </div>
                )}

                {claim.description && (
                  <p className={`text-sm line-clamp-2 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    {claim.description}
                  </p>
                )}

                <div className="flex justify-end mt-4">
                  <span className="text-imperial-purple text-sm font-medium">
                    View details →
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
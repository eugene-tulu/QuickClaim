import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { Doc } from "../../convex/_generated/dataModel";

interface ClaimDetailsProps {
  claim: Doc<"claims">;
  onBack: () => void;
  darkMode?: boolean;
}

export function ClaimDetails({ claim, onBack, darkMode = false }: ClaimDetailsProps) {
  const documents = useQuery(api.claims.getClaimDocuments, { claimId: claim._id });

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

  return (
    <div className={`rounded-2xl border transition-colors duration-300 ${
      darkMode 
        ? 'bg-gray-900/50 border-gray-800' 
        : 'bg-white border-gray-100'
    }`}>
      <div className="p-8">
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={onBack}
            className={`flex items-center space-x-2 text-imperial-purple hover:text-opacity-80 transition-colors ${
              darkMode ? 'text-imperial-purple' : 'text-imperial-purple'
            }`}
          >
            <span>←</span>
            <span>Back to Claims</span>
          </button>
          <span className={`status-badge ${getStatusColor(claim.status)}`}>
            {claim.status.replace('_', ' ')}
          </span>
        </div>

        <div className="mb-8">
          <h1 className={`text-3xl font-bold mb-3 capitalize ${darkMode ? 'text-white' : 'text-charcoal'}`}>
            {claim.type.replace('_', ' ')} Claim
          </h1>
          <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Submitted on {claim.submittedAt ? new Date(claim.submittedAt).toLocaleDateString() : 'Not submitted'}
          </p>
        </div>

        {claim.amount && (
          <div className={`rounded-2xl p-8 mb-8 ${
            darkMode ? 'bg-imperial-purple/10' : 'bg-imperial-purple/5'
          }`}>
            <h3 className={`text-lg font-semibold mb-3 ${darkMode ? 'text-white' : 'text-charcoal'}`}>
              Claim Amount
            </h3>
            <p className="text-4xl font-bold text-imperial-purple">
              ${claim.amount.toLocaleString()}
            </p>
          </div>
        )}

        {claim.description && (
          <div className="mb-8">
            <h3 className={`text-lg font-semibold mb-4 ${darkMode ? 'text-white' : 'text-charcoal'}`}>
              Description
            </h3>
            <p className={`leading-relaxed ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              {claim.description}
            </p>
          </div>
        )}

        {claim.adminNotes && (
          <div className="mb-8">
            <h3 className={`text-lg font-semibold mb-4 ${darkMode ? 'text-white' : 'text-charcoal'}`}>
              Admin Notes
            </h3>
            <div className={`rounded-xl p-6 ${darkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
              <p className={`${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                {claim.adminNotes}
              </p>
            </div>
          </div>
        )}

        <div className="mb-8">
          <h3 className={`text-lg font-semibold mb-6 ${darkMode ? 'text-white' : 'text-charcoal'}`}>
            Documents
          </h3>
          {documents === undefined ? (
            <div className="animate-pulse space-y-4">
              <div className={`h-4 rounded w-1/4 ${darkMode ? 'bg-gray-700' : 'bg-gray-200'}`}></div>
              <div className={`h-4 rounded w-1/2 ${darkMode ? 'bg-gray-700' : 'bg-gray-200'}`}></div>
            </div>
          ) : documents.length === 0 ? (
            <p className={`${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              No documents uploaded yet.
            </p>
          ) : (
            <div className="grid gap-4">
              {documents.map((doc) => (
                <div 
                  key={doc._id} 
                  className={`flex items-center justify-between p-6 border rounded-xl ${
                    darkMode ? 'border-gray-800 bg-gray-900/30' : 'border-gray-200 bg-white'
                  }`}
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-imperial-purple/10 rounded-xl flex items-center justify-center">
                      <span className="text-2xl">📄</span>
                    </div>
                    <div>
                      <p className={`font-medium ${darkMode ? 'text-white' : 'text-charcoal'}`}>
                        {doc.name}
                      </p>
                      <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                        Uploaded {new Date(doc._creationTime).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  {doc.downloadUrl && (
                    <a
                      href={doc.downloadUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-imperial-purple hover:text-opacity-80 font-medium"
                    >
                      View
                    </a>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        <div className={`border-t pt-8 ${darkMode ? 'border-gray-800' : 'border-gray-200'}`}>
          <h3 className={`text-lg font-semibold mb-6 ${darkMode ? 'text-white' : 'text-charcoal'}`}>
            Timeline
          </h3>
          <div className="space-y-6">
            <div className="flex items-center space-x-4">
              <div className="w-3 h-3 bg-imperial-purple rounded-full flex-shrink-0"></div>
              <div>
                <p className={`font-medium ${darkMode ? 'text-white' : 'text-charcoal'}`}>
                  Claim created
                </p>
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  {new Date(claim._creationTime).toLocaleString()}
                </p>
              </div>
            </div>
            
            {claim.submittedAt && (
              <div className="flex items-center space-x-4">
                <div className="w-3 h-3 bg-trust-blue rounded-full flex-shrink-0"></div>
                <div>
                  <p className={`font-medium ${darkMode ? 'text-white' : 'text-charcoal'}`}>
                    Claim submitted
                  </p>
                  <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    {new Date(claim.submittedAt).toLocaleString()}
                  </p>
                </div>
              </div>
            )}
            
            {claim.reviewedAt && (
              <div className="flex items-center space-x-4">
                <div className={`w-3 h-3 rounded-full flex-shrink-0 ${
                  claim.status === 'approved' ? 'bg-green-500' : 'bg-red-500'
                }`}></div>
                <div>
                  <p className={`font-medium ${darkMode ? 'text-white' : 'text-charcoal'}`}>
                    Claim reviewed
                  </p>
                  <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    {new Date(claim.reviewedAt).toLocaleString()}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { Doc } from "../../convex/_generated/dataModel";

interface ClaimDetailsProps {
  claim: Doc<"claims">;
  onBack: () => void;
}

export function ClaimDetails({ claim, onBack }: ClaimDetailsProps) {
  const documents = useQuery(api.claims.getClaimDocuments, { claimId: claim._id });

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

  return (
    <div className="bg-white rounded-lg border border-gray-100 p-6">
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={onBack}
          className="flex items-center text-imperial-purple hover:text-opacity-80"
        >
          ← Back to Claims
        </button>
        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(claim.status)}`}>
          {claim.status.replace('_', ' ')}
        </span>
      </div>

      <div className="mb-8">
        <h1 className="text-2xl font-bold text-charcoal mb-2 capitalize">
          {claim.type.replace('_', ' ')} Claim
        </h1>
        <p className="text-gray-600">
          Submitted on {claim.submittedAt ? new Date(claim.submittedAt).toLocaleDateString() : 'Not submitted'}
        </p>
      </div>

      {claim.amount && (
        <div className="bg-imperial-purple bg-opacity-5 rounded-lg p-6 mb-8">
          <h3 className="text-lg font-semibold text-charcoal mb-2">Claim Amount</h3>
          <p className="text-3xl font-bold text-imperial-purple">
            ${claim.amount.toLocaleString()}
          </p>
        </div>
      )}

      {claim.description && (
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-charcoal mb-3">Description</h3>
          <p className="text-gray-700 leading-relaxed">{claim.description}</p>
        </div>
      )}

      {claim.adminNotes && (
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-charcoal mb-3">Admin Notes</h3>
          <div className="bg-gray-50 rounded-lg p-4">
            <p className="text-gray-700">{claim.adminNotes}</p>
          </div>
        </div>
      )}

      <div className="mb-8">
        <h3 className="text-lg font-semibold text-charcoal mb-4">Documents</h3>
        {documents === undefined ? (
          <div className="animate-pulse">
            <div className="h-4 bg-gray-200 rounded w-1/4 mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          </div>
        ) : documents.length === 0 ? (
          <p className="text-gray-500">No documents uploaded yet.</p>
        ) : (
          <div className="grid gap-4">
            {documents.map((doc) => (
              <div key={doc._id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">📄</span>
                  <div>
                    <p className="font-medium text-charcoal">{doc.name}</p>
                    <p className="text-sm text-gray-500">
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

      <div className="border-t border-gray-200 pt-6">
        <h3 className="text-lg font-semibold text-charcoal mb-4">Timeline</h3>
        <div className="space-y-4">
          <div className="flex items-center space-x-3">
            <div className="w-3 h-3 bg-imperial-purple rounded-full"></div>
            <div>
              <p className="font-medium text-charcoal">Claim created</p>
              <p className="text-sm text-gray-500">
                {new Date(claim._creationTime).toLocaleString()}
              </p>
            </div>
          </div>
          
          {claim.submittedAt && (
            <div className="flex items-center space-x-3">
              <div className="w-3 h-3 bg-trust-blue rounded-full"></div>
              <div>
                <p className="font-medium text-charcoal">Claim submitted</p>
                <p className="text-sm text-gray-500">
                  {new Date(claim.submittedAt).toLocaleString()}
                </p>
              </div>
            </div>
          )}
          
          {claim.reviewedAt && (
            <div className="flex items-center space-x-3">
              <div className={`w-3 h-3 rounded-full ${
                claim.status === 'approved' ? 'bg-green-500' : 'bg-red-500'
              }`}></div>
              <div>
                <p className="font-medium text-charcoal">Claim reviewed</p>
                <p className="text-sm text-gray-500">
                  {new Date(claim.reviewedAt).toLocaleString()}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

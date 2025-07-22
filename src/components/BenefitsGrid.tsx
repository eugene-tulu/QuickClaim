import { useState } from "react";
import { Doc } from "../../convex/_generated/dataModel";
import { NewClaimModal } from "./NewClaimModal";

interface BenefitsGridProps {
  benefits: Doc<"benefits">[];
}

export function BenefitsGrid({ benefits }: BenefitsGridProps) {
  const [selectedBenefit, setSelectedBenefit] = useState<Doc<"benefits"> | null>(null);

  return (
    <>
      <div className="bg-white rounded-lg border border-gray-100 p-6">
        <h3 className="text-lg font-semibold text-charcoal mb-4">
          Eligible Benefits
        </h3>
        
        {benefits.length === 0 ? (
          <div className="text-center py-8">
            <div className="text-3xl mb-3">🔍</div>
            <p className="text-gray-600 text-sm">
              Complete your profile to see eligible benefits
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {benefits.map((benefit) => (
              <div
                key={benefit._id}
                className="border border-gray-200 rounded-lg p-4 hover:border-imperial-purple cursor-pointer transition-colors"
                onClick={() => setSelectedBenefit(benefit)}
              >
                <h4 className="font-medium text-charcoal mb-2">
                  {benefit.name}
                </h4>
                <p className="text-lg font-semibold text-imperial-purple mb-2">
                  Up to ${benefit.maxAmount.toLocaleString()}
                </p>
                <p className="text-sm text-gray-600 mb-3">
                  {benefit.description}
                </p>
                <div className="flex justify-between items-center text-xs text-gray-500">
                  <span>Processing: {benefit.processingTime}</span>
                  <span className="text-imperial-purple font-medium">
                    Apply →
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {selectedBenefit && (
        <NewClaimModal
          benefit={selectedBenefit}
          onClose={() => setSelectedBenefit(null)}
        />
      )}
    </>
  );
}

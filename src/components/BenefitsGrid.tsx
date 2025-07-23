import { useState } from "react";
import { Doc } from "../../convex/_generated/dataModel";
import { NewClaimModal } from "./NewClaimModal";

interface BenefitsGridProps {
  benefits: Doc<"benefits">[];
  darkMode?: boolean;
}

export function BenefitsGrid({ benefits, darkMode = false }: BenefitsGridProps) {
  const [selectedBenefit, setSelectedBenefit] = useState<Doc<"benefits"> | null>(null);

  return (
    <>
      <div className={`rounded-2xl border transition-colors duration-300 ${
        darkMode 
          ? 'bg-gray-900/50 border-gray-800' 
          : 'bg-white border-gray-100'
      }`}>
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-charcoal'}`}>
              Eligible Benefits
            </h3>
            <button className="btn-primary text-sm px-4 py-2">
              Start New Claim
            </button>
          </div>
          
          {benefits.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-imperial-purple/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">🔍</span>
              </div>
              <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Complete your profile to see eligible benefits
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {benefits.map((benefit, index) => (
                <div
                  key={benefit._id}
                  className={`border rounded-xl p-4 cursor-pointer transition-all duration-200 hover:shadow-md animate-in ${
                    darkMode 
                      ? 'border-gray-800 hover:border-imperial-purple bg-gray-900/30' 
                      : 'border-gray-200 hover:border-imperial-purple bg-white'
                  }`}
                  onClick={() => setSelectedBenefit(benefit)}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex items-start justify-between mb-3">
                    <h4 className={`font-medium text-sm ${darkMode ? 'text-white' : 'text-charcoal'}`}>
                      {benefit.name}
                    </h4>
                    <span className="text-imperial-purple text-xs font-medium">
                      Apply →
                    </span>
                  </div>
                  
                  <p className="text-lg font-bold text-imperial-purple mb-2">
                    Up to ${benefit.maxAmount.toLocaleString()}
                  </p>
                  
                  <p className={`text-xs mb-3 line-clamp-2 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    {benefit.description}
                  </p>
                  
                  <div className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>
                    Processing: {benefit.processingTime}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {selectedBenefit && (
        <NewClaimModal
          benefit={selectedBenefit}
          onClose={() => setSelectedBenefit(null)}
          darkMode={darkMode}
        />
      )}
    </>
  );
}
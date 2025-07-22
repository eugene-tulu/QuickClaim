import { v } from "convex/values";
import { query, mutation } from "./_generated/server";
import { getAuthUserId } from "@convex-dev/auth/server";

export const getEligibleBenefits = query({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) return [];

    const user = await ctx.db.get(userId);
    if (!user || !user.region || !user.workType) return [];

    const benefits = await ctx.db.query("benefits").collect();
    
    return benefits.filter(benefit => 
      benefit.eligibleRegions.includes(user.region!) &&
      benefit.eligibleWorkTypes.includes(user.workType!)
    );
  },
});

export const getAllBenefits = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("benefits").collect();
  },
});

// Seed some sample benefits - call this once to populate the database
export const seedBenefits = mutation({
  args: {},
  handler: async (ctx) => {
    // Check if benefits already exist
    const existingBenefits = await ctx.db.query("benefits").collect();
    if (existingBenefits.length > 0) {
      return "Benefits already seeded";
    }
    const benefits = [
      {
        name: "Unemployment Insurance",
        type: "unemployment",
        description: "Financial support for workers who have lost their jobs through no fault of their own.",
        maxAmount: 2000,
        eligibleRegions: ["California", "New York", "Texas", "Florida"],
        eligibleWorkTypes: ["full-time", "part-time", "contract"],
        requiredDocuments: ["ID", "Employment History", "Bank Statement"],
        processingTime: "2-3 weeks",
      },
      {
        name: "Health Insurance Subsidy",
        type: "health",
        description: "Subsidies to help reduce the cost of health insurance premiums.",
        maxAmount: 800,
        eligibleRegions: ["California", "New York", "Texas", "Florida", "Illinois"],
        eligibleWorkTypes: ["gig", "freelance", "part-time"],
        requiredDocuments: ["ID", "Income Statement", "Health Insurance Quote"],
        processingTime: "1-2 weeks",
      },
      {
        name: "Housing Assistance",
        type: "housing",
        description: "Financial assistance for rent and housing costs for low-income workers.",
        maxAmount: 1500,
        eligibleRegions: ["California", "New York", "Illinois"],
        eligibleWorkTypes: ["gig", "part-time", "seasonal"],
        requiredDocuments: ["ID", "Lease Agreement", "Income Statement"],
        processingTime: "3-4 weeks",
      },
    ];

    for (const benefit of benefits) {
      await ctx.db.insert("benefits", benefit);
    }
  },
});

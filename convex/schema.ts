import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";
import { authTables } from "@convex-dev/auth/server";

const applicationTables = {
  users: defineTable({
    email: v.string(),
    name: v.optional(v.string()),
    region: v.optional(v.string()),
    workType: v.optional(v.string()),
    idDocUrl: v.optional(v.id("_storage")),
    onboardingComplete: v.optional(v.boolean()),
    emailPreferences: v.optional(v.object({
      claimUpdates: v.boolean(),
      marketing: v.boolean(),
      reminders: v.boolean(),
    })),
  }).index("by_email", ["email"]),

  claims: defineTable({
    userId: v.id("users"),
    type: v.string(), // "unemployment", "health", "housing", etc.
    amount: v.optional(v.number()),
    status: v.string(), // "draft", "submitted", "under_review", "approved", "rejected", "paid"
    description: v.optional(v.string()),
    submittedAt: v.optional(v.number()),
    reviewedAt: v.optional(v.number()),
    adminNotes: v.optional(v.string()),
  })
    .index("by_user", ["userId"])
    .index("by_status", ["status"])
    .index("by_user_and_status", ["userId", "status"]),

  documents: defineTable({
    claimId: v.id("claims"),
    userId: v.id("users"),
    name: v.string(),
    url: v.id("_storage"),
    extractedData: v.optional(v.object({
      amount: v.optional(v.number()),
      date: v.optional(v.string()),
      type: v.optional(v.string()),
    })),
  }).index("by_claim", ["claimId"]),

  benefits: defineTable({
    name: v.string(),
    type: v.string(),
    description: v.string(),
    maxAmount: v.number(),
    eligibleRegions: v.array(v.string()),
    eligibleWorkTypes: v.array(v.string()),
    requiredDocuments: v.array(v.string()),
    processingTime: v.string(),
  })
    .index("by_type", ["type"])
    .index("by_region", ["eligibleRegions"]),

  emailLogs: defineTable({
    type: v.string(), // "welcome", "claim_submitted", "claim_status_update", "test"
    recipient: v.string(),
    status: v.union(v.literal("sent"), v.literal("failed")),
    error: v.optional(v.string()),
    messageId: v.optional(v.string()),
  })
    .index("by_recipient", ["recipient"])
    .index("by_type", ["type"])
    .index("by_status", ["status"]),
};

export default defineSchema({
  ...authTables,
  ...applicationTables,
});

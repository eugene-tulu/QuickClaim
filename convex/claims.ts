import { v } from "convex/values";
import { query, mutation, action } from "./_generated/server";
import { getAuthUserId } from "@convex-dev/auth/server";
import { internal } from "./_generated/api";

export const getUserClaims = query({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) return [];

    return await ctx.db
      .query("claims")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .order("desc")
      .collect();
  },
});

export const getClaim = query({
  args: { claimId: v.id("claims") },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Not authenticated");

    const claim = await ctx.db.get(args.claimId);
    if (!claim || claim.userId !== userId) {
      throw new Error("Claim not found");
    }

    return claim;
  },
});

export const getClaimDocuments = query({
  args: { claimId: v.id("claims") },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Not authenticated");

    const claim = await ctx.db.get(args.claimId);
    if (!claim || claim.userId !== userId) {
      throw new Error("Claim not found");
    }

    const documents = await ctx.db
      .query("documents")
      .withIndex("by_claim", (q) => q.eq("claimId", args.claimId))
      .collect();

    return Promise.all(
      documents.map(async (doc) => ({
        ...doc,
        downloadUrl: await ctx.storage.getUrl(doc.url),
      }))
    );
  },
});

export const createClaim = mutation({
  args: {
    type: v.string(),
    description: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Not authenticated");

    return await ctx.db.insert("claims", {
      userId,
      type: args.type,
      description: args.description,
      status: "draft",
    });
  },
});

export const submitClaim = mutation({
  args: {
    claimId: v.id("claims"),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Not authenticated");

    const claim = await ctx.db.get(args.claimId);
    if (!claim || claim.userId !== userId) {
      throw new Error("Claim not found");
    }

    await ctx.db.patch(args.claimId, {
      status: "submitted",
      submittedAt: Date.now(),
    });

    // Schedule email notification (disabled for now)
    // await ctx.scheduler.runAfter(0, internal.emails.sendClaimSubmittedEmail, {
    //   claimId: args.claimId,
    // });
  },
});

export const uploadClaimDocument = mutation({
  args: {
    claimId: v.id("claims"),
    name: v.string(),
    storageId: v.id("_storage"),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Not authenticated");

    const claim = await ctx.db.get(args.claimId);
    if (!claim || claim.userId !== userId) {
      throw new Error("Claim not found");
    }

    await ctx.db.insert("documents", {
      claimId: args.claimId,
      userId,
      name: args.name,
      url: args.storageId,
    });
  },
});

// Admin functions
export const getAllClaims = query({
  args: { status: v.optional(v.string()) },
  handler: async (ctx, args) => {
    // In a real app, you'd check for admin permissions here
    if (args.status) {
      return await ctx.db
        .query("claims")
        .withIndex("by_status", (q) => q.eq("status", args.status!))
        .order("desc")
        .collect();
    }
    
    return await ctx.db.query("claims").order("desc").collect();
  },
});

export const updateClaimStatus = mutation({
  args: {
    claimId: v.id("claims"),
    status: v.string(),
    adminNotes: v.optional(v.string()),
    amount: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    // In a real app, you'd check for admin permissions here
    const updates: any = {
      status: args.status,
      reviewedAt: Date.now(),
    };

    if (args.adminNotes) updates.adminNotes = args.adminNotes;
    if (args.amount) updates.amount = args.amount;

    await ctx.db.patch(args.claimId, updates);

    // Schedule email notification for status updates (disabled for now)
    // await ctx.scheduler.runAfter(0, internal.emails.sendClaimStatusEmail, {
    //   claimId: args.claimId,
    // });
  },
});

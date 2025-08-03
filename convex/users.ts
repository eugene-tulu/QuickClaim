import { v } from "convex/values";
import { query, mutation } from "./_generated/server";
import { getAuthUserId } from "@convex-dev/auth/server";
import { internal } from "./_generated/api";

export const getCurrentUser = query({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) return null;
    
    return await ctx.db.get(userId);
  },
});

export const updateProfile = mutation({
  args: {
    name: v.string(),
    region: v.string(),
    workType: v.string(),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Not authenticated");

    await ctx.db.patch(userId, {
      name: args.name,
      region: args.region,
      workType: args.workType,
    });
  },
});

export const uploadIdDocument = mutation({
  args: {
    storageId: v.id("_storage"),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Not authenticated");

    await ctx.db.patch(userId, {
      idDocUrl: args.storageId,
    });
  },
});

export const completeOnboarding = mutation({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Not authenticated");

    await ctx.db.patch(userId, {
      onboardingComplete: true,
      emailPreferences: {
        claimUpdates: true,
        marketing: true,
        reminders: true,
      },
    });

    // Send welcome email after onboarding completion
    await ctx.scheduler.runAfter(0, internal.emails.sendWelcomeEmail, {
      userId,
    });
  },
});

export const updateEmailPreferences = mutation({
  args: {
    claimUpdates: v.boolean(),
    marketing: v.boolean(),
    reminders: v.boolean(),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Not authenticated");

    await ctx.db.patch(userId, {
      emailPreferences: {
        claimUpdates: args.claimUpdates,
        marketing: args.marketing,
        reminders: args.reminders,
      },
    });
  },
});

export const generateUploadUrl = mutation({
  args: {},
  handler: async (ctx) => {
    return await ctx.storage.generateUploadUrl();
  },
});

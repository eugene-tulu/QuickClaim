import { v } from "convex/values";
import { action, internalQuery } from "./_generated/server";
import { internal } from "./_generated/api";

// Email actions using Resend
export const sendClaimSubmittedEmail = action({
  args: { claimId: v.id("claims") },
  handler: async (ctx, args) => {
    const claim = await ctx.runQuery(internal.emails.getClaimForEmail, {
      claimId: args.claimId,
    });
    
    if (!claim) return;

    // For now, just log. In production, you'd use Resend:
    // const resend = new Resend(process.env.CONVEX_RESEND_API_KEY);
    // await resend.emails.send({
    //   from: "QuickClaim <noreply@quickclaim.app>",
    //   to: claim.userEmail,
    //   subject: "Claim Submitted Successfully",
    //   html: `Your ${claim.type} claim has been submitted and is under review.`,
    // });
    
    console.log(`Email: Claim ${claim.type} submitted for ${claim.userEmail}`);
  },
});

export const sendClaimStatusEmail = action({
  args: { claimId: v.id("claims") },
  handler: async (ctx, args) => {
    const claim = await ctx.runQuery(internal.emails.getClaimForEmail, {
      claimId: args.claimId,
    });
    
    if (!claim) return;

    // For now, just log. In production, you'd use Resend:
    console.log(`Email: Claim ${claim.type} status updated to ${claim.status} for ${claim.userEmail}`);
  },
});

// Internal query for email actions
export const getClaimForEmail = internalQuery({
  args: { claimId: v.id("claims") },
  handler: async (ctx, args) => {
    const claim = await ctx.db.get(args.claimId);
    if (!claim) return null;

    const user = await ctx.db.get(claim.userId);
    if (!user) return null;

    return {
      type: claim.type,
      status: claim.status,
      amount: claim.amount,
      userEmail: user.email,
    };
  },
});

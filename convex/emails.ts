import { v } from "convex/values";
import { action, internalAction, internalQuery, query, internalMutation } from "./_generated/server";
import { internal } from "./_generated/api";

// Email actions using Resend
export const sendClaimSubmittedEmail = internalAction({
  args: { claimId: v.id("claims") },
  handler: async (ctx, args) => {
    const claim = await ctx.runQuery(internal.emails.getClaimForEmail, {
      claimId: args.claimId,
    });
    
    if (!claim) return;

    try {
      // Use Convex Resend proxy for demo
      const { Resend } = await import("resend");
      const resend = new Resend(process.env.RESEND_API_KEY!);

      const { data, error } = await resend.emails.send({
        from: "QuickClaim <noreply@quickclaim.app>",
        to: claim.userEmail,
        subject: "Claim Submitted Successfully - QuickClaim",
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <div style="background: #4B0082; color: white; padding: 20px; text-align: center;">
              <h1 style="margin: 0;">QuickClaim</h1>
            </div>
            <div style="padding: 30px; background: #f9f9f9;">
              <h2 style="color: #1A1A1A; margin-bottom: 20px;">Your ${claim.type.replace('_', ' ')} claim has been submitted!</h2>
              
              <p style="color: #666; line-height: 1.6;">
                Great news! We've received your ${claim.type.replace('_', ' ')} claim and it's now under review.
              </p>
              
              <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <h3 style="color: #4B0082; margin-top: 0;">Claim Details</h3>
                <p><strong>Type:</strong> ${claim.type.replace('_', ' ')}</p>
                <p><strong>Status:</strong> Under Review</p>
                <p><strong>Submitted:</strong> ${new Date().toLocaleDateString()}</p>
              </div>
              
              <p style="color: #666; line-height: 1.6;">
                We'll review your application and get back to you within 2-3 business days. 
                You'll receive an email notification as soon as there's an update.
              </p>
              
              <div style="text-align: center; margin: 30px 0;">
                <a href="#" style="background: #4B0082; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">
                  Track Your Claim
                </a>
              </div>
              
              <p style="color: #999; font-size: 14px; text-align: center;">
                Questions? Reply to this email or contact our support team.
              </p>
            </div>
          </div>
        `,
      });

      if (error) {
        await ctx.runMutation(internal.emails.logEmail, {
          type: "claim_submitted",
          recipient: claim.userEmail,
          status: "failed",
          error: error.message,
        });
        throw new Error(`Failed to send email: ${error.message}`);
      }

      await ctx.runMutation(internal.emails.logEmail, {
        type: "claim_submitted",
        recipient: claim.userEmail,
        status: "sent",
        messageId: data?.id,
      });

    } catch (error) {
      console.error("Email error:", error);
      await ctx.runMutation(internal.emails.logEmail, {
        type: "claim_submitted",
        recipient: claim.userEmail,
        status: "failed",
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  },
});

export const sendClaimStatusEmail = internalAction({
  args: { claimId: v.id("claims") },
  handler: async (ctx, args) => {
    const claim = await ctx.runQuery(internal.emails.getClaimForEmail, {
      claimId: args.claimId,
    });
    
    if (!claim) return;

    try {
      const { Resend } = await import("resend");
      const resend = new Resend(process.env.RESEND_API_KEY!);

      const statusMessages = {
        approved: {
          subject: "🎉 Your claim has been approved!",
          title: "Congratulations! Your claim is approved",
          message: `Great news! Your ${claim.type.replace('_', ' ')} claim has been approved${claim.amount ? ` for $${claim.amount.toLocaleString()}` : ''}.`,
          color: "#10B981"
        },
        rejected: {
          subject: "Update on your claim application",
          title: "Claim application update",
          message: `We've reviewed your ${claim.type.replace('_', ' ')} claim. Unfortunately, we cannot approve it at this time.`,
          color: "#EF4444"
        },
        paid: {
          subject: "💰 Payment processed for your claim",
          title: "Payment has been processed!",
          message: `Your ${claim.type.replace('_', ' ')} claim payment of $${claim.amount?.toLocaleString() || '0'} has been processed and should arrive in your account within 1-2 business days.`,
          color: "#4B0082"
        },
        under_review: {
          subject: "Your claim is under review",
          title: "Claim under review",
          message: `We're currently reviewing your ${claim.type.replace('_', ' ')} claim. We'll update you as soon as we have more information.`,
          color: "#F59E0B"
        }
      };

      const statusInfo = statusMessages[claim.status as keyof typeof statusMessages] || statusMessages.under_review;

      const { data, error } = await resend.emails.send({
        from: "QuickClaim <noreply@quickclaim.app>",
        to: claim.userEmail,
        subject: statusInfo.subject,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <div style="background: #4B0082; color: white; padding: 20px; text-align: center;">
              <h1 style="margin: 0;">QuickClaim</h1>
            </div>
            <div style="padding: 30px; background: #f9f9f9;">
              <h2 style="color: #1A1A1A; margin-bottom: 20px;">${statusInfo.title}</h2>
              
              <p style="color: #666; line-height: 1.6;">
                ${statusInfo.message}
              </p>
              
              <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid ${statusInfo.color};">
                <h3 style="color: ${statusInfo.color}; margin-top: 0;">Claim Update</h3>
                <p><strong>Type:</strong> ${claim.type.replace('_', ' ')}</p>
                <p><strong>Status:</strong> ${claim.status.replace('_', ' ')}</p>
                ${claim.amount ? `<p><strong>Amount:</strong> $${claim.amount.toLocaleString()}</p>` : ''}
                <p><strong>Updated:</strong> ${new Date().toLocaleDateString()}</p>
              </div>
              
              ${claim.status === 'approved' ? `
                <p style="color: #666; line-height: 1.6;">
                  Your payment will be processed within 1-2 business days. You'll receive another email confirmation once the payment is sent.
                </p>
              ` : ''}
              
              ${claim.status === 'rejected' && claim.adminNotes ? `
                <div style="background: #FEF2F2; padding: 15px; border-radius: 6px; margin: 20px 0;">
                  <p style="color: #991B1B; margin: 0;"><strong>Additional Information:</strong></p>
                  <p style="color: #991B1B; margin: 10px 0 0 0;">${claim.adminNotes}</p>
                </div>
              ` : ''}
              
              <div style="text-align: center; margin: 30px 0;">
                <a href="#" style="background: #4B0082; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">
                  View Claim Details
                </a>
              </div>
              
              <p style="color: #999; font-size: 14px; text-align: center;">
                Questions? Reply to this email or contact our support team.
              </p>
            </div>
          </div>
        `,
      });

      if (error) {
        await ctx.runMutation(internal.emails.logEmail, {
          type: "claim_status_update",
          recipient: claim.userEmail,
          status: "failed",
          error: error.message,
        });
        throw new Error(`Failed to send email: ${error.message}`);
      }

      await ctx.runMutation(internal.emails.logEmail, {
        type: "claim_status_update",
        recipient: claim.userEmail,
        status: "sent",
        messageId: data?.id,
      });

    } catch (error) {
      console.error("Email error:", error);
      await ctx.runMutation(internal.emails.logEmail, {
        type: "claim_status_update",
        recipient: claim.userEmail,
        status: "failed",
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  },
});

export const sendWelcomeEmail = internalAction({
  args: { userId: v.id("users") },
  handler: async (ctx, args) => {
    const user = await ctx.runQuery(internal.emails.getUserForEmail, {
      userId: args.userId,
    });
    
    if (!user) return;

    try {
      const { Resend } = await import("resend");
      const resend = new Resend(process.env.RESEND_API_KEY!);

      const { data, error } = await resend.emails.send({
        from: "QuickClaim <noreply@quickclaim.app>",
        to: user.email,
        subject: "Welcome to QuickClaim! 🎉",
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <div style="background: #4B0082; color: white; padding: 20px; text-align: center;">
              <h1 style="margin: 0;">Welcome to QuickClaim!</h1>
            </div>
            <div style="padding: 30px; background: #f9f9f9;">
              <h2 style="color: #1A1A1A; margin-bottom: 20px;">Hi ${user.name || 'there'}! 👋</h2>
              
              <p style="color: #666; line-height: 1.6;">
                Welcome to QuickClaim! We're excited to help you access the benefits you deserve.
              </p>
              
              <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <h3 style="color: #4B0082; margin-top: 0;">What's Next?</h3>
                <ul style="color: #666; line-height: 1.8;">
                  <li>Complete your profile to see eligible benefits</li>
                  <li>Upload required documents with our AI-powered system</li>
                  <li>Track your claims in real-time</li>
                  <li>Receive instant email notifications</li>
                </ul>
              </div>
              
              <p style="color: #666; line-height: 1.6;">
                Based on your profile, you may be eligible for benefits worth up to <strong>$4,300</strong>. 
                Let's get started!
              </p>
              
              <div style="text-align: center; margin: 30px 0;">
                <a href="#" style="background: #4B0082; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">
                  Complete Your Profile
                </a>
              </div>
              
              <p style="color: #999; font-size: 14px; text-align: center;">
                Need help? Reply to this email and we'll get back to you within 24 hours.
              </p>
            </div>
          </div>
        `,
      });

      if (error) {
        await ctx.runMutation(internal.emails.logEmail, {
          type: "welcome",
          recipient: user.email,
          status: "failed",
          error: error.message,
        });
        throw new Error(`Failed to send email: ${error.message}`);
      }

      await ctx.runMutation(internal.emails.logEmail, {
        type: "welcome",
        recipient: user.email,
        status: "sent",
        messageId: data?.id,
      });

    } catch (error) {
      console.error("Email error:", error);
      await ctx.runMutation(internal.emails.logEmail, {
        type: "welcome",
        recipient: user.email,
        status: "failed",
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  },
});

export const sendTestEmail = action({
  args: {},
  handler: async (ctx) => {
    try {
      const { Resend } = await import("resend");
      const resend = new Resend(process.env.RESEND_API_KEY!);

      const { data, error } = await resend.emails.send({
        from: "QuickClaim <noreply@quickclaim.app>",
        to: "admin@example.com", // This will be replaced by Convex proxy
        subject: "QuickClaim Test Email",
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <div style="background: #4B0082; color: white; padding: 20px; text-align: center;">
              <h1 style="margin: 0;">QuickClaim Test</h1>
            </div>
            <div style="padding: 30px; background: #f9f9f9;">
              <h2 style="color: #1A1A1A;">Email System Test</h2>
              <p style="color: #666; line-height: 1.6;">
                This is a test email to verify that the QuickClaim email system is working correctly.
              </p>
              <p style="color: #666; line-height: 1.6;">
                <strong>Timestamp:</strong> ${new Date().toLocaleString()}
              </p>
            </div>
          </div>
        `,
      });

      if (error) {
        await ctx.runMutation(internal.emails.logEmail, {
          type: "test",
          recipient: "admin@example.com",
          status: "failed",
          error: error.message,
        });
        throw new Error(`Failed to send test email: ${error.message}`);
      }

      await ctx.runMutation(internal.emails.logEmail, {
        type: "test",
        recipient: "admin@example.com",
        status: "sent",
        messageId: data?.id,
      });

      return { success: true, messageId: data?.id };

    } catch (error) {
      console.error("Test email error:", error);
      await ctx.runMutation(internal.emails.logEmail, {
        type: "test",
        recipient: "admin@example.com",
        status: "failed",
        error: error instanceof Error ? error.message : "Unknown error",
      });
      throw error;
    }
  },
});

// Internal queries for email actions
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
      adminNotes: claim.adminNotes,
      userEmail: user.email,
    };
  },
});

export const getUserForEmail = internalQuery({
  args: { userId: v.id("users") },
  handler: async (ctx, args) => {
    const user = await ctx.db.get(args.userId);
    if (!user) return null;

    return {
      name: user.name,
      email: user.email,
    };
  },
});

// Email logging
export const logEmail = internalMutation({
  args: {
    type: v.string(),
    recipient: v.string(),
    status: v.union(v.literal("sent"), v.literal("failed")),
    error: v.optional(v.string()),
    messageId: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    await ctx.db.insert("emailLogs", {
      type: args.type,
      recipient: args.recipient,
      status: args.status,
      error: args.error,
      messageId: args.messageId,
    });
  },
});

export const getEmailLogs = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("emailLogs").order("desc").take(50);
  },
});
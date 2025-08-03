# QuickClaim - Resend Integration Showcase

A modern benefits claim application showcasing seamless Resend email integration with Convex backend. Built for informal workers to easily discover, apply for, and track benefit claims.

## 🚀 Features

### Core Functionality
- **Instant Benefits Discovery**: AI-powered matching based on work type and location
- **Document Upload**: Simple photo uploads with AI data extraction
- **Real-time Tracking**: Live claim status updates
- **Admin Dashboard**: Comprehensive claim management system

### Email Integration (Resend)
- **Welcome Emails**: Personalized onboarding messages
- **Claim Notifications**: Instant updates on submissions and status changes
- **Status Updates**: Detailed emails for approvals, rejections, and payments
- **Email Preferences**: User-controlled notification settings
- **Admin Monitoring**: Email logs and delivery tracking
- **Professional Templates**: Branded HTML email templates

## 🛠️ Tech Stack

- **Frontend**: React + TypeScript + Vite
- **Backend**: Convex (database, functions, real-time, file storage)
- **Authentication**: Convex Auth
- **Email**: Resend API with Convex proxy
- **Styling**: TailwindCSS
- **Notifications**: Sonner

## 📧 Email Features

### User Emails
- **Welcome Email**: Sent after onboarding completion
- **Claim Submitted**: Confirmation when claim is submitted
- **Status Updates**: Notifications for review, approval, rejection, payment
- **Personalized Content**: Dynamic content based on claim type and amount

### Admin Features
- **Email Monitoring**: Real-time email delivery tracking
- **Test Emails**: Send test emails to verify configuration
- **Delivery Stats**: Success rates and error tracking
- **Email Logs**: Complete audit trail of all sent emails

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- Convex account
- Resend account (optional - uses Convex proxy for demo)

### Installation

1. **Clone and install dependencies**
   ```bash
   git clone <repository-url>
   cd quickclaim
   npm install
   ```

2. **Set up Convex**
   ```bash
   npx convex dev
   ```

3. **Configure environment variables**
   
   The app uses Convex's built-in Resend proxy for demo purposes. For production, add your own Resend API key:
   
   In the Convex dashboard:
   - Go to Settings → Environment Variables
   - Add `RESEND_API_KEY` with your Resend API key
   - Remove `RESEND_BASE_URL` to use Resend directly

4. **Seed demo data**
   ```bash
   # In the admin panel, click "Seed Benefits"
   # Or run in Convex dashboard:
   # await api.benefits.seedBenefits()
   ```

5. **Start development**
   ```bash
   npm run dev
   ```

## 📱 Usage

### For Users
1. **Sign Up**: Create account on landing page
2. **Onboarding**: Complete profile with work type and region
3. **Discover Benefits**: View eligible benefits automatically
4. **Apply**: Upload documents and submit claims
5. **Track**: Monitor claim status in real-time
6. **Receive Updates**: Get email notifications at every step

### For Admins
1. **Access Admin Panel**: Add `?admin=true` to URL or use admin email
2. **Review Claims**: View and update claim statuses
3. **Monitor Emails**: Track email delivery and success rates
4. **Send Test Emails**: Verify email configuration
5. **Manage Benefits**: Add new benefit programs

## 🔧 Configuration

### Email Templates
Email templates are defined in `convex/emails.ts` with:
- Responsive HTML design
- Brand colors and styling
- Dynamic content insertion
- Professional formatting

### Environment Variables
```bash
# Convex (automatically configured)
CONVEX_DEPLOYMENT=your-deployment-name

# Resend (optional - uses Convex proxy by default)
RESEND_API_KEY=your-resend-api-key

# For production deployment
RESEND_BASE_URL=https://api.resend.com (remove to use Resend directly)
```

### Email Preferences
Users can control:
- Claim update notifications
- Reminder emails
- Marketing communications

## 🏗️ Architecture

### Database Schema
- **Users**: Profile, preferences, onboarding status
- **Claims**: Applications, status, amounts, notes
- **Benefits**: Available programs, eligibility rules
- **Documents**: File uploads with metadata
- **Email Logs**: Delivery tracking and error handling

### Email Flow
1. **Trigger**: User action or admin update
2. **Queue**: Convex scheduler queues email action
3. **Send**: Resend API sends email with template
4. **Log**: Success/failure logged to database
5. **Monitor**: Admin dashboard shows delivery status

## 🎨 Design System

### Colors
- **Imperial Purple** (`#4B0082`): Primary brand color
- **Trust Blue** (`#0077B6`): Secondary actions
- **Porcelain** (`#FAFAFA`): Background
- **Charcoal** (`#1A1A1A`): Text

### Components
- Responsive design for all screen sizes
- Loading states and error handling
- Accessible form controls
- Professional email templates

## 🚀 Deployment

### Convex Deployment
```bash
npx convex deploy
```

### Environment Setup
1. **Production Resend**: Add your Resend API key to environment variables
2. **Email Domain**: Configure your sending domain in Resend
3. **DNS Records**: Set up SPF, DKIM, and DMARC records

### Monitoring
- Email delivery rates in admin dashboard
- Error tracking and logging
- User engagement metrics

## 🧪 Testing

### Email Testing
- Use admin panel "Send Test Email" button
- Check email logs for delivery status
- Test with different user scenarios

### Demo Flow
1. **Landing Page**: Showcase features and benefits
2. **Sign Up**: Quick registration process
3. **Onboarding**: Profile completion with welcome email
4. **Apply**: Submit claim with confirmation email
5. **Admin Review**: Update status with notification email
6. **Completion**: Payment confirmation email

## 📊 Analytics

### Email Metrics
- Total emails sent
- Delivery success rate
- Email types breakdown
- Error tracking and resolution

### User Engagement
- Onboarding completion rate
- Claim submission rate
- Email open rates (with Resend webhooks)

## 🔒 Security

### Email Security
- Validated recipient addresses
- Rate limiting on email sends
- Secure template rendering
- Error handling and logging

### Data Protection
- User consent for email preferences
- Secure document storage
- Admin access controls
- Audit trails for all actions

## 🤝 Contributing

1. Fork the repository
2. Create feature branch
3. Add tests for new functionality
4. Update documentation
5. Submit pull request

## 📄 License

MIT License - see LICENSE file for details

## 🆘 Support

- **Documentation**: Check inline code comments
- **Issues**: Create GitHub issue with reproduction steps
- **Email**: Contact support for Resend configuration help

---

**QuickClaim** - Making benefits accessible for everyone with the power of instant email notifications.

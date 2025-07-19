# Payment Processing Implementation Plan
## 10€ Subscription with Polar.sh

### **Project Context**
This is a Next.js 15 boilerplate application with:
- Complete shadcn/ui component library (40+ components)
- Supabase backend configured for local development
- React Hook Form + Zod validation already set up
- No authentication UI or payment processing implemented yet

---

## 🎯 **Feature Overview**

**User Story**: *"As a visitor to the website, I want to sign up for a 10€ monthly subscription so I can access premium features, with a smooth payment experience that handles European tax compliance automatically."*

**Problem Solved**: Enable monetization through subscriptions while ensuring EU tax compliance and providing a professional payment experience.

**Target Users**: European customers looking for premium features who expect secure, compliant payment processing.

---

## 🔄 **Detailed User Flow**

### **New User Subscription Journey**
```
1. 🏠 Landing Page
   → User sees value proposition and pricing
   → Clear 10€/month subscription offer
   
2. 🎯 Sign Up Process  
   → User clicks "Get Started" or "Subscribe"
   → Redirected to signup form
   
3. 📝 Account Creation
   → Email and password form (Supabase Auth)
   → Form validation with clear error messages
   → Optional: Email verification step
   
4. 💳 Payment Details
   → Polar.sh checkout form integration
   → Credit card details with European payment methods
   → VAT automatically calculated based on location
   
5. ✅ Payment Processing
   → Polar.sh processes 10€ subscription
   → Real-time status updates
   → Webhook updates subscription status in database
   
6. 🎉 Success & Access
   → Confirmation page with subscription details
   → Automatic redirect to premium dashboard
   → Email confirmation sent
   
7. 👤 Ongoing Management
   → User dashboard with subscription status
   → Billing history and invoices
   → Self-service cancellation option
```

### **Edge Cases Handled**
- Payment failures → Retry flow with different payment method
- Network errors → Graceful loading states and retry options
- Webhook delays → Polling for status updates as fallback
- Subscription expiry → Grace period and renewal reminders

---

## 📚 **Technology Recommendations**

### **✅ Payment Processing: Polar.sh**
- **Package**: `@polar-sh/sdk` with Next.js adapter
- **Reasoning**: 
  - Mentioned in project's CLAUDE.md with dedicated documentation
  - Handles EU VAT/tax compliance automatically (Merchant of Record)
  - Excellent Next.js integration with TypeScript support
  - 4% + 40¢ per transaction (competitive for MoR service)
  - Built on Stripe infrastructure for reliability
- **Free Alternative**: Stripe (2.9% + 30¢ but requires manual tax compliance)

### **✅ Authentication: Supabase Auth (CLI-First Workflow)**
- **Package**: `@supabase/ssr` (modern SSR package for Next.js 15)
- **CLI Tools**: Supabase CLI for migrations, type generation, local development
- **Reasoning**: Already configured locally, CLI ensures version control of schema changes, type safety through generated types

### **✅ Form Handling: React Hook Form + Zod (Already Available)**
- **Packages**: `react-hook-form`, `zod`, `@hookform/resolvers` (already installed)
- **Reasoning**: Already configured with shadcn/ui form components

### **✅ UI Components: shadcn/ui (Already Available)**
- **Complete component library** already installed including:
  - Form components for payment forms
  - Card layouts for pricing
  - Alert dialogs for confirmations
  - Progress indicators for payment flow

---

## 📋 **Implementation Tasks (Ordered by Priority)**

### **Phase 1: Supabase CLI Setup & Authentication**
1. **Initialize Supabase CLI workflow (Local Only)**
   - Install Supabase CLI locally: `npm install --save-dev @supabase/cli`
   - Add Supabase npm scripts to package.json following `.agent/docs/supabase.md`
   - Initialize project: `npx supabase init`
   - Verify `npm run supabase:start` works with local services
   - Generate initial TypeScript types with `npm run supabase:types`
   - Set up proper client/server utilities following `.agent/docs/supabase.md`

2. **Create authentication pages** (`/app/auth/login`, `/app/auth/signup`)
   - Implement signup form using CLI-generated types
   - Implement login form with validation
   - Add password reset functionality
   - Use existing shadcn/ui Form components with type safety

3. **Set up protected routes middleware**
   - Create authentication middleware using `@supabase/ssr`
   - Implement redirect logic for unauthenticated users
   - Add loading states for auth checks

4. **Create basic user dashboard layout**
   - Protected `/dashboard` route
   - Display user profile information
   - Show subscription status placeholder
   - Use existing Card and Badge components

### **Phase 2: Polar.sh Integration**
4. **Install and configure Polar.sh**
   - Install `@polar-sh/sdk` package with Next.js adapter
   - Set up sandbox environment variables following `.claude/docs/polar.md`
   - Configure Polar client with sandbox server setting
   - Create API routes for Polar integration with proper OAuth scopes

5. **Design subscription database schema using CLI migrations**
   - Create migration: `npm run supabase:migration create_payment_tables`
   - Design `subscriptions` table with proper RLS policies
   - Design `payments` table with foreign key relationships
   - Apply migration locally: `npm run supabase:reset`
   - Regenerate TypeScript types: `npm run supabase:types`
   - Test schema with `npm run supabase:test`

6. **Build pricing page** (`/pricing`)
   - Single plan layout showing 10€/month
   - Feature comparison table
   - Clear call-to-action buttons
   - Use existing Card and Button components

### **Phase 3: Payment Processing**
7. **Implement Polar.sh checkout flow**
   - Create `/api/create-checkout` API route
   - Build checkout form with Polar.sh integration
   - Handle payment success/failure states
   - Implement proper error handling

8. **Set up webhook handling using Supabase Edge Functions**
   - Create webhook function: `npm run supabase:functions:new polar-webhook`
   - Test locally: `npm run supabase:functions:serve`
   - Implement webhook logic with proper signature verification
   - Update subscription status using CLI-generated types
   - Deploy function: `npm run supabase:functions:deploy polar-webhook`
   - Handle subscription lifecycle events

9. **Create subscription success flow**
   - Build `/payment/success` page
   - Display subscription confirmation
   - Automatic redirect to dashboard
   - Send confirmation email via Supabase

### **Phase 4: Subscription Management**
10. **Add subscription status checking**
    - Middleware to verify active subscriptions
    - Real-time status updates via webhooks
    - Grace period handling for failed payments
    - Redirect inactive users to pricing page

11. **Build subscription dashboard**
    - Current subscription status display
    - Next billing date and amount
    - Payment method management
    - Billing history table

12. **Implement cancellation flow**
    - Self-service cancellation form
    - Confirmation dialog with date
    - Update subscription status via Polar API
    - Retain access until period end

### **Phase 5: Polish & Edge Cases**
13. **Add comprehensive error handling**
    - Payment failure recovery flows
    - Network error handling with retries
    - User-friendly error messages
    - Fallback UI states

14. **Implement billing history**
    - Display past payments and invoices
    - Download invoice functionality
    - Payment status indicators
    - Search and filter options

15. **Add email notifications**
    - Payment confirmations
    - Billing reminders
    - Cancellation confirmations
    - Failed payment alerts

16. **Security hardening**
    - Rate limiting on payment endpoints
    - Input validation on all forms
    - CSRF protection
    - Secure webhook verification

---

## 🧪 **Testing Plan (E2E with Playwright)**

### **Critical User Journeys**
1. **Happy Path: New Subscription**
   ```
   ✅ Visit pricing page
   ✅ Click subscribe button
   ✅ Complete signup form
   ✅ Enter payment details (test card: 4242 4242 4242 4242)
   ✅ Confirm payment success
   ✅ Access premium dashboard
   ✅ Verify subscription status
   ```

2. **Authentication Flow**
   ```
   ✅ Sign up with email/password
   ✅ Log out successfully
   ✅ Log back in with credentials
   ✅ Access protected routes only when authenticated
   ✅ Redirect to login when accessing protected content logged out
   ```

3. **Subscription Management**
   ```
   ✅ View current subscription status
   ✅ Access billing history
   ✅ Initiate subscription cancellation
   ✅ Confirm cancellation with dialog
   ✅ Verify access retained until period end
   ```

4. **Payment Edge Cases**
   ```
   ✅ Handle declined payment (test card: 4000 0000 0000 0002)
   ✅ Show appropriate error message
   ✅ Allow retry with different payment method
   ✅ Verify successful retry updates status
   ```

5. **Error Scenarios**
   ```
   ✅ Network timeout during payment
   ✅ Invalid form submissions
   ✅ Webhook delivery failures
   ✅ Graceful degradation with offline state
   ```

### **Test Data Setup (CLI-First)**
- **Supabase CLI**: Use `npm run supabase:start` for consistent local testing environment
- **Database Seeding**: Create `supabase/seed.sql` for test data
- **Type Safety**: All tests use CLI-generated TypeScript types
- **Polar.sh Sandbox**: Use https://sandbox.polar.sh/ environment
- **Test Cards**: 4242 4242 4242 4242 (with future expiration date and random CVC)
- **Test Emails**: test+[timestamp]@example.com
- **CLI Testing**: Use `npm run supabase:test` for database logic validation
- **Auto-cleanup**: Sandbox subscriptions automatically cancel after 90 days

### **Database Testing Workflow**
```bash
# Create test data
echo "INSERT INTO auth.users (id, email) VALUES ('test-id', 'test@test.com');" > supabase/seed.sql

# Reset database with fresh test data
npm run supabase:reset

# Run database tests
npm run supabase:test

# Generate fresh types for tests
npm run supabase:types
```

---

## 🎯 **Success Criteria**

### **User Experience Metrics**
- ✅ **Conversion**: User can complete subscription in under 2 minutes
- ✅ **Trust**: Payment form looks professional and secure
- ✅ **Clarity**: Subscription status is always clearly visible
- ✅ **Control**: Users can easily manage/cancel their subscription

### **Technical Requirements**
- ✅ **Compliance**: EU VAT handled automatically by Polar.sh
- ✅ **Security**: PCI compliance through Polar.sh, no card data stored
- ✅ **Reliability**: 99.9% uptime for payment processing
- ✅ **Performance**: Payment form loads in under 2 seconds

### **Business Metrics**
- ✅ **Revenue**: 10€ monthly subscriptions process successfully
- ✅ **Retention**: Failed payments retry automatically
- ✅ **Analytics**: Subscription events tracked for business insights
- ✅ **Support**: Self-service subscription management reduces support load

---

## ⚠️ **Technical Considerations**

### **Required Environment Variables**
```bash
# Polar.sh Configuration (from .claude/docs/polar.md)
POLAR_ACCESS_TOKEN=your_sandbox_access_token_here  # Required for API operations
SUCCESS_URL=http://localhost:3000/success           # Required for checkout redirects

# Optional Polar.sh Variables  
POLAR_WEBHOOK_SECRET=your_webhook_secret_here       # For webhook verification
POLAR_ORGANIZATION_ID=your_organization_id_here     # May be required for some operations

# Supabase Configuration (from CLI - npm run supabase:status)
NEXT_PUBLIC_SUPABASE_URL=http://localhost:54321  # Development
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here  # From npm run supabase:status
SUPABASE_SERVICE_ROLE_KEY=your_service_key_here   # From npm run supabase:status

# Production (from supabase dashboard)
# NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
# NEXT_PUBLIC_SUPABASE_ANON_KEY=your_prod_anon_key
# SUPABASE_SERVICE_ROLE_KEY=your_prod_service_key
```

### **Database Schema Implementation (CLI-First)**

**Migration Creation:**
```bash
# Create migration file
npm run supabase:migration create_payment_tables

# Edit the generated migration file:
# supabase/migrations/YYYYMMDDHHMMSS_create_payment_tables.sql
```

**Migration Content:**
```sql
-- Subscriptions table with RLS
CREATE TABLE subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  polar_subscription_id TEXT UNIQUE NOT NULL,
  status TEXT NOT NULL DEFAULT 'active', -- active, canceled, past_due
  current_period_start TIMESTAMPTZ,
  current_period_end TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Payments table with RLS
CREATE TABLE payments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  subscription_id UUID REFERENCES subscriptions(id),
  polar_payment_id TEXT UNIQUE NOT NULL,
  amount INTEGER NOT NULL, -- in cents
  currency TEXT NOT NULL DEFAULT 'EUR',
  status TEXT NOT NULL DEFAULT 'pending', -- succeeded, failed, pending
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;

-- RLS Policies for subscriptions
CREATE POLICY "Users can view own subscriptions" ON subscriptions
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own subscriptions" ON subscriptions
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- RLS Policies for payments
CREATE POLICY "Users can view own payments" ON payments
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM subscriptions 
      WHERE subscriptions.id = payments.subscription_id 
      AND subscriptions.user_id = auth.uid()
    )
  );

-- Performance indexes
CREATE INDEX idx_subscriptions_user_id ON subscriptions(user_id);
CREATE INDEX idx_subscriptions_polar_id ON subscriptions(polar_subscription_id);
CREATE INDEX idx_payments_subscription_id ON payments(subscription_id);
```

**Apply Migration:**
```bash
# Apply migration locally
npm run supabase:reset

# Generate updated TypeScript types
npm run supabase:types

# Test the schema
npm run supabase:test
```

### **Security Considerations & CLI Best Practices**
- **Payment Security**: All payment data handled by Polar.sh (PCI compliant)
- **Database Security**: RLS policies enforced via CLI migrations
- **Type Safety**: CLI-generated types prevent SQL injection and type errors
- **Version Control**: All database changes tracked in migration files
- **Testing**: `npm run supabase:test` validates security policies
- **Webhook Security**: Signature verification in Edge Functions
- **Development**: Local Supabase instance isolation with `npm run supabase:start`
- **Deployment**: CLI ensures consistent prod/dev schema with `npm run supabase:push`

### **CLI Development Workflow Summary**
```bash
# Daily development cycle
npm run supabase:start                           # Start local services
npm run supabase:types                           # Update types
npm run dev                                       # Start Next.js

# When making database changes
npm run supabase:migration <change_description>  # Create migration
# Edit migration file
npm run supabase:reset                           # Apply changes locally
npm run supabase:types                           # Update types
npm run supabase:test                            # Test database logic

# Before deployment
npm run supabase:push                            # Deploy to production
npm run supabase:functions:deploy                # Deploy edge functions
npx supabase gen types typescript --project-id <id> > database.types.ts  # Update prod types
```

### **Error Handling Strategy**
- Payment failures → User-friendly retry flow
- Network errors → Graceful loading states with retry
- Webhook failures → Automatic retry with exponential backoff
- Auth errors → Clear guidance with helpful error messages

---

## 🚀 **Next Steps**

This plan provides a complete CLI-first roadmap for implementing payment processing with Polar.sh and Supabase. The implementation emphasizes:

- **CLI-First Development**: All database changes through migrations
- **Type Safety**: Generated TypeScript types from schema
- **Local Development**: Full Supabase stack via `supabase start`
- **Version Control**: Database schema and changes tracked in git
- **Testing**: Database logic validated with `supabase test db`
- **Deployment**: Consistent environments via `supabase db push`

The implementation should be done incrementally, testing each phase thoroughly with the CLI tools before moving to the next.

**Ready to start implementation?** Run `/phase3:work` to begin building these features with the CLI-first workflow!
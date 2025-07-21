# Stripe Integration

Stripe is our go-to payment provider for handling payments and customer management.

## Important Links

**READ THESE LINKS BEFORE YOU START WORKING ON STRIPE RELATED TASKS.**

- [Stripe API Documentation](https://stripe.com/docs/api) - Complete API reference
- [Stripe Next.js Integration Guide](https://stripe.com/docs/payments/checkout/migrating-to-checkout)
- [Stripe TypeScript SDK](https://stripe.com/docs/js)
- [Stripe Elements (React)](https://stripe.com/docs/stripe-js/react) - For custom payment forms
- [Stripe Checkout](https://stripe.com/docs/payments/checkout) - For hosted checkout flows
- [Testing with Stripe](https://stripe.com/docs/testing) - Test cards and scenarios

## Development Setup

### Environment Configuration

**For local development**, always use test mode:
- Stripe Dashboard: https://dashboard.stripe.com/test
- Use test API keys (start with `pk_test_` and `sk_test_`)
- Test payments won't process real money

**For production**:
- Stripe Dashboard: https://dashboard.stripe.com/
- Use live API keys (start with `pk_live_` and `sk_live_`)
- Real payments will be processed

### SDK Installation and Configuration

```bash
npm install stripe @stripe/stripe-js
npm install --save-dev @types/stripe
```

```typescript
// lib/stripe.ts
import Stripe from 'stripe';

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-06-20',
});

// For client-side (browser)
import { loadStripe } from '@stripe/stripe-js';

export const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);
```

### Checkout Implementation (RECOMMENDED APPROACH)

**Use Stripe Checkout for most use cases - it handles PCI compliance and provides better UX.**

#### Server-side: Create Checkout Session

```typescript
// app/api/checkout/route.ts
import { stripe } from '@/lib/stripe';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { priceId, quantity = 1, customerId, metadata } = await req.json();

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price: priceId, // Price ID from Stripe dashboard
          quantity,
        },
      ],
      mode: 'payment', // or 'subscription' for recurring payments
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/cancel`,
      customer: customerId, // Optional: existing customer ID
      metadata, // Optional: additional data
    });

    return NextResponse.json({ sessionId: session.id });
  } catch (error) {
    console.error('Error creating checkout session:', error);
    return NextResponse.json(
      { error: 'Error creating checkout session' },
      { status: 500 }
    );
  }
}
```

#### Client-side: Redirect to Checkout

```typescript
// components/CheckoutButton.tsx
'use client';

import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

interface CheckoutButtonProps {
  priceId: string;
  customerId?: string;
  metadata?: Record<string, string>;
}

export default function CheckoutButton({ priceId, customerId, metadata }: CheckoutButtonProps) {
  const handleCheckout = async () => {
    const stripe = await stripePromise;
    if (!stripe) return;

    // Create checkout session
    const response = await fetch('/api/checkout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ priceId, customerId, metadata }),
    });

    const { sessionId } = await response.json();

    // Redirect to Stripe Checkout
    const { error } = await stripe.redirectToCheckout({ sessionId });
    
    if (error) {
      console.error('Error redirecting to checkout:', error);
    }
  };

  return (
    <button onClick={handleCheckout} className="bg-blue-500 text-white px-4 py-2 rounded">
      Buy Now
    </button>
  );
}
```

### Subscription Implementation

```typescript
// app/api/subscriptions/route.ts
import { stripe } from '@/lib/stripe';

export async function POST(req: NextRequest) {
  try {
    const { customerId, priceId, metadata } = await req.json();

    const subscription = await stripe.subscriptions.create({
      customer: customerId,
      items: [{ price: priceId }],
      payment_behavior: 'default_incomplete',
      payment_settings: { save_default_payment_method: 'on_subscription' },
      expand: ['latest_invoice.payment_intent'],
      metadata,
    });

    return NextResponse.json({
      subscriptionId: subscription.id,
      clientSecret: subscription.latest_invoice?.payment_intent?.client_secret,
    });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
```

### Webhooks Implementation (CRITICAL FOR PRODUCTION)

**ALWAYS implement webhooks for reliable payment processing and subscription management.**

```typescript
// app/api/webhooks/stripe/route.ts
import { stripe } from '@/lib/stripe';
import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(req: NextRequest) {
  const body = await req.text();
  const sig = req.headers.get('stripe-signature')!;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, sig, endpointSecret);
  } catch (err) {
    console.error(`Webhook signature verification failed.`, err);
    return NextResponse.json({ error: 'Webhook signature verification failed' }, { status: 400 });
  }

  // Handle the event
  switch (event.type) {
    case 'checkout.session.completed':
      const session = event.data.object as Stripe.Checkout.Session;
      // Handle successful payment
      console.log('Payment successful:', session.id);
      // Update your database, send confirmation emails, etc.
      break;

    case 'invoice.payment_succeeded':
      const invoice = event.data.object as Stripe.Invoice;
      // Handle successful subscription payment
      console.log('Subscription payment successful:', invoice.subscription);
      break;

    case 'customer.subscription.created':
      const subscription = event.data.object as Stripe.Subscription;
      // Handle new subscription
      console.log('New subscription:', subscription.id);
      // Activate user account, grant access, etc.
      break;

    case 'customer.subscription.updated':
      const updatedSubscription = event.data.object as Stripe.Subscription;
      // Handle subscription changes
      console.log('Subscription updated:', updatedSubscription.id);
      break;

    case 'customer.subscription.deleted':
      const canceledSubscription = event.data.object as Stripe.Subscription;
      // Handle subscription cancellation
      console.log('Subscription canceled:', canceledSubscription.id);
      // Remove access, send cancellation emails, etc.
      break;

    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  return NextResponse.json({ received: true });
}
```

### Required Environment Variables

```bash
# Stripe API Keys (required for all operations)
STRIPE_SECRET_KEY=sk_test_... # Test key for development
# STRIPE_SECRET_KEY=sk_live_... # Live key for production

NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_... # Test key for development
# NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_... # Live key for production

# Webhook secret for signature verification (required for webhook handling)
STRIPE_WEBHOOK_SECRET=whsec_...

# Base URL for redirects (required for checkout flows)
NEXT_PUBLIC_BASE_URL=http://localhost:3000  # Development
# NEXT_PUBLIC_BASE_URL=https://yourdomain.com  # Production
```

### Customer Management

```typescript
// Creating a customer
const customer = await stripe.customers.create({
  email: 'customer@example.com',
  name: 'John Doe',
  metadata: {
    userId: 'user_123',
  },
});

// Retrieving customer
const customer = await stripe.customers.retrieve('cus_...');

// Updating customer
const updatedCustomer = await stripe.customers.update('cus_...', {
  email: 'newemail@example.com',
});
```

### Product and Price Management

```typescript
// Create a product
const product = await stripe.products.create({
  name: 'Premium Plan',
  description: 'Access to all premium features',
});

// Create a price for one-time payment
const price = await stripe.prices.create({
  product: product.id,
  unit_amount: 2000, // $20.00 in cents
  currency: 'usd',
});

// Create a price for recurring subscription
const recurringPrice = await stripe.prices.create({
  product: product.id,
  unit_amount: 1000, // $10.00 in cents
  currency: 'usd',
  recurring: {
    interval: 'month',
  },
});
```

## Integration Guidelines

### Stripe Checkout vs Custom Forms

**Use Stripe Checkout for:**
- ✅ Quick implementation with minimal code
- ✅ Built-in PCI compliance
- ✅ Mobile-optimized payment flows
- ✅ Multiple payment methods (cards, wallets, bank transfers)
- ✅ Automatic tax calculation
- ✅ Reduced development and maintenance burden

**Use Custom Forms (Stripe Elements) when:**
- ❌ You need complete control over the payment UX
- ❌ You want payments to stay on your domain
- ❌ You need to collect additional data during payment
- ❌ You have specific design requirements

### Security Best Practices

- **Never expose secret keys** in client-side code
- **Always validate webhooks** using signature verification
- **Use HTTPS** for all webhook endpoints
- **Store sensitive data** securely and follow PCI compliance guidelines
- **Use publishable keys** only on the client side
- **Validate payment amounts** on the server side

### Testing Guidelines

**Test Cards for Development:**
```
# Successful payments
4242 4242 4242 4242 (Visa)
4000 0566 5566 5556 (Visa Debit)
5555 5555 5555 4444 (Mastercard)

# Declined payments
4000 0000 0000 0002 (Generic decline)
4000 0000 0000 9995 (Insufficient funds)

# 3D Secure authentication required
4000 0025 0000 3155 (Authentication required)

# Use any future expiration date and any 3-digit CVC
```

**Testing Webhooks Locally:**
```bash
# Install Stripe CLI
stripe listen --forward-to localhost:3000/api/webhooks/stripe

# Test webhook events
stripe trigger checkout.session.completed
stripe trigger customer.subscription.created
```
### E2E Testing

E2E testing is currently not possible with stripe. It needs to be done manually.

### Common Implementation Patterns

**1. One-time Payments:**
- Create checkout session with `mode: 'payment'`
- Handle `checkout.session.completed` webhook
- Fulfill order based on session metadata

**2. Subscriptions:**
- Create checkout session with `mode: 'subscription'`
- Handle `customer.subscription.created` webhook
- Manage subscription lifecycle with additional webhooks

**3. Usage-based Billing:**
- Create subscription with metered pricing
- Report usage via Stripe API
- Handle `invoice.payment_succeeded` webhooks

**4. Customer Portal:**
```typescript
// Create customer portal session
const portalSession = await stripe.billingPortal.sessions.create({
  customer: customerId,
  return_url: 'https://yourdomain.com/account',
});

// Redirect customer to portal
window.location.href = portalSession.url;
```

### Error Handling

```typescript
try {
  const paymentIntent = await stripe.paymentIntents.create({
    amount: 2000,
    currency: 'usd',
  });
} catch (error) {
  if (error instanceof Stripe.errors.StripeCardError) {
    // Card was declined
    console.error('Card declined:', error.message);
  } else if (error instanceof Stripe.errors.StripeRateLimitError) {
    // Rate limit exceeded
    console.error('Rate limit exceeded');
  } else if (error instanceof Stripe.errors.StripeInvalidRequestError) {
    // Invalid parameters
    console.error('Invalid request:', error.message);
  } else {
    // Other error
    console.error('Unexpected error:', error.message);
  }
}
```

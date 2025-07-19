# Polar.sh Integration

Polar.sh is our go-to payment provider for handling payments and customer management.

## Important Links

**READ THESE LINKS BEFORE YOU START WORKING ON POLAR.SH RELATED TASKS.**

- [LLM-optimized polar docs](https://docs.polar.sh/llms.txt) - Complete documentation in LLM-friendly format
- [Polar.sh guide for Next.js](https://docs.polar.sh/integrate/sdk/adapters/nextjs.md)
- [Typescript SDK (use in conjunction with the Next.js adapter)](https://docs.polar.sh/integrate/sdk/typescript.md)
- [Next.js Adapter](https://docs.polar.sh/integrate/sdk/adapters/nextjs.md)
- [Sandbox Environment](https://docs.polar.sh/integrate/sandbox.md) - Use for local testing and development

## Development Setup

### Environment Configuration

**For local development**, always use the sandbox environment:
- Sandbox Dashboard: https://sandbox.polar.sh/start
- API Base URL: `https://sandbox-api.polar.sh`
- Create a dedicated sandbox access token (cannot use production token)
- Subscriptions automatically cancel after 90 days

**For production**:
- Production Dashboard: https://polar.sh/
- API Base URL: `https://api.polar.sh`
- Use production access tokens

### SDK Configuration

```typescript
const polar = new Polar({
  server: process.env.NODE_ENV === 'production' ? 'production' : 'sandbox',
  accessToken: process.env['POLAR_ACCESS_TOKEN'] ?? '',
})
```

### Checkout Example

```typescript
// src/app/checkout/route.ts
import { Checkout } from "@polar-sh/nextjs";

export const GET = Checkout({
  accessToken: process.env.POLAR_ACCESS_TOKEN!,
  successUrl: "/confirmation?checkout_id={CHECKOUT_ID}",
  server: process.env.NODE_ENV === 'production' ? 'production' : 'sandbox'
});
```


### Required Environment Variables

```bash
# Access Token for API authentication (required for all API operations like creating customers, products, checkouts)
POLAR_ACCESS_TOKEN=your_access_token_here

# Success URL for checkout redirects (required for checkout flows to redirect users after successful payment)
SUCCESS_URL=http://localhost:3000/success  # Development
# SUCCESS_URL=https://yourdomain.com/success  # Production
```

### Optional Environment Variables

```bash
# Client Secret for OAuth 2.0 authentication (only required for partner integrations and extensions)
POLAR_CLIENT_SECRET=your_client_secret_here

# Webhook secret for signature verification (optional - only if you want to receive and verify webhook events)
POLAR_WEBHOOK_SECRET=your_webhook_secret_here

# Organization ID (may be required for some operations - check specific API endpoints)
POLAR_ORGANIZATION_ID=your_organization_id_here
```

## Integration Guidelines

### SDK Usage

1. **Install the SDK**: Use `@polar-sh/sdk` with the Next.js adapter
2. **Initialize with environment**: Always check if you're in sandbox or production mode
3. **Error Handling**: Implement proper error handling for payment failures
4. **Webhooks**: Set up webhook endpoints for payment confirmations and subscription updates

### Common Implementation Patterns

When implementing Polar.sh features:

1. **Payment Processing**:
   - Use the checkout flow for one-time payments
   - Implement subscription management for recurring billing
   - Handle payment status updates via webhooks

2. **Customer Management**:
   - Sync customer data between your app and Polar
   - Handle subscription lifecycle events
   - Implement customer portal for self-service

3. **Testing**:
   - Always test with sandbox environment first
   - Use Stripe test card: 4242 4242 4242 4242 (with future expiration date and random CVC)

### Security Best Practices

- Never expose API keys in client-side code
- Use environment variables for all credentials
# Project Documentation

This folder contains critical documentation for important libraries and technologies used in this project. **Always check this documentation before implementing features related to these topics.**

## Available Documentation

### [Polar.sh Integration](./polar.md)
Complete guide for payment processing and customer management using Polar.sh.

**Use for:** Payment flows, subscriptions, checkout processes, customer billing

**Key features:**
- Sandbox/Production environment setup
- Next.js integration patterns  
- Checkout implementation
- Customer management
- Webhook handling

### [Supabase Integration](./supabase.md)
Comprehensive guide for backend services using Supabase with CLI-first workflow.

**Use for:** Authentication, database operations, real-time features, Edge Functions

**Key features:**
- Local development with CLI
- Database migrations and seeding
- TypeScript type generation
- Testing procedures
- Edge Functions deployment

## Quick Reference

| Technology | Documentation | Primary Use Cases |
|------------|---------------|-------------------|
| **Polar.sh** | [polar.md](./polar.md) | Payments, subscriptions, billing |
| **Supabase** | [supabase.md](./supabase.md) | Database, auth, real-time features |

## Usage Guidelines

1. **Before implementing any feature**, check if relevant documentation exists here
2. **Follow documented patterns** and best practices for consistency
3. **Use recommended libraries** and configurations from the docs
4. **Refer to environment setup** procedures for proper configuration
5. **Follow CLI workflows** as documented for consistency across the team

## Adding New Documentation

When working with new libraries or technologies, **ask the user if documentation should be created** rather than creating it automatically:

1. **Ask first**: "Should I create documentation for [technology name] in .agent/docs?"
2. **If approved**: Create a new `.md` file with the technology name
3. **Include**: Setup instructions, key patterns, and best practices
4. **Update**: This index with a reference to the new documentation
5. **Follow**: The same structure as existing docs for consistency

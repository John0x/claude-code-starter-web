# Supabase Integration with CLI-First Workflow

Supabase is our backend solution providing authentication, database, and real-time features. This guide emphasizes CLI-first development for better version control and team collaboration.

## Important Links

- [Supabase CLI Documentation](https://supabase.com/docs/guides/cli)
- [Next.js SSR Integration](https://supabase.com/docs/guides/auth/server-side/nextjs)
- [TypeScript Types Generation](https://supabase.com/docs/guides/api/rest/generating-types)
- [Local Development Guide](https://supabase.com/docs/guides/cli/local-development)
- [Database Migrations](https://supabase.com/docs/guides/cli/local-development#database-migrations)

## CLI Setup (Local Only - No Global Installation)

### Local CLI via npm Scripts

**NEVER install Supabase CLI globally.** Always use local installation via npm scripts for better project consistency and version control.

### Project Setup

```bash
# Install Supabase CLI as a local dev dependency
npm install --save-dev @supabase/cli

# Initialize Supabase in existing project
npx supabase init

# Login to your Supabase account
npx supabase login

# Link to production project (when ready)
npx supabase link --project-ref <your-project-id>
```

### Add to package.json Scripts (Required)

Add these scripts to `package.json` for all Supabase operations:

```json
{
  "scripts": {
    "supabase:start": "supabase start",
    "supabase:stop": "supabase stop",
    "supabase:status": "supabase status", 
    "supabase:reset": "supabase db reset",
    "supabase:types": "supabase gen types typescript --local > database.types.ts",
    "supabase:migration": "supabase migration new",
    "supabase:test": "supabase test db",
    "supabase:push": "supabase db push",
    "supabase:pull": "supabase db pull",
    "supabase:functions:new": "supabase functions new",
    "supabase:functions:serve": "supabase functions serve",
    "supabase:functions:deploy": "supabase functions deploy"
  }
}
```

## Local Development Workflow

### Essential Commands

**ALWAYS use npm scripts for local development (never global CLI):**

```bash
# Start all Supabase services locally (requires Docker)
npm run supabase:start

# Check status of all services
npm run supabase:status

# Stop all services
npm run supabase:stop

# Stop without creating database backup
npx supabase stop --no-backup
```

### Local Services (after `npm run supabase:start`)
- **API URL**: `http://localhost:54321`
- **Database**: `postgresql://postgres:postgres@localhost:54322/postgres`
- **Studio (Admin UI)**: `http://localhost:54323`
- **Inbucket (Email Testing)**: `http://localhost:54324`
- **Edge Functions**: `http://localhost:54321/functions/v1/`

## Database Management via CLI

### Migration Commands

**NEVER make direct changes to the database - always use migrations via npm scripts:**

```bash
# Create new migration file
npm run supabase:migration <migration_name>

# Example: Create payment tables
npm run supabase:migration create_payment_tables

# Generate migration from schema differences
npx supabase db diff -f <migration_name>

# Reset local database (applies all migrations + seeds)
npm run supabase:reset

# Pull remote schema to local (sync from production)
npm run supabase:pull

# Push local migrations to remote (deploy to production)
npm run supabase:push
```

### Database Seeding

```bash
# Create seed file for development data
echo "
-- Insert test user data (only for local development)
INSERT INTO auth.users (id, email) VALUES 
  ('550e8400-e29b-41d4-a716-446655440000', 'test@example.com');
" > supabase/seed.sql

# Seeds automatically run on database reset
npm run supabase:reset
```

## TypeScript Integration

### Type Generation (CRITICAL for type safety)

```bash
# Generate TypeScript types from your database schema
npm run supabase:types

# For production (after linking)
npx supabase gen types typescript --project-id <project-ref> > database.types.ts

# The npm script handles local type generation automatically
```



```bash
# Create database tests
npx supabase test new test_payment_logic

# Run all database tests
npm run supabase:test

# Run specific test file
npx supabase test db --file tests/test_payment_logic.sql
```

**`supabase/tests/test_payments.sql`:**
```sql
-- Test payment insertion
INSERT INTO auth.users (id, email) VALUES ('test-user-id', 'test@test.com');
INSERT INTO subscriptions (user_id, polar_subscription_id) VALUES ('test-user-id', 'sub_test123');

-- Test RLS policies
SELECT auth.login_as_user('test-user-id');
SELECT * FROM subscriptions; -- Should return the test subscription

-- Cleanup
TRUNCATE auth.users CASCADE;
```



```bash
# Create new Edge Function
npm run supabase:functions:new polar-webhook

# Serve functions locally
npm run supabase:functions:serve

# Deploy specific function
npm run supabase:functions:deploy polar-webhook

# Deploy all functions
npm run supabase:functions:deploy
```

```bash
# Daily development workflow
npm run supabase:start                   # Start local services
npm run supabase:migration <name>        # Create migration
npm run supabase:reset                   # Apply all migrations
npm run supabase:types                   # Update types
npm run dev                              # Start Next.js

# When deploying
npm run supabase:push                    # Deploy migrations
npm run supabase:functions:deploy        # Deploy edge functions
npx supabase gen types typescript --project-id <id> > database.types.ts  # Update production types
```

This CLI-first approach ensures consistency, version control, and seamless collaboration across your development team.
# Portfolio Management System - Next.js 16 Implementation

## Architecture Overview

This implementation uses **direct Prisma queries in server actions** with **Next.js 16 Cache Components** for optimal performance.

## Files Structure

### 1. Database Model
**File:** `prisma/schema.prisma`
```prisma
model Portfolio {
  id          String    @id @default(cuid())
  title       String    @db.VarChar(255)
  description String?   @db.Text
  category    String    @db.VarChar(100)
  image       String    @db.VarChar(500)
  tags        String[]  @default([])
  featured    Boolean   @default(false)
  status      String    @default("PUBLISHED")
  createdAt   DateTime  @default(now()) @map("created_at")
  updatedAt   DateTime  @updatedAt @map("updated_at")

  @@index([category])
  @@index([status])
  @@index([featured])
}
```

### 2. Validation Schema
**File:** `lib/validations/portfolio.ts`
- Zod schema for portfolio validation
- Required fields: title, description, category, image, tags
- Validation rules for each field

### 3. Server Actions (Direct Prisma Queries)
**File:** `Actions/portfolio.ts`

#### Functions:
- `createPortfolio(data)` - Create new portfolio
  - Authorization check
  - Zod validation
  - Prisma create
  - Revalidate cache tag "portfolios"

- `updatePortfolio(id, data)` - Update portfolio
  - Authorization check
  - Zod validation
  - Prisma update
  - Revalidate cache tag "portfolios"

- `deletePortfolio(id)` - Delete portfolio
  - Authorization check
  - Prisma delete
  - Revalidate cache tag "portfolios"

- `getPortfolios()` - Get all portfolios (cached)
  - Uses `"use cache"` directive
  - Returns all portfolios ordered by createdAt DESC

- `getPortfolioById(id)` - Get single portfolio (cached)
  - Uses `"use cache"` directive
  - Returns portfolio or throws error

- `getPublishedPortfolios()` - Get published portfolios (cached)
  - Uses `"use cache"` directive
  - Filters by status = "PUBLISHED"
  - Orders by featured DESC, then createdAt DESC

### 4. API Route (GET Only)
**File:** `app/api/portfolio/route.ts`

```typescript
export async function GET() {
  // Calls getPublishedPortfolios() server action
  // Returns cached response with Cache-Control headers
  // s-maxage=3600 (1 hour)
  // stale-while-revalidate=86400 (24 hours)
}
```

### 5. Components

#### PortfolioForm
**File:** `components/admin/PortfolioForm.tsx`
- React Hook Form integration
- Zod validation with real-time errors
- Required field indicators (*)
- Tag management (add/remove)
- Category dropdown
- Status and featured toggles
- Create/Edit mode support
- Clean form reset on mode change
- Direct server action calls

#### PortfolioTable
**File:** `components/admin/PortfolioTable.tsx`
- Pixel-perfect table layout
- Text overflow handling with "..." and primary/20 color
- Dialog expansion for full text on click
- Edit and Delete action buttons
- Delete loader animation
- Badge display for status and featured
- Tag preview with "+X more" indicator

### 6. Admin Page
**File:** `app/(content)/admin/portfolio/page.tsx`
- Portfolio list with table
- Create new project button
- Edit functionality
- Delete functionality with loader
- Form dialog for create/edit
- Toast notifications
- Loading states

### 7. Public Portfolio Page
**File:** `app/(user)/portfolio/PortfolioClient.tsx`
- Fetches from `/api/portfolio`
- Category filtering
- Featured project highlighting
- Responsive grid layout
- Hero section
- CTA section

## Caching & Revalidation Strategy

### Cache Components Pattern (Next.js 16)

**Cached Functions:**
```typescript
export async function getPortfolios() {
  "use cache";  // Enables caching
  // Prisma query
}
```

**Revalidation on Mutations:**
```typescript
export async function createPortfolio(data) {
  // Create operation
  revalidateTag("portfolios");  // Invalidate cache
}
```

### API Caching
```typescript
// HTTP Cache-Control headers
"Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400"
```

## Authorization

All server actions check:
- User is authenticated
- User role is ADMIN, SUPER_ADMIN, or DEVELOPER

## Database Migration

```bash
npx prisma migrate dev --name add_portfolio
```

## Usage

### Admin Panel
1. Navigate to `/admin/portfolio`
2. Click "New Project" to create
3. Fill required fields (marked with *)
4. Click "Create Portfolio"
5. Edit: Click edit icon
6. Delete: Click trash icon (shows loader)

### Public Portfolio
1. Navigate to `/portfolio`
2. View published portfolios
3. Filter by category
4. Featured projects highlighted

### API Usage
```bash
GET /api/portfolio
# Returns published portfolios with caching headers
```

## Performance Features

✅ **Caching:** `"use cache"` directive for read operations
✅ **Revalidation:** `revalidateTag()` for mutations
✅ **HTTP Caching:** Cache-Control headers on API
✅ **Stale-While-Revalidate:** 24-hour fallback cache
✅ **Direct Prisma:** No extra abstraction layers
✅ **Authorization:** Built-in role checks
✅ **Validation:** Zod schema validation
✅ **Error Handling:** Try-catch with proper error messages

## Next Steps

1. Run migration: `npx prisma migrate dev --name add_portfolio`
2. Seed initial data (optional)
3. Test admin panel at `/admin/portfolio`
4. Test public page at `/portfolio`
5. Test API at `/api/portfolio`

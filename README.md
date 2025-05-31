# 📘 Project Task Assignment: Accounting App

## 🧩 Overview

You will be building a simple accounting app using the following stack:

- **Framework**: Next.js
- **Database**: MongoDB (via Prisma)
- **UI**: TailwindCSS, React
- **Form Validation**: React Hook Form + Zod
- **Notifications**: react-hot-toast or similar
- **Icons**: react-icons

## 📦 Main Modules

### 1. Chart of Accounts

- CRUD operations for account types: `Asset`, `Liability`, `Equity`, `Expense`, `Revenue`
- View table of accounts with edit/delete buttons
- Add/Edit form with validation
- Dynamic route: `/account/[id]` showing related journal entries

### 2. Journal Entry

- Add journal entry with multiple debit/credit lines
- Ensure **Total Debit = Total Credit**
- View journal entries per account on account detail page

## ⚒️ Schema Overview (`schema.prisma`)

```
model Account {
  id        String   @id @default(auto()) @map("_id")
  name      String
  type      String
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  entries   JournalEntryLine[]
}

model JournalEntry {
  id        String   @id @default(auto()) @map("_id")
  date      DateTime
  memo      String?
  lines     JournalEntryLine[]
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

model JournalEntryLine {
  id              String   @id @default(auto()) @map("_id")
  journalEntryId  String
  accountId       String
  debit           Float
  credit          Float
}

```

## 👥 Task Assignment

### 🔹 Developer 1 – Chart of Accounts Lead

### 🔧 Backend

- [ ] Create **API routes** under `/api/accounts`:
  - POST `/api/accounts` → Create account
  - PUT `/api/accounts/[id]` → Update account
  - DELETE `/api/accounts/[id]` → Delete account
  - GET `/api/accounts` → List all accounts
- [ ] Implement Prisma queries for CRUD operations

### 🎨 Frontend

- [ ] Page: `/`→ Table listing all accounts
- [ ] Add/Edit form modal using:
  - `accountForm.tsx` (shared for add/edit)
  - `react-hook-form` + `zod`
  - Use `react-hot-toast` for success/fail messages
- [ ] Edit/Delete buttons with confirmation
- [ ] Link to dynamic route: `/account/[id]`

### 📄 Extra

- [ ] Dynamic page: `/account/[id]`
  - List all related journal entries (fetched by account ID)

### 🔹 Developer 2 – Journal Entry Lead

### 🔧 Backend

- [ ] Create API route under `/api/entries`:
  - POST `/api/entries` → Create journal entry with multiple lines
- [ ] Validate input to ensure **Total Debit = Total Credit**
- [ ] Prisma queries for creating journal entry and lines

### 🎨 Frontend

- [ ] Component: `journalEntryForm.tsx`
  - Dynamic line items (add/remove rows)
  - Use `react-hook-form` + `zod` for validation
  - Ensure frontend prevents submitting unbalanced entries
  - Use `react-hot-toast` for alerts
- [ ] Button in `/account/[id]` to open Journal Entry form modal
- [ ] Show list of journal entries per account on `/account/[id]` page

## 🧠 Shared Responsibilities

- Use Tailwind for consistent styling
- Use TypeScript for all files (strict mode)
- Ensure clean folder structure (e.g., `components`, `app/api`, `lib`, `types`)
- Reuse components wherever possible
- Write meaningful commit messages
- Use Git branches (`feature/chart-of-accounts`, `feature/journal-entry`)
- Test each other's APIs

---

## 📁 Suggested Folder Structure

```
/components
  └── forms
      ├── accountForm.tsx
      └── journalEntryForm.tsx
/pages
  ├── accounts/index.tsx
  └── account/[id].tsx
/api/api
  ├── accounts/[id].ts
  ├── accounts/index.ts
  └── entries/index.ts
/prisma
  └── prisma.schema
/lib
  └── interfaces
  └── zod-validations

```

---

## ✅ Acceptance Criteria

- All forms must be validated using `zod`
- Account types must be selected from predefined list
- Journal entries cannot be saved if debit ≠ credit
- Modals/forms must be reusable for add/edit
- Good error handling with toast notifications
- Each route must be tested with real MongoDB data

env

```
DATABASE_URL="mongodb+srv://arfat:FiZFO2BWJB7wOnq6@dorcor-appointment.o6zfvjw.mongodb.net/xponent?retryWrites=true&w=majority&appName=arfat"
```

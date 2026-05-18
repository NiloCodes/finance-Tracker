Phase 1: 📋 Planning
Problem it solves:
People struggle to track where their money goes. This app gives users a simple way to log and visualize their income and expenses.
Who are the users:
A single user (you, for now) — so no admin roles or complex permissions needed.
Features IN scope (your MVP):

Sign up / Log in
Add a transaction (amount, category, date, note)
View all transactions in a list
Delete a transaction
Dashboard showing total income, total expenses, balance

Features OUT of scope (for now):

Multiple currencies
Bank integrations
Shared accounts
Mobile app

Timeline: 5–6 weeks solo

Phase 2: 🎨 Design
Screen Map (what pages exist):
/login         → Login page
/register      → Sign up page
/dashboard     → Summary cards + chart
/transactions  → Full list of transactions
Database Schema (what data you'll store):
sql-- Users table
users
  id          SERIAL PRIMARY KEY
  email       VARCHAR UNIQUE NOT NULL
  password    VARCHAR NOT NULL
  created_at  TIMESTAMP DEFAULT NOW()

-- Transactions table
transactions
  id          SERIAL PRIMARY KEY
  user_id     INT REFERENCES users(id)
  type        VARCHAR  -- 'income' or 'expense'
  amount      DECIMAL
  category    VARCHAR  -- e.g. 'Food', 'Rent', 'Salary'
  note        VARCHAR
  date        DATE
  created_at  TIMESTAMP DEFAULT NOW()
API Endpoints (what your backend will expose):
MethodEndpointWhat it doesPOST/auth/registerCreate a new userPOST/auth/loginLog in, return JWT tokenGET/transactionsGet all transactions for logged-in userPOST/transactionsAdd a new transactionDELETE/transactions/:idDelete a transaction


Phase 3: 💻 Development
Build in this order — each step gives you something working:
Sprint 1 (Week 1–2) — Backend

 Initialize Node + Express project
 Connect to PostgreSQL, create tables
 Build auth routes (register, login, JWT)
 Build transaction routes (GET, POST, DELETE)
 Test all routes with Postman or Thunder Client

Sprint 2 (Week 3) — Frontend Core

 Set up React app with Vite
 Build Login and Register pages
 Connect auth to your API, store JWT in memory
 Build Transactions page — fetch and display list

Sprint 3 (Week 4) — Features + Dashboard

 Add Transaction form (amount, category, date, note)
 Delete transaction button
 Dashboard page with totals (income, expenses, balance)
 Add a bar or pie chart with Recharts

Sprint 4 (Week 5) — Polish + Deploy

 Form validation and error messages
 Loading states (skeleton loaders or spinners)
 Deploy frontend to Vercel
 Deploy backend + DB to Railway
 Write README


Phase 4: 🧪 Testing
Manual testing checklist:

 Can you register a new user?
 Does login fail with wrong password?
 Can you add a transaction and see it appear?
 Does the dashboard total update after adding?
 Can you delete a transaction?
 Does the app block unauthenticated users from /dashboard?
 What happens if you submit an empty form?

One unit test to add (impresses recruiters):
Test your transaction calculation logic — that income minus expenses equals the correct balance. Use Jest for this.

Phase 5: 🚀 Deployment
Your deployment setup:
Your Laptop (Dev)
      ↓  push to GitHub
GitHub Actions (optional: auto-run tests)
      ↓
Vercel  → hosts your React frontend
Railway → hosts your Express API + PostgreSQL DB
Every time you push to GitHub, Vercel auto-deploys. That's a real CI/CD pipeline — and you can say so in interviews.

Phase 6: 🔧 Maintenance / README
Your README should include:
markdown# Finance Tracker
A full-stack web app to track personal income and expenses.

## Features
- JWT Authentication
- Add / delete transactions
- Dashboard with spending summary and chart

## Tech Stack
React, Node.js, Express, PostgreSQL

## Live Demo
[link here]

## Screenshots
[add 2-3 screenshots]

## Run Locally
[setup instructions]

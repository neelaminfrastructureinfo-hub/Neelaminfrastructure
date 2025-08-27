# NEELAM INFRASTRUCTURE – Full-Stack Starter

A production-ready starter for a civil construction company website with:

- **Frontend**: HTML + Tailwind (CDN) + vanilla JS
- **Backend**: Node.js + Express
- **Database**: MongoDB (Mongoose)
- **Auth**: JWT with role-based access (admin, employee)
- **Features**: Projects, Employee Login, Timesheets, Basic Landing Pages

## Quick Start

1. Install **Node.js 18+** and **MongoDB 6+**.
2. In one terminal:

```bash
cd backend
cp .env.sample .env
# edit .env if needed (MONGO_URI, JWT_SECRET)
npm install
npm run dev
```

3. Seed an initial admin:

```bash
curl -X POST http://localhost:8080/api/auth/seed-admin \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@neelaminfra.com","password":"Admin@123","name":"NEELAM Admin"}'
```

4. Open http://localhost:8080 in your browser.
5. Log in via **Login** link using your seeded admin, then create employee accounts in **Dashboard → Users** (simple form provided).

> Tip: Change the default port by editing `PORT` in `.env`.

## Folder Structure

```
neelam-infrastructure/
├─ backend/        # Node/Express API + static file server
│  ├─ src/
│  │  ├─ models/ (User, Project, Timesheet)
│  │  ├─ routes/ (auth, projects, timesheets)
│  │  └─ middleware/ (auth)
│  ├─ server.js
│  ├─ package.json
│  └─ .env.sample
└─ frontend/       # Static HTML/JS (Tailwind via CDN)
   ├─ index.html
   ├─ login.html
   ├─ dashboard.html
   ├─ projects.html
   ├─ contact.html
   └─ assets/
      ├─ api.js
      ├─ auth.js
      └─ dashboard.js
```

## Notes

- This starter keeps the frontend simple (no build tools) and focuses on solid backend/auth.
- You can later replace the frontend with React/Next.js while keeping the API unchanged.
- JWT is stored in localStorage for simplicity. For higher security, consider httpOnly cookies.
- Role-based access is enforced on the server via `requireRole` middleware.

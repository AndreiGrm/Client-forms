# Client Forms

Angular 19 application for multi-step client registration and management.

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Angular 19 (standalone components) |
| UI Library | PrimeNG 19 + Aura theme |
| Styling | Tailwind CSS 4 |
| Forms | Angular Reactive Forms |
| HTTP | Angular HttpClient |
| Location data | country-state-city |
| Backend | REST API (json-server or custom Node) |

## Architecture

```
src/app/
├── model/              # TypeScript interfaces
│   ├── account.model.ts
│   ├── client.model.ts
│   ├── company.model.ts
│   ├── residence.model.ts
│   └── user.model.ts
├── services/           # HTTP services (one per resource)
│   ├── http.service.ts         # Base CRUD wrapper
│   ├── account.service.ts
│   ├── client.service.ts
│   ├── company.service.ts
│   ├── residence.service.ts
│   ├── login.service.ts
│   └── user.service.ts
└── presentation/       # Routed page components
    ├── login/
    ├── homepage/           # Shell with sidebar nav
    ├── clients/            # Client list table
    ├── client-form/        # Step 1 – personal data
    ├── residence/          # Step 2 – address
    ├── company/            # Step 3 – company data
    └── client/             # Step 4 – review & confirm
```

## Multi-Step Form Flow

```
/homepage/client-form → /homepage/residence → /homepage/company → /homepage/client
```

Each step auto-saves its form values to `localStorage` on every change. The final review page (`/client`) reads all three keys and assembles the full `Client` object.

| localStorage key | Content |
|---|---|
| `client-data` | Personal data (step 1) |
| `residence-data` | Address data (step 2) |
| `company-data` | Company data (step 3) |

## Routes

| Path | Component | Description |
|---|---|---|
| `/` | LoginComponent | Authentication |
| `/homepage` | HomepageComponent | Shell (redirects to `/homepage/clients`) |
| `/homepage/clients` | ClientsComponent | Client list with delete |
| `/homepage/client-form` | ClientFormComponent | Step 1 personal data |
| `/homepage/residence` | ResidenceComponent | Step 2 address |
| `/homepage/company` | CompanyComponent | Step 3 company |
| `/homepage/client` | ClientComponent | Step 4 review |

## Services

All services extend `HttpService` which wraps `HttpClient`. Every method returns an `Observable` — components are responsible for subscribing.

```ts
// HttpService methods
load(param: string)                     // GET    /api/{param}
add<T>(param: string, value: T)         // POST   /api/{param}
update<T>(param: string, id, value: T)  // PUT    /api/{param}/{id}
delete(param: string, id: number)       // DELETE /api/{param}/{id}
```

## Environments

| File | API URL |
|---|---|
| `environment.ts` | `http://localhost:3000/` |
| `environment.prod.ts` | `https://tr-client-back-end.onrender.com/` |

`http.service.ts` currently imports `environment.prod.ts` directly. To enable proper environment switching, change the import to `environment.ts` and configure `fileReplacements` in `angular.json` for the production build.

## Getting Started

```bash
# Install dependencies
npm install

# Start the Angular dev server
npm start

# Start the backend server (if running locally)
npm run server
```

Visit `http://localhost:4200/` after starting the dev server.

## Known Limitations

- Login sends credentials as URL query parameters. This is acceptable for json-server development; a production backend should use POST with JWT.
- Multi-step form state lives in `localStorage`, not in a shared service. Navigating directly to step 3 without completing step 1 will result in missing data on the review page.
- No authentication guard on `/homepage` routes.
- `UserService` has no methods implemented yet.

## Form Validation Reference

| Field | Rule |
|---|---|
| CNP (nationalId) | exactly 13 digits |
| Phone | digits, `+`, `-`, spaces |
| CUI | 8–10 digits |
| Cod CAEN | exactly 4 digits |
| Email | standard email format |
| Dates | required, PrimeNG DatePicker |

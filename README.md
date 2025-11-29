## DPay API  

**DPay** is a payment and on‑chain loyalty platform. This repository contains the **backend API service** that powers payments, wallet management, loyalty minting, and related operations.

All application code lives under `src/` and is written in **TypeScript** using **Express**, **MongoDB**, and **Redis**.

---

## Tech Stack  

- **Runtime**: Node.js (TypeScript)
- **Web framework**: Express
- **Database**: MongoDB (`mongoose`)
- **Cache / queue**: Redis (`ioredis`)
- **Blockchain / wallets**: `ethers`, `viem`, `shamir-secret-sharing`
- **Auth / identity**: JWT, Privy (`@privy-io/node`)
- **Payments**: Stripe
- **Logging**: `winston` with daily rotate

---

## Project Structure  

- **`src/index.ts`**: Application entrypoint (starts HTTP server).
- **`src/app.ts`**: Express app setup, middleware, request logging, and route mounting.
- **`src/config`**: Environment configuration (`Config` interface, Joi validation).
- **`src/api`**: HTTP routes, controllers, DTOs, schemas, and services:
  - `healthCheck`, `user`, `network`, `currency`, `product`, `order`,
    `wallet`, `qr`, `transaction`, `noti` (notifications), `rbac`.
- **`src/domain`**:
  - `db` – Mongo and Redis initialization.
  - `entity` – Mongoose models.
  - `repo` – Data access layer.
  - `seed` – Default data (roles, permissions, currencies, networks, products, etc.).
- **`src/shared`**:
  - `middlewares` – auth, validation, error handling, request tracking, Privy auth, token verification.
  - `lib` – logger, JWT helpers, HTTP error/response helpers, context & base classes.
  - `helper` / `utils` – encryption, signatures, pagination, request helpers, async wrapper, etc.
  - `constant` – shared constants and ABI definitions.

The main API router is defined in `src/api/app.route.ts` and is mounted under the `/api/v1` prefix in `src/app.ts`.

---

## Getting Started  

### Prerequisites  

- **Node.js**: v18+ (LTS recommended)
- **Package manager**: `yarn` or `npm`
- **MongoDB**: running instance (local or remote)
- **Redis**: running instance
- **Stripe account**: to obtain `STRIPE_SECRET`
- **Privy app**: to obtain `PRIVY_APP_ID` and `PRIVY_APP_SECRET`

---

### Installation  

```bash
git clone <this-repo>
cd API

# Using yarn
yarn install

# Or using npm
npm install
```

---

### Environment Variables  

Configuration is validated in `src/config/index.ts` using Joi. Create a `.env` file in the project root with at least the following variables:

```bash
PORT=3000
NODE_ENV=DEV

ACCESS_TOKEN_SECRET_KEY=your-access-secret
ACCESS_TOKEN_EXPIRES_IN=1h
REFRESH_TOKEN_SECRET_KEY=your-refresh-secret
REFRESH_TOKEN_EXPIRES_IN=7d

PRIVY_APP_ID=your-privy-app-id
PRIVY_APP_SECRET=your-privy-app-secret

APP_URL=http://localhost:3000

VAULT_CONTRACT_ADDRESS=0x...
REWARD_MANAGER_CONTRACT_ADDRESS=0x...

REDIS_HOST=localhost
REDIS_PORT=6379
REDIS_PASSWORD=
REDIS_USERNAME=
REDIS_DB=0

MONGO_URI=mongodb://localhost:27017/dpay

STRIPE_SECRET=sk_test_...
```

> **Note**: All of the above are read and type‑checked by the `Config` schema in `src/config/index.ts`. Missing required values will cause the process to throw on startup.

---

### Running in Development  

```bash
# Watch mode with nodemon
yarn dev
# or
npm run dev
```

This will:

- Load environment variables via `dotenv`.
- Initialize MongoDB and Redis (`src/domain/db`).
- Seed initial data (`src/domain/seed`).
- Start the Express app on `PORT` (default `3000`).

---

### Build & Production Run  

```bash
# Build TypeScript -> dist
yarn build
# or
npm run build

# Run compiled app
yarn start
# or
npm start
```

The compiled output is written to `dist/`, and `src/index.ts` becomes `dist/index.js`.

---

### Docker / docker-compose  

This repo includes a `Dockerfile` and `docker-compose.yml`. A typical flow:

```bash
docker-compose up --build
```

Ensure your `.env` is present or environment variables are passed in via compose.

---

## API Overview  

All routes are mounted under the **`/api/v1`** prefix (see `src/app.ts` and `src/api/app.route.ts`).

High-level route groups:

- **`GET /api/v1/health_check`** – health check endpoint.
- **`/api/v1/users`** – user management and authentication.
- **`/api/v1/networks`** – supported blockchain networks.
- **`/api/v1/currencies`** – supported currencies and tokens.
- **`/api/v1/products`** – products catalog for loyalty/payment flows.
- **`/api/v1/orders`** – order creation and management.
- **`/api/v1/wallets`** – wallet management (creation, listing).
- **`/api/v1/qr`** – QR code generation and processing for payments.
- **`/api/v1/transactions`** – transaction submission and querying.
- **`/api/v1/notifications`** – notification management.

Most routes follow a **controller + service + repository** pattern:

- Route file (`*.route.ts` / `*.router.ts`) defines URL paths and middleware.
- Controller (`*.controller.ts`) contains request handling logic.
- Service (`*.service.ts`) contains core business logic.
- Repository (`src/domain/repo/*.repo.ts`) encapsulates DB operations.

---

## Crypto Payments with QR  

This API uses **crypto payments initiated from a QR code** and then bridges them to off‑chain settlement and loyalty:

- A merchant (or client app) calls **`POST /api/v1/qr`** with:
  - `amount` – numeric amount to charge.
  - `currency` – fiat currency code (e.g. `"USD"`, `"VND"`), mapped and encoded using EMV‑QRCPS rules (`src/shared/constant/qr.ts`).
- The API returns a **QR payload** that a customer can scan with a crypto‑enabled wallet.
- The customer’s wallet sends funds **on‑chain** to the configured **vault contract**.
- The client then calls **`POST /api/v1/transactions/submit`** with:
  - On‑chain transaction info (`chainId`, `txHash`, etc.).
  - The original `qrPayload`.
- The backend:
  - Confirms the on‑chain transfer and validates **amount and currency** against the QR payload.
  - Updates the user’s **on‑chain loyalty points** via the `rewardManager` contract.
  - Triggers a corresponding **Stripe payment** (off‑ramp into fiat such as VND).
  - Emits notifications (`transaction-receipt`, `stripe-payment`) to downstream consumers.

In short: **scan QR → pay with crypto → verify on‑chain → auto‑mint loyalty + settle in fiat.**

## Team
Build with [Daslab](https://www.daslabs.io/)
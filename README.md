# Teslo Shop

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

## Environment Variables

**Copy ```.env.template``` to ```.env```:**

```bash
# Terminal
cp .env.template .env
```

**Then modify ```.env``` file:**

```ini
# .env
DB_USER=your_user_name
DB_PASSWORD=your_password
DB_NAME=your_database_name
```

## Docker

**Create Docker Image:**

```bash
docker compose -p teslo_shop up -d

# -p container name
# -d detach mode
```

## Prisma

**Initialize Prisma:**

```bash
npx init --datasource-provider postgressql
```

**Prisma Client:**

```bash
npx prisma generate
```

**Create your migrations:**

```bash
npx prisma migrate dev --name init

# --name migration_name
```

## Seed

**Run in terminal to seed database:**

```bash
npm run seed
```

## Prisma Studio

**You can manipulate your database in the browser**

```bash
npx prisma studio
```

## NEXT AUTH

### Generate random Secret Key

```bash
openssl rand -base64 32
# output example: YSQ8Ui4wi0bRF26uB4W ...
```

**then past the generated code in ```.env```**

```ini
AUTH_SECRET="YSQ8Ui4wi0bRF26uB4W ..."
```

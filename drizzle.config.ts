import type { Config } from "drizzle-kit";

export default {
  schema: "./src/schema.ts",
  out: "./migrations",
  driver: "d1-http",
  dialect: "sqlite",
  dbCredentials: {
    accountId: process.env.CLOUDFLARE_ACCOUNT_ID as string,
    databaseId: process.env.CLOUDFLARE_DATABASE_ID as string,
    token: process.env.CLOUDFLARE_D1_TOKEN as string
  }
} satisfies Config;
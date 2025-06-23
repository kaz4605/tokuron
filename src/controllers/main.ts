import { Hono } from "hono";
import type { ContextVariables } from "../constants";
import { API_PREFIX } from "../constants";
import { attachUserId, checkJWTAuth } from "../middlewares/auth";
import type { DBCreateUser, DBUser } from "../models/db";
import { SimpleInMemoryResource } from "../storage/in_memory";
import { AUTH_PREFIX, createAuthApp } from "./auth";
export function createMainApp(
  authApp: Hono<ContextVariables>,
) {
  const app = new Hono<ContextVariables>().basePath(API_PREFIX);

  app.use("*", checkJWTAuth);
  app.use("*", attachUserId);
  app.route(AUTH_PREFIX, authApp);

  return app;
}

export function createInMemoryApp() {
  return createMainApp(
    createAuthApp(new SimpleInMemoryResource<DBUser, DBCreateUser>())
  );
}

import { Hono } from "hono";
import type { ContextVariables } from "../constants";
import { API_PREFIX } from "../constants";
import { attachUserId, checkJWTAuth } from "../middlewares/auth";
import { AUTH_PREFIX, createAuthApp } from "./auth";
import { CHAT_PREFIX, createChatApp } from "./chat";
import { env } from 'cloudflare:workers';
import { UserSQLResource,ChatSQLResource,MessageSQLResource } from "../storage/sql";
export function createMainApp(
  authApp: Hono<ContextVariables>,
  chatApp: Hono<ContextVariables>,
) {
  const app = new Hono<ContextVariables>().basePath(API_PREFIX);

  app.use("*", checkJWTAuth);
  app.use("*", attachUserId);
  app.route(AUTH_PREFIX, authApp);
  app.route(CHAT_PREFIX, chatApp);

  return app;
}

export function createSQLApp() {
  const userResource = new UserSQLResource(env.DB);
  const chatResource = new ChatSQLResource(env.DB); 
  const messageResource = new MessageSQLResource(env.DB); 
  return createMainApp(
    createAuthApp(userResource),
    createChatApp(chatResource, messageResource)
  );
}


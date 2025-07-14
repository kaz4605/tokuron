import { HTTPException } from "hono/http-exception";
import { callGPTAPI } from "./api";
import { retryWrapper } from "./retry";
import type { DBMessage } from "../models/db";

export async function generateMessageResponse(
  messages: DBMessage[],
  token: string
): Promise<string> {
    const params = {
  model: "openai/gpt-4.1",
  temperature: 0,
  max_completion_tokens: 1000,
  n: 1,
  stream: false,
};
const data = {
  ...params,
  messages: [
    {
      role: "system",
      content: `あなたは、ユーザのメッセージに対して、親切かつ丁寧に、正確な情報を提供するAIアシスタントです。`,
    },
    ...messages.map((m) => ({ role: m.type, content: m.message })),
  ],
};
try {
  const response = await retryWrapper(() => callGPTAPI(data, token));
  const responseData = await response.json();
  return responseData.choices[0].message.content.trim();
} catch {
  throw new HTTPException(503, { message: "GPT integration is down" });
}
}
import Anthropic from "@anthropic-ai/sdk";
import { ConversationSet } from "./types";

export async function generateScripts(
  apiKey: string,
  systemPrompt: string,
  userPrompt: string
): Promise<ConversationSet[]> {
  const client = new Anthropic({ apiKey });

  const response = await client.messages.create({
    model: "claude-sonnet-4-20250514",
    max_tokens: 4096,
    temperature: 0.7,
    system: systemPrompt,
    messages: [{ role: "user", content: userPrompt }],
  });

  const textBlock = response.content.find((block) => block.type === "text");
  if (!textBlock || textBlock.type !== "text") {
    throw new Error("No text response from Claude API");
  }

  let jsonText = textBlock.text.trim();

  // Strip markdown code blocks if present
  if (jsonText.startsWith("```")) {
    jsonText = jsonText.replace(/^```(?:json)?\n?/, "").replace(/\n?```$/, "");
  }

  const parsed = JSON.parse(jsonText);

  if (!Array.isArray(parsed) || parsed.length !== 5) {
    throw new Error("Response is not an array of 5 conversation sets");
  }

  return parsed as ConversationSet[];
}

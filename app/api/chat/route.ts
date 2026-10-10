import { google } from '@ai-sdk/google';
import {
  streamText,
  createUIMessageStreamResponse,
  toUIMessageStream,
  convertToModelMessages,
} from 'ai';

export const maxDuration = 30;

const SYSTEM_PROMPT = `You are an expert AI coding assistant.
Help users write, debug, refactor, and review code.

Rules:
- Always wrap code in markdown code blocks with the language tag.
- Explain your reasoning briefly before or after code.
- If the user's request is ambiguous, ask clarifying questions.
- Prefer clean, modern, well-commented code.
- Point out bugs, edge cases, and security issues proactively.`;

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    if (!process.env.GOOGLE_GENERATIVE_AI_API_KEY) {
      return new Response(
        JSON.stringify({ error: 'GOOGLE_GENERATIVE_AI_API_KEY is missing' }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // ✅ Convert UIMessage[] → ModelMessage[] (required in v7)
    const modelMessages = await convertToModelMessages(messages);

    const result = streamText({
      model: google('gemini-3.8-flash'),
      system: SYSTEM_PROMPT,
      messages: modelMessages,
    });

    return createUIMessageStreamResponse({
      stream: toUIMessageStream({ stream: result.stream }),
    });
  } catch (error) {
    console.error('Chat API error:', error);
    return new Response(
      JSON.stringify({ error: 'Something went wrong.' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
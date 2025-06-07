import OpenAI from 'openai';
import { type AIMessage } from '../types';

const openapi = new OpenAI({
  apiKey: process.env.OPEN_API_KEY,
});

export { openapi };

export const runLLM = async({ messages }: {messages: AIMessage[] }) => {
    const response = await openapi.chat.completions.create({
        model:'gpt-4o-mini',
        temperature: 0.1,
        messages,
    })
    return response.choices[0].message.content
}


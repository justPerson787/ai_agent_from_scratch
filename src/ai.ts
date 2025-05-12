import OpenAI from 'openai';

const openapi = new OpenAI({
  apiKey: process.env.OPEN_API_KEY,
});

export { openapi };

export const runLLM = async({ userMessage }: {userMessage: string}) => {
    const response = await openapi.chat.completions.create({
        model:'gpt-4o-mini',
        temperature: 0.1,
        messages: [{ role: 'user', content: userMessage }],
    })
    return response.choices[0].message.content
}


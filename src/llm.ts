import { openapi } from "./ai"
import type { AIMessage } from "../types"
import { zodFunction } from "openai/helpers/zod.mjs"

export const runLLM = async ({ messages, tools }: {
    messages: AIMessage[], tools: any[]
}) => {
    const formattedTools = tools.map(zodFunction)
    const response = await openapi.chat.completions.create({
        model: 'gpt-4o-mini',
        temperature: 0.1,
        messages,
        tools: formattedTools,
        tool_choice: 'auto',
        parallel_tool_calls: false
    })
    return response.choices[0].message

}
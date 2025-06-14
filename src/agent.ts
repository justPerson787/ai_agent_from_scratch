import { addMessages, getMessages, saveToolResponse } from "./memory"
import { runLLM } from './llm'
import { logMessage, showLoader } from "./ui"
import { runTool } from "./toolRunner"

export const runAgent = async ({ userMessage, tools }: { userMessage: string,
    tools: []
 }) => {
    await addMessages([{role: 'user', content: userMessage }])
    const loader = showLoader(':)')
    const history = await getMessages()
    const response = await runLLM({
        messages: history,
        tools,
    })
    await addMessages([response])

    if (response.tool_calls) {
        const toolCall = response.tool_calls[0]
        loader.update(`executing: ${toolCall.function.name}`)
        const toolResponse = await runTool({toolCall, userMessage})
        await saveToolResponse(toolCall.id, toolResponse)

    }

    logMessage(response)
    loader.stop()
    return getMessages()    
}
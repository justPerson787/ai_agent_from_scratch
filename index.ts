import 'dotenv/config'
import { runLLM } from './src/ai'
import { Messages } from 'openai/resources/beta/threads/messages.mjs'
import { addMessages, getMessages } from './src/memory'
import { runAgent } from './src/agent'
import { z } from 'zod'

const userMessage = process.argv[2]

if (!userMessage) {
  console.error('Please provide a message')
  process.exit(1)
}

//const getweather = () => 'it is hot, 89 degrees'
const weatherTool = {
  name: 'get_weather',
  description: `use this to get a weather`,
  parameters: z.object({
    reasoning: z.string().describe('why did you pick this tool?'),
  }),
}
const response = await runAgent({ userMessage, tools: [weatherTool]})

console.log(response)

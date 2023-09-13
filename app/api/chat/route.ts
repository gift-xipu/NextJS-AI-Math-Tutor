// import { OpenAIStream, StreamingTextResponse } from 'ai'
// import { Configuration, OpenAIApi } from 'openai-edge'

// // Create an OpenAI API client (that's edge friendly!)
// const config = new Configuration({
//   apiKey: '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'
// })
// const openai = new OpenAIApi(config)
 
// // IMPORTANT! Set the runtime to edge
// export const runtime = 'edge'
 
// export async function POST(req: Request) {
//   // Extract the `messages` from the body of the request
//   const { messages } = await req.json()
 
//   // Ask OpenAI for a streaming chat completion given the prompt
//   const response = await openai.createChatCompletion({
//     model: 'gpt-3.5-turbo',
//     stream: true,
//     messages
//   })
//   // Convert the response into a friendly text-stream
//   const stream = OpenAIStream(response)
//   // Respond with the stream
//   return new StreamingTextResponse(stream)
// }

//for request method
import { NextRequest } from 'next/server';
//deals with responses in streaming
import { Message as VercelChatMessage, StreamingTextResponse } from 'ai';
 
import { ChatOpenAI } from 'langchain/chat_models/openai';
import { BytesOutputParser } from 'langchain/schema/output_parser';
import { PromptTemplate } from 'langchain/prompts';
 
export const runtime = 'edge';
 
/**
 * Basic memory formatter that stringifies and passes
 * message history directly into the model.
 */
const formatMessage = (message: VercelChatMessage) => {
  return `${message.role}: ${message.content}`;
};
 
const TEMPLATE = `You are Molly, a math tutor. Your role is to assist the user with math equations. Your primary task is to explain the questions and guide the user in understanding them. You can confirm whether their answers are correct or not, but your main focus should be on providing explanations and insights related to the math problems.
 
Current conversation:
{chat_history}
 
User: {input}
AI:`;
 
/*
 * This handler initializes and calls a simple chain with a prompt,
 * chat model, and output parser. See the docs for more information:
 *
 * https://js.langchain.com/docs/guides/expression_language/cookbook#prompttemplate--llm--outputparser
 */
export async function POST(req: NextRequest) {
  const body = await req.json();
  const messages = body.messages ?? [];
  const formattedPreviousMessages = messages.slice(0, -1).map(formatMessage);
  const currentMessageContent = messages[messages.length - 1].content;
 
  const prompt = PromptTemplate.fromTemplate(TEMPLATE);
  /**
   * See a full list of supported models at:
   * https://js.langchain.com/docs/modules/model_io/models/
   */
  const model = new ChatOpenAI({
    temperature: 0.8,
    openAIApiKey: "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",
  });
 
  /**
   * Chat models stream message chunks rather than bytes, so this
   * output parser handles serialization and encoding.
   */
  const outputParser = new BytesOutputParser();
 
  /*
   * Can also initialize as:
   *
   * import { RunnableSequence } from "langchain/schema/runnable";
   * const chain = RunnableSequence.from([prompt, model, outputParser]);
   */
  const chain = prompt.pipe(model).pipe(outputParser);
 
  const stream = await chain.stream({
    chat_history: formattedPreviousMessages.join('\n'),
    input: currentMessageContent,
  });
 
  return new StreamingTextResponse(stream);
}
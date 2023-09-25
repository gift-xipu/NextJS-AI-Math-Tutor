# README for Chat Application

This README provides an overview of the code for a chat application that integrates an AI-powered chatbot for assisting with math equations. This application consists of two parts: the server-side code and the client-side code. It allows users to interact with the AI chatbot and receive assistance with math problems.

## Server-Side Code

The server-side code is responsible for handling user requests and integrating the AI chatbot. It uses the Next.js framework for server-side rendering and streaming responses.

### Dependencies

- `NextRequest`: This module handles requests in the Next.js framework.
- `ai`: This module provides utilities for dealing with responses and streaming data.
- `langchain/chat_models/openai`: This module contains the chat model for OpenAI.
- `langchain/schema/output_parser`: This module is used for parsing output from the chatbot.
- `langchain/prompts`: It contains the prompt template for the chatbot.

### Functionality

The key functionalities of the server-side code include:

- **Formatting messages**: The `formatMessage` function takes a message and formats it for input into the chat model.

- **Prompt Template**: A template is defined for the conversation. It sets the context for the chatbot as a math tutor named Molly. The template is designed to guide Molly in assisting the user with math equations.

- **POST Request Handler**: The `POST` function handles incoming requests. It extracts messages from the request body, formats previous messages, and extracts the current message content. It then initializes the chat model, sets up the message chain with the prompt, model, and output parser, and streams the conversation responses.

### Usage

To use the server-side code, you need to send a POST request with a JSON body containing the messages. The server will respond with streaming chat responses from the AI chatbot.

## Client-Side Code

The client-side code is a React component that provides a user interface for interacting with the AI chatbot. It allows users to input messages, send them to the server, and display the chat history.

### Dependencies

- `react`: The React library is used to build the user interface.
- `ai/react`: This module provides hooks for managing chat state and user interactions.

### Functionality

The client-side code includes:

- **Chat Interface**: The user interface displays a chat area where messages are shown, with user messages aligned to the right and AI responses to the left. It also includes an input field for users to type their messages.

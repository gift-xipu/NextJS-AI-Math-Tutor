"use client"
import React from 'react';
import { useChat } from 'ai/react';

export default function Chat() {
  const { messages, input, handleInputChange, handleSubmit } = useChat();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-12">
      {/* Remove the bg-gray-100 class */}
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-gray-900 mb-8">Chat with AI</h1>

        <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-4">
          <div className="overflow-y-auto max-h-80">
            {messages.length > 0
              ? messages.map((message) => (
                  <div
                    key={message.id}
                    className={`${
                      message.role === 'user' ? 'text-right' : 'text-left'
                    } mb-4`}
                  >
                    <div
                      className={`${
                        message.role === 'user'
                          ? 'bg-blue-500 text-white'
                          : 'bg-gray-200'
                      } rounded-lg p-3`}
                    >
                      {message.content}
                    </div>
                  </div>
                ))
              : null}
          </div>

          <form onSubmit={handleSubmit}>
            <input
              className="w-full px-3 py-2 border border-gray-300 rounded shadow-md focus:outline-none focus:border-blue-500"
              value={input}
              placeholder="Say something..."
              onChange={handleInputChange}
            />
          </form>
        </div>
      </div>
    </div>
  );
}

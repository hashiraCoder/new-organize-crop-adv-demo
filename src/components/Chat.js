import React, { useState } from 'react';
import './Chat.css';
import { strings } from '../strings';

const Chat = ({ language }) => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage = { role: 'user', parts: [{ text: inputMessage }] };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInputMessage('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          history: updatedMessages,
          language: language
        })
      });

      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      
      const result = await response.json();
      
      const aiMessage = { role: 'model', parts: [{ text: result.text }] };
      setMessages((prevMessages) => [...prevMessages, aiMessage]);

    } catch (error) {
      console.error("Error fetching AI response:", error);
      const errorMessage = { role: 'model', parts: [{ text: strings[language].chatNetworkError }] };
      setMessages((prevMessages) => [...prevMessages, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-6">{strings[language].chatTitle}</h1>
      <div className="flex flex-col h-96 overflow-hidden border border-gray-300 rounded-2xl shadow-inner bg-white">
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
          {messages.map((msg, index) => (
            <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-xs md:max-w-md p-3 rounded-lg ${msg.role === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'}`}>
                {msg.parts[0].text}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="max-w-xs md:max-w-md p-3 rounded-lg bg-gray-200 text-gray-800 animate-pulse">...</div>
            </div>
          )}
        </div>
        <div className="flex p-4 border-t border-gray-200">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={(e) => { if (e.key === 'Enter') handleSendMessage(); }}
            placeholder={strings[language].chatPlaceholder}
            className="flex-1 p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button onClick={handleSendMessage} className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600">{strings[language].chatSend}</button>
        </div>
      </div>
    </div>
  );
};

export default Chat;


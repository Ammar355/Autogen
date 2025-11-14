import { useState, useRef, useEffect } from 'react';

const AIChat = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: "Hi! I'm AutoGenius, your AI car-buying assistant. How can I help you today?",
    },
  ]);
  const [input, setInput] = useState('');
  const [isListening, setIsListening] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage = { role: 'user', content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = {
        role: 'assistant',
        content: "I understand you're looking for: " + input + ". Let me help you find the perfect car! I can search our inventory, compare options, or help with financing. What would you like to do?",
      };
      setMessages((prev) => [...prev, aiResponse]);
    }, 1000);
  };

  const handleVoiceInput = () => {
    setIsListening(!isListening);
    // In a real app, this would integrate with OpenAI Voice API
    if (!isListening) {
      setTimeout(() => {
        setInput('Find me a reliable hybrid under $15k');
        setIsListening(false);
      }, 2000);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-end md:items-center md:justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl h-[600px] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-electric-blue rounded-full flex items-center justify-center">
              <span className="text-xl">🤖</span>
            </div>
            <div>
              <h3 className="font-semibold text-navy">AutoGenius</h3>
              <p className="text-sm text-gray-500">AI Assistant</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                  msg.role === 'user'
                    ? 'bg-electric-blue text-white'
                    : 'bg-gray-100 text-charcoal'
                }`}
              >
                <p className="text-sm leading-relaxed">{msg.content}</p>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-4 border-t border-gray-200">
          <div className="flex items-center space-x-2">
            <button
              onClick={handleVoiceInput}
              className={`p-3 rounded-xl transition-colors ${
                isListening
                  ? 'bg-electric-blue text-white animate-pulse'
                  : 'bg-gray-100 text-charcoal hover:bg-gray-200'
              }`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
                />
              </svg>
            </button>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask anything..."
              className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-electric-blue focus:border-transparent"
            />
            <button
              onClick={handleSend}
              className="px-6 py-3 bg-electric-blue text-white rounded-xl font-semibold hover:bg-opacity-90 transition-all"
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIChat;


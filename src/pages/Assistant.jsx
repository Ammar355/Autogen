import { useState } from 'react';

const Assistant = () => {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: "Hi! I'm AutoGenius, your AI-powered car buying and selling assistant. I can help you find cars, compare options, negotiate prices, start financing applications, and much more. What would you like to do today?",
    },
  ]);
  const [input, setInput] = useState('');
  const [isListening, setIsListening] = useState(false);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage = { role: 'user', content: input };
    setMessages((prev) => [...prev, userMessage]);
    const currentInput = input;
    setInput('');

    // Simulate AI response based on input
    setTimeout(() => {
      let aiResponse = '';
      const lowerInput = currentInput.toLowerCase();

      if (lowerInput.includes('compare')) {
        aiResponse = "I can help you compare cars! Which two vehicles would you like me to compare? I'll analyze specs, ownership costs, safety ratings, and more.";
      } else if (lowerInput.includes('trim') || lowerInput.includes('difference')) {
        aiResponse = "I'd be happy to explain the differences between trims! Each trim level offers different features and options. Which model are you interested in?";
      } else if (lowerInput.includes('negotiate') || lowerInput.includes('price')) {
        aiResponse = "I can help with negotiations! Based on market data, I can suggest fair price ranges and help you communicate with sellers. What car are you interested in?";
      } else if (lowerInput.includes('financing') || lowerInput.includes('loan')) {
        aiResponse = "I can help you start a financing application! I'll need some basic information about your credit profile and preferences. Would you like to begin?";
      } else if (lowerInput.includes('find') || lowerInput.includes('search')) {
        aiResponse = "I can help you find the perfect car! Tell me what you're looking for - price range, features, mileage, or any specific requirements.";
      } else {
        aiResponse = "I understand you're asking about: " + currentInput + ". Let me help you with that! I can search our inventory, compare options, help with financing, or answer any questions you have.";
      }

      setMessages((prev) => [...prev, { role: 'assistant', content: aiResponse }]);
    }, 1000);
  };

  const handleVoiceInput = () => {
    setIsListening(true);
    // Simulate voice recognition
    setTimeout(() => {
      setInput('Compare these two cars');
      setIsListening(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <div className="flex items-center space-x-4 mb-4">
            <div className="w-16 h-16 bg-gradient-to-br from-electric-blue to-electric-teal rounded-full flex items-center justify-center text-3xl">
              🤖
            </div>
            <div>
              <h1 className="text-4xl font-bold text-navy">AutoGenius</h1>
              <p className="text-gray-600">Your AI-powered car buying assistant</p>
            </div>
          </div>
          <div className="bg-blue-50 border-l-4 border-electric-blue p-4 rounded">
            <p className="text-sm text-charcoal">
              <span className="font-semibold">Voice-enabled:</span> Click the microphone to speak your requests. I can help you compare cars, explain differences, negotiate prices, start financing, and more!
            </p>
          </div>
        </div>

        <div className="card">
          {/* Messages */}
          <div className="space-y-4 mb-6 max-h-[500px] overflow-y-auto pb-4">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
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
          </div>

          {/* Input Area */}
          <div className="flex items-center space-x-2">
            <button
              onClick={handleVoiceInput}
              className={`p-3 rounded-xl transition-all ${
                isListening
                  ? 'bg-electric-blue text-white animate-pulse'
                  : 'bg-gray-100 text-charcoal hover:bg-gray-200'
              }`}
              title="Voice Input"
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
              placeholder="Ask anything... (e.g., 'Compare these two cars', 'Explain differences in trims', 'Start financing application')"
              className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-electric-blue focus:border-transparent"
            />
            <button
              onClick={handleSend}
              className="px-6 py-3 bg-electric-blue text-white rounded-xl font-semibold hover:bg-opacity-90 transition-all"
            >
              Send
            </button>
          </div>
          {isListening && (
            <p className="mt-3 text-sm text-electric-blue flex items-center space-x-2">
              <span className="animate-pulse">🎤</span>
              <span>Listening... Speak now</span>
            </p>
          )}

          {/* Quick Actions */}
          <div className="mt-6 pt-6 border-t border-gray-200">
            <p className="text-sm font-medium text-gray-600 mb-3">Quick Actions:</p>
            <div className="flex flex-wrap gap-2">
              {[
                'Compare cars',
                'Explain trims',
                'Negotiate price',
                'Start financing',
                'Find cars',
              ].map((action) => (
                <button
                  key={action}
                  onClick={() => setInput(action)}
                  className="px-4 py-2 bg-gray-100 text-charcoal rounded-lg hover:bg-gray-200 transition-colors text-sm"
                >
                  {action}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Assistant;


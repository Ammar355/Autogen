import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const FloatingButtons = ({ onVoiceClick, onCameraClick, onChatClick }) => {
  const navigate = useNavigate();
  const [isVoiceActive, setIsVoiceActive] = useState(false);

  const handleVoiceClick = () => {
    setIsVoiceActive(!isVoiceActive);
    if (onVoiceClick) onVoiceClick();
  };

  const handleCameraClick = () => {
    if (onCameraClick) {
      onCameraClick();
    } else {
      navigate('/sell');
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end space-y-4">
      {/* AI Chat Button */}
      <button
        onClick={onChatClick}
        className="bg-electric-blue text-white p-4 rounded-full shadow-medium hover:shadow-lg transition-all duration-200 hover:scale-110 flex items-center justify-center w-14 h-14"
        title="AI Chat Assistant"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
          />
        </svg>
      </button>

      {/* Camera Button */}
      <button
        onClick={handleCameraClick}
        className="bg-electric-teal text-white p-4 rounded-full shadow-medium hover:shadow-lg transition-all duration-200 hover:scale-110 flex items-center justify-center w-14 h-14"
        title="Camera Vision Agent"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
          />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      </button>

      {/* Voice Button with pulse animation */}
      <button
        onClick={handleVoiceClick}
        className={`bg-navy text-white p-4 rounded-full shadow-medium hover:shadow-lg transition-all duration-200 hover:scale-110 flex items-center justify-center w-16 h-16 ${
          isVoiceActive ? 'animate-pulse ring-4 ring-electric-blue ring-opacity-50' : ''
        }`}
        title="OpenAI Voice Input"
      >
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
          />
        </svg>
      </button>
    </div>
  );
};

export default FloatingButtons;


import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isListening, setIsListening] = useState(false);
  const navigate = useNavigate();

  const handleSearch = () => {
    if (searchQuery.trim()) {
      navigate(`/buy?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  const handleVoiceSearch = () => {
    setIsListening(true);
    // Simulate voice input
    setTimeout(() => {
      setSearchQuery('Find me a reliable hybrid under $15k');
      setIsListening(false);
    }, 2000);
  };

  const categories = [
    { name: 'Cars Under $20k', icon: '💰', count: '1,234' },
    { name: 'Great Deals', icon: '🔥', count: '456' },
    { name: 'Low Mileage', icon: '📊', count: '789' },
    { name: 'EVs', icon: '⚡', count: '234' },
    { name: 'AWD for Snow', icon: '❄️', count: '567' },
  ];

  const examplePrompts = [
    'Find me a reliable hybrid under $15k',
    'Show me SUVs with third-row seating',
    'What are the best deals this week?',
    'Compare electric vehicles under $30k',
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-20">
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-bold text-navy mb-4">
            Find Your Perfect Car
            <span className="block text-electric-blue mt-2">Powered by AI</span>
          </h1>
          <p className="text-xl text-charcoal-light max-w-2xl mx-auto mb-8">
            Experience the future of car buying. Ask anything, and our AI will find exactly what you need.
          </p>

          {/* Hero Search Bar */}
          <div className="max-w-3xl mx-auto">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                placeholder="Find me a reliable hybrid under $15k..."
                className="w-full px-6 py-5 pr-32 text-lg rounded-2xl border-2 border-gray-200 focus:outline-none focus:border-electric-blue focus:ring-4 focus:ring-electric-blue focus:ring-opacity-20 shadow-medium"
              />
              <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center space-x-2">
                <button
                  onClick={handleVoiceSearch}
                  className={`p-3 rounded-xl transition-all ${
                    isListening
                      ? 'bg-electric-blue text-white animate-pulse'
                      : 'bg-gray-100 text-charcoal hover:bg-gray-200'
                  }`}
                  title="Voice Search"
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
                <button
                  onClick={handleSearch}
                  className="px-6 py-3 bg-electric-blue text-white rounded-xl font-semibold hover:bg-opacity-90 transition-all"
                >
                  Search
                </button>
              </div>
            </div>
            {isListening && (
              <p className="mt-3 text-sm text-electric-blue flex items-center justify-center space-x-2">
                <span className="animate-pulse">🎤</span>
                <span>Listening...</span>
              </p>
            )}
          </div>
        </div>

        {/* AI Assistant Card */}
        <div className="max-w-4xl mx-auto mb-16">
          <div className="card bg-gradient-to-br from-electric-blue to-electric-teal text-white">
            <div className="flex items-start space-x-4">
              <div className="text-4xl">🤖</div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold mb-3">Meet AutoGenius</h3>
                <p className="text-lg mb-4 opacity-90">
                  Your AI-powered car buying assistant. Ask questions in natural language and get instant, personalized results.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {examplePrompts.map((prompt, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSearchQuery(prompt)}
                      className="text-left px-4 py-2 bg-white bg-opacity-20 rounded-lg hover:bg-opacity-30 transition-all text-sm"
                    >
                      "{prompt}"
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Categories */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-navy mb-8 text-center">Browse by Category</h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {categories.map((category, idx) => (
              <button
                key={idx}
                onClick={() => navigate(`/buy?category=${category.name}`)}
                className="card text-center hover:scale-105 transition-transform"
              >
                <div className="text-4xl mb-3">{category.icon}</div>
                <h3 className="font-semibold text-navy mb-1">{category.name}</h3>
                <p className="text-sm text-gray-500">{category.count} cars</p>
              </button>
            ))}
          </div>
        </div>

        {/* Trust Badges */}
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-navy mb-8 text-center">Why Choose AutoGen?</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: '↩️', title: '7-Day Return', desc: 'Hassle-free returns' },
              { icon: '✓', title: 'Verified Listings', desc: 'AI-verified details' },
              { icon: '🔒', title: 'Secure Payment', desc: 'Bank-level security' },
              { icon: '🔍', title: 'Free Inspection', desc: 'Professional check' },
            ].map((badge, idx) => (
              <div key={idx} className="card text-center">
                <div className="text-4xl mb-3">{badge.icon}</div>
                <h3 className="font-semibold text-navy mb-1">{badge.title}</h3>
                <p className="text-sm text-gray-500">{badge.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;


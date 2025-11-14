import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

const Buy = () => {
  const [searchParams] = useSearchParams();
  const [conversation, setConversation] = useState([]);
  const [input, setInput] = useState('');
  const [filters, setFilters] = useState({
    price: '',
    mileage: '',
    year: '',
    make: '',
    type: '',
  });
  const [cars, setCars] = useState([
    {
      id: 1,
      make: 'Toyota',
      model: 'Camry',
      year: 2020,
      price: 18900,
      mileage: 35000,
      trim: 'LE',
      image: 'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=800',
      dealRating: 'Great',
      trustBadges: ['Clean History', 'Low Mileage'],
      aiSummary: 'Great for families. Lowest mileage in its price range. Clean history.',
    },
    {
      id: 2,
      make: 'Honda',
      model: 'Civic',
      year: 2019,
      price: 16500,
      mileage: 42000,
      trim: 'EX',
      image: 'https://images.unsplash.com/photo-1606664515524-ed2f786e0c51?w=800',
      dealRating: 'Excellent',
      trustBadges: ['Verified', 'One Owner'],
      aiSummary: 'Excellent value. Well-maintained single-owner vehicle. Perfect for daily commuting.',
    },
    {
      id: 3,
      make: 'Tesla',
      model: 'Model 3',
      year: 2021,
      price: 32900,
      mileage: 28000,
      trim: 'Standard Range',
      image: 'https://images.unsplash.com/photo-1560957179-9ab5a7ff3d1a?w=800',
      dealRating: 'Good',
      trustBadges: ['EV Certified', 'Warranty'],
      aiSummary: 'Modern electric vehicle with low mileage. Includes remaining warranty. Great for eco-conscious buyers.',
    },
  ]);

  useEffect(() => {
    const query = searchParams.get('q');
    if (query) {
      setInput(query);
      handleAIQuery(query);
    }
  }, [searchParams]);

  const handleAIQuery = (query) => {
    const userMsg = { role: 'user', content: query };
    setConversation((prev) => [...prev, userMsg]);

    // Simulate AI filtering
    setTimeout(() => {
      const aiMsg = {
        role: 'assistant',
        content: `I found ${cars.length} cars matching your criteria. Here are the best options for you!`,
      };
      setConversation((prev) => [...prev, aiMsg]);
    }, 1000);
  };

  const handleSend = () => {
    if (!input.trim()) return;
    handleAIQuery(input);
    setInput('');
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(price);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-navy mb-8">Find Your Car</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Sidebar - AI Conversation & Filters */}
          <div className="lg:col-span-1 space-y-6">
            {/* AI Conversation */}
            <div className="card">
              <h2 className="text-xl font-bold text-navy mb-4 flex items-center space-x-2">
                <span>🤖</span>
                <span>AI Assistant</span>
              </h2>
              <div className="space-y-3 mb-4 max-h-96 overflow-y-auto">
                {conversation.length === 0 && (
                  <p className="text-gray-500 text-sm">Start a conversation to find your perfect car...</p>
                )}
                {conversation.map((msg, idx) => (
                  <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div
                      className={`max-w-[85%] rounded-xl px-3 py-2 text-sm ${
                        msg.role === 'user'
                          ? 'bg-electric-blue text-white'
                          : 'bg-gray-100 text-charcoal'
                      }`}
                    >
                      {msg.content}
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Ask anything..."
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-electric-blue"
                />
                <button onClick={handleSend} className="px-4 py-2 bg-electric-blue text-white rounded-lg font-semibold">
                  Send
                </button>
              </div>
            </div>

            {/* Filters */}
            <div className="card">
              <h2 className="text-xl font-bold text-navy mb-4">Filters</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-charcoal mb-2">Max Price</label>
                  <input
                    type="number"
                    value={filters.price}
                    onChange={(e) => setFilters({ ...filters, price: e.target.value })}
                    placeholder="$50,000"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-electric-blue"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-charcoal mb-2">Max Mileage</label>
                  <input
                    type="number"
                    value={filters.mileage}
                    onChange={(e) => setFilters({ ...filters, mileage: e.target.value })}
                    placeholder="100,000"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-electric-blue"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-charcoal mb-2">Year</label>
                  <input
                    type="number"
                    value={filters.year}
                    onChange={(e) => setFilters({ ...filters, year: e.target.value })}
                    placeholder="2020"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-electric-blue"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Car Listings */}
          <div className="lg:col-span-2">
            <div className="flex items-center justify-between mb-6">
              <p className="text-gray-600">{cars.length} cars found</p>
              <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                Compare Selected
              </button>
            </div>

            <div className="space-y-6">
              {cars.map((car) => (
                <div key={car.id} className="card hover:shadow-medium transition-shadow">
                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="md:w-64 h-48 bg-gray-200 rounded-xl overflow-hidden flex-shrink-0">
                      <img src={car.image} alt={`${car.make} ${car.model}`} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="text-2xl font-bold text-navy">
                            {car.year} {car.make} {car.model} {car.trim}
                          </h3>
                          <p className="text-gray-600">{formatPrice(car.price)} • {car.mileage.toLocaleString()} miles</p>
                        </div>
                        <span className="px-3 py-1 bg-electric-teal text-white rounded-full text-sm font-semibold">
                          {car.dealRating} Deal
                        </span>
                      </div>

                      <div className="flex flex-wrap gap-2 mb-3">
                        {car.trustBadges.map((badge, idx) => (
                          <span key={idx} className="px-2 py-1 bg-gray-100 text-gray-700 rounded-lg text-xs">
                            ✓ {badge}
                          </span>
                        ))}
                      </div>

                      <div className="bg-blue-50 border-l-4 border-electric-blue p-3 rounded mb-4">
                        <p className="text-sm text-charcoal">
                          <span className="font-semibold">AI Summary:</span> {car.aiSummary}
                        </p>
                      </div>

                      <div className="flex items-center space-x-3">
                        <button className="btn-primary">View Details</button>
                        <button className="btn-secondary">Save</button>
                        <button className="px-4 py-2 text-electric-blue hover:bg-blue-50 rounded-lg">
                          Compare
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Buy;


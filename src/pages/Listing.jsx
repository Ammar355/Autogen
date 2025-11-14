import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const Listing = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [carData] = useState(location.state?.carData || {
    year: 2020,
    make: 'Honda',
    model: 'Civic',
    trim: 'EX',
    mileage: 35000,
  });
  const [listingData, setListingData] = useState(null);
  const [isGenerating, setIsGenerating] = useState(true);

  useEffect(() => {
    // Simulate AI generating listing content
    setTimeout(() => {
      setListingData({
        priceRange: { min: 16500, max: 18500 },
        title: '2020 Honda Civic EX - Low Mileage, Excellent Condition',
        description: `This well-maintained 2020 Honda Civic EX is perfect for anyone seeking reliability, fuel efficiency, and modern features. With only 35,000 miles, this vehicle has been gently used and is in excellent condition.

Key Highlights:
• Single owner vehicle with complete service records
• Fuel-efficient 2.0L engine averaging 32 MPG combined
• Modern tech features including Apple CarPlay and Android Auto
• Spacious interior with comfortable seating for five
• Excellent safety ratings from IIHS and NHTSA
• Clean Carfax report with no accidents

Perfect for: Daily commuters, families, first-time car buyers, and anyone seeking a reliable, low-maintenance vehicle.

This Civic has been meticulously maintained and is ready for its next owner. Don't miss out on this excellent value!`,
        highlights: [
          'Low mileage for year',
          'Single owner',
          'Complete service history',
          'No accidents',
          'Excellent fuel economy',
          'Modern tech features',
        ],
        pros: [
          'Outstanding reliability record',
          'Great fuel efficiency',
          'Low maintenance costs',
          'Strong resale value',
          'Comfortable ride quality',
        ],
        cons: [
          'Limited cargo space compared to SUVs',
          'Base engine may feel underpowered for some',
        ],
        suggestedBuyers: ['First-time buyers', 'Daily commuters', 'Families', 'Budget-conscious shoppers'],
        trustReport: {
          accidents: 0,
          owners: 1,
          conditionRating: 9.2,
          history: 'Clean',
        },
      });
      setIsGenerating(false);
    }, 2000);
  }, []);

  if (isGenerating) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4 animate-spin">🤖</div>
          <h2 className="text-2xl font-bold text-navy mb-2">AI Auto Listing Agent</h2>
          <p className="text-gray-600">Generating optimized listing content...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-navy mb-8">AI-Generated Listing</h1>

        {/* Price Range */}
        <div className="card bg-gradient-to-r from-electric-blue to-electric-teal text-white mb-6">
          <p className="text-sm opacity-90 mb-1">AI Suggested Price Range</p>
          <p className="text-3xl font-bold">
            ${listingData.priceRange.min.toLocaleString()} - ${listingData.priceRange.max.toLocaleString()}
          </p>
          <p className="text-sm opacity-90 mt-2">Based on market analysis and vehicle condition</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Title */}
            <div className="card">
              <label className="block text-sm font-medium text-charcoal mb-2">Listing Title</label>
              <input
                type="text"
                value={listingData.title}
                onChange={(e) => setListingData({ ...listingData, title: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-electric-blue text-lg font-semibold"
              />
            </div>

            {/* Description */}
            <div className="card">
              <label className="block text-sm font-medium text-charcoal mb-2">Description</label>
              <textarea
                value={listingData.description}
                onChange={(e) => setListingData({ ...listingData, description: e.target.value })}
                rows={12}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-electric-blue"
              />
            </div>

            {/* Highlights */}
            <div className="card">
              <h3 className="text-xl font-bold text-navy mb-4">Vehicle Highlights</h3>
              <div className="grid grid-cols-2 gap-3">
                {listingData.highlights.map((highlight, idx) => (
                  <div key={idx} className="flex items-center space-x-2">
                    <span className="text-electric-blue">✓</span>
                    <span>{highlight}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Pros & Cons */}
            <div className="grid grid-cols-2 gap-6">
              <div className="card">
                <h3 className="text-xl font-bold text-green-600 mb-4">Pros</h3>
                <ul className="space-y-2">
                  {listingData.pros.map((pro, idx) => (
                    <li key={idx} className="flex items-start space-x-2">
                      <span className="text-green-600">+</span>
                      <span className="text-sm">{pro}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="card">
                <h3 className="text-xl font-bold text-orange-600 mb-4">Cons</h3>
                <ul className="space-y-2">
                  {listingData.cons.map((con, idx) => (
                    <li key={idx} className="flex items-start space-x-2">
                      <span className="text-orange-600">-</span>
                      <span className="text-sm">{con}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Suggested Buyers */}
            <div className="card">
              <h3 className="text-xl font-bold text-navy mb-4">Suggested Buyer Types</h3>
              <div className="flex flex-wrap gap-2">
                {listingData.suggestedBuyers.map((buyer, idx) => (
                  <span key={idx} className="px-4 py-2 bg-blue-100 text-blue-800 rounded-lg text-sm font-medium">
                    {buyer}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Trust Report */}
            <div className="card bg-navy text-white">
              <h3 className="text-xl font-bold mb-4">Trust Report</h3>
              <div className="space-y-4">
                <div>
                  <p className="text-sm opacity-80 mb-1">Accidents</p>
                  <p className="text-2xl font-bold">{listingData.trustReport.accidents}</p>
                </div>
                <div>
                  <p className="text-sm opacity-80 mb-1">Owners</p>
                  <p className="text-2xl font-bold">{listingData.trustReport.owners}</p>
                </div>
                <div>
                  <p className="text-sm opacity-80 mb-1">Condition Rating</p>
                  <p className="text-2xl font-bold">{listingData.trustReport.conditionRating}/10</p>
                </div>
                <div>
                  <p className="text-sm opacity-80 mb-1">History</p>
                  <p className="text-xl font-bold text-electric-teal">{listingData.trustReport.history}</p>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="card">
              <button className="btn-primary w-full mb-3">Publish Listing</button>
              <button className="btn-secondary w-full">Save as Draft</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Listing;


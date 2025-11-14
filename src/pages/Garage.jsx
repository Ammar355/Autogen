import { useState } from 'react';

const Garage = () => {
  const [activeTab, setActiveTab] = useState('saved');

  const savedCars = [
    {
      id: 1,
      make: 'Toyota',
      model: 'Camry',
      year: 2020,
      price: 18900,
      image: 'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=800',
      savedDate: '2024-01-15',
    },
    {
      id: 2,
      make: 'Honda',
      model: 'Civic',
      year: 2019,
      price: 16500,
      image: 'https://images.unsplash.com/photo-1606664515524-ed2f786e0c51?w=800',
      savedDate: '2024-01-10',
    },
  ];

  const watchlistCars = [
    {
      id: 3,
      make: 'Tesla',
      model: 'Model 3',
      year: 2021,
      price: 32900,
      originalPrice: 34900,
      image: 'https://images.unsplash.com/photo-1560957179-9ab5a7ff3d1a?w=800',
      priceDrop: 2000,
    },
  ];

  const myCars = [
    {
      id: 4,
      make: 'Honda',
      model: 'Accord',
      year: 2018,
      currentValue: 18500,
      purchasePrice: 22000,
      mileage: 45000,
      image: 'https://images.unsplash.com/photo-1606664515524-ed2f786e0c51?w=800',
      maintenance: {
        nextService: 'Oil Change - Due in 2,000 miles',
        aiPrediction: 'Based on your driving patterns, expect to replace tires in 8 months',
      },
    },
  ];

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(price);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-navy mb-8">My Garage</h1>

        {/* Tabs */}
        <div className="flex space-x-4 mb-8 border-b border-gray-200">
          {[
            { id: 'saved', label: 'Saved Cars', count: savedCars.length },
            { id: 'watchlist', label: 'Watchlist', count: watchlistCars.length },
            { id: 'mycars', label: 'My Cars', count: myCars.length },
            { id: 'upgrades', label: 'Upgrade Options', count: 0 },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-3 font-semibold border-b-2 transition-colors ${
                activeTab === tab.id
                  ? 'border-electric-blue text-electric-blue'
                  : 'border-transparent text-gray-500 hover:text-charcoal'
              }`}
            >
              {tab.label} {tab.count > 0 && `(${tab.count})`}
            </button>
          ))}
        </div>

        {/* Saved Cars */}
        {activeTab === 'saved' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {savedCars.map((car) => (
              <div key={car.id} className="card">
                <div className="h-48 bg-gray-200 rounded-xl mb-4 overflow-hidden">
                  <img src={car.image} alt={`${car.make} ${car.model}`} className="w-full h-full object-cover" />
                </div>
                <h3 className="text-xl font-bold text-navy mb-2">
                  {car.year} {car.make} {car.model}
                </h3>
                <p className="text-2xl font-bold text-electric-blue mb-4">{formatPrice(car.price)}</p>
                <p className="text-sm text-gray-500 mb-4">Saved on {car.savedDate}</p>
                <div className="flex space-x-2">
                  <button className="btn-primary flex-1">View Details</button>
                  <button className="px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg">Remove</button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Watchlist */}
        {activeTab === 'watchlist' && (
          <div className="space-y-6">
            {watchlistCars.map((car) => (
              <div key={car.id} className="card">
                <div className="flex gap-6">
                  <div className="w-64 h-48 bg-gray-200 rounded-xl overflow-hidden flex-shrink-0">
                    <img src={car.image} alt={`${car.make} ${car.model}`} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="text-2xl font-bold text-navy">
                        {car.year} {car.make} {car.model}
                      </h3>
                      <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-semibold">
                        Price Drop!
                      </span>
                    </div>
                    <div className="flex items-center space-x-4 mb-4">
                      <p className="text-2xl font-bold text-electric-blue">{formatPrice(car.price)}</p>
                      <p className="text-lg text-gray-500 line-through">{formatPrice(car.originalPrice)}</p>
                      <p className="text-green-600 font-semibold">-{formatPrice(car.priceDrop)}</p>
                    </div>
                    <div className="bg-yellow-50 border-l-4 border-yellow-400 p-3 rounded mb-4">
                      <p className="text-sm text-charcoal">
                        <span className="font-semibold">Price Alert:</span> This car's price dropped by{' '}
                        {formatPrice(car.priceDrop)}! This is a great deal.
                      </p>
                    </div>
                    <div className="flex space-x-2">
                      <button className="btn-primary">View Details</button>
                      <button className="btn-secondary">Contact Seller</button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* My Cars */}
        {activeTab === 'mycars' && (
          <div className="space-y-6">
            {myCars.map((car) => (
              <div key={car.id} className="card">
                <div className="flex gap-6">
                  <div className="w-64 h-48 bg-gray-200 rounded-xl overflow-hidden flex-shrink-0">
                    <img src={car.image} alt={`${car.make} ${car.model}`} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-navy mb-4">
                      {car.year} {car.make} {car.model}
                    </h3>
                    <div className="grid grid-cols-3 gap-4 mb-6">
                      <div>
                        <p className="text-sm text-gray-500 mb-1">Current Value</p>
                        <p className="text-xl font-bold text-electric-blue">{formatPrice(car.currentValue)}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 mb-1">Purchase Price</p>
                        <p className="text-xl font-bold text-navy">{formatPrice(car.purchasePrice)}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 mb-1">Mileage</p>
                        <p className="text-xl font-bold text-navy">{car.mileage.toLocaleString()} miles</p>
                      </div>
                    </div>

                    <div className="bg-blue-50 border-l-4 border-electric-blue p-4 rounded mb-4">
                      <p className="text-sm font-semibold text-navy mb-2">Next Service</p>
                      <p className="text-sm text-charcoal mb-3">{car.maintenance.nextService}</p>
                      <p className="text-sm text-charcoal">
                        <span className="font-semibold">AI Prediction:</span> {car.maintenance.aiPrediction}
                      </p>
                    </div>

                    <div className="flex space-x-2">
                      <button className="btn-primary">Track Maintenance</button>
                      <button className="btn-secondary">View Upgrade Options</button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Upgrade Options */}
        {activeTab === 'upgrades' && (
          <div className="card text-center py-12">
            <div className="text-6xl mb-4">🚀</div>
            <h3 className="text-2xl font-bold text-navy mb-2">Upgrade Recommendations</h3>
            <p className="text-gray-600 mb-6">
              AI is analyzing your current vehicle and driving patterns to suggest the perfect upgrade...
            </p>
            <button className="btn-primary">Get Recommendations</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Garage;


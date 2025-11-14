import { useState } from 'react';

const Checkout = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    financing: false,
    downPayment: '',
    loanTerm: '60',
  });

  const steps = [
    { number: 1, title: 'Car Selection', icon: '🚗' },
    { number: 2, title: 'Buyer Info', icon: '👤' },
    { number: 3, title: 'Financing', icon: '💳' },
    { number: 4, title: 'Delivery', icon: '🚚' },
  ];

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-navy mb-8">Checkout</h1>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {steps.map((s, idx) => (
              <div key={s.number} className="flex items-center flex-1">
                <div className="flex flex-col items-center flex-1">
                  <div
                    className={`w-14 h-14 rounded-full flex items-center justify-center font-bold text-lg ${
                      step >= s.number ? 'bg-electric-blue text-white' : 'bg-gray-200 text-gray-500'
                    }`}
                  >
                    {step > s.number ? '✓' : s.icon}
                  </div>
                  <p className="mt-2 text-sm text-gray-600 text-center">{s.title}</p>
                </div>
                {idx < steps.length - 1 && (
                  <div
                    className={`flex-1 h-1 mx-2 ${step > s.number ? 'bg-electric-blue' : 'bg-gray-200'}`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {step === 1 && (
              <div className="card">
                <h2 className="text-2xl font-bold text-navy mb-6">Selected Vehicle</h2>
                <div className="flex gap-6">
                  <div className="w-48 h-32 bg-gray-200 rounded-xl flex-shrink-0"></div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-navy mb-2">2020 Honda Civic EX</h3>
                    <p className="text-gray-600 mb-4">$17,500 • 35,000 miles</p>
                    <div className="bg-blue-50 border-l-4 border-electric-blue p-3 rounded mb-4">
                      <p className="text-sm text-charcoal">
                        <span className="font-semibold">AI Note:</span> Great value! This car has the lowest mileage in its price range.
                      </p>
                    </div>
                    <button onClick={() => setStep(2)} className="btn-primary">
                      Continue to Buyer Info
                    </button>
                  </div>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="card">
                <h2 className="text-2xl font-bold text-navy mb-6">Buyer Information</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-charcoal mb-2">Full Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-electric-blue"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-charcoal mb-2">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-electric-blue"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-charcoal mb-2">Phone</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-electric-blue"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-charcoal mb-2">Address</label>
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-electric-blue"
                    />
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-charcoal mb-2">City</label>
                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-electric-blue"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-charcoal mb-2">State</label>
                      <input
                        type="text"
                        name="state"
                        value={formData.state}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-electric-blue"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-charcoal mb-2">ZIP</label>
                      <input
                        type="text"
                        name="zip"
                        value={formData.zip}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-electric-blue"
                      />
                    </div>
                  </div>
                  <div className="flex space-x-4">
                    <button onClick={() => setStep(1)} className="btn-secondary">
                      Back
                    </button>
                    <button onClick={() => setStep(3)} className="btn-primary">
                      Continue to Financing
                    </button>
                  </div>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="card">
                <h2 className="text-2xl font-bold text-navy mb-6">Financing Options</h2>
                <div className="space-y-4">
                  <div>
                    <label className="flex items-center space-x-2 mb-4">
                      <input
                        type="checkbox"
                        checked={formData.financing}
                        onChange={(e) => setFormData({ ...formData, financing: e.target.checked })}
                        className="w-5 h-5 text-electric-blue rounded"
                      />
                      <span className="font-medium text-charcoal">I need financing</span>
                    </label>
                  </div>

                  {formData.financing && (
                    <>
                      <div>
                        <label className="block text-sm font-medium text-charcoal mb-2">Down Payment</label>
                        <input
                          type="number"
                          name="downPayment"
                          value={formData.downPayment}
                          onChange={handleInputChange}
                          placeholder="$5,000"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-electric-blue"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-charcoal mb-2">Loan Term</label>
                        <select
                          name="loanTerm"
                          value={formData.loanTerm}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-electric-blue"
                        >
                          <option value="36">36 months</option>
                          <option value="48">48 months</option>
                          <option value="60">60 months</option>
                          <option value="72">72 months</option>
                        </select>
                      </div>
                      <div className="bg-blue-50 border-l-4 border-electric-blue p-4 rounded">
                        <p className="text-sm text-charcoal">
                          <span className="font-semibold">AI Assistant:</span> Based on your credit profile, you may qualify for rates as low as 3.9% APR. Would you like me to find better options?
                        </p>
                      </div>
                    </>
                  )}

                  <div className="flex space-x-4">
                    <button onClick={() => setStep(2)} className="btn-secondary">
                      Back
                    </button>
                    <button onClick={() => setStep(4)} className="btn-primary">
                      Continue to Delivery
                    </button>
                  </div>
                </div>
              </div>
            )}

            {step === 4 && (
              <div className="card">
                <h2 className="text-2xl font-bold text-navy mb-6">Delivery Options</h2>
                <div className="space-y-4">
                  <div className="border-2 border-electric-blue rounded-xl p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold text-navy">Home Delivery</h3>
                      <span className="text-electric-blue font-bold">Free</span>
                    </div>
                    <p className="text-sm text-gray-600">We'll deliver your car directly to your address</p>
                  </div>
                  <div className="border-2 border-gray-200 rounded-xl p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold text-navy">Pickup at Dealer</h3>
                      <span className="text-gray-500">Free</span>
                    </div>
                    <p className="text-sm text-gray-600">Pick up your car at our nearest location</p>
                  </div>
                  <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded mt-6">
                    <p className="text-sm text-charcoal">
                      <span className="font-semibold">AI Recommendation:</span> Home delivery is recommended for your location. Estimated delivery: 3-5 business days.
                    </p>
                  </div>
                  <div className="flex space-x-4">
                    <button onClick={() => setStep(3)} className="btn-secondary">
                      Back
                    </button>
                    <button className="btn-primary flex-1">
                      Complete Purchase
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar - Order Summary */}
          <div className="lg:col-span-1">
            <div className="card sticky top-24">
              <h3 className="text-xl font-bold text-navy mb-4">Order Summary</h3>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Vehicle</p>
                  <p className="font-semibold text-navy">2020 Honda Civic EX</p>
                  <p className="text-sm text-gray-600">$17,500</p>
                </div>
                <div className="border-t pt-4">
                  <p className="text-sm text-gray-600 mb-1">Processing Fee</p>
                  <p className="font-semibold text-navy">$299</p>
                </div>
                {formData.financing && (
                  <div>
                    <p className="text-sm text-gray-600 mb-1">Estimated Monthly Payment</p>
                    <p className="font-semibold text-navy">~$280/month</p>
                  </div>
                )}
                <div className="border-t pt-4">
                  <div className="flex justify-between items-center">
                    <p className="font-bold text-navy">Total</p>
                    <p className="text-2xl font-bold text-electric-blue">$17,799</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;


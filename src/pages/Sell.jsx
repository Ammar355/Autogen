import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Sell = () => {
  const [step, setStep] = useState(1); // 1: Camera, 2: Review, 3: Listing
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState(null);
  const navigate = useNavigate();

  const handleScan = () => {
    setIsScanning(true);
    // Simulate camera scan
    setTimeout(() => {
      setScanResult({
        vin: '1HGBH41JXMN109186',
        licensePlate: 'ABC-1234',
        year: 2020,
        make: 'Honda',
        model: 'Civic',
        trim: 'EX',
        color: 'Silver',
        condition: 'Excellent',
        mileage: 35000,
        detectedIssues: ['Minor scratch on rear bumper', 'Tire wear: 70%'],
      });
      setIsScanning(false);
      setStep(2);
    }, 3000);
  };

  const handleProceedToListing = () => {
    navigate('/listing', { state: { carData: scanResult } });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-navy mb-8">Sell Your Car</h1>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {[1, 2, 3].map((s) => (
              <div key={s} className="flex items-center flex-1">
                <div className="flex flex-col items-center flex-1">
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center font-bold ${
                      step >= s ? 'bg-electric-blue text-white' : 'bg-gray-200 text-gray-500'
                    }`}
                  >
                    {s}
                  </div>
                  <p className="mt-2 text-sm text-gray-600">
                    {s === 1 ? 'Scan' : s === 2 ? 'Review' : 'List'}
                  </p>
                </div>
                {s < 3 && (
                  <div
                    className={`flex-1 h-1 mx-2 ${step > s ? 'bg-electric-blue' : 'bg-gray-200'}`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {step === 1 && (
          <div className="card text-center">
            <div className="mb-6">
              <div className="text-6xl mb-4">📷</div>
              <h2 className="text-3xl font-bold text-navy mb-4">Camera Vision Agent</h2>
              <p className="text-gray-600 mb-8">
                Point your camera at the license plate or VIN to automatically detect your vehicle details
              </p>
            </div>

            {!isScanning ? (
              <div className="space-y-4">
                <div className="bg-gray-200 rounded-2xl h-64 flex items-center justify-center mb-6">
                  <div className="text-center">
                    <div className="text-4xl mb-2">📸</div>
                    <p className="text-gray-500">Camera preview will appear here</p>
                  </div>
                </div>
                <button onClick={handleScan} className="btn-primary text-lg px-8 py-4">
                  Start Camera Scan
                </button>
                <p className="text-sm text-gray-500 mt-4">
                  Our AI will automatically detect: Year, Make, Model, Trim, Color, and Condition
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="bg-gradient-to-br from-electric-blue to-electric-teal rounded-2xl h-64 flex items-center justify-center mb-6 animate-pulse">
                  <div className="text-center text-white">
                    <div className="text-4xl mb-2 animate-bounce">🔍</div>
                    <p className="text-lg font-semibold">Scanning...</p>
                    <p className="text-sm opacity-90 mt-2">Detecting vehicle information</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {step === 2 && scanResult && (
          <div className="space-y-6">
            <div className="card">
              <h2 className="text-2xl font-bold text-navy mb-6">Scan Results</h2>
              
              <div className="grid grid-cols-2 gap-6 mb-6">
                <div>
                  <p className="text-sm text-gray-500 mb-1">VIN</p>
                  <p className="font-semibold text-navy">{scanResult.vin}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">License Plate</p>
                  <p className="font-semibold text-navy">{scanResult.licensePlate}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Year</p>
                  <p className="font-semibold text-navy">{scanResult.year}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Make</p>
                  <p className="font-semibold text-navy">{scanResult.make}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Model</p>
                  <p className="font-semibold text-navy">{scanResult.model}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Trim</p>
                  <p className="font-semibold text-navy">{scanResult.trim}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Color</p>
                  <p className="font-semibold text-navy">{scanResult.color}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Mileage</p>
                  <p className="font-semibold text-navy">{scanResult.mileage.toLocaleString()} miles</p>
                </div>
              </div>

              <div className="mb-6">
                <p className="text-sm text-gray-500 mb-2">Condition</p>
                <span className="px-4 py-2 bg-green-100 text-green-800 rounded-lg font-semibold">
                  {scanResult.condition}
                </span>
              </div>

              <div className="mb-6">
                <p className="text-sm font-semibold text-navy mb-2">Detected Issues</p>
                <ul className="space-y-2">
                  {scanResult.detectedIssues.map((issue, idx) => (
                    <li key={idx} className="flex items-center space-x-2 text-sm text-gray-600">
                      <span>⚠️</span>
                      <span>{issue}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex space-x-4">
                <button onClick={() => setStep(1)} className="btn-secondary">
                  Rescan
                </button>
                <button onClick={handleProceedToListing} className="btn-primary flex-1">
                  Proceed to AI Listing
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Sell;


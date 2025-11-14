import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import FloatingButtons from './components/FloatingButtons';
import AIChat from './components/AIChat';
import Home from './pages/Home';
import Buy from './pages/Buy';
import Sell from './pages/Sell';
import Listing from './pages/Listing';
import Checkout from './pages/Checkout';
import Garage from './pages/Garage';
import Assistant from './pages/Assistant';

function App() {
  const [isChatOpen, setIsChatOpen] = useState(false);

  return (
    <Router>
      <div className="min-h-screen bg-white">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/buy" element={<Buy />} />
          <Route path="/sell" element={<Sell />} />
          <Route path="/listing" element={<Listing />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/garage" element={<Garage />} />
          <Route path="/assistant" element={<Assistant />} />
        </Routes>
        <FloatingButtons
          onChatClick={() => setIsChatOpen(true)}
          onCameraClick={() => {}}
          onVoiceClick={() => {}}
        />
        <AIChat isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
      </div>
    </Router>
  );
}

export default App;

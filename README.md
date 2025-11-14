# AutoGen - AI-Powered Car Marketplace

A cutting-edge, AI-powered online marketplace for buying and selling used cars. Built with React, Tailwind CSS, and designed with a premium, modern aesthetic inspired by Carvana and Tesla.

## Features

### 🤖 AI-Powered Features
- **AutoGenius Assistant**: Conversational AI that helps users find, compare, and purchase cars
- **OpenAI Voice Integration**: Voice-first interactions for natural language queries
- **Camera Vision Agent**: Automatically detect vehicle details from license plates or VINs
- **AI Auto Listing Agent**: Automatically generates optimized listings with descriptions, pricing, and trust reports

### 🎨 Design
- Premium, clean, modern design
- Color palette: Deep navy/charcoal, white backgrounds, electric blue/teal accents
- Large fonts, generous spacing, rounded cards, subtle shadows
- Fully responsive design

### 🚗 Core Functionality
- **Home Page**: Hero search with natural language support, AI assistant card, quick categories, trust badges
- **Buy Flow**: Conversational UI with AI-powered filtering and car recommendations
- **Sell Flow**: Camera-based vehicle scanning with automatic data extraction
- **Checkout**: Step-by-step process with AI assistance at every step
- **My Garage**: Saved cars, watchlist with price alerts, maintenance tracking, upgrade recommendations

## Getting Started

### Prerequisites
- Node.js 18+ and npm

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser and navigate to `http://localhost:5173`

## Project Structure

```
src/
├── components/       # Reusable UI components
│   ├── Navbar.jsx
│   ├── FloatingButtons.jsx
│   └── AIChat.jsx
├── pages/           # Page components
│   ├── Home.jsx
│   ├── Buy.jsx
│   ├── Sell.jsx
│   ├── Listing.jsx
│   ├── Checkout.jsx
│   ├── Garage.jsx
│   └── Assistant.jsx
├── App.jsx          # Main app component with routing
└── main.jsx         # Entry point
```

## Technology Stack

- **React 19** - UI library
- **React Router** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **Vite** - Build tool and dev server

## Future Enhancements

- Integration with OpenAI Voice API
- Real camera/computer vision integration
- Backend API integration
- Payment processing
- Real-time chat with sellers
- Advanced AI recommendations

## License

MIT

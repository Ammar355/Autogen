# AutoGen - AI-Powered Car Marketplace

A cutting-edge, AI-powered online marketplace for buying and selling used cars. Built with React, Node.js, Express, MongoDB, and Tailwind CSS. Features a premium, modern design inspired by Carvana and Tesla.

## 🚀 Features

### 🤖 AI-Powered Features
- **AutoGenius Assistant**: Conversational AI that helps users find, compare, and purchase cars
- **OpenAI Voice Integration**: Voice-first interactions for natural language queries (UI ready)
- **Camera Vision Agent**: Automatically detect vehicle details from license plates or VINs
- **AI Auto Listing Agent**: Automatically generates optimized listings with descriptions, pricing, and trust reports

### 🎨 Design
- Premium, clean, modern design
- Color palette: Deep navy/charcoal, white backgrounds, electric blue/teal accents
- Large fonts, generous spacing, rounded cards, subtle shadows
- Fully responsive design

### 🚗 Core Functionality
- **User Authentication**: Register, login, and manage profiles
- **Home Page**: Hero search with natural language support, AI assistant card, quick categories, trust badges
- **Buy Flow**: Conversational UI with AI-powered filtering and car recommendations
- **Sell Flow**: Camera-based vehicle scanning with automatic data extraction
- **Checkout**: Step-by-step process with AI assistance at every step
- **My Garage**: Saved cars, watchlist with price alerts, maintenance tracking, upgrade recommendations

## 📋 Prerequisites

- Node.js 18+ 
- MongoDB (local or MongoDB Atlas)
- npm or yarn

## 🏃 Quick Start

See [QUICK_START.md](./QUICK_START.md) for detailed local setup instructions.

### Quick Commands:

```bash
# Backend
cd backend
npm install
cp .env.example .env
# Edit .env with your MongoDB connection
npm run dev

# Frontend (new terminal)
cd ..
npm install
cp .env.example .env
npm run dev
```

Visit `http://localhost:5173` to see the app!

## 📁 Project Structure

```
autogen/
├── backend/              # Node.js/Express API
│   ├── models/          # MongoDB models (User, Car, Garage)
│   ├── routes/          # API routes (auth, cars, listings, garage)
│   ├── middleware/      # Auth middleware
│   └── server.js        # Express server
├── src/
│   ├── components/      # React components
│   ├── pages/           # Page components
│   ├── services/        # API service layer
│   ├── context/         # React Context (Auth)
│   └── App.jsx          # Main app component
├── DEPLOYMENT.md        # Production deployment guide
└── QUICK_START.md       # Local development guide
```

## 🔧 Environment Variables

### Backend (.env)
```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/autogen
JWT_SECRET=your-secret-key
OPENAI_API_KEY=your-openai-key
```

### Frontend (.env)
```env
VITE_API_URL=http://localhost:5000/api
```

## 📡 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user
- `PUT /api/auth/profile` - Update profile

### Cars
- `GET /api/cars` - Get all cars (with filters)
- `GET /api/cars/:id` - Get single car
- `POST /api/cars` - Create car listing
- `PUT /api/cars/:id` - Update car listing
- `DELETE /api/cars/:id` - Delete car listing

### Listings
- `POST /api/listings/scan` - Process camera scan
- `POST /api/listings/generate` - Generate AI listing content

### Garage
- `GET /api/garage` - Get user's garage
- `POST /api/garage/saved` - Add car to saved
- `DELETE /api/garage/saved/:id` - Remove from saved
- `POST /api/garage/watchlist` - Add to watchlist
- `DELETE /api/garage/watchlist/:id` - Remove from watchlist

## 🚢 Deployment

See [DEPLOYMENT.md](./DEPLOYMENT.md) for complete deployment instructions.

### Quick Deploy Options:

**Backend:**
- Heroku
- Railway
- DigitalOcean App Platform

**Frontend:**
- Vercel (recommended)
- Netlify
- GitHub Pages

## 🛠️ Technology Stack

### Frontend
- React 19
- React Router
- Tailwind CSS v4
- Vite

### Backend
- Node.js
- Express
- MongoDB / Mongoose
- JWT Authentication
- bcryptjs

## 🔐 Security Features

- JWT-based authentication
- Password hashing with bcrypt
- Protected API routes
- Input validation
- CORS configuration

## 📝 TODO / Future Enhancements

- [ ] Real OpenAI Voice API integration
- [ ] Real camera/computer vision integration
- [ ] Image upload (Cloudinary/AWS S3)
- [ ] Payment processing (Stripe)
- [ ] Email notifications
- [ ] Real-time chat
- [ ] Advanced search filters
- [ ] Price drop notifications
- [ ] Mobile app (React Native)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

MIT

## 🆘 Support

For issues or questions:
1. Check [QUICK_START.md](./QUICK_START.md) for common issues
2. Review [DEPLOYMENT.md](./DEPLOYMENT.md) for deployment help
3. Check backend/frontend logs for errors

## 🎯 Getting Started Checklist

- [ ] Install Node.js 18+
- [ ] Set up MongoDB (local or Atlas)
- [ ] Clone repository
- [ ] Install dependencies (backend + frontend)
- [ ] Configure environment variables
- [ ] Start backend server
- [ ] Start frontend server
- [ ] Create user account
- [ ] Test features
- [ ] Deploy to production (optional)

---

Built with ❤️ for the future of car buying and selling.

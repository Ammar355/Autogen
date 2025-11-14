# AutoGen Quick Start Guide

Get AutoGen running locally in 5 minutes!

## Prerequisites

- Node.js 18+ installed
- MongoDB installed locally OR MongoDB Atlas account

## Step 1: Clone and Install

```bash
cd /Users/ammarafridi/autogen
```

## Step 2: Backend Setup

```bash
cd backend

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Edit .env file with your MongoDB connection
# For local MongoDB: mongodb://localhost:27017/autogen
# For MongoDB Atlas: mongodb+srv://username:password@cluster.mongodb.net/autogen

# Start backend
npm run dev
```

Backend will run on `http://localhost:5000`

## Step 3: Frontend Setup

Open a new terminal:

```bash
cd /Users/ammarafridi/autogen

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Edit .env - should already have: VITE_API_URL=http://localhost:5000/api

# Start frontend
npm run dev
```

Frontend will run on `http://localhost:5173`

## Step 4: Test It!

1. Open `http://localhost:5173` in your browser
2. Click "Sign Up" to create an account
3. Login with your credentials
4. Try creating a car listing
5. Browse cars on the Buy page

## Common Issues

### Tailwind CSS Error
If you see PostCSS errors, the fix is already applied. Just restart the dev server:
```bash
# Stop the server (Ctrl+C) and restart
npm run dev
```

### MongoDB Connection Error
- Make sure MongoDB is running: `mongod`
- Or use MongoDB Atlas and update `.env` with your connection string

### Backend Not Starting
- Check if port 5000 is available
- Verify MongoDB connection string in `.env`
- Check backend logs for errors

### Frontend Can't Connect to Backend
- Make sure backend is running on port 5000
- Check `VITE_API_URL` in frontend `.env` file
- Check browser console for CORS errors

## Next Steps

1. Read `DEPLOYMENT.md` for production deployment
2. Add your OpenAI API key for AI features
3. Customize the design and branding
4. Add more features!

## API Endpoints

Once running, test these endpoints:

- `GET http://localhost:5000/api/health` - Health check
- `POST http://localhost:5000/api/auth/register` - Register user
- `POST http://localhost:5000/api/auth/login` - Login
- `GET http://localhost:5000/api/cars` - Get all cars

## Need Help?

Check the full `DEPLOYMENT.md` guide for detailed instructions and troubleshooting.


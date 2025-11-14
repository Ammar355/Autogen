# AutoGen Deployment Guide

Complete guide to deploy AutoGen (frontend + backend) to production.

## Prerequisites

1. **Node.js** (v18 or higher)
2. **MongoDB** (local or cloud - MongoDB Atlas recommended)
3. **Git** account
4. **Domain name** (optional but recommended)

## Step 1: Set Up MongoDB Database

### Option A: MongoDB Atlas (Cloud - Recommended)

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free account
3. Create a new cluster (free tier available)
4. Create a database user
5. Whitelist your IP address (or use 0.0.0.0/0 for all IPs in development)
6. Get your connection string: `mongodb+srv://username:password@cluster.mongodb.net/autogen`
cat .env

### Option B: Local MongoDB

```bash
# Install MongoDB locally
brew install mongodb-community  # macOS
# or follow instructions for your OS

# Start MongoDB
mongod
```

## Step 2: Backend Setup

### 2.1 Configure Environment Variables

```bash
cd backend
cp .env.example .env
```

Edit `.env` file:

```env
PORT=5000
NODE_ENV=production
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/autogen
JWT_SECRET=your-super-secret-jwt-key-minimum-32-characters-long
OPENAI_API_KEY=your-openai-api-key-here
```

**Important:** Generate a strong JWT_SECRET:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### 2.2 Test Backend Locally

```bash
cd backend
npm install
npm run dev
```

Backend should run on `http://localhost:5000`

Test the health endpoint:
```bash
curl http://localhost:5000/api/health
```

## Step 3: Frontend Setup

### 3.1 Configure Environment Variables

```bash
cd ..  # Back to root
cp .env.example .env
```

Edit `.env` file:

```env
VITE_API_URL=http://localhost:5000/api
```

For production, update to your backend URL:
```env
VITE_API_URL=https://your-backend-domain.com/api
```

### 3.2 Test Frontend Locally

```bash
npm install
npm run dev
```

Frontend should run on `http://localhost:5173`

## Step 4: Deploy Backend

### Option A: Deploy to Heroku

1. **Install Heroku CLI:**
   ```bash
   brew install heroku/brew/heroku  # macOS
   ```

2. **Login to Heroku:**
   ```bash
   heroku login
   ```

3. **Create Heroku App:**
   ```bash
   cd backend
   heroku create autogen-backend
   ```

4. **Set Environment Variables:**
   ```bash
   heroku config:set MONGODB_URI=your-mongodb-uri
   heroku config:set JWT_SECRET=your-jwt-secret
   heroku config:set NODE_ENV=production
   heroku config:set OPENAI_API_KEY=your-openai-key
   ```

5. **Deploy:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   heroku git:remote -a autogen-backend
   git push heroku main
   ```

6. **Get Backend URL:**
   ```bash
   heroku info
   # Your backend will be at: https://autogen-backend.herokuapp.com
   ```

### Option B: Deploy to Railway

1. Go to [Railway](https://railway.app)
2. Create new project
3. Connect GitHub repository
4. Add MongoDB service
5. Set environment variables
6. Deploy

### Option C: Deploy to DigitalOcean App Platform

1. Go to [DigitalOcean](https://www.digitalocean.com)
2. Create App
3. Connect GitHub repository
4. Set environment variables
5. Deploy

## Step 5: Deploy Frontend

### Option A: Deploy to Vercel (Recommended)

1. **Install Vercel CLI:**
   ```bash
   npm install -g vercel
   ```

2. **Login:**
   ```bash
   vercel login
   ```

3. **Deploy:**
   ```bash
   cd ..  # Back to root
   vercel
   ```

4. **Set Environment Variables:**
   - Go to Vercel dashboard
   - Project Settings → Environment Variables
   - Add `VITE_API_URL` with your backend URL

5. **Redeploy:**
   ```bash
   vercel --prod
   ```

### Option B: Deploy to Netlify

1. **Install Netlify CLI:**
   ```bash
   npm install -g netlify-cli
   ```

2. **Login:**
   ```bash
   netlify login
   ```

3. **Deploy:**
   ```bash
   npm run build
   netlify deploy --prod
   ```

4. **Set Environment Variables:**
   - Netlify dashboard → Site settings → Environment variables
   - Add `VITE_API_URL`

### Option C: Deploy to GitHub Pages

1. Update `vite.config.js`:
   ```js
   export default defineConfig({
     base: '/autogen/',
     // ... rest of config
   })
   ```

2. Build and deploy:
   ```bash
   npm run build
   # Follow GitHub Pages setup instructions
   ```

## Step 6: Update CORS Settings

In your backend `server.js`, update CORS to allow your frontend domain:

```javascript
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true
}));
```

## Step 7: Test Production Deployment

1. **Test Backend:**
   ```bash
   curl https://your-backend-url.com/api/health
   ```

2. **Test Frontend:**
   - Visit your frontend URL
   - Try registering a new account
   - Test login
   - Browse cars
   - Create a listing

## Step 8: Set Up Custom Domain (Optional)

### Backend Domain:
1. Add custom domain in Heroku/Railway/DigitalOcean
2. Update DNS records
3. Update `VITE_API_URL` in frontend

### Frontend Domain:
1. Add custom domain in Vercel/Netlify
2. Update DNS records
3. SSL will be automatically configured

## Step 9: Enable OpenAI Integration (Optional)

1. Get OpenAI API key from [OpenAI](https://platform.openai.com)
2. Add to backend environment variables
3. Update `/backend/routes/listings.js` to use real OpenAI API

## Troubleshooting

### Backend Issues:
- Check MongoDB connection string
- Verify environment variables are set
- Check server logs: `heroku logs --tail`

### Frontend Issues:
- Verify `VITE_API_URL` is correct
- Check browser console for errors
- Ensure CORS is configured correctly

### Database Issues:
- Verify MongoDB connection
- Check database user permissions
- Ensure IP is whitelisted (MongoDB Atlas)

## Security Checklist

- [ ] Strong JWT_SECRET (32+ characters)
- [ ] MongoDB connection string secured
- [ ] Environment variables not committed to Git
- [ ] CORS configured for production domains only
- [ ] HTTPS enabled (automatic on most platforms)
- [ ] Rate limiting implemented (consider adding)
- [ ] Input validation on all endpoints

## Monitoring

Consider adding:
- **Sentry** for error tracking
- **LogRocket** for session replay
- **MongoDB Atlas Monitoring** for database
- **Uptime monitoring** (UptimeRobot, Pingdom)

## Next Steps

1. Set up automated testing
2. Add CI/CD pipeline
3. Implement image upload (Cloudinary/AWS S3)
4. Add email notifications
5. Set up analytics (Google Analytics, Mixpanel)
6. Implement payment processing (Stripe)

## Support

For issues, check:
- Backend logs
- Frontend console
- MongoDB Atlas logs
- Deployment platform logs


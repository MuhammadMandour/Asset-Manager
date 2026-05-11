# Vercel Deployment Guide

## Quick Start

Your AssetTrack application is now configured for Vercel deployment. Follow these steps:

### 1. Deploy Frontend to Vercel

#### Option A: Using Vercel CLI (Fastest)
```bash
npm install -g vercel
cd /path/to/AssetTrack
vercel
```

#### Option B: Using Vercel Dashboard
1. Go to [vercel.com](https://vercel.com)
2. Sign up/Log in with GitHub
3. Click "Add New..." → "Project"
4. Import your GitHub repository (MuhammadMandour/Asset-Manager)
5. Vercel will auto-detect the configuration from `vercel.json`
6. Click "Deploy"

### 2. Configure Environment Variables in Vercel

After deployment starts, you need to add the backend API URL:

**In Vercel Dashboard:**
1. Go to your project Settings
2. Navigate to "Environment Variables"
3. Add the following:
   - **Name:** `VITE_API_URL`
   - **Value:** Your backend API URL (e.g., `https://your-backend.azurewebsites.net/api`)
   - **Environments:** Production, Preview, Development

### 3. Deploy Backend (Choose One Option)

Since Vercel doesn't support Java directly, deploy the backend to one of these services:

#### Option A: Azure App Service (Recommended for Java)
```bash
# Install Azure CLI
# Build and deploy your Spring Boot app
mvn clean package
az webapp up --name assettrack-api --resource-group MyResourceGroup --runtime "JAVA|21"
```

#### Option B: AWS Elastic Beanstalk
```bash
# Build JAR file
cd backend
mvn clean package

# Deploy with EB CLI
eb init -p java-21 assettrack-api
eb create assettrack-api-env
eb deploy
```

#### Option C: Railway.app (Simplest)
1. Go to [railway.app](https://railway.app)
2. Sign up with GitHub
3. Create new project → Import GitHub repo
4. Railway will auto-detect Spring Boot
5. Configure environment variables from `.env`

#### Option D: Docker + Cloud Run (Google Cloud)
```bash
# Build and push Docker image
docker build -t gcr.io/YOUR_PROJECT/assettrack-api ./backend
docker push gcr.io/YOUR_PROJECT/assettrack-api

# Deploy to Cloud Run
gcloud run deploy assettrack-api --image gcr.io/YOUR_PROJECT/assettrack-api
```

### 4. Update Frontend API Configuration

Once your backend is deployed, update the environment variable in Vercel:

1. **Vercel Dashboard** → Your Project → **Settings** → **Environment Variables**
2. Update `VITE_API_URL` with your deployed backend URL

Example:
```
VITE_API_URL=https://assettrack-api.azurewebsites.net/api
```

### 5. Test the Deployment

After both frontend and backend are deployed:

1. Visit your Vercel frontend URL
2. Test login functionality
3. Verify API calls are working (check browser console for errors)

---

## Project Structure

```
AssetTrack/
├── frontend/              # React app (deploys to Vercel)
│   ├── src/
│   ├── .env.local        # Local development
│   ├── .env.example      # Template for env vars
│   └── .env.production.example
├── backend/              # Spring Boot app (deploy separately)
│   ├── src/
│   ├── pom.xml
│   └── Dockerfile
├── docker-compose.yml    # Local development
├── vercel.json          # Vercel configuration
├── .vercelignore        # Files to ignore during deployment
└── README.md
```

## Configuration Files

### vercel.json
- Specifies root build and output directories
- Configures environment variables
- Routes requests appropriately

### .vercelignore
- Excludes unnecessary files from Vercel deployment
- Keeps deployment package lightweight

### Environment Variables

#### Development (.env.local)
```
VITE_API_URL=http://localhost:8080/api
VITE_ENV=development
```

#### Production (Vercel Dashboard)
```
VITE_API_URL=https://your-backend-api.com/api
VITE_ENV=production
```

## Troubleshooting

### Frontend shows "Cannot reach API"
- Check that the backend is deployed
- Verify `VITE_API_URL` environment variable in Vercel
- Ensure backend has CORS enabled for your Vercel domain

### Authentication fails
- Verify JWT_SECRET is configured in backend
- Check token storage in browser localStorage
- Verify CORS headers allow credentials

### Build fails on Vercel
- Check build logs in Vercel dashboard
- Ensure all dependencies are in package.json
- Verify Node.js version compatibility (recommend 18+)

## Next Steps

1. ✅ Push code to GitHub (Done)
2. ⏳ Deploy frontend to Vercel
3. ⏳ Deploy backend to your chosen service
4. ⏳ Configure environment variables
5. ⏳ Test full application flow

---

## Support Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Spring Boot Deployment](https://spring.io/guides/gs/spring-boot-docker/)
- [React + Vite Guide](https://vitejs.dev/guide/)

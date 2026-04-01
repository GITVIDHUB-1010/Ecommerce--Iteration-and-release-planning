# Deployment Guide - Ecommerce Platform

## Current Status ✅
- Frontend code fixed for production deployment
- Backend ready for deployment
- Environment variable system implemented

---

## STEP 1: Deploy Frontend (Vercel)

### Option A: Auto-Deploy (Recommended)
Vercel automatically redeploys when you push to GitHub. **Your frontend should now deploy successfully!**

1. Go to https://vercel.com
2. Select your repository: `ecommerce-platform`
3. Vercel should Auto-detect as React
4. Add Environment Variable:
   - **Name**: `REACT_APP_API_URL`
   - **Value**: (Leave blank for now - we'll update after backend is live)
5. Click "Deploy"

### Check if Frontend Deployed:
- Go to your Vercel dashboard
- Click on your project
- You should see a live URL (e.g., `ecommerce-iteration-and-release-pla.vercel.app`)
- Test it by visiting the URL

---

## STEP 2: Deploy Backend (Choose One Option)

### Option A: Railway.app (Easiest) ⭐ Recommended

1. Go to https://railway.app
2. Click "New Project" → "Deploy from GitHub"
3. Select your `ecommerce-platform` repository
4. Configure:
   - **Root Directory**: `backend`
   - **Start Command**: `npm start`
5. Add Environment Variables:
   ```
   PORT=5000
   NODE_ENV=production
   CORS_ORIGIN=https://your-vercel-url.vercel.app
   ```
6. Deploy
7. Copy the generated URL (e.g., `https://your-app-xyz.up.railway.app`)

### Option B: Render.com

1. Go to https://render.com
2. Click "New +" → "Web Service"
3. Connect GitHub → Select your repo
4. Configure:
   - **Root Directory**: `backend`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
5. Add environment variables same as above
6. Deploy

### Option C: Heroku (Paid Now - Not Free)

Not recommended anymore as Heroku discontinued free tier.

---

## STEP 3: Connect Frontend to Backend

Once your backend is deployed:

1. Go to Vercel Dashboard
2. Select your project
3. Settings → Environment Variables
4. **Edit** `REACT_APP_API_URL`
   - **Value**: Paste your deployed backend URL
   - Example: `https://your-app-xyz.up.railway.app`
5. Save
6. Vercel will auto-redeploy with new backend URL

---

## STEP 4: Test the Live Deployment

### Test Frontend:
1. Visit your Vercel URL
2. Browse products - should load without errors
3. Check browser console (F12) for any errors

### Test Backend:
1. Open a new tab
2. Visit: `https://your-backend-url.up.railway.app/api/products`
3. Should return JSON with products list

### Test Connection:
1. On your live site, try:
   - Filtering products ✓
   - Adding to cart ✓
   - Checkout process ✓
   - Placing order ✓

---

## TROUBLESHOOTING

### Still Getting 404 Errors?
❌ **Problem**: Backend URL not set in Vercel
✅ **Fix**: 
- Go to Vercel → Settings → Environment Variables
- Make sure `REACT_APP_API_URL` is set to your backend URL
- Redeploy

### Products Not Loading?
❌ **Problem**: Backend not responding
✅ **Fix**:
- Test backend URL directly: `https://your-backend.com/api/products`
- Check Railway/Render console for errors
- Restart the deployment

### CORS Errors in Console?
❌ **Problem**: Backend not accepting requests from frontend
✅ **Fix**:
- Update `CORS_ORIGIN` environment variable on backend to match your Vercel URL
- Redeploy backend

---

## Your Live URLs (After Deployment)

Once deployed, you'll have:

```
Frontend:  https://ecommerce-iteration-and-release-pla.vercel.app/
Backend:   https://your-app-xyz.up.railway.app
```

**Use the Frontend URL in your PowerPoint!** 🎉

---

## Local Development (Optional)

To work on features locally:

1. **Terminal 1** - Start Backend:
   ```bash
   cd backend
   npm install
   npm start
   ```
   Backend runs on `http://localhost:5000`

2. **Terminal 2** - Start Frontend:
   ```bash
   cd frontend
   npm install
   npm start
   ```
   Frontend runs on `http://localhost:3000`
   
   `.env.local` automatically uses `http://localhost:5000`

---

## Next Steps After Deployment ✅

1. ✅ Test all features on live site
2. ✅ Get the live URL
3. ✅ Add link to PowerPoint presentation
4. ✅ Share with stakeholders
5. (Optional) Add analytics, monitoring, or additional features

**Questions? Check the RELEASE_NOTES.md and README.md for more details!**

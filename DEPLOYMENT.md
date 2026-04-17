# Spark Forms - Deployment Guide

Complete guide for deploying Spark Forms to various platforms.

## Quick Start - Local Development

```bash
npm install
npm run dev
```

Visit `http://localhost:3000`

## Production Build

```bash
npm run build
npm start
```

---

## Deployment Options

### 1. Vercel (Recommended - Easiest)

**Steps:**

1. Push your code to GitHub/GitLab/Bitbucket
2. Go to [vercel.com](https://vercel.com)
3. Click "Add New..." → "Project"
4. Select your repository
5. Vercel automatically detects Next.js
6. Click "Deploy"

**Environment Variables:**
Add in Vercel dashboard → Settings → Environment Variables

```
NEXT_PUBLIC_API_URL=https://your-domain.com
```

**Auto-deployment:** Every push to main branch auto-deploys

---

### 2. AWS Amplify

**Prerequisites:**
```bash
npm install -g @aws-amplify/cli
```

**Steps:**

1. Configure AWS Amplify:
```bash
amplify init
```

2. Deploy:
```bash
amplify publish
```

3. (Optional) Add custom domain in Amplify Console

**Cost:** Free tier available for small projects

---

### 3. Netlify

**Prerequisites:**
```bash
npm install -g netlify-cli
```

**Steps:**

1. Build the project:
```bash
npm run build
```

2. Deploy:
```bash
netlify deploy --prod --dir=.next
```

Or connect GitHub for continuous deployment:
1. Go to [netlify.com](https://netlify.com)
2. Click "New site from Git"
3. Select your repository
4. Build command: `npm run build`
5. Publish directory: `.next`

---

### 4. Docker + Docker Compose (Local/VPS)

**Build and run locally:**

```bash
docker build -t spark-forms .
docker run -p 3000:3000 spark-forms
```

Or with Docker Compose:

```bash
docker-compose up -d
```

Visit `http://localhost:3000`

**Deploy to VPS:**

1. Install Docker on your server
2. Clone repository
3. Run `docker-compose up -d`

---

### 5. DigitalOcean App Platform

**Steps:**

1. Push code to GitHub
2. Go to DigitalOcean → Apps
3. Click "Create App"
4. Select GitHub repository
5. Choose Node.js runtime
6. Set build command: `npm install && npm run build`
7. Set run command: `npm start`
8. Add custom domain
9. Click "Deploy"

---

### 6. Heroku (Deprecated but still available)

**Note:** Heroku free tier is no longer available as of Nov 2022.

For paid tier:

1. Install Heroku CLI
2. Create Procfile:

```
web: npm start
```

3. Deploy:
```bash
heroku create spark-forms
git push heroku main
```

---

### 7. Railway

**Steps:**

1. Go to [railway.app](https://railway.app)
2. Click "New Project"
3. Select "Deploy from GitHub"
4. Choose your repository
5. Add environment variables if needed
6. Railway auto-deploys

---

### 8. Self-Hosted VPS (AWS EC2, Linode, etc.)

**Prerequisites:**
- Node.js 18+ installed
- PM2 or similar process manager

**Steps:**

1. Clone repository:
```bash
git clone <your-repo> spark-forms
cd spark-forms
```

2. Install dependencies:
```bash
npm install --production
```

3. Build:
```bash
npm run build
```

4. Install PM2:
```bash
npm install -g pm2
```

5. Start with PM2:
```bash
pm2 start "npm start" --name spark-forms
pm2 save
pm2 startup
```

6. Setup Nginx reverse proxy:

```nginx
server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

7. Enable SSL with Let's Encrypt:
```bash
sudo apt-get install certbot python3-certbot-nginx
sudo certbot --nginx -d your-domain.com
```

---

### 9. Google Cloud Run

**Steps:**

1. Create `Dockerfile` (already included)
2. Build image:
```bash
docker build -t spark-forms .
```

3. Tag for GCR:
```bash
docker tag spark-forms gcr.io/PROJECT_ID/spark-forms
docker push gcr.io/PROJECT_ID/spark-forms
```

4. Deploy to Cloud Run:
```bash
gcloud run deploy spark-forms \
  --image gcr.io/PROJECT_ID/spark-forms \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated
```

---

### 10. Azure App Service

**Steps:**

1. Create Web App resource in Azure Portal
2. Set runtime: Node.js 18
3. Deploy via:
   - Git push to Azure Repos
   - GitHub Actions
   - Direct ZIP deployment

---

## Environment Variables

Create `.env.production` for production-specific settings:

```env
NEXT_PUBLIC_API_URL=https://your-domain.com
NODE_ENV=production
```

---

## Performance Optimization

### Enable Compression
Already included in Next.js

### CDN Configuration
- Vercel: Automatic global CDN
- AWS: Use CloudFront
- Netlify: Automatic CDN included

### Image Optimization
Images are automatically optimized by Next.js

---

## Monitoring & Logging

### Vercel Analytics
Built-in web vitals monitoring

### PM2 Monitoring
```bash
pm2 monit
pm2 logs
```

### Docker Logs
```bash
docker logs -f <container-id>
```

---

## Database (When Ready)

Common options:
- **MongoDB Atlas** - Free tier available
- **Supabase** - PostgreSQL with free tier
- **Firebase** - Real-time database
- **AWS RDS** - Managed database

---

## SSL/HTTPS Setup

Most platforms handle this automatically:
- ✅ Vercel - Automatic
- ✅ Netlify - Automatic
- ✅ DigitalOcean - Easy setup
- ✅ AWS Amplify - Automatic

For VPS, use Let's Encrypt (shown above)

---

## Domain Setup

1. Register domain (GoDaddy, Namecheap, etc.)
2. Update DNS records to point to your deployment
3. Add domain in deployment platform's settings

---

## Backup & Maintenance

### Code Backup
- Use GitHub for version control
- Enable branch protection

### Database Backup
- Set up automated backups with your database provider
- Verify backup restoration regularly

### Updates
```bash
npm update
npm audit fix
```

---

## Troubleshooting

### Build fails
- Check Node.js version (requires 18+)
- Verify all dependencies in package.json
- Check build logs in platform console

### App won't start
- Check environment variables
- Verify port 3000 is available
- Check application logs

### Performance issues
- Enable analytics
- Check database queries
- Monitor CPU/memory usage

---

## Support

For issues:
1. Check platform-specific documentation
2. Review application logs
3. Verify environment configuration
4. Test locally with `npm run dev`

---

Happy deploying! 🚀

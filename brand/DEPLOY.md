# Deployment Guide - Solvency AI Landing Page

## Quick Deploy Options

### Option 1: GitHub Pages (Recommended)
1. Create a new repo: `solvency-landing`
2. Copy all files from `/brand/` to repo root
3. Enable GitHub Pages in Settings → Pages → Source: `main branch / root`
4. Configure custom domain: `solvency.money` in Settings → Pages → Custom domain
5. Update Porkbun DNS:
   - Add CNAME record: `@` → `yourusername.github.io`
   - Or add these A records:
     - `185.199.108.153`
     - `185.199.109.153`
     - `185.199.110.153`
     - `185.199.111.153`

### Option 2: Cloudflare Pages
1. Install Wrangler: `npm install -g wrangler`
2. Login: `wrangler login`
3. Deploy: `wrangler pages deploy /root/.openclaw/workspace/solvency-ai/brand --project-name solvency`
4. Configure custom domain in Cloudflare Pages dashboard

### Option 3: Vercel
1. Install Vercel CLI: `npm install -g vercel`
2. Login: `vercel login`
3. Deploy: `cd /root/.openclaw/workspace/solvency-ai/brand && vercel --prod`
4. Add custom domain: `vercel domains add solvency.money`

### Option 4: Netlify Drop
1. Go to https://app.netlify.com/drop
2. Drag and drop the `/brand/` folder
3. Configure custom domain in Netlify dashboard

### Option 5: This Server (Current Setup)
- Web server running on port 8080
- Access via: http://38.180.145.215:8080
- For production:
  1. Install nginx or caddy
  2. Configure reverse proxy on port 80/443
  3. Set up SSL with Let's Encrypt
  4. Update Porkbun DNS A record to point to `38.180.145.215`

## Porkbun DNS Configuration

### Manual DNS Setup
1. Login to Porkbun: https://porkbun.com/account/domainsSpeedy
2. Select `solvency.money`
3. Add DNS records:
   - **For GitHub Pages:** CNAME @ → your-github-username.github.io
   - **For Cloudflare/Vercel/Netlify:** Follow their custom domain instructions
   - **For this server:** A @ → 38.180.145.215

### API Configuration
```bash
# Porkbun API credentials in .env.porkbun
PORKBUN_API_KEY=pk1_a9d057680bdde8114366d8040f0bcbfec62e971b1d30e8d4072ea0851df90b23
PORKBUN_SECRET_KEY=sk1_24c5aaffd923710a11f10b6c7a852c73e6f6767633039f0c7835acb5a55766cc
DOMAIN=solvency.money
```

## Files Ready for Deployment
- ✅ `index.html` - Landing page
- ✅ `logo.svg` - Vector logo
- ✅ `logo-*.png` - Logo exports (32px, 128px, 400px, 512px)
- ✅ `twitter-profile.png` - 400x400 profile picture
- ✅ `twitter-banner.png` - 1500x500 banner image
- ✅ `twitter-bio.txt` - Bio text (154 chars)

## Temporary Access
Current server: http://38.180.145.215:8080

## Next Steps
1. Choose deployment option (GitHub Pages recommended for simplicity)
2. Deploy landing page
3. Configure DNS at Porkbun
4. Wait 5-10 minutes for DNS propagation
5. Verify at https://solvency.money

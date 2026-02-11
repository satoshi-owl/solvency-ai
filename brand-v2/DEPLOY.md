# Solvency AI - Deployment Guide

## Quick Deploy Options

### Option 1: GitHub Pages (Recommended - Free & Fast)

**Steps:**

1. **Create GitHub repo** (if not exists):
```bash
cd /root/.openclaw/workspace/solvency-ai
git init
git add .
git commit -m "Initial commit: Solvency AI brand v2"
gh repo create solvency-ai/website --public --source=. --remote=origin
git push -u origin main
```

2. **Enable GitHub Pages:**
```bash
# Via GitHub CLI
gh repo edit --enable-pages --pages-branch main --pages-path /brand-v2

# OR manually:
# Go to repo Settings → Pages
# Source: main branch, /brand-v2 folder
# Save
```

3. **Configure custom domain** (solvency.money):
```bash
# Add CNAME file
echo "solvency.money" > brand-v2/CNAME
git add brand-v2/CNAME
git commit -m "Add custom domain"
git push
```

4. **Update Porkbun DNS:**
```bash
# Run the DNS setup script
cd brand-v2
chmod +x setup-dns-porkbun.sh
./setup-dns-porkbun.sh
```

**Result:** Site live at https://solvency.money within 5-10 minutes

---

### Option 2: Cloudflare Pages (Fast, Free CDN)

**Steps:**

1. **Push to GitHub** (same as Option 1, step 1)

2. **Deploy via Cloudflare:**
```bash
# Install Wrangler
npm install -g wrangler

# Login
wrangler login

# Deploy
cd /root/.openclaw/workspace/solvency-ai/brand-v2
wrangler pages deploy . --project-name=solvency-ai
```

3. **Configure domain:**
- Go to Cloudflare dashboard
- Pages → solvency-ai → Custom domains
- Add: solvency.money
- Auto DNS configuration (if domain on Cloudflare)

**Result:** Site live at https://solvency-ai.pages.dev + custom domain

---

### Option 3: Vercel (One Command Deploy)

**Steps:**

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
cd /root/.openclaw/workspace/solvency-ai/brand-v2
vercel --prod

# Follow prompts:
# - Link to existing project? No
# - Project name: solvency-ai
# - Directory: . (current)
# - Build command: (leave empty)
# - Output directory: . (current)

# Add custom domain
vercel domains add solvency.money
```

**Result:** Site live at https://solvency-ai.vercel.app + custom domain

---

### Option 4: Netlify Drop (Drag & Drop)

**Steps:**

1. **Create deployment package:**
```bash
cd /root/.openclaw/workspace/solvency-ai/brand-v2
zip -r solvency-ai-website.zip . -x "*.git*" "*.md" "generate_assets.py"
```

2. **Manual deploy:**
- Go to https://app.netlify.com/drop
- Drag `solvency-ai-website.zip` onto page
- Wait for deploy (~30 seconds)

3. **Configure domain:**
- Site settings → Domain management
- Add custom domain: solvency.money
- Follow DNS instructions for Porkbun

**Result:** Site live at https://[random-name].netlify.app + custom domain

---

## Porkbun DNS Configuration

### Automated Setup

```bash
cd /root/.openclaw/workspace/solvency-ai/brand-v2

# Create .env file with Porkbun credentials
cat > .env.porkbun <<EOF
PORKBUN_API_KEY=your_api_key_here
PORKBUN_SECRET_KEY=your_secret_key_here
DOMAIN=solvency.money
EOF

# Run setup script
./setup-dns-porkbun.sh
```

### Manual Setup

**For GitHub Pages:**
```
Type: A
Host: @
Answer: 185.199.108.153
         185.199.109.153
         185.199.110.153
         185.199.111.153
TTL: 600

Type: CNAME
Host: www
Answer: solvency-ai.github.io
TTL: 600
```

**For Cloudflare Pages:**
```
Type: CNAME
Host: @
Answer: solvency-ai.pages.dev
TTL: Auto (or 600)
Proxy: Yes (orange cloud)
```

**For Vercel:**
```
Type: CNAME
Host: @
Answer: cname.vercel-dns.com
TTL: 600
```

---

## Pre-Deploy Checklist

Before deploying:

- [ ] All assets generated (logo, Twitter images)
- [ ] Links updated in `index.html`:
  - [ ] GitHub repo URL (https://github.com/solvency-ai/contracts)
  - [ ] Docs URL (https://docs.solvency.money or fallback)
  - [ ] Colosseum link (https://www.colosseum.org)
  - [ ] Twitter handle (https://twitter.com/solvency_ai)
- [ ] Meta tags correct:
  - [ ] Title
  - [ ] Description
  - [ ] og:image (for social sharing)
- [ ] Favicon linked (assets/logo.svg or logo-128.png)
- [ ] Mobile responsive tested (Chrome DevTools)
- [ ] Animations smooth (60fps, test on mid-range device)
- [ ] No console errors
- [ ] Analytics setup (optional - Google Analytics, Plausible, or Fathom)

---

## Post-Deploy Tasks

After site is live:

### 1. Test Deployment

```bash
# Check DNS propagation
dig solvency.money

# Check HTTPS
curl -I https://solvency.money

# Test on multiple devices
# - Desktop (Chrome, Firefox, Safari)
# - Mobile (iOS Safari, Android Chrome)
# - Check Twitter card preview
```

### 2. Twitter Card Validation

```bash
# Visit Twitter Card Validator
open https://cards-dev.twitter.com/validator

# Enter: https://solvency.money
# Verify:
# - Title shows correctly
# - Description accurate
# - Image displays (if og:image set)
```

### 3. Submit to Search Engines

```bash
# Google Search Console
# - Add property: solvency.money
# - Verify via DNS TXT record (Porkbun)
# - Submit sitemap (optional)

# Bing Webmaster Tools
# - Similar process
```

### 4. Monitor Performance

```bash
# PageSpeed Insights
open https://pagespeed.web.dev/analysis?url=https://solvency.money

# Target scores:
# - Performance: 90+
# - Accessibility: 95+
# - Best Practices: 95+
# - SEO: 100
```

---

## Troubleshooting

### Domain not resolving

**Issue:** `solvency.money` shows "Site not found"

**Solutions:**
1. Check DNS propagation: https://dnschecker.org
2. Wait 24-48 hours for full propagation
3. Verify CNAME/A records in Porkbun dashboard
4. Clear local DNS cache: `sudo dscacheutil -flushcache` (macOS)

### HTTPS not working

**Issue:** `https://solvency.money` shows certificate error

**Solutions:**
1. GitHub Pages: Wait 10-15 minutes after adding custom domain
2. Enable "Enforce HTTPS" in repo settings
3. Cloudflare: Ensure SSL/TLS mode is "Full" or "Flexible"
4. Vercel: Auto-provisions, wait 5 minutes

### CSS/JS not loading

**Issue:** Page loads but no styles

**Solutions:**
1. Check browser console for errors
2. Verify all paths relative (not absolute)
3. Check CORS headers (should auto-work with static hosts)
4. Hard refresh: Cmd+Shift+R (Mac) or Ctrl+Shift+R (Windows)

### Mobile layout broken

**Issue:** Site looks bad on phone

**Solutions:**
1. Check viewport meta tag exists: `<meta name="viewport"...>`
2. Test responsive breakpoints (768px, 375px)
3. Verify media queries in CSS
4. Use Chrome DevTools mobile emulation

---

## Performance Optimization

### Before deploying:

```bash
# Minify HTML/CSS (optional)
cd /root/.openclaw/workspace/solvency-ai/brand-v2

# Install minifier
npm install -g html-minifier clean-css-cli

# Minify
html-minifier --collapse-whitespace --remove-comments index.html -o index.min.html

# Use minified version or keep readable (deploy platforms often auto-minify)
```

### Image optimization:

```bash
# If you have PNG assets, compress them
# Install pngcrush or similar
apt-get install pngcrush

# Compress all PNGs
pngcrush -brute assets/*.png assets-optimized/

# Or use online tools:
# - TinyPNG.com
# - Squoosh.app
# - ImageOptim (macOS)
```

### CDN considerations:

- GitHub Pages: Auto CDN via Fastly
- Cloudflare Pages: Global CDN included
- Vercel: Global edge network
- Netlify: Global CDN with smart routing

All options provide excellent performance. Choose based on preference.

---

## Backup & Version Control

### Git workflow:

```bash
# Always work on branch
git checkout -b feature/update-hero
# Make changes
git add .
git commit -m "Update hero section copy"
git push origin feature/update-hero

# Merge to main
git checkout main
git merge feature/update-hero
git push origin main

# Auto-deploys on push to main (all platforms)
```

### Rollback if needed:

```bash
# View history
git log --oneline

# Revert to previous version
git revert <commit-hash>
git push

# Or hard reset (dangerous!)
git reset --hard <commit-hash>
git push --force
```

---

## Analytics Setup (Optional)

### Plausible (Privacy-friendly):

```html
<!-- Add before </head> in index.html -->
<script defer data-domain="solvency.money" src="https://plausible.io/js/script.js"></script>
```

### Fathom (Simple):

```html
<script src="https://cdn.usefathom.com/script.js" data-site="YOUR_SITE_ID" defer></script>
```

### Google Analytics (Full-featured):

```html
<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

---

## Recommended: GitHub Pages

**Why:**
- Free
- Fast global CDN
- Auto-deploys on push
- HTTPS included
- Custom domain support
- No signup/credit card (uses existing GitHub)
- Version control built-in

**Deployment time:** < 10 minutes

**Final command sequence:**

```bash
cd /root/.openclaw/workspace/solvency-ai
git add brand-v2
git commit -m "Launch Solvency AI brand v2"
git push origin main

# Enable GitHub Pages (via web UI or CLI)
gh repo edit --enable-pages --pages-branch main --pages-path /brand-v2

# Add custom domain
echo "solvency.money" > brand-v2/CNAME
git add brand-v2/CNAME
git commit -m "Add custom domain"
git push

# Configure DNS at Porkbun (see manual setup above)
```

**Done.** Site live at https://solvency.money

---

**Status:** Ready to deploy
**Estimated time:** 10-30 minutes (depending on DNS propagation)
**Cost:** $0 (all free tier options)

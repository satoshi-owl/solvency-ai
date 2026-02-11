# 🚀 Next Steps - Ship Brand V2

**Quick checklist to go live. Estimated time: 30 minutes.**

---

## ⚡ Quick Start (TL;DR)

```bash
# 1. Generate PNGs (if you have Pillow)
cd /root/.openclaw/workspace/solvency-ai/brand-v2
python3 generate_assets.py

# 2. Preview landing page
open index.html  # Or just double-click in file browser

# 3. Deploy to GitHub Pages
cd /root/.openclaw/workspace/solvency-ai
git add brand-v2
git commit -m "Launch brand v2"
git push origin main
# Then enable Pages in repo settings

# 4. Upload Twitter assets
# Use assets/twitter-profile-400x400.png
# Use assets/twitter-banner-1500x500.png
```

**Done!** 🎉

---

## 📋 Detailed Checklist

### Step 1: Generate Assets (5 min)

**Option A: Python Script**
```bash
cd /root/.openclaw/workspace/solvency-ai/brand-v2

# Install Pillow if needed
pip3 install Pillow

# Run generator
python3 generate_assets.py

# Verify output
ls -lh assets/
# Should see: twitter-profile-400x400.png, twitter-banner-1500x500.png, logo-*.png
```

**Option B: Browser Method**
```bash
# Open the HTML generator
open generate-twitter-assets.html

# In browser:
# 1. Click "Download Profile Pic" button
# 2. Click "Download Banner" button
# 3. Move files to assets/ folder
```

**Option C: Manual Creation**
```
1. Open ASSET-SPECIFICATIONS.md
2. Follow the visual mockups
3. Create in Figma/Canva/Photoshop
4. Export as PNG at specified sizes
5. Save to assets/ folder
```

**Verify:**
- [ ] `assets/twitter-profile-400x400.png` exists
- [ ] `assets/twitter-banner-1500x500.png` exists
- [ ] `assets/logo-400.png` exists (for favicon)

---

### Step 2: Preview & Review (10 min)

**Open landing page:**
```bash
# From brand-v2 folder
open index.html

# Or start local server
python3 -m http.server 8000
# Visit http://localhost:8000
```

**Check:**
- [ ] Logo displays (owl eyes visible?)
- [ ] Colors look premium (purple + gold, not blue?)
- [ ] Calculator works (type in input, numbers update?)
- [ ] Animations smooth (scroll, hover buttons?)
- [ ] Mobile responsive (resize browser to 375px width)
- [ ] All links valid (GitHub, Colosseum)

**Test on phone (optional):**
- Send yourself the localhost URL (or deploy to test server)
- Check mobile layout
- Verify touch targets are big enough

**If changes needed:**
- Edit `index.html` directly (CSS is inline)
- Colors: Search for hex codes, replace
- Copy: Update text in HTML
- Layout: Modify CSS in `<style>` section

---

### Step 3: Deploy Landing Page (10 min)

**Recommended: GitHub Pages**

```bash
# Navigate to repo root
cd /root/.openclaw/workspace/solvency-ai

# Stage all brand-v2 files
git add brand-v2/

# Commit
git commit -m "Launch Solvency AI brand v2 - premium redesign"

# Push
git push origin main

# Enable GitHub Pages (via web UI)
# 1. Go to repo on GitHub
# 2. Settings → Pages
# 3. Source: main branch
# 4. Folder: /brand-v2
# 5. Save

# OR use GitHub CLI
gh repo edit --enable-pages --pages-branch main --pages-path /brand-v2
```

**Add custom domain (solvency.money):**
```bash
# Create CNAME file
echo "solvency.money" > brand-v2/CNAME

# Commit and push
git add brand-v2/CNAME
git commit -m "Add custom domain"
git push
```

**Configure DNS:**
```bash
# Option A: Automated (if you have Porkbun API keys)
cd brand-v2
./setup-dns-porkbun.sh

# Option B: Manual
# See DEPLOY.md for exact DNS records
# Add A records: 185.199.108-111.153
# Add CNAME: www → solvency-ai.github.io
```

**Verify deployment:**
```bash
# Wait 5-10 minutes, then visit
open https://[your-username].github.io/solvency-ai/brand-v2

# With custom domain (after DNS propagates):
open https://solvency.money
```

**Checklist:**
- [ ] Site loads at GitHub Pages URL
- [ ] HTTPS works (green padlock)
- [ ] Custom domain configured (if using)
- [ ] DNS propagated (check dnschecker.org)
- [ ] Mobile works (test on phone)

---

### Step 4: Setup Twitter (5 min)

**Upload profile picture:**
1. Go to Twitter → Profile → Edit Profile
2. Click profile photo
3. Upload `assets/twitter-profile-400x400.png`
4. Adjust positioning (center the owl eyes)
5. Save

**Upload banner:**
1. Click header image
2. Upload `assets/twitter-banner-1500x500.png`
3. Position (ensure text is visible, not cut off)
4. Save

**Update bio:**
```
# Open TWITTER-BIO.txt
# Copy recommended version (or choose alternative)

Recommended:
Yield-bearing stablecoin for self-funding AI agents. 8-10% APY on Solana. Your bots shouldn't need your credit card. @Colosseum_org

# Paste into Twitter bio
# Save
```

**Verify:**
- [ ] Profile pic visible (owl eyes clear?)
- [ ] Banner displays properly (text not cut off?)
- [ ] Bio under 160 characters
- [ ] Bio mentions @Colosseum_org (for hackathon)

**Test Twitter card:**
```bash
# Visit Twitter Card Validator
open https://cards-dev.twitter.com/validator

# Enter site URL
# Check: Title, description, image all correct
```

---

### Step 5: Launch Tweet (2 min)

**Suggested tweet:**

```
We're launching at @Colosseum_org's agent hackathon 🦉

Solvency AI: yield-bearing stablecoin for self-funding agents.

Your bot woke you up at 3am for API credits. Never again.

8-10% APY on Solana → auto-funding bots.

https://solvency.money

#Solana #AI #DeFi
```

**Or simpler:**

```
Your bot shouldn't need your credit card to stay alive.

Solvency AI generates 8-10% APY. Bots convert yield to API credits.

Built for @Colosseum_org agent hackathon 🦉

https://solvency.money
```

**Checklist:**
- [ ] Tweet includes link to landing page
- [ ] Mentions @Colosseum_org
- [ ] Uses 🦉 emoji (brand signature)
- [ ] Explains value prop (yield → API credits)
- [ ] Pin the tweet to profile

---

## 🎯 Post-Launch Tasks

**After site is live:**

### Monitor Performance
```bash
# Check PageSpeed Insights
open https://pagespeed.web.dev/analysis?url=https://solvency.money

# Target scores:
# Performance: 90+
# Accessibility: 95+
# Best Practices: 95+
# SEO: 100
```

### Fix Issues (if any)
- Performance < 90? Compress images, inline critical CSS
- Accessibility < 95? Check color contrast, add aria labels
- Mobile issues? Test on real devices, fix media queries

### Analytics (Optional)
```html
<!-- Add to index.html before </head> -->
<script defer data-domain="solvency.money" src="https://plausible.io/js/script.js"></script>
```

### Social Proof
- [ ] Screenshot site, tweet it
- [ ] Add to Colosseum submission
- [ ] Share in Discord/Telegram
- [ ] Add to GitHub README

---

## 🐛 Troubleshooting

### PNG Generation Fails

**Error:** `ModuleNotFoundError: No module named 'PIL'`

**Fix:**
```bash
# Try installing Pillow
pip3 install Pillow

# If that fails, use browser method
open generate-twitter-assets.html

# Or create manually in Figma/Canva
# See ASSET-SPECIFICATIONS.md for specs
```

### Landing Page Doesn't Look Right

**Check:**
1. Opening in modern browser? (Chrome 90+, Firefox 88+)
2. JavaScript enabled?
3. Any console errors? (F12 → Console)

**Common fixes:**
- Hard refresh: Cmd+Shift+R (Mac) or Ctrl+Shift+R (Windows)
- Clear cache
- Try different browser

### Domain Not Resolving

**Issue:** solvency.money shows "not found"

**Check:**
1. DNS records correct? (see DEPLOY.md)
2. Wait 24-48h for full propagation
3. Test with `dig solvency.money`
4. Check dnschecker.org

**Quick fix:**
Use GitHub Pages URL instead:
`https://[username].github.io/solvency-ai/brand-v2`

### Twitter Images Look Bad

**Check:**
1. Correct dimensions? (400x400, 1500x500)
2. File size reasonable? (< 5MB)
3. Format PNG (not JPEG)?

**Fix:**
- Re-export at higher quality
- Use PNG not JPEG (avoids compression)
- Follow exact specs in ASSET-SPECIFICATIONS.md

---

## ✅ Final Checklist

**Before announcing launch:**

### Assets
- [ ] Logo SVG exists (`assets/logo.svg`)
- [ ] Twitter profile pic generated
- [ ] Twitter banner generated
- [ ] Favicon linked in HTML

### Landing Page
- [ ] Deployed and live
- [ ] HTTPS working
- [ ] Mobile responsive
- [ ] All links valid
- [ ] Calculator functional
- [ ] Animations smooth

### Twitter
- [ ] Profile pic uploaded
- [ ] Banner uploaded
- [ ] Bio updated
- [ ] Twitter card tested

### Documentation
- [ ] README.md reviewed
- [ ] BRAND-GUIDE-V2.md accessible
- [ ] DEPLOY.md has correct URLs

### Hackathon
- [ ] Link added to Colosseum submission
- [ ] GitHub repo public
- [ ] Tweet mentions @Colosseum_org

---

## 🎉 You're Done!

**Congratulations!** You've launched a premium brand identity.

**What you shipped:**
- ✅ Unique logo (owl eyes)
- ✅ Distinctive colors (purple + gold)
- ✅ Premium landing page (glassmorphism)
- ✅ Professional Twitter presence
- ✅ Complete documentation

**Next:**
- Focus on hackathon submission
- Build the actual product
- Iterate on brand as needed

**The owl watches your yield. Your bots fund themselves.** 🦉💰

---

**Questions?** See DELIVERY-SUMMARY.md or DEPLOY.md
**Issues?** Check troubleshooting section above
**Updates?** Edit files in brand-v2/ and push

**Ship it!** 🚀

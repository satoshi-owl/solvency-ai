# Solvency AI - Brand Assets Package

**Status:** ✅ Complete and ready for deployment  
**Timeline:** Created for Colosseum Agent Hackathon (Feb 2026)  
**Live Preview:** http://38.180.145.215:8080

---

## 📦 Package Contents

### 1. Logo Assets
- `logo.svg` - Vector logo (scalable, preferred for web)
- `logo-512.png` - High resolution (6.6 KB)
- `logo-400.png` - Twitter profile size (5.3 KB)
- `logo-128.png` - Favicons and small UI (1.7 KB)
- `logo-32.png` - Minimum size test (595 B)

**Design:** Geometric "S" shape suggesting flow, circuits, and stability. Electric blue to cyan gradient. Works perfectly at 32x32px.

### 2. Twitter Assets
- `twitter-profile.png` - 400x400 profile picture (5.3 KB)
- `twitter-banner.png` - 1500x500 banner (63 KB)
- `twitter-bio.txt` - Bio text (154 chars)

**Bio:**
> Yield-bearing stablecoin for self-funding AI agents. 8-10% APY on Solana. Your bots shouldn't need your credit card to stay alive. Built at @Colosseum_org

### 3. Landing Page
- `index.html` - Single-page site (10 KB, self-contained, no external deps)
- Fully responsive, dark mode native
- Sections: Hero, Stats, How It Works, Technical Overview, CTA
- Fast loading, mobile optimized

### 4. Brand Guidelines
- `BRAND-GUIDE.md` - Complete brand identity doc
  - Color palette
  - Logo usage rules
  - Voice & tone guidelines
  - Typography specs
  - Usage examples
  - Brand checklist

### 5. Deployment Guide
- `DEPLOY.md` - Step-by-step deployment instructions
  - GitHub Pages (recommended)
  - Cloudflare Pages
  - Vercel
  - Netlify
  - Self-hosted options
  - Porkbun DNS configuration

---

## 🎨 Brand Identity Summary

### Color Palette
```
Electric Blue:  #0EA5E9  (Primary)
Cyan:          #06B6D4  (Accent)
Deep Navy:     #0F172A  (Background)
Slate:         #1E293B  (Cards)
Light Slate:   #CBD5E1  (Text)
White:         #F8FAFC  (Primary text)
```

### Brand Voice
**Infrastructure swagger with casual precision**

- Problem-first (your bot ran out of credits) → solution (self-funding)
- Technical but conversational ("8-10% APY" not jargon)
- Like a sharp engineer at a hackathon afterparty
- NOT press release, NOT VC pitch, NOT meme coin

### Design Constraints Met
✅ No generic AI brain/glowing imagery  
✅ Minimal - substance over flash  
✅ Dark mode optimized (crypto Twitter aesthetic)  
✅ Logo recognizable at 32x32px  
✅ Fast loading (<3 seconds)  
✅ Mobile responsive  

---

## 🚀 Quick Deployment

### Option 1: GitHub Pages (Fastest for Hackathon)
```bash
# Create new repo
gh repo create solvency-landing --public --source=. --remote=origin

# Copy brand files
cp /root/.openclaw/workspace/solvency-ai/brand/* .

# Push and enable Pages
git add .
git commit -m "Initial brand deployment"
git push -u origin main

# Enable Pages in repo settings → Pages → Source: main branch / root
```

### Option 2: Currently Running
- Web server active on port 8080
- Access: http://38.180.145.215:8080
- For production: Set up nginx/caddy on port 80 with SSL

---

## 📊 Deliverables Checklist

### Logo ✅
- [x] SVG (vector, scalable)
- [x] PNG exports (512px, 400px, 128px, 32px)
- [x] Modern, tech-forward design
- [x] Works at small sizes
- [x] Color palette defined
- [x] Vibe: DeFi meets AI ✓

### Twitter Assets ✅
- [x] Profile picture (400x400)
- [x] Banner image (1500x500)
- [x] Bio text (160 chars max)
- [x] Dark mode aesthetic
- [x] Brand voice applied

### Landing Page ✅
- [x] Single page, clean, fast
- [x] Hero section with value prop
- [x] Technical overview
- [x] GitHub link + Colosseum CTA
- [x] Deployment guide (Porkbun ready)
- [x] Can host via GitHub Pages/Cloudflare/this server
- [x] Mobile responsive
- [x] Dark mode native

### Brand Voice ✅
- [x] Read solvency-brand-voice.md ✓
- [x] Applied to all copy ✓
- [x] Consistent tone throughout ✓

---

## 🎯 Key Messaging

**Elevator Pitch (30 sec):**
> Your bot ran out of API credits at 3am. What if it just... funded itself? Solvency AI is a Solana stablecoin generating 8-10% APY through DeFi strategies. Bots convert yield to API credits. No human credit card required. Infrastructure for the agent economy.

**Twitter Thread Starter:**
> AI agents keep hitting API rate limits because they can't pay for themselves.
> 
> We built a stablecoin that generates yield. Bots just convert that yield into API credits.
> 
> Self-funding bots. No human credit card required.
> 
> Thread 🧵

**Problem → Solution:**
- **Problem:** AI agents need constant human credit card top-ups for API access
- **Solution:** Yield-bearing stablecoin (8-10% APY) that converts to operational resources
- **Result:** Fully autonomous, self-funding agents

---

## 📁 File Structure

```
/root/.openclaw/workspace/solvency-ai/brand/
├── README.md              ← You are here
├── BRAND-GUIDE.md         ← Comprehensive brand guidelines
├── DEPLOY.md              ← Deployment instructions
├── index.html             ← Landing page (ready to deploy)
├── logo.svg               ← Vector logo
├── logo-512.png           ← High-res logo
├── logo-400.png           ← Twitter size
├── logo-128.png           ← Small UI
├── logo-32.png            ← Minimum size
├── twitter-profile.png    ← 400x400 profile pic
├── twitter-banner.png     ← 1500x500 banner
├── twitter-bio.txt        ← Bio text
└── setup-dns.sh           ← DNS configuration script
```

---

## 🔗 Next Steps

1. **Deploy Landing Page**
   - Choose deployment option (GitHub Pages recommended)
   - Follow `DEPLOY.md` instructions
   - Configure `solvency.money` DNS at Porkbun

2. **Set Up Twitter**
   - Upload `twitter-profile.png` as profile picture
   - Upload `twitter-banner.png` as banner
   - Copy bio from `twitter-bio.txt`
   - Pin tweet with hackathon announcement

3. **Launch Announcement**
   - Tweet thread introducing Solvency AI
   - Tag @Colosseum_org
   - Link to landing page and GitHub
   - Share hackathon submission

4. **Community Building**
   - Engage with Solana devs
   - Share technical updates
   - Demonstrate yield generation
   - Gather feedback for v2

---

## 🛠️ Technical Stack Used

- **Logo:** Hand-coded SVG with gradient
- **Image Processing:** rsvg-convert for PNG exports
- **Web:** Pure HTML/CSS (no frameworks, fast loading)
- **Deployment:** Python http.server (dev), GitHub Pages/Cloudflare (production)
- **DNS:** Porkbun API configuration

---

## 🦉 Built By

**Hoot** - OpenClaw Subagent  
**Date:** 2026-02-11  
**Duration:** ~2 hours  
**Context:** Colosseum Agent Hackathon  
**Mission:** Create complete brand identity for Solvency AI

---

## 📞 Support

- **GitHub:** https://github.com/hootinandtootin/solvency-ai
- **Twitter:** @solvencyai (pending setup)
- **Landing Page:** http://38.180.145.215:8080 (temp) → solvency.money (production)

---

**Status: READY FOR LAUNCH** 🚀

All deliverables complete. Landing page live on dev server. Ready for DNS configuration and social media launch.

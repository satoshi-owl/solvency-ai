# DNS Setup for solvency.money

## Server Details
- **Server IP:** 38.180.145.215
- **Domain:** solvency.money (purchased via Porkbun)
- **Web Server:** Nginx (configured and running)
- **Site Location:** `/root/.openclaw/workspace/solvency-ai/brand-v3/`

## Status
✅ **Site is live on server** - Ready for DNS pointing
✅ **Nginx configured** - Serving on port 80
✅ **Enhanced landing page deployed** - Maple Finance structure + Solvency brand

## Manual DNS Setup Required

The Porkbun API returned an error:
```
"Domain is not opted in to API access."
```

**To enable API access (optional for future automation):**
1. Log in to Porkbun.com
2. Go to domain management for solvency.money
3. Enable "API Access" in domain settings

**To point DNS manually (required now):**
1. Log in to Porkbun.com
2. Go to solvency.money → DNS Settings
3. Add/update these records:

### DNS Records
```
Type: A
Host: @
Answer: 38.180.145.215
TTL: 300 (or default)

Type: A
Host: www
Answer: 38.180.145.215
TTL: 300 (or default)
```

## Verification

Once DNS is pointed, test with:
```bash
curl -I http://solvency.money
curl -I http://www.solvency.money
```

DNS propagation typically takes 5-30 minutes, but can take up to 48 hours globally.

## Quick Test (Before DNS)

Test the site now using:
```bash
curl -H "Host: solvency.money" http://38.180.145.215/
```

Or visit in browser:
```
http://38.180.145.215/
```
(Note: This will show the default nginx page without the Host header)

## HTTPS Setup (Next Step)

After DNS is pointing, set up Let's Encrypt SSL:
```bash
apt-get install -y certbot python3-certbot-nginx
certbot --nginx -d solvency.money -d www.solvency.money
```

This will:
- Obtain SSL certificate from Let's Encrypt
- Auto-configure nginx for HTTPS
- Set up auto-renewal

## Site Preview

**Current preview locations:**
- Enhanced version: http://38.180.145.215:8083/index-v2.html (with Host: solvency.money)
- Production ready: Configured to serve on http://solvency.money once DNS points

## What Changed

Enhanced the landing page with Maple Finance's superior structure:
- ✨ Animated stat bars with better visual hierarchy
- 🏢 Trust/partners section (Solana, Kamino, Marginfi, Helius, AgentWallet)
- 💎 Glassmorphic product card for solvUSD token
- 📝 Contact form with email subscription
- 💬 Testimonial section
- 🎨 Enhanced card hover effects and animations
- 📱 Better mobile responsiveness
- 🔒 Security headers in nginx config
- ⚡ Gzip compression enabled

Maintains the institutional navy/gold aesthetic while adding engagement features that convert visitors.

## Next Actions

1. **Point DNS** (5 min) - Log in to Porkbun, add A records
2. **Wait for propagation** (5-30 min) - DNS spreads globally
3. **Enable HTTPS** (5 min) - Run certbot command above
4. **Manual Twitter posting** (30 min) - Post first 5 tweets with link to live site
5. **Update submission form** (15 min) - Add live site URL

---

**Timeline:** DNS + HTTPS = ~45 minutes, then ready for marketing push.

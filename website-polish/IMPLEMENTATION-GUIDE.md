# Implementation Guide - Apply Fixes to Remaining Pages

**Goal:** Apply the same fixes from index.html to the other 3 pages  
**Time:** 1-2 hours  
**Skill Level:** Basic HTML knowledge required

---

## 🔧 What Needs To Be Fixed

### **Global Find & Replace (All Pages)**

Use your code editor's find & replace function:

1. **Brand Name:**
   - Find: `SolvencyAI` (no space)
   - Replace: `Solvency AI` (with space)
   - Files: All HTML

2. **Navigation:**
   - Find: `<a href="/for-agents.html">For Developers</a>` or just `For Developers` in nav
   - Replace: `<a href="/for-agents.html">For Agents</a>` → `For Agents`
   - Files: All HTML

3. **Footer Emoji:**
   - Find: `Built with 💛 for`
   - Replace: `Built for`
   - Files: All HTML

4. **Mobile Menu Icon:**
   - Find: `<button class="mobile-menu-toggle" aria-label="Toggle mobile menu">☰</button>`
   - Replace: See index.html for SVG hamburger icon
   - Files: All HTML

---

## 🔴 Page-Specific Fixes

### **for-agents.html**

#### 1. Remove ALL Emojis (28 instances)
Replace with SVG icons. Pattern from index.html:

**Before:**
```html
<span class="feature-icon">❌</span>
```

**After:**
```html
<span class="feature-icon">
  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
    <circle cx="12" cy="12" r="10"></circle>
    <line x1="15" y1="9" x2="9" y2="15"></line>
    <line x1="9" y1="9" x2="15" y2="15"></line>
  </svg>
</span>
```

**Emoji → SVG Mapping for for-agents.html:**
- ❌ (X) → Circle with X lines (see above)
- ✅ (Checkmark) → Circle with checkmark path
- 🤖 → Robot icon or gear
- 💵 → Dollar sign line
- 📈 → Trending up polyline
- ⚙️ → Settings/gear
- 🔔 → Bell
- 📊 → Bar chart

#### 2. Fix Bug Bounty Claim

**Find:**
```html
<div class="feature-card animate-on-scroll" style="background: var(--white); text-align: center; padding: 3rem;">
  <h3 style="font-size: 2rem; color: var(--navy-dark); margin-bottom: 1rem;">Free</h3>
  <!-- ... -->
  <p style="margin-bottom: 1rem;">✅ Community support</p>
</div>

<div style="margin-top: 2rem; padding-top: 2rem; border-top: 2px solid var(--gray-light);">
  <p style="font-size: 0.9rem; color: var(--gray);">
    <strong>How we make money:</strong> Small spread on solvUSD yield (you keep 95-98% of yield). Open source and audited.
  </p>
</div>
```

**DO NOT mention "$50K bug bounty" in pricing section.**

#### 3. Update Title & Meta Description

**Replace:**
```html
<title>For Agents - SolvencyAI Developer Integration</title>
<meta name="description" content="Integrate SolvencyAI into your autonomous agents...">
```

**With:**
```html
<title>Solvency AI For Agents: Never Run Out of API Credits | 3-Line Integration</title>
<meta name="description" content="Integrate autonomous treasury management in 3 lines of code. solvUSD earns yield while your agents run 24/7. OpenAI, Anthropic, Replicate supported.">
<link rel="canonical" href="https://solvency.money/for-agents.html" />
```

---

### **for-humans.html**

#### 1. Remove ALL Emojis (35 instances)

**Most common emojis to replace:**
- 💵 → Dollar line SVG
- 📈 → Chart up SVG
- 💰 → Money bag → generic dollar icon
- 🔓 → Open lock SVG
- 🌊 → Wave → use "liquidity" icon (water drop or flow)
- 🔍 → Magnifying glass SVG
- 🛡️ → Shield SVG
- 💸 → Money with wings → just use dollar
- 📱 → Smartphone SVG

#### 2. Add Disclaimer to Yield Calculator

**Find:**
```html
<div style="text-align: center; margin-top: 3rem;">
  <h3 style="color: var(--navy-dark); margin-bottom: 1.5rem;">What could you earn?</h3>
  <!-- ... -->
</div>
```

**Add AFTER the calculator:**
```html
<p style="margin-top: 2rem; color: var(--gray); font-size: 0.9rem; text-align: center;">
  <strong>Disclaimer:</strong> Calculations based on current 7.2% APY. Past performance does not guarantee future results. Actual yield varies with market conditions. See <a href="/risks.html" style="color: var(--gold);">risk disclosure</a>.
</p>
```

#### 3. Update Meta Tags

```html
<title>Earn 6-9% APY on USDC | solvUSD Yield Stablecoin by Solvency AI</title>
<meta name="description" content="Earn 6-9% on your USDC with solvUSD. No lock-ups, withdraw anytime. Non-custodial DeFi yield backed by Kamino and Marginfi protocols.">
<link rel="canonical" href="https://solvency.money/for-humans.html" />
```

---

### **security.html**

#### 1. Remove ALL Emojis (33 instances)

**Critical replacements:**
- ✅ → Checkmark circle SVG
- ⏳ → Clock/hourglass SVG
- 🐛 → Bug icon or code brackets
- 📖 → Book/document SVG
- 🚨 → Alert/bell SVG
- ⚠️ → Warning triangle SVG
- 🔐 → Locked padlock SVG
- 🔍 → Magnifying glass SVG

#### 2. **CRITICAL: Fix Bug Bounty Section**

**Find the ENTIRE section:**
```html
<div class="feature-card animate-on-scroll">
  <span class="feature-icon">🐛</span>
  <h3 class="feature-title">Bug Bounty Program</h3>
  <p class="feature-description">
    Active bug bounty program with rewards up to $50,000 for critical vulnerabilities.
  </p>
  <div style="margin-top: 1rem;">
    <strong style="color: var(--navy-dark);">Rewards:</strong><br>
    Critical: $25K-$50K<br>
    High: $10K-$25K<br>
    Medium: $2K-$10K<br>
    <a href="https://github.com/solvency-ai/security/blob/main/BUG_BOUNTY.md" target="_blank" style="color: var(--gold); font-size: 0.9rem;">Submit report →</a>
  </div>
</div>
```

**Replace WITH:**
```html
<div class="feature-card animate-on-scroll">
  <span class="feature-icon">
    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
    </svg>
  </span>
  <h3 class="feature-title">Security Researchers Welcome</h3>
  <p class="feature-description">
    Found a vulnerability? We want to hear from you. Responsible disclosure welcome.
  </p>
  <div style="margin-top: 1rem;">
    <strong style="color: var(--navy-dark);">Contact:</strong><br>
    Email: security@solvency.ai<br>
    <a href="https://github.com/solvency-ai/security" target="_blank" style="color: var(--gold); font-size: 0.9rem;">View security policy →</a><br>
    <p style="margin-top: 0.5rem; font-size: 0.85rem; color: var(--gray);">
      Bug bounty program launching Q2 2025
    </p>
  </div>
</div>
```

#### 3. Update Meta Tags

```html
<title>Solvency AI Security: Audits, Risk Disclosure & Non-Custodial Design</title>
<meta name="description" content="Transparent security. Smart contract audits planned Q1 2025, non-custodial design, battle-tested protocols. Full risk disclosure for solvUSD.">
<link rel="canonical" href="https://solvency.money/security.html" />
```

#### 4. Fix Security Status Item

**Find:**
```html
<div class="security-item planned animate-on-scroll">
  <span class="security-icon">⏳</span>
  <h4 class="security-item-title">Formal Audits</h4>
  <p class="security-item-status">Q1 2025 - In progress</p>
</div>

<div class="security-item verified animate-on-scroll">
  <span class="security-icon">✅</span>
  <h4 class="security-item-title">Security Review</h4>
  <p class="security-item-status">Up to $50K for critical bugs</p>
</div>
```

**Replace WITH:**
```html
<div class="security-item planned animate-on-scroll">
  <span class="security-icon">
    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <circle cx="12" cy="12" r="10"></circle>
      <polyline points="12 6 12 12 16 14"></polyline>
    </svg>
  </span>
  <h4 class="security-item-title">Formal Audits</h4>
  <p class="security-item-status">Q1 2025 - Scheduled</p>
</div>

<div class="security-item planned animate-on-scroll">
  <span class="security-icon">
    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
    </svg>
  </span>
  <h4 class="security-item-title">Bug Bounty Program</h4>
  <p class="security-item-status">Q2 2025 - Planned</p>
</div>
```

---

## 🎨 CSS Updates (Optional but Recommended)

### **Improve Contrast Ratios**

Add to `/assets/css/main.css`:

```css
/* Improved contrast for dark backgrounds */
.hero p,
.hero-subheadline {
  color: rgba(255, 255, 255, 0.95); /* Was rgba(255, 255, 255, 0.9) */
}

.vision-content p {
  color: rgba(255, 255, 255, 0.95);
}

/* Trust bar icons - ensure visibility */
.trust-icon svg {
  stroke: var(--gold);
  stroke-width: 2;
}

/* Feature icons */
.feature-icon svg {
  stroke: var(--navy-dark);
}

.feature-icon svg {
  stroke: var(--gold);
}

/* Step icons */
.step-icon svg {
  stroke: var(--navy);
}
```

---

## 📋 Testing Checklist

After making changes:

### **Visual Check:**
- [ ] All emojis removed?
- [ ] SVG icons render correctly?
- [ ] Brand name consistent ("Solvency AI" with space)?
- [ ] No broken layouts?

### **Content Check:**
- [ ] Bug bounty claims removed/revised?
- [ ] "For Developers" → "For Agents"?
- [ ] Disclaimers added where needed?

### **Technical Check:**
- [ ] All links work?
- [ ] Mobile menu functions?
- [ ] No console errors?

### **Accessibility Check:**
- [ ] Run WAVE (https://wave.webaim.org/)
- [ ] Run axe DevTools browser extension
- [ ] Keyboard navigation works?
- [ ] Contrast ratios pass WCAG AA?

### **Cross-Browser:**
- [ ] Chrome
- [ ] Safari
- [ ] Firefox
- [ ] Mobile (iOS Safari, Android Chrome)

---

## 🚀 Deployment Steps

### **1. Backup Current Site**
```bash
# Create backup
cp -r /path/to/live/site /path/to/backup/site-$(date +%Y%m%d)
```

### **2. Upload New Files**
Upload via FTP, Git, or your hosting provider's method:
- index.html
- for-agents.html
- for-humans.html
- security.html
- main.css (if updated)

### **3. Clear Cache**
- Clear CDN cache (if using Cloudflare, etc.)
- Clear browser cache (Cmd+Shift+R / Ctrl+Shift+R)

### **4. Test Live Site**
- Visit homepage
- Click through all nav links
- Test on mobile
- Check for any errors

### **5. Submit to Search Engines**
- Google Search Console: Submit sitemap
- Bing Webmaster Tools: Submit sitemap

---

## 💡 Pro Tips

### **Speed Up Emoji Replacement:**

**Use regex find & replace:**

Find: `<span class="[^"]*-icon">[^<]*</span>`  
Review each match, replace with appropriate SVG

**Or use this pattern:**
1. Export HTML to find all unique emojis
2. Create SVG mapping file
3. Use script to batch replace (if comfortable with scripting)

### **SVG Icon Resources:**

**Free:**
- Heroicons: https://heroicons.com/
- Feather Icons: https://feathericons.com/
- Lucide: https://lucide.dev/

**How to use:**
1. Browse icon library
2. Copy SVG code
3. Paste into HTML
4. Adjust width, height, stroke color

### **Before/After Comparison:**

Take screenshots of:
- Old homepage
- New homepage
- Old for-agents page
- New for-agents page

Compare side-by-side to ensure visual consistency.

---

## ⏱️ Time Estimate

**Per Page:**
- Find & replace emojis: 15-20 minutes
- Fix specific content issues: 10-15 minutes
- Update meta tags: 5 minutes
- Test: 10 minutes

**Total:** ~45 minutes per page × 3 pages = **2-2.5 hours**

---

## 🆘 Troubleshooting

### **"SVG icons not showing"**

**Possible causes:**
- Missing viewBox attribute
- Incorrect width/height
- CSS overflow:hidden on parent

**Fix:**
```html
<svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
  <!-- icon path -->
</svg>
```

### **"Layout broken after changes"**

**Likely cause:** Removed a closing tag accidentally

**Fix:** Validate HTML at https://validator.w3.org/

### **"Mobile menu not working"**

**Likely cause:** Changed button structure without updating JS

**Fix:** Check main.js for menu toggle selector, ensure it matches new button

---

## 📞 Need Help?

**Common Issues:**
- See original `-original.html` files for comparison
- Use browser DevTools to inspect elements
- Check console for JavaScript errors

**Resources:**
- HTML Validator: https://validator.w3.org/
- CSS Validator: https://jigsaw.w3.org/css-validator/
- WAVE Accessibility: https://wave.webaim.org/

---

## ✅ Final Checklist Before Launch

- [ ] All 4 HTML files updated
- [ ] CSS contrast fixes applied
- [ ] All emojis removed (127 total)
- [ ] Brand name consistent
- [ ] Bug bounty claims fixed
- [ ] Meta tags optimized
- [ ] Canonical URLs added
- [ ] Tested on 3+ browsers
- [ ] Tested on mobile
- [ ] Accessibility audit passed
- [ ] Backups created
- [ ] Ready to deploy!

---

**You've got this! 🚀**

(Okay, one emoji is allowed in documentation 😄)

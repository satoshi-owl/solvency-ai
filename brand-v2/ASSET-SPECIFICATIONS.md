# Solvency AI Brand V2 - Asset Specifications

## Logo Design

### Concept: "The Watching Owl of Solvency"

**Visual Description:**
- Two overlapping circles representing owl eyes in abstract, geometric form
- Left and right circles positioned to create subtle infinity/stability symbol
- Each circle has a purple gradient stroke (16-20px width)
- Gold pupils in center of each eye (solid circles, #FCD34D)
- Smaller purple inner pupils for depth (#8B5CF6)
- Subtle glow effect around circles (gaussian blur, purple)
- Optional: Curved arcs connecting the circles to suggest continuous flow

**Colors:**
- Primary: Linear gradient from #8B5CF6 (Deep Violet) → #A78BFA (Light Purple) → #FCD34D (Gold)
- Glow: rgba(139, 92, 246, 0.4)
- Background: Transparent or #0F172A (Dark Slate)

**Dimensions:**
- SVG: Scalable (provided at 512x512 viewBox)
- PNG exports needed:
  - 32x32 (favicon)
  - 64x64 (inline icon)
  - 128x128 (small UI elements)
  - 256x256 (medium)
  - 400x400 (Twitter profile)
  - 512x512 (high-res)

**Implementation:**
- See `assets/logo.svg` for vector version
- To generate PNGs: Open logo.svg in browser, screenshot at desired size, or use ImageMagick/Inkscape

```bash
# If you have ImageMagick with SVG support:
convert -background none -density 300 assets/logo.svg -resize 400x400 assets/logo-400.png
convert -background none -density 300 assets/logo.svg -resize 128x128 assets/logo-128.png
# etc.
```

---

## Twitter Profile Picture (400x400)

### Specifications

**Dimensions:** 400x400px
**Format:** PNG with transparency or dark background
**File Size:** < 5MB (aim for < 500KB)

### Design

```
┌─────────────────────────┐
│                         │
│                         │
│      ●─────────●        │  <- Owl eyes (overlapping circles)
│     ╱ ●     ● ╲        │  <- Purple gradient circles
│    │   ●   ●   │       │  <- Gold pupils with purple centers
│     ╲         ╱        │
│      ●─────────●        │
│                         │
│   [Purple glow aura]    │
│                         │
└─────────────────────────┘
```

**Layout:**
- Dark background (#0F172A) with subtle radial gradient
- Logo centered
- Eyes positioned at 37.5% and 62.5% of width (150px, 250px at 400px width)
- Vertical center: 50% (200px)
- Eye radius: 60px
- Pupil radius: 20px (gold), 10px (purple inner)
- Purple glow extending 20-30px beyond circles

**Visual Hierarchy:**
1. Gold pupils (most prominent - first thing you see)
2. Purple circle outlines
3. Background

---

## Twitter Banner (1500x500)

### Specifications

**Dimensions:** 1500x500px
**Format:** PNG or animated GIF (if bandwidth allows)
**File Size:** PNG < 5MB, GIF < 3MB
**Safe Zone:** Keep important content in center 1000x300px (avoids profile pic overlap)

### Design Layout

```
┌───────────────────────────────────────────────────────────────┐
│                                                               │
│  Solvency AI                              [subtle owl logo]  │  <- Row 1: Title (90px font)
│  [purple→gold gradient]                   [low opacity]      │
│                                                               │
│  Yield-bearing stablecoin for self-funding AI agents         │  <- Row 2: Tagline (36px)
│                                                               │
│  8-10% APY  •  Solana  •  Autonomous                         │  <- Row 3: Stats (48px, gold)
│                                                               │
│  Your bots shouldn't need your credit card to stay alive     │  <- Row 4: Hook (28px)
│                                                               │
│  ◉◉                                                           │  <- Row 5: Mini logo (bottom left)
└───────────────────────────────────────────────────────────────┘
```

**Text Positioning:**
- Title: X=50px, Y=180px, Font-size=90px, Weight=900
  - Text: "Solvency AI"
  - Color: Gradient (each letter shifts from purple to gold)
  
- Tagline: X=50px, Y=240px, Font-size=36px
  - Text: "Yield-bearing stablecoin for self-funding AI agents"
  - Color: #94A3B8 (Ash)
  
- Stats: X=50px, Y=320px, Font-size=48px, Font=monospace
  - Text: "8-10% APY • Solana • Autonomous"
  - Color: #FCD34D (Gold) with purple bullets
  
- Hook: X=50px, Y=380px, Font-size=28px
  - Text: "Your bots shouldn't need your credit card to stay alive"
  - Color: #94A3B8 (Ash)
  
- Mini logo: X=70px, Y=440px, Size=50px diameter (two 25px radius circles)
  - Subtle brand mark in bottom left

**Background:**
- Base: #0F172A
- Gradient: Subtle vertical variation (#0F172A → #1E293B → #0F172A)
- Texture: Random noise/particles in purple/gold (5% opacity)
- Right side: Large, very subtle owl logo overlay (~350px, 15% opacity)

**Typography:**
- Headings: Inter or system sans-serif, black weight (900)
- Stats: JetBrains Mono or monospace
- Body: Inter, medium weight (500)

### Animated Version (Optional GIF)

If creating animated banner:
- Total frames: 60-120 (2-4 seconds loop)
- Frame rate: 30fps
- Animations:
  1. Gentle glow pulse on owl eyes (opacity 0.4 → 0.6 → 0.4)
  2. Stats counter animation (8% → 10% → 8%)
  3. Subtle particle drift in background
- Keep animations subtle - should enhance, not distract
- File size target: < 2MB for quick load

---

## Color Palette Reference

| Color Name | Hex | RGB | Usage |
|------------|-----|-----|-------|
| Deep Violet | #8B5CF6 | 139, 92, 246 | Primary brand, logo, CTAs |
| Light Purple | #A78BFA | 167, 139, 250 | Gradients, accents |
| Gold | #FCD34D | 252, 211, 77 | Highlights, pupils, stats |
| Dark Slate | #0F172A | 15, 23, 42 | Background |
| Charcoal | #1E293B | 30, 41, 59 | Card backgrounds |
| Ash | #94A3B8 | 148, 163, 184 | Body text |
| Platinum | #F1F5F9 | 241, 245, 249 | Headings |

### Gradient Definitions

**Primary Brand Gradient:**
```css
background: linear-gradient(135deg, #8B5CF6 0%, #A78BFA 50%, #FCD34D 100%);
```

**Glow Effects:**
```css
box-shadow: 0 0 30px rgba(139, 92, 246, 0.4); /* Purple glow */
box-shadow: 0 0 40px rgba(252, 211, 77, 0.3); /* Gold glow */
```

---

## Asset Generation Instructions

### If you have design tools:

**Figma/Sketch:**
1. Create 1500x500 artboard
2. Add dark gradient background (#0F172A → #1E293B)
3. Add text layers with specified fonts/sizes
4. Import logo.svg or recreate circles
5. Apply layer effects (glow, opacity)
6. Export as PNG 2x resolution

**Adobe Illustrator:**
1. Open logo.svg
2. Create artboard 1500x500
3. Place logo elements
4. Add text with Character styles
5. Apply gradient to title text
6. Export as PNG with transparent background option

**Canva (Free):**
1. Custom size: 1500x500px
2. Background: Dark blue/navy (#0F172A)
3. Add circles for eyes (use gradient if available)
4. Add text elements
5. Download as PNG

### If you have command-line tools:

**ImageMagick + Inkscape:**
```bash
# Convert SVG logo to PNG
inkscape assets/logo.svg --export-filename=assets/logo-400.png --export-width=400

# Or with ImageMagick (if SVG support compiled):
convert -background none -density 300 assets/logo.svg -resize 400x400 assets/logo-400.png
```

**Using provided Python script:**
```bash
# Install dependencies
pip3 install Pillow

# Run generator
python3 generate_assets.py
```

This will create:
- `assets/twitter-profile-400x400.png`
- `assets/twitter-banner-1500x500.png`
- `assets/logo-{32,64,128,256,512}.png`

### If you have nothing (Emergency fallback):

1. Open `generate-twitter-assets.html` in Chrome/Firefox
2. Right-click canvas → "Save image as..."
3. Save both profile and banner PNGs
4. Upload to Twitter

---

## Quality Checklist

Before using assets:

### Logo
- [ ] Visible at 32px (eyes discernible)
- [ ] Pupils clearly gold, not muddy
- [ ] Purple gradient smooth (no banding)
- [ ] Glow effect present but not overwhelming
- [ ] Works on dark background (#0F172A)
- [ ] File size reasonable (< 100KB for PNGs, < 10KB for SVG)

### Twitter Profile Pic
- [ ] 400x400px exactly
- [ ] Eyes centered and balanced
- [ ] Readable as 48x48 thumbnail (Twitter mobile)
- [ ] Gold pupils "pop" in feed
- [ ] Background not distracting

### Twitter Banner
- [ ] 1500x500px exactly
- [ ] Title text gradient legible
- [ ] Stats (8-10% APY) clearly readable
- [ ] Hook text not cut off on mobile
- [ ] Profile pic doesn't obscure important content (test overlap)
- [ ] Looks professional next to Jupiter/Phantom/Jito banners
- [ ] File size < 5MB (preferably < 1MB)

---

## Mockup Testing

Before finalizing:

1. **Twitter Preview:**
   - Visit https://cards-dev.twitter.com/validator
   - Upload images to temp hosting
   - Check how they look in feed

2. **Mobile Test:**
   - View on actual phone
   - Check 48x48 profile pic (too small?)
   - Banner should be ~1200px wide visible on mobile

3. **Dark Mode:**
   - All assets designed for dark mode
   - Should work in light mode too (test contrast)

4. **Competition:**
   - Compare to Jupiter, Jito, Phantom banners
   - Do we stand out? (Yes - purple/gold vs everyone's blue)
   - Are we in the same quality tier? (Must be yes)

---

**Status:** Specifications complete, assets ready for generation
**Tools Required:** Pillow (Python) or design software (Figma/Illustrator/Canva)
**Estimated Time:** 30-60 minutes to generate all assets

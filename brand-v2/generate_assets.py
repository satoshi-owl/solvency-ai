#!/usr/bin/env python3
"""Generate Solvency AI Twitter assets"""

from PIL import Image, ImageDraw, ImageFont
import math

def create_profile_pic(size=400):
    """Generate 400x400 profile picture with owl eyes logo"""
    img = Image.new('RGB', (size, size), '#0F172A')
    draw = ImageDraw.Draw(img, 'RGBA')
    
    # Background gradient (approximation with circles)
    center = size // 2
    for i in range(100, 0, -5):
        alpha = int(255 * (i / 100) * 0.3)
        color = (30, 41, 59, alpha)
        draw.ellipse([center-i*2, center-i*2, center+i*2, center+i*2], 
                     fill=color, outline=None)
    
    # Draw owl eyes (overlapping circles)
    eye_y = size // 2
    left_eye_x = size // 2 - 50
    right_eye_x = size // 2 + 50
    eye_radius = 60
    
    # Purple glow
    for i in range(3):
        glow_size = eye_radius + (i * 8)
        alpha = 40 - (i * 10)
        # Left eye glow
        draw.ellipse([left_eye_x - glow_size, eye_y - glow_size,
                     left_eye_x + glow_size, eye_y + glow_size],
                     fill=None, outline=(139, 92, 246, alpha), width=10)
        # Right eye glow
        draw.ellipse([right_eye_x - glow_size, eye_y - glow_size,
                     right_eye_x + glow_size, eye_y + glow_size],
                     fill=None, outline=(139, 92, 246, alpha), width=10)
    
    # Eye circles (purple)
    draw.ellipse([left_eye_x - eye_radius, eye_y - eye_radius,
                 left_eye_x + eye_radius, eye_y + eye_radius],
                 fill=None, outline=(139, 92, 246), width=16)
    
    draw.ellipse([right_eye_x - eye_radius, eye_y - eye_radius,
                 right_eye_x + eye_radius, eye_y + eye_radius],
                 fill=None, outline=(167, 139, 250), width=16)
    
    # Gold pupils
    pupil_radius = 20
    draw.ellipse([left_eye_x - pupil_radius, eye_y - pupil_radius,
                 left_eye_x + pupil_radius, eye_y + pupil_radius],
                 fill=(252, 211, 77))
    
    draw.ellipse([right_eye_x - pupil_radius, eye_y - pupil_radius,
                 right_eye_x + pupil_radius, eye_y + pupil_radius],
                 fill=(252, 211, 77))
    
    # Inner pupils (purple)
    inner_radius = 10
    draw.ellipse([left_eye_x - inner_radius, eye_y - inner_radius,
                 left_eye_x + inner_radius, eye_y + inner_radius],
                 fill=(139, 92, 246))
    
    draw.ellipse([right_eye_x - inner_radius, eye_y - inner_radius,
                 right_eye_x + inner_radius, eye_y + inner_radius],
                 fill=(139, 92, 246))
    
    return img


def create_banner(width=1500, height=500):
    """Generate 1500x500 Twitter banner"""
    img = Image.new('RGB', (width, height), '#0F172A')
    draw = ImageDraw.Draw(img, 'RGBA')
    
    # Background gradient (approximation)
    for y in range(height):
        progress = y / height
        r = int(15 + (30 - 15) * math.sin(progress * math.pi))
        g = int(23 + (41 - 23) * math.sin(progress * math.pi))
        b = int(42 + (59 - 42) * math.sin(progress * math.pi))
        draw.line([(0, y), (width, y)], fill=(r, g, b))
    
    # Add texture/noise
    import random
    for _ in range(3000):
        x = random.randint(0, width)
        y = random.randint(0, height)
        color = (252, 211, 77) if random.random() > 0.5 else (139, 92, 246)
        draw.rectangle([x, y, x+1, y+1], fill=(*color, 15))
    
    # Draw subtle logo on right
    logo_x = 1150
    logo_y = 250
    logo_radius = 80
    
    # Owl eyes (very subtle)
    for i in range(2):
        offset = 70 if i == 0 else -70
        draw.ellipse([logo_x + offset - logo_radius, logo_y - logo_radius,
                     logo_x + offset + logo_radius, logo_y + logo_radius],
                     fill=None, outline=(139, 92, 246, 40), width=20)
        
        # Pupils
        pupil_r = 15
        draw.ellipse([logo_x + offset - pupil_r, logo_y - pupil_r,
                     logo_x + offset + pupil_r, logo_y + pupil_r],
                     fill=(252, 211, 77, 60))
    
    # Text
    try:
        # Try to use system fonts
        title_font = ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf', 90)
        subtitle_font = ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf', 36)
        stats_font = ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSansMono-Bold.ttf', 48)
        small_font = ImageFont.truetype('/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf', 28)
    except:
        # Fallback to default
        title_font = ImageFont.load_default()
        subtitle_font = ImageFont.load_default()
        stats_font = ImageFont.load_default()
        small_font = ImageFont.load_default()
    
    # Main title with gradient effect (approximation)
    title_text = "Solvency AI"
    title_y = 180
    
    # Purple to gold gradient text (draw multiple times with color shift)
    for i, char in enumerate(title_text):
        progress = i / len(title_text)
        r = int(139 + (252 - 139) * progress)
        g = int(92 + (211 - 92) * progress)
        b = int(246 + (77 - 246) * progress)
        
        try:
            x_offset = i * 75  # Approximate character width
            draw.text((50 + x_offset, title_y), char, fill=(r, g, b), font=title_font)
        except:
            # Fallback if font rendering fails
            draw.text((50, title_y), title_text, fill=(139, 92, 246))
            break
    
    # Subtitle
    draw.text((50, 240), 
              "Yield-bearing stablecoin for self-funding AI agents",
              fill=(148, 163, 184), font=subtitle_font)
    
    # Stats line
    stats_y = 320
    draw.text((50, stats_y), "8-10% APY", fill=(252, 211, 77), font=stats_font)
    draw.text((280, stats_y), "•", fill=(167, 139, 250), font=stats_font)
    draw.text((330, stats_y), "Solana", fill=(252, 211, 77), font=stats_font)
    draw.text((520, stats_y), "•", fill=(167, 139, 250), font=stats_font)
    draw.text((570, stats_y), "Autonomous", fill=(252, 211, 77), font=stats_font)
    
    # Bottom text
    draw.text((50, 380),
              "Your bots shouldn't need your credit card to stay alive",
              fill=(148, 163, 184), font=small_font)
    
    # Small logo in bottom left
    small_logo_y = 440
    for i in range(2):
        offset = 25 if i == 0 else -25
        small_r = 25
        draw.ellipse([70 + offset - small_r, small_logo_y - small_r,
                     70 + offset + small_r, small_logo_y + small_r],
                     fill=None, outline=(139, 92, 246), width=8)
        
        # Pupils
        p_r = 8
        draw.ellipse([70 + offset - p_r, small_logo_y - p_r,
                     70 + offset + p_r, small_logo_y + p_r],
                     fill=(252, 211, 77))
    
    return img


if __name__ == '__main__':
    print("Generating Solvency AI Twitter assets...")
    
    # Generate profile picture
    print("Creating profile picture (400x400)...")
    profile = create_profile_pic(400)
    profile.save('assets/twitter-profile-400x400.png')
    print("✓ Saved: assets/twitter-profile-400x400.png")
    
    # Generate banner
    print("Creating banner (1500x500)...")
    banner = create_banner(1500, 500)
    banner.save('assets/twitter-banner-1500x500.png')
    print("✓ Saved: assets/twitter-banner-1500x500.png")
    
    # Also create PNG versions of logo at different sizes
    print("Creating additional logo sizes...")
    for size in [32, 64, 128, 256, 512]:
        logo = create_profile_pic(size)
        logo.save(f'assets/logo-{size}.png')
        print(f"✓ Saved: assets/logo-{size}.png")
    
    print("\n✅ All assets generated successfully!")
    print("\nAssets created:")
    print("  - assets/twitter-profile-400x400.png")
    print("  - assets/twitter-banner-1500x500.png")
    print("  - assets/logo-{32,64,128,256,512}.png")

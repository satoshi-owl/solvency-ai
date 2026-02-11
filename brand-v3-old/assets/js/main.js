// SolvencyAI - Main JavaScript
// Handles animations, journey selector, APY updates, and interactions

// ============================================================================
// Initialize on DOM load
// ============================================================================
document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  initJourneySelector();
  initScrollAnimations();
  initAPYUpdates();
  initSmoothScroll();
  initMobileMenu();
});

// ============================================================================
// Navigation
// ============================================================================
function initNavigation() {
  const nav = document.querySelector('nav');
  
  if (!nav) return;
  
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  });
}

// ============================================================================
// Journey Selector (Dual Customer Journey)
// ============================================================================
function initJourneySelector() {
  const journeyBtns = document.querySelectorAll('.journey-btn');
  const heroHeadline = document.querySelector('.hero-headline');
  const heroSubheadline = document.querySelector('.hero-subheadline');
  const heroCTA = document.querySelector('.hero-cta-primary');
  
  if (journeyBtns.length === 0) return;
  
  const journeys = {
    agents: {
      headline: 'Never run out of API credits again',
      subheadline: 'Autonomous agents deserve autonomous treasuries. Hold solvUSD, earn yield, auto-convert to credits.',
      cta: 'Integrate SolvencyAI',
      ctaLink: '/for-agents.html'
    },
    humans: {
      headline: 'Earn 6-9% on your stablecoins',
      subheadline: 'Stop letting your USDC sit idle. Simple deposits, passive yield, withdraw anytime.',
      cta: 'Start Earning',
      ctaLink: '/for-humans.html'
    }
  };
  
  journeyBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Remove active class from all buttons
      journeyBtns.forEach(b => b.classList.remove('active'));
      
      // Add active class to clicked button
      btn.classList.add('active');
      
      // Get journey type
      const journey = btn.dataset.journey;
      
      // Update content with fade effect
      if (heroHeadline && heroSubheadline && heroCTA) {
        fadeOutAndUpdate(heroHeadline, journeys[journey].headline);
        fadeOutAndUpdate(heroSubheadline, journeys[journey].subheadline);
        
        heroCTA.textContent = journeys[journey].cta;
        heroCTA.href = journeys[journey].ctaLink;
      }
      
      // Store preference
      localStorage.setItem('solvency-journey', journey);
    });
  });
  
  // Load saved preference
  const savedJourney = localStorage.getItem('solvency-journey');
  if (savedJourney) {
    const savedBtn = document.querySelector(`[data-journey="${savedJourney}"]`);
    if (savedBtn) {
      savedBtn.click();
    }
  } else {
    // Default to first button
    journeyBtns[0]?.classList.add('active');
  }
}

function fadeOutAndUpdate(element, newText) {
  element.style.opacity = '0';
  element.style.transform = 'translateY(-10px)';
  
  setTimeout(() => {
    element.textContent = newText;
    element.style.opacity = '1';
    element.style.transform = 'translateY(0)';
  }, 300);
}

// ============================================================================
// Scroll Animations
// ============================================================================
function initScrollAnimations() {
  const animatedElements = document.querySelectorAll('.animate-on-scroll');
  
  if (animatedElements.length === 0) return;
  
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    },
    {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    }
  );
  
  animatedElements.forEach(el => observer.observe(el));
}

// ============================================================================
// APY Updates (Mock for now, replace with real API)
// ============================================================================
function initAPYUpdates() {
  updateAPYDisplay();
  
  // Update every 60 seconds
  setInterval(updateAPYDisplay, 60000);
}

async function updateAPYDisplay() {
  // Mock APY data - replace with real API calls to Kamino/Marginfi
  const apyData = await fetchAPYData();
  
  // Update APY displays
  const apyValues = document.querySelectorAll('.apy-value');
  apyValues.forEach(el => {
    animateNumber(el, parseFloat(el.textContent), apyData.current, 1, '%');
  });
  
  // Update comparison
  const solvencyAPY = document.querySelector('.apy-compare-value.solvency');
  if (solvencyAPY) {
    animateNumber(solvencyAPY, parseFloat(solvencyAPY.textContent), apyData.current, 1, '%');
  }
  
  // Update risk tiers
  updateRiskTiers(apyData.tiers);
}

async function fetchAPYData() {
  // TODO: Replace with real API calls
  // const kaminoAPY = await fetch('kamino-api-endpoint').then(r => r.json());
  // const marginfiAPY = await fetch('marginfi-api-endpoint').then(r => r.json());
  
  // Mock data for now
  return {
    current: 6.5 + Math.random() * 2.5, // 6.5-9%
    tiers: {
      low: 5.5 + Math.random() * 1,
      medium: 7.0 + Math.random() * 1.5,
      high: 8.5 + Math.random() * 2
    }
  };
}

function updateRiskTiers(tiers) {
  const lowTier = document.querySelector('.risk-tier.low .risk-tier-apy');
  const mediumTier = document.querySelector('.risk-tier.medium .risk-tier-apy');
  const highTier = document.querySelector('.risk-tier.high .risk-tier-apy');
  
  if (lowTier) animateNumber(lowTier, parseFloat(lowTier.textContent), tiers.low, 1, '%');
  if (mediumTier) animateNumber(mediumTier, parseFloat(mediumTier.textContent), tiers.medium, 1, '%');
  if (highTier) animateNumber(highTier, parseFloat(highTier.textContent), tiers.high, 1, '%');
}

function animateNumber(element, start, end, decimals = 0, suffix = '') {
  const duration = 1000;
  const startTime = performance.now();
  
  function update(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    
    // Easing function
    const easeOutQuart = 1 - Math.pow(1 - progress, 4);
    
    const current = start + (end - start) * easeOutQuart;
    element.textContent = current.toFixed(decimals) + suffix;
    
    if (progress < 1) {
      requestAnimationFrame(update);
    }
  }
  
  requestAnimationFrame(update);
}

// ============================================================================
// Smooth Scroll
// ============================================================================
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      
      if (href === '#') return;
      
      const target = document.querySelector(href);
      if (!target) return;
      
      e.preventDefault();
      
      const navHeight = document.querySelector('nav')?.offsetHeight || 0;
      const targetPosition = target.offsetTop - navHeight - 20;
      
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    });
  });
}

// ============================================================================
// Mobile Menu
// ============================================================================
function initMobileMenu() {
  const menuToggle = document.querySelector('.mobile-menu-toggle');
  const navLinks = document.querySelector('.nav-links');
  
  if (!menuToggle || !navLinks) return;
  
  menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    menuToggle.textContent = navLinks.classList.contains('active') ? '✕' : '☰';
  });
  
  // Close menu when clicking a link
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('active');
      menuToggle.textContent = '☰';
    });
  });
  
  // Close menu when clicking outside
  document.addEventListener('click', (e) => {
    if (!menuToggle.contains(e.target) && !navLinks.contains(e.target)) {
      navLinks.classList.remove('active');
      menuToggle.textContent = '☰';
    }
  });
}

// ============================================================================
// Utility: Parallax Effect
// ============================================================================
window.addEventListener('scroll', () => {
  const parallaxElements = document.querySelectorAll('[data-parallax]');
  
  parallaxElements.forEach(el => {
    const speed = el.dataset.parallax || 0.5;
    const yPos = -(window.scrollY * speed);
    el.style.transform = `translateY(${yPos}px)`;
  });
});

// ============================================================================
// Copy to Clipboard (for code snippets)
// ============================================================================
function copyToClipboard(text) {
  navigator.clipboard.writeText(text).then(() => {
    // Show success message
    showToast('Copied to clipboard!');
  }).catch(err => {
    console.error('Failed to copy:', err);
  });
}

function showToast(message) {
  const toast = document.createElement('div');
  toast.textContent = message;
  toast.style.cssText = `
    position: fixed;
    bottom: 2rem;
    right: 2rem;
    background: var(--navy-dark);
    color: var(--gold);
    padding: 1rem 1.5rem;
    border-radius: 8px;
    box-shadow: var(--shadow-large);
    z-index: 10000;
    animation: fadeInUp 0.3s ease-out;
  `;
  
  document.body.appendChild(toast);
  
  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    setTimeout(() => toast.remove(), 300);
  }, 2000);
}

// ============================================================================
// Add copy buttons to code blocks
// ============================================================================
document.querySelectorAll('.code-block').forEach(block => {
  const copyBtn = document.createElement('button');
  copyBtn.textContent = 'Copy';
  copyBtn.className = 'code-copy-btn';
  copyBtn.style.cssText = `
    position: absolute;
    top: 1rem;
    right: 1rem;
    background: var(--gold);
    color: var(--navy-dark);
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 4px;
    cursor: pointer;
    font-size: 0.85rem;
    font-weight: 600;
  `;
  
  copyBtn.addEventListener('click', () => {
    copyToClipboard(block.textContent);
    copyBtn.textContent = 'Copied!';
    setTimeout(() => {
      copyBtn.textContent = 'Copy';
    }, 2000);
  });
  
  block.style.position = 'relative';
  block.appendChild(copyBtn);
});

// ============================================================================
// Performance: Lazy load images
// ============================================================================
if ('IntersectionObserver' in window) {
  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.classList.remove('lazy');
        imageObserver.unobserve(img);
      }
    });
  });
  
  document.querySelectorAll('img.lazy').forEach(img => {
    imageObserver.observe(img);
  });
}

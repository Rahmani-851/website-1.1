
  // ========== ENHANCED ANIMATIONS & INTERACTIONS ==========
  
  // 1. Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if(href === "#" || href === "") return;
      const target = document.querySelector(href);
      if(target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
  
  // 2. Navbar background change on scroll
  window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });
  
  // 3. Counter animation for statistics
  const statNumbers = document.querySelectorAll('.stat-number');
  const animateNumbers = () => {
    statNumbers.forEach(stat => {
      const targetValue = stat.getAttribute('data-count');
      if (targetValue && !stat.classList.contains('animated')) {
        let finalNumber = parseInt(targetValue);
        if (isNaN(finalNumber)) {
          if (targetValue === '24') finalNumber = 24;
          else if (targetValue === '150') finalNumber = 150;
          else if (targetValue === '98') finalNumber = 98;
          else finalNumber = 0;
        }
        let current = 0;
        const increment = finalNumber / 50;
        const updateCounter = () => {
          current += increment;
          if (current < finalNumber) {
            let displayVal = Math.floor(current);
            if (targetValue === '98') stat.innerText = displayVal + '%';
            else if (targetValue === '24') stat.innerText = displayVal + '/7';
            else stat.innerText = displayVal + '+';
            requestAnimationFrame(updateCounter);
          } else {
            if (targetValue === '98') stat.innerText = finalNumber + '%';
            else if (targetValue === '24') stat.innerText = finalNumber + '/7';
            else stat.innerText = finalNumber + '+';
            stat.classList.add('animated');
          }
        };
        updateCounter();
      }
    });
  };
  
  // 4. Scroll Reveal Animation (Intersection Observer)
  const revealElements = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        if (entry.target.querySelector('.stat-number')) {
          animateNumbers();
        }
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: "0px 0px -50px 0px" });
  
  revealElements.forEach(el => revealObserver.observe(el));
  
  // Trigger counter if stats visible on load
  setTimeout(() => {
    const statsSection = document.querySelector('#home .row .row');
    if (statsSection && statsSection.getBoundingClientRect().top < window.innerHeight) {
      animateNumbers();
    }
  }, 500);
  
  // 5. Contact form submission with enhanced feedback
 const form = document.getElementById("quoteForm");
const feedback = document.getElementById("formFeedback");
const submitBtn = document.getElementById("submitBtn");

if (form) {
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();

    // Show loading
    submitBtn.disabled = true;
    submitBtn.innerHTML = "Sending... ⏳";
    feedback.innerHTML = "";

    const formData = new FormData(form);

    fetch(form.action, {
      method: "POST",
      body: formData,
      headers: {
        Accept: "application/json"
      }
    })
      .then(response => {
        if (response.ok) {
          feedback.innerHTML = `
            <span class="text-success">
              <i class="bi bi-check-circle-fill"></i>
              ✨ Thanks ${name}! Your message has been sent successfully.
            </span>
          `;
          form.reset();
        } else {
          throw new Error("Failed");
        }
      })
      .catch(() => {
        feedback.innerHTML = `
          <span class="text-danger">
            <i class="bi bi-exclamation-triangle-fill"></i>
            Oops! Something went wrong. Please try again.
          </span>
        `;
      })
      .finally(() => {
        submitBtn.disabled = false;
        submitBtn.innerHTML = `<i class="bi bi-send-fill me-2"></i>Send Request`;

        // auto-hide message
        setTimeout(() => {
          feedback.innerHTML = "";
        }, 5000);
      });
  });
}
  // 6. Ripple effect for buttons
  const allBtns = document.querySelectorAll('.btn-orange, .btn-outline-orange');
  allBtns.forEach(btn => {
    btn.addEventListener('click', function(e) {
      let ripple = document.createElement('span');
      ripple.classList.add('ripple-effect');
      const rect = btn.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      ripple.style.width = ripple.style.height = size + 'px';
      ripple.style.left = e.clientX - rect.left - size/2 + 'px';
      ripple.style.top = e.clientY - rect.top - size/2 + 'px';
      ripple.style.position = 'absolute';
      ripple.style.borderRadius = '50%';
      ripple.style.backgroundColor = 'rgba(255,255,255,0.5)';
      ripple.style.transform = 'scale(0)';
      ripple.style.transition = 'transform 0.5s, opacity 0.6s';
      ripple.style.pointerEvents = 'none';
      btn.style.position = 'relative';
      btn.style.overflow = 'hidden';
      btn.appendChild(ripple);
      setTimeout(() => { ripple.style.transform = 'scale(4)'; ripple.style.opacity = '0'; }, 10);
      setTimeout(() => { ripple.remove(); }, 600);
    });
  });
  
  // 7. Active nav links on scroll spy
  const sections = document.querySelectorAll('section[id]');
  window.addEventListener('scroll', () => {
    let current = '';
    const scrollPos = window.scrollY + 120;
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });
    const navLinks = document.querySelectorAll('.nav-link-custom');
    navLinks.forEach(link => {
      link.classList.remove('active');
      const href = link.getAttribute('href').substring(1);
      if (href === current) {
        link.classList.add('active');
      }
    });
  });
  
  // 8. Hover animation for stat numbers
  const stats = document.querySelectorAll('.stat-number');
  stats.forEach(stat => {
    stat.addEventListener('mouseenter', () => {
      stat.style.transform = 'scale(1.08)';
      stat.style.transition = 'transform 0.2s';
      stat.style.display = 'inline-block';
    });
    stat.addEventListener('mouseleave', () => {
      stat.style.transform = 'scale(1)';
    });
  });
  
  // 9. Initialize slider with auto-play
  document.addEventListener("DOMContentLoaded", function () {
    const slider = document.getElementById('planSlider');
    if (slider) {
      new bootstrap.Carousel(slider, {
        interval: 3000,
        ride: 'carousel',
        wrap: true,
        pause: false
      });
    }
  });
  
 // 10. Portfolio data and dynamic generation (Click-to-open external websites)
// UPDATED: More projects added, original project 4 (Atlas Atlas) removed.
// Added moving animation (subtle floating/translateY motion) on portfolio cards.
const projects = [
  {
    title: "N.M Furnishers",
//   // description: "An History of Style, Research and Elegance in Furniture in Pakistan Since 1972",
    category: "Furnishers",
    url: "https://nmfurnisher.com/",
    image: "Images/NM_Furnishers.webp"
  },
  {
    title: "Swift Security",
//   // description: "Modern SaaS platform for AI-driven analytics. Sleek interface and powerful data insights.",
    category: "Security",
    url: "https://swiftguardsecurity.com/",
    image: "Images/SwiftSecurity.webp"
  },
  {
    title: "Our Courses",
//    //description: "Food & lifestyle brand with minimalistic storytelling and recipe ecosystem.",
    category: "Training School",
    url: "https://ourcourses.com/",
    image: "Images/OurCourses.webp"
  },
  {
    title: "Bright Repairing",
//   // description: "Component library for design systems. High-performance, accessible, and futuristic.",
    category: "Services",
    url: "https://brighthomerepair.com/",
    image: "Images/BrightRepair.webp"
  },
  {
    title: "Cover Force",
//    description: "Animation studio specializing in kinetic typography and interactive storytelling.",
    category: "Security Management",
    url: "https://coverforce.app/",
    image: "Images/CoverForce.webp"
  },
  {
    title: "Blue-Sky Studies",
//    description: "Future-ready AI research hub. Experimental interfaces & neural UX.",
    category: "Consultancy",
    url: "https://blueskystudies.com/",
    image: "Images/BlueSkyStudies.webp"
  },
  {
    title: "Euro Mattress",
//    description: "Mindfulness app with serene visuals and haptic-like interactions.",
    category: "E-Commerce",
    url: "https://euromattress.co.uk/",
    image: "Images/EuroMattress.webp"
  },
  {
    title: "Cerberus Security",
//    description: "Next-gen e-commerce platform, blazing fast checkout and 3D product views.",
    category: "Security Services",
    url: "https://cerberussec.co.uk/",
    image: "Images/CerberusSecurity.webp"
  },
  {
    title: "Finencial Management System",
//    description: "Digital portfolio for avant-garde architects. Immersive walkthroughs.",
    category: "Management System",
    url: "https://cashpocket.app/",
    image: "Images/FMS.webp"
  },
  {
    title: "Cherie",
//    description: "Experimental typography and motion branding studio.",
    category: "Beauty & Spa",
    url: "https://cheriebeautybychelseafalcon.com/",
    image: "Images/Cherie.webp"
  },
  {
    title: "DentiCare",
    category: "Dental Care",
    url: "https://denticare.ie/",
    image: "Images/DentiCare.webp"
  }
];
function createCard(project) {
  const card = document.createElement('div');
  card.className = 'portfolio-card';
  card.setAttribute('tabindex', '0');
  card.setAttribute('role', 'button');
  card.setAttribute('aria-label', `Open ${project.title} website in new tab`);

  const imageDiv = document.createElement('div');
  imageDiv.className = 'card-image';
  imageDiv.style.backgroundImage = `url('${project.image}')`;
  imageDiv.style.backgroundSize = 'cover';
  imageDiv.style.backgroundPosition = 'center';
  imageDiv.style.backgroundColor = '#eef2fa';
  
  const contentDiv = document.createElement('div');
  contentDiv.className = 'card-content';
  
  const categorySpan = document.createElement('span');
  categorySpan.className = 'card-category';
  categorySpan.textContent = project.category;
  
  const titleEl = document.createElement('h3');
  titleEl.className = 'card-title';
  titleEl.textContent = project.title;
  
  const descEl = document.createElement('p');
  descEl.className = 'card-description';
  descEl.textContent = project.description;
  
  const hintSpan = document.createElement('span');
  hintSpan.className = 'card-link-hint';
  hintSpan.innerHTML = `Visit website 
    <svg viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="14" height="14">
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <polyline points="15 3 21 3 21 9" />
      <line x1="10" y1="14" x2="21" y2="3" />
    </svg>`;
  
  contentDiv.appendChild(categorySpan);
  contentDiv.appendChild(titleEl);
  contentDiv.appendChild(descEl);
  contentDiv.appendChild(hintSpan);
  card.appendChild(imageDiv);
  card.appendChild(contentDiv);
  
  const openWebsite = (e) => {
    e.stopPropagation();
    window.open(project.url, '_blank', 'noopener,noreferrer');
  };
  
  card.addEventListener('click', openWebsite);
  card.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      openWebsite(e);
    }
  });
  
  return card;
}

const gridContainer = document.getElementById('portfolioGrid');
if (gridContainer) {
  // Clear any existing content (optional but ensures clean state)
  gridContainer.innerHTML = '';
  projects.forEach(project => {
    gridContainer.appendChild(createCard(project));
  });
}

// Add moving animation to portfolio cards (subtle floating motion + smooth transition)
// Also preserves existing cursor pointer and active transform
const animationStyle = document.createElement('style');
animationStyle.textContent = `
  /* Base card styles assumed from existing CSS, but we reinforce the moving animation */
  .portfolio-card {
    cursor: pointer;
    transition: transform 0.25s cubic-bezier(0.2, 0.9, 0.4, 1.1), box-shadow 0.3s ease, opacity 0.2s;
    will-change: transform;
    animation: floatMotion 4s ease-in-out infinite;
    transform-origin: center;
  }
  
  /* Different delays for staggered floating effect — adds organic movement */
  .portfolio-card:nth-child(odd) {
    animation-delay: 0s;
  }
  .portfolio-card:nth-child(3n) {
    animation-delay: 0.6s;
  }
  .portfolio-card:nth-child(5n+2) {
    animation-delay: 1.2s;
  }
  .portfolio-card:nth-child(7n+4) {
    animation-delay: 0.3s;
  }
  
  @keyframes floatMotion {
    0% {
      transform: translateY(0px);
    }
    50% {
      transform: translateY(-6px);
    }
    100% {
      transform: translateY(0px);
    }
  }
  
  /* Hover effect: enhance animation + slight scale, but keep movement smooth */
  .portfolio-card:hover {
    animation: hoverFloat 0.4s ease forwards, floatMotion 4s ease-in-out infinite;
    transform: translateY(-4px) scale(1.02);
    box-shadow: 0 20px 30px -12px rgba(0, 0, 0, 0.2);
    transition: transform 0.2s ease, box-shadow 0.2s ease;
  }
  
  @keyframes hoverFloat {
    0% {
      transform: translateY(0px) scale(1);
    }
    100% {
      transform: translateY(-4px) scale(1.02);
    }
  }
  
  /* Active click micro-interaction */
  .portfolio-card:active {
    transform: translateY(2px) scale(0.98);
    transition: transform 0.05s;
    animation: none; /* temporarily pause floating on click for crisp feedback */
  }
  
  /* Ensure cards have base styling (just in case any missing from global CSS) */
  .portfolio-card {
    background: rgba(255, 255, 255, 0.85);
    backdrop-filter: blur(0px);
    border-radius: 1.5rem;
    overflow: hidden;
    box-shadow: 0 12px 28px -8px rgba(0, 0, 0, 0.08);
    transition: all 0.25s ease;
    border: 1px solid rgba(255,255,255,0.5);
  }
  
  .portfolio-card:hover {
    border-color: rgba(99, 102, 241, 0.3);
  }
  
  /* card image area */
  .card-image {
    width: 100%;
    aspect-ratio: 16 / 10;
    background-size: cover;
    background-position: center;
    transition: transform 0.5s ease;
  }
  
  .portfolio-card:hover .card-image {
    transform: scale(1.02);
  }
  
  .card-content {
    padding: 1.25rem;
  }
  
  .card-category {
    font-size: 0.7rem;
    letter-spacing: 0.04em;
    text-transform: uppercase;
    font-weight: 600;
    color: #4f46e5;
    background: #e0e7ff;
    display: inline-block;
    padding: 0.2rem 0.7rem;
    border-radius: 2rem;
    margin-bottom: 0.65rem;
  }
  
  .card-title {
    font-size: 1.35rem;
    font-weight: 600;
    margin-bottom: 0.5rem;
    color: #0f172a;
  }
  
  .card-description {
    font-size: 0.85rem;
    color: #334155;
    line-height: 1.4;
    margin-bottom: 1rem;
  }
  
  .card-link-hint {
    display: inline-flex;
    align-items: center;
    gap: 0.3rem;
    font-size: 0.75rem;
    font-weight: 500;
    color: #4f46e5;
    background: #eef2ff;
    padding: 0.25rem 0.8rem;
    border-radius: 2rem;
    transition: background 0.2s;
  }
  
  .portfolio-card:hover .card-link-hint {
    background: #e0e7ff;
    gap: 0.5rem;
  }
  
  svg {
    transition: transform 0.2s;
  }
  
  .portfolio-card:hover svg {
    transform: translate(2px, -2px);
  }
`;

document.head.appendChild(animationStyle);

// Add cursor pointer style for portfolio cards (ensure consistency)
const style = document.createElement('style');
style.textContent = `.portfolio-card { cursor: pointer; } .portfolio-card:active { transform: translateY(2px) scale(0.98); transition: transform 0.05s; }`;
document.head.appendChild(style);

// Image fallback handling
const images = document.querySelectorAll('.card-image');
images.forEach(imgDiv => {
  const bgUrl = imgDiv.style.backgroundImage;
  const urlMatch = bgUrl.match(/url\(["']?(.*?)["']?\)/);
  if (urlMatch && urlMatch[1]) {
    const testImage = new Image();
    testImage.src = urlMatch[1];
    testImage.onerror = () => {
      imgDiv.style.backgroundImage = 'linear-gradient(135deg, #b8d0e0, #c2d9eb)';
    };
  }
});

// Optional: Add dynamic observer to ensure newly added cards also get the moving animation
// Since all cards are created dynamically and inserted, the above styles already apply.
// But we need to ensure that cards that might be added later (if any) also get the float effect.
// Not required as per current static generation, but for completeness:
const observer = new MutationObserver((mutations) => {
  mutations.forEach((mutation) => {
    mutation.addedNodes.forEach((node) => {
      if (node.nodeType === 1 && node.classList && node.classList.contains('portfolio-card')) {
        // Force reflow to ensure animation applies (already covered by CSS)
        node.style.animation = 'none';
        node.offsetHeight; // trigger reflow
        node.style.animation = '';
      }
    });
  });
});
if (gridContainer) {
  observer.observe(gridContainer, { childList: true });
}


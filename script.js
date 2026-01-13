// Mobile Menu Toggle
const mobileMenuToggle = document.querySelector(".mobile-menu-toggle");
const navMenu = document.querySelector(".nav-menu");

mobileMenuToggle.addEventListener("click", () => {
  navMenu.classList.toggle("active");
});

// Animate hamburger icon
const spans = mobileMenuToggle.querySelectorAll("span");
if (navMenu.classList.contains("active")) {
  spans[0].style.transform = "rotate(45deg) translate(5px, 5px)";
  spans[1].style.opacity = "0";
  spans[2].style.transform = "rotate(-45deg) translate(7px, -6px)";
} else {
  spans[0].style.transform = "none";
  spans[1].style.opacity = "1";
  spans[2].style.transform = "none";
}

// Intersection Observer for fade-in animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1";
      entry.target.style.transform = "translateY(0)";
    }
  });
}, observerOptions);

// Apply fade-in animation to sections
const sections = document.querySelectorAll(
  ".hero-content, .about-grid, .service-card, .contact-grid"
);
sections.forEach((section) => {
  section.style.opacity = "0";
  section.style.transform = "translateY(30px)";
  section.style.transition = "opacity 0.6s ease, transform 0.6s ease";
  observer.observe(section);
});

// Navbar background on scroll
const navbar = document.querySelector(".navbar");
let lastScroll = 0;

window.addEventListener("scroll", () => {
  const currentScroll = window.pageYOffset;

  // Add shadow to navbar when scrolled
  if (currentScroll > 50) {
    navbar.style.boxShadow = "0 2px 8px rgba(0, 0, 0, 0.1)";
  } else {
    navbar.style.boxShadow = "0 1px 2px 0 rgb(0 0 0 / 0.05)";
  }

  lastScroll = currentScroll;
});

// Add active state to navigation links based on scroll position
window.addEventListener("scroll", () => {
  const sections = document.querySelectorAll("section[id]");
  const scrollY = window.pageYOffset;

  sections.forEach((section) => {
    const sectionHeight = section.offsetHeight;
    const sectionTop = section.offsetTop - 100;
    const sectionId = section.getAttribute("id");
    const navLink = document.querySelector(`.nav-menu a[href="#${sectionId}"]`);

    if (
      navLink &&
      scrollY > sectionTop &&
      scrollY <= sectionTop + sectionHeight
    ) {
      document.querySelectorAll(".nav-menu a").forEach((link) => {
        link.style.color = "";
      });
      navLink.style.color = "var(--primary-color)";
    }
  });
});

// Animate statistics counter
const animateCounter = (element, target) => {
  let current = 0;
  const increment = target.includes("+") ? 1 : 1;
  const numericTarget = parseInt(target.replace(/\D/g, "")) || 0;
  const duration = 2000;
  const steps = 60;
  const stepDuration = duration / steps;
  const stepIncrement = numericTarget / steps;

  const timer = setInterval(() => {
    current += stepIncrement;
    if (current >= numericTarget) {
      current = numericTarget;
      clearInterval(timer);
    }
    element.textContent = target.includes("+")
      ? Math.floor(current) + "+"
      : target.replace(/\d+/, Math.floor(current));
  }, stepDuration);
};

// Trigger counter animation when stats section is visible
const statsObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const statNumbers = entry.target.querySelectorAll(".stat-number");
        statNumbers.forEach((stat) => {
          const target = stat.textContent;
          animateCounter(stat, target);
        });
        statsObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.5 }
);

const statsSection = document.querySelector(".stats");
if (statsSection) {
  statsObserver.observe(statsSection);
}

// Console message
console.log(
  "%cChuene Entities",
  "color: #3B82F6; font-size: 24px; font-weight: bold;"
);
console.log(
  "%cWebsite built with modern web technologies",
  "color: #6B7280; font-size: 14px;"
);

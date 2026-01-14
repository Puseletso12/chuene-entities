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

// Firebase (CDN / ES Modules)
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
  serverTimestamp,
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyAVtQ-qQlio_X80g6BI04Ruzxo3dXyQGi4",
  authDomain: "chuene-entities.firebaseapp.com",
  projectId: "chuene-entities",
  storageBucket: "chuene-entities.firebasestorage.app",
  messagingSenderId: "368768209278",
  appId: "1:368768209278:web:3230159855a337ba21232f",
  measurementId: "G-1D9Z81FCV4",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Your existing form
const contactForm = document.getElementById("contactForm");

contactForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  // Get form data (your existing IDs)
  const formData = {
    name: document.getElementById("name").value.trim(),
    email: document.getElementById("email").value.trim(),
    phone: document.getElementById("phone").value.trim(),
    message: document.getElementById("message").value.trim(),
    createdAt: serverTimestamp(), // server-side timestamp :contentReference[oaicite:7]{index=7}
  };

  // Basic validation
  if (
    !formData.name ||
    !formData.email ||
    !formData.phone ||
    !formData.message
  ) {
    alert("Please fill in all fields.");
    return;
  }

  // Prevent double submits
  const btn = contactForm.querySelector('button[type="submit"]');
  const prevText = btn.textContent;
  btn.disabled = true;
  btn.textContent = "Sending...";

  try {
    // Write to Firestore collection "contacts" :contentReference[oaicite:8]{index=8}
    await addDoc(collection(db, "contacts"), formData);

    alert("Thank you for your message! We will get back to you soon.");
    contactForm.reset();
  } catch (err) {
    console.error("Firestore error:", err);
    alert("Sorry — message failed to send. Please try again.");
  } finally {
    btn.disabled = false;
    btn.textContent = prevText;
  }
});

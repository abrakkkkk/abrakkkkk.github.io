"use strict";

document.addEventListener("DOMContentLoaded", () => {
  initTicker();
  initTypingEffects();
  initScrollReveal();
  initMobileMenu();
  initCarousel();
});

function initTicker() {
  const items = [
    { text: "PYTHON", isUp: true },
    { text: "SQL", isUp: true },
    { text: "STREAMLIT", isUp: true },
    { text: "POSTGRESQL", isUp: true },
    { text: "POWER BI", isUp: true },
    { text: "ETL", isUp: true },
    { text: "MODELAGEM", isUp: true },
    { text: "PLOTLY", isUp: true },
    { text: "GIT", isUp: true },
    { text: "EXCEL", isUp: true },
  ];

  const trackElement = document.getElementById("ticker");
  if (!trackElement) return;

  const htmlContent = items
    .map((item) => `<span class="tick ${item.isUp ? "up" : "down"}">${item.text}</span>`)
    .join("");

  // Repeat the content to create an infinite scrolling effect
  trackElement.innerHTML = htmlContent.repeat(4);
}

function initTypingEffects() {
  // 1. Name Typing Effect
  const nameElement = document.getElementById("type-name");
  const nameText = "Olá, meu nome é Abrahão Levy.";
  let nameIndex = 0;
  
  const NAME_TYPING_SPEED_MS = 65;
  const INITIAL_DELAY_MS = 400;
  const CURSOR_FADEOUT_DELAY_MS = 4000;

  function typeName() {
    if (!nameElement) return;

    if (nameIndex < nameText.length) {
      nameElement.textContent += nameText.charAt(nameIndex);
      nameIndex++;
      setTimeout(typeName, NAME_TYPING_SPEED_MS);
    } else {
      const cursor = document.querySelector(".cursor-blink");
      if (cursor) {
        setTimeout(() => {
          cursor.style.opacity = "0";
          cursor.style.animation = "none";
        }, CURSOR_FADEOUT_DELAY_MS);
      }
    }
  }

  setTimeout(typeName, INITIAL_DELAY_MS);

  // 2. Terminal Phrases Typing Effect
  const phrases = [
    "Transformar dados em decisão, um dashboard de cada vez.",
    "Intermediário em dados, avançado em curiosidade.",
    "SELECT foco, dedicacao FROM carreira;",
  ];
  const terminalElement = document.getElementById("typed-line");
  
  if (!terminalElement) return;

  let phraseIndex = 0;
  let characterIndex = 0;
  let isDeleting = false;

  const TERMINAL_TYPING_SPEED_MS = 42;
  const TERMINAL_DELETING_SPEED_MS = 28;
  const PAUSE_BETWEEN_PHRASES_MS = 1600;

  function typeTerminalLoop() {
    const currentPhrase = phrases[phraseIndex];

    if (!isDeleting) {
      characterIndex++;
      terminalElement.textContent = currentPhrase.slice(0, characterIndex);
      
      if (characterIndex === currentPhrase.length) {
        isDeleting = true;
        setTimeout(typeTerminalLoop, PAUSE_BETWEEN_PHRASES_MS);
        return;
      }
    } else {
      characterIndex--;
      terminalElement.textContent = currentPhrase.slice(0, characterIndex);
      
      if (characterIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
      }
    }

    const currentSpeed = isDeleting ? TERMINAL_DELETING_SPEED_MS : TERMINAL_TYPING_SPEED_MS;
    setTimeout(typeTerminalLoop, currentSpeed);
  }

  typeTerminalLoop();
}

function initScrollReveal() {
  const revealElements = document.querySelectorAll(".reveal");
  
  const intersectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in");
        }
      });
    },
    { threshold: 0.15 }
  );

  revealElements.forEach((element) => intersectionObserver.observe(element));
}

function initMobileMenu() {
  const burgerButton = document.getElementById("burger-btn");
  const navLinksContainer = document.querySelector(".nav-links");

  if (!burgerButton || !navLinksContainer) return;

  burgerButton.addEventListener("click", () => {
    const isActive = navLinksContainer.classList.toggle("active");
    burgerButton.textContent = isActive ? "[-]" : "[+]";
    burgerButton.setAttribute("aria-expanded", isActive);
  });

  const navLinks = navLinksContainer.querySelectorAll("a");
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      navLinksContainer.classList.remove("active");
      burgerButton.textContent = "[+]";
      burgerButton.setAttribute("aria-expanded", "false");
    });
  });
}

function initCarousel() {
  const track = document.getElementById("projects-track");
  if (!track) return;

  const slides = Array.from(track.children);
  const prevBtn = document.getElementById("carousel-prev");
  const nextBtn = document.getElementById("carousel-next");
  const dotsContainer = document.getElementById("carousel-dots");
  
  if (slides.length === 0) return;
  
  let currentIndex = 0;

  slides.forEach((_, index) => {
    const dot = document.createElement("button");
    if (index === 0) dot.classList.add("active");
    dot.setAttribute("aria-label", `Slide ${index + 1}`);
    dot.addEventListener("click", () => goToSlide(index));
    dotsContainer.appendChild(dot);
  });
  
  const dots = Array.from(dotsContainer.children);

  function updateCarousel() {
    track.style.transform = `translateX(-${currentIndex * 100}%)`;
    
    dots.forEach((dot, index) => {
      dot.classList.toggle("active", index === currentIndex);
    });
  }

  function goToSlide(index) {
    currentIndex = index;
    updateCarousel();
  }

  prevBtn.addEventListener("click", () => {
    goToSlide((currentIndex - 1 + slides.length) % slides.length);
  });

  nextBtn.addEventListener("click", () => {
    goToSlide((currentIndex + 1) % slides.length);
  });

  updateCarousel();
}

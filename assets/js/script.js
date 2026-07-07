/* =========================================================
   ANAS MEMON PORTFOLIO — SCRIPT.JS
   Vanilla JS only. No frameworks, no external libraries.
   Every module is wrapped in safeInit so one failure
   never breaks the rest of the page.
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  document.documentElement.classList.add("js-enabled");

  safeInit(initMobileMenu);
  safeInit(initSmoothScroll);
  safeInit(initRevealAnimations);
  safeInit(initContactForm);
  safeInit(initBackToTop);
  safeInit(initCurrentYear);
});

/**
 * Runs a module function safely. If it throws, the error is
 * logged and the rest of the site keeps working.
 */
function safeInit(fn) {
  try {
    fn();
  } catch (error) {
    console.error(`${fn.name} failed:`, error);
  }
}

/* ---------------------------------------------------------
   1. MOBILE MENU
--------------------------------------------------------- */
function initMobileMenu() {
  const toggle = document.getElementById("navToggle");
  const nav = document.getElementById("primaryNav");

  if (!toggle || !nav) return;

  const closeMenu = () => {
    nav.classList.remove("is-open");
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-label", "Open menu");
  };

  const openMenu = () => {
    nav.classList.add("is-open");
    toggle.setAttribute("aria-expanded", "true");
    toggle.setAttribute("aria-label", "Close menu");
  };

  toggle.addEventListener("click", () => {
    const isOpen = nav.classList.contains("is-open");
    isOpen ? closeMenu() : openMenu();
  });

  // Close the menu after any nav link is clicked
  const links = nav.querySelectorAll(".nav-link, .nav-cta");
  links.forEach((link) => {
    link.addEventListener("click", () => {
      closeMenu();
    });
  });

  // Close on Escape key
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && nav.classList.contains("is-open")) {
      closeMenu();
      toggle.focus();
    }
  });

  // Close if the user resizes back to desktop width
  window.addEventListener("resize", () => {
    if (window.innerWidth > 860 && nav.classList.contains("is-open")) {
      closeMenu();
    }
  });
}

/* ---------------------------------------------------------
   2. SMOOTH SCROLL
--------------------------------------------------------- */
function initSmoothScroll() {
  const links = document.querySelectorAll('a[href^="#"]');

  links.forEach((link) => {
    link.addEventListener("click", (event) => {
      const targetId = link.getAttribute("href");
      if (!targetId || targetId === "#") return;

      const target = document.querySelector(targetId);
      if (!target) return;

      event.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });

      // Move focus for keyboard/screen-reader users once scroll settles
      window.setTimeout(() => {
        target.setAttribute("tabindex", "-1");
        target.focus({ preventScroll: true });
      }, 400);
    });
  });
}

/* ---------------------------------------------------------
   3. REVEAL ANIMATIONS (IntersectionObserver)
--------------------------------------------------------- */
function initRevealAnimations() {
  const items = document.querySelectorAll(".reveal");
  if (!items.length) return;

  // If IntersectionObserver isn't supported, just show everything
  if (!("IntersectionObserver" in window)) {
    items.forEach((item) => item.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          obs.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.12,
      rootMargin: "0px 0px -40px 0px",
    }
  );

  items.forEach((item) => observer.observe(item));
}

/* ---------------------------------------------------------
   4. CONTACT FORM VALIDATION + WHATSAPP MESSAGE BUILDER
--------------------------------------------------------- */
function initContactForm() {
  const form = document.getElementById("contactForm");
  if (!form) return;

  // Replace 923032674824 with your real WhatsApp number
  const WHATSAPP_NUMBER = "923032674824";

  const fields = [
    { id: "name", errorId: "nameError", type: "text" },
    { id: "businessType", errorId: "businessTypeError", type: "select" },
    { id: "whatsapp", errorId: "whatsappError", type: "tel" },
    { id: "message", errorId: "messageError", type: "text" },
  ];

  // Show errors only after the user has touched a field, not by default
  fields.forEach(({ id }) => {
    const input = document.getElementById(id);
    if (!input) return;
    input.addEventListener("blur", () => validateField(id));
    input.addEventListener("input", () => {
      const row = input.closest(".form-row");
      if (row && row.classList.contains("has-error")) {
        validateField(id);
      }
    });
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    let isValid = true;
    fields.forEach(({ id }) => {
      const fieldValid = validateField(id);
      if (!fieldValid) isValid = false;
    });

    if (!isValid) {
      const firstError = form.querySelector(".has-error input, .has-error select, .has-error textarea");
      if (firstError) firstError.focus();
      return;
    }

    const name = getValue("name");
    const businessType = getValue("businessType");
    const whatsapp = getValue("whatsapp");
    const message = getValue("message");

    const text =
      `Hello Anas, I want to discuss a website.\n` +
      `Name: ${name}\n` +
      `Business type: ${businessType}\n` +
      `WhatsApp: ${whatsapp}\n` +
      `Message: ${message}`;

    const encodedText = encodeURIComponent(text);
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedText}`;

    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
    form.reset();
  });

  function getValue(id) {
    const el = document.getElementById(id);
    return el ? el.value.trim() : "";
  }

  function validateField(id) {
    const input = document.getElementById(id);
    if (!input) return true;

    const row = input.closest(".form-row");
    const value = input.value.trim();
    let valid = true;

    if (id === "whatsapp") {
      const digitsOnly = value.replace(/[^0-9+]/g, "");
      valid = digitsOnly.length >= 10;
    } else {
      valid = value.length > 0;
    }

    if (row) {
      row.classList.toggle("has-error", !valid);
    }

    return valid;
  }
}

/* ---------------------------------------------------------
   5. BACK TO TOP BUTTON
--------------------------------------------------------- */
function initBackToTop() {
  const button = document.getElementById("backToTop");
  if (!button) return;

  const toggleVisibility = () => {
    if (window.scrollY > 480) {
      button.classList.add("is-visible");
    } else {
      button.classList.remove("is-visible");
    }
  };

  window.addEventListener("scroll", toggleVisibility, { passive: true });
  toggleVisibility();

  button.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

/* ---------------------------------------------------------
   6. CURRENT YEAR
--------------------------------------------------------- */
function initCurrentYear() {
  const yearEl = document.getElementById("currentYear");
  if (!yearEl) return;
  yearEl.textContent = String(new Date().getFullYear());
}
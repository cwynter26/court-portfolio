const themeButton = document.querySelector('.theme-toggle');
const menuButton = document.querySelector('.navigation__menu-toggle');
const navLinks = document.querySelector('.navigation__links');

function setTheme(theme) {
  const isLight = theme === 'light';
  document.body.classList.toggle('light-theme', isLight);
  themeButton.setAttribute('aria-pressed', String(isLight));
  themeButton.setAttribute('aria-label', `Switch to ${isLight ? 'dark' : 'light'} mode`);
  try { localStorage.setItem('portfolio-theme', theme); } catch (error) { /* Storage may be unavailable. */ }
}

let savedTheme;
try { savedTheme = localStorage.getItem('portfolio-theme'); } catch (error) { /* Storage may be unavailable. */ }
const systemPrefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;
setTheme(savedTheme === 'light' || savedTheme === 'dark' ? savedTheme : (systemPrefersLight ? 'light' : 'dark'));

themeButton.addEventListener('click', () => {
  setTheme(document.body.classList.contains('light-theme') ? 'dark' : 'light');
});

function closeMenu() {
  navLinks.classList.remove('is-open');
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.setAttribute('aria-label', 'Open navigation');
}

menuButton.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('is-open');
  menuButton.setAttribute('aria-expanded', String(isOpen));
  menuButton.setAttribute('aria-label', isOpen ? 'Close navigation' : 'Open navigation');
});

navLinks.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
document.addEventListener('keydown', event => { if (event.key === 'Escape') closeMenu(); });
document.getElementById('year').textContent = new Date().getFullYear();

/* ========================================
    CONTACT FORM
======================================== */

const contactForm = document.querySelector("#contact-form");
const contactStatus = document.querySelector("#contact-status");
const contactSubmit = document.querySelector("#contact-submit");

if (contactForm && contactStatus && contactSubmit) {

    contactForm.addEventListener("submit", async (event) => {
      
        event.preventDefault();
        
        const formData = new FormData(contactForm);
        
        contactSubmit.disabled = true;

        const originalButtonHTML = contactSubmit.innerHTML;

        contactSubmit.textContent = "Sending...";

        contactStatus.textContent = "";
        contactStatus.className = "contact__status";

        try {

            const response = await fetch(contactForm.action, {
                method: "POST",
                body: formData,
                headers: {
                    Accept: "application/json"
                }
            });

            if (response.ok) {

                contactStatus.textContent =
                    "Message sent successfully! I'll get back to you soon.";

                contactStatus.classList.add(
                    "contact__status--success"
                );

                contactForm.reset();

            } else {

                throw new Error("Form submission failed");

            }

        } catch (error) {

            console.error("Contact form error:", error);

            contactStatus.textContent =
                "Something went wrong. Please try again or email me directly.";

            contactStatus.classList.add(
                "contact__status--error"
            );

        } finally {

            contactSubmit.disabled = false;
            contactSubmit.innerHTML = originalButtonHTML;

        }

    });

    /* ========================================
    SCROLL REVEAL ANIMATIONS
======================================== */

function initializeScrollReveal() {

    // Select elements we want to animate
    const revealElements = document.querySelectorAll(
        ".about__grid, " +
        ".skills__grid, " +
        ".projects__grid, " +
        ".service__card, " +
        ".services__cta, " +
        ".contact__grid"
    );

    // Respect accessibility preferences
    const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
        return;
    }

    // Check browser support
    if (!("IntersectionObserver" in window)) {
        return;
    }

    // Add reveal class to each element
    revealElements.forEach((element) => {
        element.classList.add("reveal");
    });

    // Activate animations
    document.documentElement.classList.add("js-reveal");

    // Create observer
    const revealObserver = new IntersectionObserver(
        (entries, observer) => {

            entries.forEach((entry) => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("is-visible");

                    // Animate only once
                    observer.unobserve(entry.target);
                }

            });

        },
        {
            threshold: 0.1,
            rootMargin: "0px 0px -40px 0px"
        }
    );

    // Observe each element
    revealElements.forEach((element) => {
        revealObserver.observe(element);
    });

}

// Start animations when page loads
if (document.readyState === "loading") {
    document.addEventListener(
        "DOMContentLoaded",
        initializeScrollReveal
    );
} else {
    initializeScrollReveal();
}

/* ========================================
   ACTIVE NAVIGATION
======================================== */

const navLinks = document.querySelectorAll(
    '.nav__links a[href^="#"]'
);

const navSections = document.querySelectorAll(
    'section[id]'
);

function updateActiveNav() {
    // Account for the fixed navbar
    const scrollPosition = window.scrollY + 150;

    let currentSection = "";

    navSections.forEach((section) => {
        if (scrollPosition >= section.offsetTop) {
            currentSection = section.id;
        }
    });

    navLinks.forEach((link) => {
        const isActive =
            link.getAttribute("href") === `#${currentSection}`;

        link.classList.toggle("active", isActive);

        if (isActive) {
            link.setAttribute("aria-current", "location");
        } else {
            link.removeAttribute("aria-current");
        }
    });
}

// Run when the page loads
updateActiveNav();

// Update as the visitor scrolls
window.addEventListener("scroll", updateActiveNav, {
    passive: true
});

window.addEventListener("resize", updateActiveNav);
}
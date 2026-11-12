/* ==========================================================================
   Abu Ayub Bhuiyan — Portfolio JavaScript
   Pure vanilla JS. All features grouped & commented below.

   Sections:
   1.  Footer year
   2.  Navbar scroll state
   3.  Mobile hamburger menu
   4.  Smooth scrolling for anchor links
   5.  Active nav link on scroll (scroll-spy)
   6.  Typing text animation in hero
   7.  Scroll-reveal animations (IntersectionObserver)
   8.  Animated skill bars
   9.  Back-to-top button
   10. Particles background (canvas)
   11. Contact form (EmailJS) with validation
   ========================================================================== */

(function () {
    "use strict";

    /* ====================================================================
       EMAILJS CONFIGURATION
       --------------------------------------------------------------------
       The contact form uses EmailJS (https://www.emailjs.com) to send the
       submitted message to your personal email inbox:
            abuayubminhaz290@gmail.com

       To make the form work:
       1. Log into your EmailJS dashboard.
       2. Verify the following three values are still correct:
       */
    const EMAILJS_PUBLIC_KEY  = "b_XICBiaTMdjejEmd";   // <-- EmailJS Public Key
    const EMAILJS_SERVICE_ID   = "service_5h12h9e";      // <-- EmailJS Service ID
    const EMAILJS_TEMPLATE_ID  = "template_jhr1wom";    // <-- EmailJS Template ID
    const PERSONAL_EMAIL       = "abuayubminhaz290@gmail.com"; // <-- your inbox
    /*
       3. In your EmailJS template, make sure the template variables match
          what we send from this script:
              from_name  -> {{from_name}}
              from_email -> {{from_email}}
              message    -> {{message}}
              to_email   -> {{to_email}}   (set to abuayubminhaz290@gmail.com)
       ==================================================================== */


    /* ---------- 1. Footer year ---------- */
    document.getElementById("year").textContent = new Date().getFullYear();


    /* ---------- 2. Navbar scroll state ---------- */
    const navbar = document.getElementById("navbar");
    const onScrollNav = () => {
        if (window.scrollY > 30) navbar.classList.add("scrolled");
        else navbar.classList.remove("scrolled");
    };
    window.addEventListener("scroll", onScrollNav, { passive: true });
    onScrollNav();


    /* ---------- 3. Mobile hamburger menu ---------- */
    const hamburger = document.getElementById("hamburger");
    const navMenu   = document.getElementById("nav-menu");

    function toggleMenu(forceClose) {
        const open = forceClose ? false : !hamburger.classList.contains("active");
        hamburger.classList.toggle("active", open);
        navMenu.classList.toggle("active", open);
        hamburger.setAttribute("aria-expanded", String(open));
        document.body.style.overflow = open ? "hidden" : "";
    }

    hamburger.addEventListener("click", () => toggleMenu());

    // Close mobile menu when any nav link is clicked
    navMenu.querySelectorAll("nav-link, .nav-link").forEach(link => {
        link.addEventListener("click", () => {
            if (window.innerWidth <= 768) toggleMenu(true);
        });
    });

    // Close menu when clicking outside
    document.addEventListener("click", (e) => {
        if (
            navMenu.classList.contains("active") &&
            !navMenu.contains(e.target) &&
            !hamburger.contains(e.target)
        ) {
            toggleMenu(true);
        }
    });

    // Reset menu state when resizing to desktop
    window.addEventListener("resize", () => {
        if (window.innerWidth > 768) {
            hamburger.classList.remove("active");
            navMenu.classList.remove("active");
            hamburger.setAttribute("aria-expanded", "false");
            document.body.style.overflow = "";
        }
    });


    /* ---------- 4. Smooth scrolling for anchor links ---------- */
    // (CSS scroll-behavior:smooth handles most cases, but this adds an offset
    // for the sticky navbar and works on older browsers.)
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener("click", function (e) {
            const targetId = this.getAttribute("href");
            if (!targetId || targetId === "#") return;
            const target = document.querySelector(targetId);
            if (!target) return;
            e.preventDefault();
            const navH = document.querySelector(".navbar").offsetHeight;
            const top = target.getBoundingClientRect().top + window.pageYOffset - navH + 2;
            window.scrollTo({ top, behavior: "smooth" });
        });
    });


    /* ---------- 5. Active nav link on scroll (scroll-spy) ---------- */
    const sections = document.querySelectorAll("section[id]");
    const navLinks = document.querySelectorAll(".nav-link");

    const spyObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute("id");
                navLinks.forEach(l => {
                    l.classList.toggle("active", l.getAttribute("href") === "#" + id);
                });
            }
        });
    }, { rootMargin: "-45% 0px -50% 0px" });

    sections.forEach(s => spyObserver.observe(s));


    /* ---------- 6. Typing text animation in hero ---------- */
    const typedEl = document.getElementById("typed-text");
    const roles = ["Web Developer", "Frontend Developer", "C++ Learner", "Creative Programmer"];

    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function typeLoop() {
        const current = roles[roleIndex];

        if (!isDeleting) {
            typedEl.textContent = current.substring(0, charIndex + 1);
            charIndex++;
            if (charIndex === current.length) {
                isDeleting = true;
                setTimeout(typeLoop, 1600); // pause at end of word
                return;
            }
            setTimeout(typeLoop, 90);
        } else {
            typedEl.textContent = current.substring(0, charIndex - 1);
            charIndex--;
            if (charIndex === 0) {
                isDeleting = false;
                roleIndex = (roleIndex + 1) % roles.length;
                setTimeout(typeLoop, 300);
                return;
            }
            setTimeout(typeLoop, 45);
        }
    }
    if (typedEl) typeLoop();


    /* ---------- 7. Scroll-reveal animations ---------- */
    const revealEls = document.querySelectorAll(".reveal");

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const delay = entry.target.dataset.delay || 0;
                setTimeout(() => entry.target.classList.add("visible"), Number(delay));
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12, rootMargin: "0px 0px -60px 0px" });

    revealEls.forEach(el => revealObserver.observe(el));


    /* ---------- 8. Animated skill bars ---------- */
    // Observe each .skill-card (the parent) instead of the .skill-fill, because
    // the .skill-fill starts with width:0 and its intersection ratio is unreliable.
    // Using the parent card + a generous rootMargin guarantees all cards animate,
    // even the ones at the bottom of the section.
    const skillCards = document.querySelectorAll(".skill-card");

    const skillObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const card = entry.target;
                const fill = card.querySelector(".skill-fill");
                if (fill && fill.dataset.width) {
                    // Slight delay so the bar grows after the card fades in
                    setTimeout(() => { fill.style.width = fill.dataset.width; }, 250);
                }
                observer.unobserve(card);
            }
        });
    }, { threshold: 0.1, rootMargin: "0px 0px -40px 0px" });

    skillCards.forEach(c => skillObserver.observe(c));


    /* ---------- 9. Back-to-top button ---------- */
    const backToTop = document.getElementById("back-to-top");

    function updateBackToTop() {
        if (window.scrollY > 500) backToTop.classList.add("show");
        else backToTop.classList.remove("show");
    }
    // Call once on load to set the correct initial state
    updateBackToTop();
    window.addEventListener("scroll", updateBackToTop, { passive: true });

    backToTop.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });


    /* ---------- 10. Particles background (canvas) ---------- */
    const canvas = document.getElementById("particles-canvas");
    if (canvas) {
        const ctx = canvas.getContext("2d");
        let particles = [];
        let mouse = { x: null, y: null };
        let raf;

        const PARTICLE_COLOR = "rgba(94, 234, 212, 0.7)";
        const LINE_COLOR = "rgba(25, 198, 160, 0.18)";

        function resizeCanvas() {
            canvas.width = canvas.offsetWidth;
            canvas.height = canvas.offsetHeight;
            initParticles();
        }

        function particleCount() {
            // fewer particles on small screens for performance
            const area = canvas.width * canvas.height;
            const count = Math.min(110, Math.floor(area / 14000));
            return Math.max(35, count);
        }

        function initParticles() {
            particles = [];
            const n = particleCount();
            for (let i = 0; i < n; i++) {
                particles.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    vx: (Math.random() - 0.5) * 0.4,
                    vy: (Math.random() - 0.5) * 0.4,
                    r: Math.random() * 1.8 + 0.6
                });
            }
        }

        function drawParticles() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            for (let i = 0; i < particles.length; i++) {
                const p = particles[i];
                p.x += p.vx;
                p.y += p.vy;

                // wrap around edges
                if (p.x < 0) p.x = canvas.width;
                if (p.x > canvas.width) p.x = 0;
                if (p.y < 0) p.y = canvas.height;
                if (p.y > canvas.height) p.y = 0;

                ctx.beginPath();
                ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
                ctx.fillStyle = PARTICLE_COLOR;
                ctx.fill();

                // link nearby particles with lines
                for (let j = i + 1; j < particles.length; j++) {
                    const q = particles[j];
                    const dx = p.x - q.x;
                    const dy = p.y - q.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist < 120) {
                        ctx.beginPath();
                        ctx.strokeStyle = LINE_COLOR;
                        ctx.lineWidth = 1 - dist / 120;
                        ctx.moveTo(p.x, p.y);
                        ctx.lineTo(q.x, q.y);
                        ctx.stroke();
                    }
                }

                // link to mouse for interactivity
                if (mouse.x !== null) {
                    const dx = p.x - mouse.x;
                    const dy = p.y - mouse.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist < 160) {
                        ctx.beginPath();
                        ctx.strokeStyle = "rgba(245, 197, 66, 0.3)";
                        ctx.lineWidth = 1 - dist / 160;
                        ctx.moveTo(p.x, p.y);
                        ctx.lineTo(mouse.x, mouse.y);
                        ctx.stroke();
                    }
                }
            }
            raf = requestAnimationFrame(drawParticles);
        }

        window.addEventListener("resize", () => {
            cancelAnimationFrame(raf);
            resizeCanvas();
            drawParticles();
        });

        window.addEventListener("mousemove", (e) => {
            const rect = canvas.getBoundingClientRect();
            mouse.x = e.clientX - rect.left;
            mouse.y = e.clientY - rect.top;
        });
        window.addEventListener("mouseout", () => { mouse.x = null; mouse.y = null; });

        // Respect reduced-motion: don't animate if user prefers reduced motion
        const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        if (!prefersReduced) {
            resizeCanvas();
            drawParticles();
        } else {
            resizeCanvas();
        }
    }


    /* ---------- 11. Contact form (EmailJS) with validation ---------- */
    const form = document.getElementById("contact-form");
    const submitBtn = document.getElementById("submit-btn");
    const feedback = document.getElementById("form-feedback");

    // Initialize EmailJS using the public key
    if (window.emailjs) {
        try {
            emailjs.init({ publicKey: EMAILJS_PUBLIC_KEY });
        } catch (err) {
            console.warn("EmailJS init failed:", err);
        }
    }

    function setError(field, message) {
        const group = field.closest(".form-group");
        const errEl = group.querySelector(".error-msg");
        group.classList.add("invalid");
        if (errEl) errEl.textContent = message;
    }
    function clearError(field) {
        const group = field.closest(".form-group");
        const errEl = group.querySelector(".error-msg");
        group.classList.remove("invalid");
        if (errEl) errEl.textContent = "";
    }

    function validateField(field) {
        const value = field.value.trim();
        if (!value) {
            setError(field, "This field is required.");
            return false;
        }
        if (field.type === "email") {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                setError(field, "Please enter a valid email address.");
                return false;
            }
        }
        if (field.id === "message" && value.length < 10) {
            setError(field, "Message must be at least 10 characters long.");
            return false;
        }
        clearError(field);
        return true;
    }

    // Validate on blur (after the user leaves a field)
    ["name", "email", "message"].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.addEventListener("blur", () => validateField(el));
    });

    function showFeedback(type, text) {
        feedback.className = "form-feedback show " + type;
        feedback.textContent = text;
        feedback.scrollIntoView({ behavior: "smooth", block: "center" });
    }

    if (form) {
        form.addEventListener("submit", async function (e) {
            e.preventDefault();

            const nameField = document.getElementById("name");
            const emailField = document.getElementById("email");
            const messageField = document.getElementById("message");

            // Validate all fields
            const valid =
                validateField(nameField) &
                validateField(emailField) &
                validateField(messageField);
            if (!valid) {
                showFeedback("error", "Please fix the errors above and try again.");
                return;
            }

            // Loading state
            submitBtn.classList.add("loading");
            submitBtn.disabled = true;

            try {
                // Parameters that map to the EmailJS template variables
                const params = {
                    // Names used by your EmailJS template ("Contact Us")
                    user_name: nameField.value.trim(),
                    user_email: emailField.value.trim(),
                    user_message: messageField.value.trim(),
                    // Same values under the older names, so either template works
                    from_name: nameField.value.trim(),
                    from_email: emailField.value.trim(),
                    message: messageField.value.trim(),
                    to_email: PERSONAL_EMAIL  // your inbox
                };

                if (!window.emailjs) {
                    throw new Error("EmailJS library not loaded. Check your internet connection.");
                }

                await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, params);

                showFeedback(
                    "success",
                    "✓ Thank you! Your message has been sent successfully. I'll get back to you soon."
                );
                form.reset();
            } catch (err) {
                console.error("EmailJS error:", err);
                showFeedback(
                    "error",
                    "✕ Sorry, something went wrong while sending your message. Please email me directly at " + PERSONAL_EMAIL
                );
            } finally {
                submitBtn.classList.remove("loading");
                submitBtn.disabled = false;
            }
        });
    }


    /* ---------- Done ---------- */
    console.log("%cPortfolio loaded successfully!", "color:#5eead4;font-weight:bold;font-size:14px;");
})();
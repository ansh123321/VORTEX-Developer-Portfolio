/* =========================================
   TASK 04 — DEVELOPER PORTFOLIO
   Interactive JavaScript
   ========================================= */

document.addEventListener("DOMContentLoaded", () => {

    // =========================================
    // 1. MOBILE NAVIGATION
    // =========================================

    const menuToggle = document.querySelector(
        ".menu-toggle, .hamburger, #menu-toggle"
    );

    const navigation = document.querySelector(
        ".nav-links, .navigation-links, #nav-links"
    );

    if (menuToggle && navigation) {
        menuToggle.addEventListener("click", () => {
            const isOpen = navigation.classList.toggle("active");

            menuToggle.classList.toggle("active", isOpen);
            menuToggle.setAttribute("aria-expanded", String(isOpen));
        });

        navigation.querySelectorAll("a").forEach(link => {
            link.addEventListener("click", () => {
                navigation.classList.remove("active");
                menuToggle.classList.remove("active");
                menuToggle.setAttribute("aria-expanded", "false");
            });
        });
    }


    // =========================================
    // 2. SMOOTH SCROLLING
    // =========================================

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener("click", event => {
            const targetId = anchor.getAttribute("href");

            if (!targetId || targetId === "#") return;

            const target = document.querySelector(targetId);

            if (target) {
                event.preventDefault();

                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });
            }
        });
    });


    // =========================================
    // 3. NAVBAR SCROLL EFFECT
    // =========================================

    const navbar = document.querySelector(
        ".navbar, header, nav"
    );

    function updateNavbar() {
        if (!navbar) return;

        navbar.classList.toggle(
            "scrolled",
            window.scrollY > 40
        );
    }

    window.addEventListener("scroll", updateNavbar, {
        passive: true
    });

    updateNavbar();


    // =========================================
    // 4. SCROLL REVEAL ANIMATIONS
    // =========================================

    const revealElements = document.querySelectorAll(
        ".reveal, .reveal-left, .reveal-right, " +
        ".project-card, .skill-card, .timeline-item"
    );

    if ("IntersectionObserver" in window) {
        const revealObserver = new IntersectionObserver(
            (entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("visible");
                        observer.unobserve(entry.target);
                    }
                });
            },
            {
                threshold: 0.12
            }
        );

        revealElements.forEach(element => {
            element.classList.add("reveal");
            revealObserver.observe(element);
        });
    } else {
        revealElements.forEach(element => {
            element.classList.add("visible");
        });
    }


    // =========================================
    // 5. HERO TYPING EFFECT
    // =========================================

    const typingElement = document.querySelector(
        "#typing-text, .typing-text, .typed-text"
    );

    if (typingElement) {
        const words = [
            "Full-Stack Developer",
            "Web Developer",
            "Problem Solver",
            "Tech Enthusiast"
        ];

        let wordIndex = 0;
        let characterIndex = 0;
        let deleting = false;

        function typeEffect() {
            const currentWord = words[wordIndex];

            if (deleting) {
                characterIndex--;
            } else {
                characterIndex++;
            }

            typingElement.textContent = currentWord.substring(
                0,
                characterIndex
            );

            let delay = deleting ? 45 : 85;

            if (!deleting && characterIndex === currentWord.length) {
                deleting = true;
                delay = 1300;
            } else if (deleting && characterIndex === 0) {
                deleting = false;
                wordIndex = (wordIndex + 1) % words.length;
                delay = 350;
            }

            setTimeout(typeEffect, delay);
        }

        typeEffect();
    }


    // =========================================
    // 6. ACTIVE NAVIGATION LINK
    // =========================================

    const sections = document.querySelectorAll(
        "section[id]"
    );

    const navLinks = document.querySelectorAll(
        '.nav-links a[href^="#"], ' +
        '.navigation-links a[href^="#"], ' +
        'nav a[href^="#"]'
    );

    if ("IntersectionObserver" in window && sections.length) {
        const sectionObserver = new IntersectionObserver(
            entries => {
                entries.forEach(entry => {
                    if (!entry.isIntersecting) return;

                    const currentId = entry.target.id;

                    navLinks.forEach(link => {
                        const isActive =
                            link.getAttribute("href") === `#${currentId}`;

                        link.classList.toggle("active", isActive);
                    });
                });
            },
            {
                rootMargin: "-30% 0px -60% 0px"
            }
        );

        sections.forEach(section => {
            sectionObserver.observe(section);
        });
    }


    // =========================================
    // 7. CONTACT FORM VALIDATION
    // =========================================

    const contactForm = document.querySelector(
        "#contact-form, .contact-form, form"
    );

    if (contactForm) {
        contactForm.addEventListener("submit", event => {
            event.preventDefault();

            const nameInput = contactForm.querySelector(
                '[name="name"], #name'
            );

            const emailInput = contactForm.querySelector(
                '[name="email"], #email'
            );

            const messageInput = contactForm.querySelector(
                '[name="message"], #message'
            );

            const name = nameInput?.value.trim() || "";
            const email = emailInput?.value.trim() || "";
            const message = messageInput?.value.trim() || "";

            if (!name || !email || !message) {
                showNotification(
                    "Please fill in all required fields.",
                    "error"
                );
                return;
            }

            const emailPattern =
                /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if (!emailPattern.test(email)) {
                showNotification(
                    "Please enter a valid email address.",
                    "error"
                );
                return;
            }

            showNotification(
                "Form validated! Connect a form service to send your message.",
                "success"
            );
        });
    }


    // =========================================
    // 8. NOTIFICATION SYSTEM
    // =========================================

    function showNotification(message, type = "success") {
        let notification = document.querySelector(
            "#portfolio-notification"
        );

        if (!notification) {
            notification = document.createElement("div");
            notification.id = "portfolio-notification";

            Object.assign(notification.style, {
                position: "fixed",
                bottom: "24px",
                right: "24px",
                maxWidth: "min(380px, calc(100vw - 48px))",
                padding: "16px 22px",
                borderRadius: "12px",
                color: "#ffffff",
                fontSize: "14px",
                lineHeight: "1.5",
                zIndex: "9999",
                opacity: "0",
                transform: "translateY(12px)",
                transition: "opacity 0.25s ease, transform 0.25s ease",
                boxShadow: "0 10px 35px rgba(0, 0, 0, 0.25)"
            });

            document.body.appendChild(notification);
        }

        notification.textContent = message;
        notification.style.background =
            type === "error" ? "#b91c1c" : "#166534";

        notification.style.opacity = "1";
        notification.style.transform = "translateY(0)";

        clearTimeout(notification.hideTimer);

        notification.hideTimer = setTimeout(() => {
            notification.style.opacity = "0";
            notification.style.transform = "translateY(12px)";
        }, 3500);
    }


    // =========================================
    // 9. CURRENT YEAR IN FOOTER
    // =========================================

    const yearElement = document.querySelector(
        "#current-year, .current-year"
    );

    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }


    // =========================================
    // 10. PROJECT LINK SAFETY
    // =========================================

    document.querySelectorAll(
        'a[target="_blank"]'
    ).forEach(link => {
        link.setAttribute("rel", "noopener noreferrer");
    });


    console.log("🚀 Developer portfolio initialized successfully!");
});
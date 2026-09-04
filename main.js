/* =====================================================
   ASTHAMIL PORTFOLIO — MAIN JS
   Clean Animation & Interaction System
===================================================== */


/* =====================================================
   PRELOADER
===================================================== */

const preloader = document.getElementById("preloader");
const preloaderNumber = document.querySelector(".preloader-number");

let loading = 0;

const loadingInterval = setInterval(() => {

    loading += Math.floor(Math.random() * 12) + 5;

    if (loading >= 100) {
        loading = 100;
        clearInterval(loadingInterval);
    }

    if (preloaderNumber) {
        preloaderNumber.textContent =
            String(loading).padStart(2, "0");
    }

    if (loading === 100) {

        setTimeout(() => {

            if (preloader) {
                preloader.classList.add("loaded");
            }

        }, 400);

    }

}, 100);


/* =====================================================
   PAGE LOAD FALLBACK
===================================================== */

window.addEventListener("load", () => {

    if (!preloader) return;

    setTimeout(() => {
        preloader.classList.add("loaded");
    }, 1800);

});


/* =====================================================
   DEVICE CHECK
===================================================== */

const isTouchDevice =
    window.matchMedia("(hover: none), (pointer: coarse)").matches;


/* =====================================================
   CUSTOM CURSOR
   Desktop only
===================================================== */

const cursor = document.querySelector(".cursor");
const cursorFollower =
    document.querySelector(".cursor-follower");

let mouseX = 0;
let mouseY = 0;

let followerX = 0;
let followerY = 0;


if (!isTouchDevice) {

    document.addEventListener("mousemove", (event) => {

        mouseX = event.clientX;
        mouseY = event.clientY;

        if (cursor) {

            cursor.style.transform =
                `translate(${mouseX}px, ${mouseY}px)`;

        }

    });


    function animateCursor() {

        followerX +=
            (mouseX - followerX) * 0.12;

        followerY +=
            (mouseY - followerY) * 0.12;

        if (cursorFollower) {

            cursorFollower.style.transform =
                `translate(
                    ${followerX - 16}px,
                    ${followerY - 16}px
                )`;

        }

        requestAnimationFrame(animateCursor);

    }


    if (cursorFollower) {
        animateCursor();
    }

}


/* =====================================================
   CURSOR HOVER
===================================================== */

if (!isTouchDevice) {

    const interactiveElements = document.querySelectorAll(
        "a, button, .project, .stack-card, .expertise-item"
    );


    interactiveElements.forEach((element) => {

        element.addEventListener("mouseenter", () => {

            if (cursorFollower) {

                cursorFollower.style.width = "55px";
                cursorFollower.style.height = "55px";

                cursorFollower.style.borderColor =
                    "rgba(184, 255, 61, 0.8)";

            }

            if (cursor) {

                cursor.style.transform =
                    `translate(
                        ${mouseX}px,
                        ${mouseY}px
                    ) scale(1.5)`;

            }

        });


        element.addEventListener("mouseleave", () => {

            if (cursorFollower) {

                cursorFollower.style.width = "32px";
                cursorFollower.style.height = "32px";

                cursorFollower.style.borderColor =
                    "rgba(184, 255, 61, 0.5)";

            }

            if (cursor) {

                cursor.style.transform =
                    `translate(
                        ${mouseX}px,
                        ${mouseY}px
                    ) scale(1)`;

            }

        });

    });

}


/* =====================================================
   HERO PARALLAX
===================================================== */

const heroOrb =
    document.querySelector(".hero-orb");

const heroGrid =
    document.querySelector(".hero-grid");

const heroGlowOne =
    document.querySelector(".hero-glow-1");


/*
   Desktop:
   Mouse movement controls the background.

   Mobile:
   Background remains animated through CSS
   without disabling the visual effects.
*/

if (!isTouchDevice) {

    document.addEventListener("mousemove", (event) => {

        const x =
            event.clientX / window.innerWidth - 0.5;

        const y =
            event.clientY / window.innerHeight - 0.5;


        if (heroOrb) {

            heroOrb.style.transform =
                `translate(
                    ${x * 35}px,
                    ${y * 35}px
                )`;

        }


        if (heroGrid) {

            heroGrid.style.transform =
                `translate(
                    ${x * -12}px,
                    ${y * -12}px
                )`;

        }


        if (heroGlowOne) {

            heroGlowOne.style.transform =
                `translate(
                    ${x * 60}px,
                    ${y * 60}px
                )`;

        }

    });

}


/* =====================================================
   SCROLL REVEAL
   Works on Desktop + Mobile
===================================================== */

const revealElements = document.querySelectorAll(
    ".section-heading, " +
    ".about-content, " +
    ".stack-card, " +
    ".project, " +
    ".expertise-item, " +
    ".timeline-item, " +
    ".contact-content"
);


if ("IntersectionObserver" in window) {

    const revealObserver =
        new IntersectionObserver(
            (entries, observer) => {

                entries.forEach((entry) => {

                    if (!entry.isIntersecting) return;

                    entry.target.classList.add("is-visible");

                    observer.unobserve(entry.target);

                });

            },
            {
                threshold: 0.08,
                rootMargin: "0px 0px -40px 0px"
            }
        );


    revealElements.forEach((element) => {

        element.classList.add("reveal");

        revealObserver.observe(element);

    });

} else {

    revealElements.forEach((element) => {

        element.classList.add("is-visible");

    });

}


/* =====================================================
   MAGNETIC BUTTONS
   Desktop + Pointer Devices
===================================================== */

if (!isTouchDevice) {

    const magneticButtons = document.querySelectorAll(
        ".btn, .nav-cta, .contact-button"
    );


    magneticButtons.forEach((button) => {

        button.addEventListener("mousemove", (event) => {

            const rect =
                button.getBoundingClientRect();

            const x =
                event.clientX -
                rect.left -
                rect.width / 2;

            const y =
                event.clientY -
                rect.top -
                rect.height / 2;


            button.style.transform =
                `translate(
                    ${x * 0.12}px,
                    ${y * 0.12}px
                )`;

        });


        button.addEventListener("mouseleave", () => {

            button.style.transform =
                "translate(0, 0)";

        });

    });

}


/* =====================================================
   SMOOTH ANCHOR NAVIGATION
   Desktop + Mobile
===================================================== */

document
    .querySelectorAll('a[href^="#"]')
    .forEach((link) => {

        link.addEventListener("click", (event) => {

            const targetId =
                link.getAttribute("href");

            if (
                !targetId ||
                targetId === "#"
            ) {
                return;
            }


            const target =
                document.querySelector(targetId);

            if (!target) return;


            event.preventDefault();


            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        });

    });


/* =====================================================
   MOBILE MENU
===================================================== */

const menuToggle =
    document.querySelector(".menu-toggle");

const navigation =
    document.querySelector(".nav");


if (menuToggle && navigation) {

    menuToggle.addEventListener("click", () => {

        const isOpen =
            navigation.classList.toggle(
                "mobile-active"
            );


        menuToggle.classList.toggle(
            "active",
            isOpen
        );


        menuToggle.setAttribute(
            "aria-expanded",
            String(isOpen)
        );

    });


    navigation
        .querySelectorAll("a")
        .forEach((link) => {

            link.addEventListener("click", () => {

                navigation.classList.remove(
                    "mobile-active"
                );


                menuToggle.classList.remove(
                    "active"
                );


                menuToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );

            });

        });

}


/* =====================================================
   HEADER SCROLL
   Desktop + Mobile
===================================================== */

const header =
    document.querySelector(".header");


window.addEventListener(
    "scroll",
    () => {

        if (!header) return;


        if (window.scrollY > 80) {

            header.classList.add("scrolled");

        } else {

            header.classList.remove("scrolled");

        }

    },
    { passive: true }
);


/* =====================================================
   EXPERTISE MAGNETIC INTERACTION
===================================================== */

const expertiseItems =
    document.querySelectorAll(
        ".expertise-item"
    );


if (!isTouchDevice) {

    expertiseItems.forEach((item) => {

        item.addEventListener("mousemove", (event) => {

            const rect =
                item.getBoundingClientRect();


            const x =
                event.clientX -
                rect.left -
                rect.width / 2;


            const y =
                event.clientY -
                rect.top -
                rect.height / 2;


            item.style.transform =
                `translate(
                    ${x * 0.025}px,
                    ${y * 0.025}px
                )`;

        });


        item.addEventListener("mouseleave", () => {

            item.style.transform = "";

        });

    });

}


/* =====================================================
   ACTIVE NAVIGATION
   Desktop + Mobile
===================================================== */

const sections =
    document.querySelectorAll(
        "section[id]"
    );


const navLinks =
    document.querySelectorAll(
        ".nav a"
    );


if ("IntersectionObserver" in window) {

    const navObserver =
        new IntersectionObserver(
            (entries) => {

                entries.forEach((entry) => {

                    if (!entry.isIntersecting) return;


                    const currentId =
                        entry.target.getAttribute("id");


                    navLinks.forEach((link) => {

                        link.classList.remove("active");


                        if (
                            link.getAttribute("href") ===
                            `#${currentId}`
                        ) {

                            link.classList.add("active");

                        }

                    });

                });

            },
            {
                threshold: 0.35
            }
        );


    sections.forEach((section) => {

        navObserver.observe(section);

    });

}


/* =====================================================
   MOBILE RESIZE SAFETY
===================================================== */

window.addEventListener("resize", () => {

    if (!navigation || !menuToggle) return;

    /*
       If screen becomes desktop,
       automatically close mobile menu.
    */

    if (window.innerWidth > 768) {

        navigation.classList.remove(
            "mobile-active"
        );

        menuToggle.classList.remove(
            "active"
        );

        menuToggle.setAttribute(
            "aria-expanded",
            "false"
        );

    }

});


/* =====================================================
   CONSOLE SIGNATURE
===================================================== */

console.log(
    "%c ASTHAMIL ",
    "background:#b8ff3d;color:#080808;" +
    "font-size:18px;font-weight:bold;" +
    "padding:8px 14px;"
);


console.log(
    "%c Full-Stack Developer Portfolio ",
    "color:#b8ff3d;font-size:12px;"
);
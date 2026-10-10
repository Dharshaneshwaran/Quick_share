import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { SplitText } from "gsap/SplitText";
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { MorphSVGPlugin } from "gsap/MorphSVGPlugin";
import { Draggable } from "gsap/Draggable";
import { InertiaPlugin } from "gsap/InertiaPlugin";
import { Observer } from "gsap/Observer";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

gsap.registerPlugin(ScrollTrigger, ScrollSmoother, SplitText, ScrambleTextPlugin,
    DrawSVGPlugin, MotionPathPlugin, MorphSVGPlugin, Draggable, InertiaPlugin,
    Observer, ScrollToPlugin);

type Revertible = { revert: () => void };
type Listener = [target: EventTarget, type: string, handler: EventListener];

/**
 * Runs the full showcase animation set for the page that is currently in the
 * DOM and returns a cleanup function that only destroys what this run created
 * (ScrollSmoother included), so route changes never leave content hidden.
 */
export function runAnimations(): () => void {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const beforeTriggers = new Set<ScrollTrigger>(ScrollTrigger.getAll());
    const beforeTweens = new Set<gsap.core.Animation>(
        gsap.globalTimeline.getChildren(true, true, true)
    );
    const splits: Revertible[] = [];
    const injected: Element[] = [];
    const listeners: Listener[] = [];
    let smoother: ScrollSmoother | null = null;
    let cancelled = false;

    const add = <T extends gsap.core.Animation>(animation: T): T => {
        beforeTweens.delete(animation);
        return animation;
    };
    const trackTrigger = (trigger: ScrollTrigger): ScrollTrigger => {
        beforeTriggers.delete(trigger);
        return trigger;
    };
    const on = (target: EventTarget, type: string, handler: EventListener) => {
        target.addEventListener(type, handler);
        listeners.push([target, type, handler]);
    };
    const split = (element: gsap.DOMTarget, vars: SplitText.Vars) => {
        try {
            const created = SplitText.create(element, vars);
            splits.push(created);
            return created;
        } catch {
            return null;
        }
    };

    /* ===== Testimonial drag carousel (also under reduced motion) ===== */
    const viewport = document.querySelector<HTMLElement>(".testi-viewport");
    const track = document.querySelector<HTMLElement>(".testi-track");
    const slides = track ? Array.from(track.querySelectorAll<HTMLElement>(".testi-slide")) : [];
    const dots = Array.from(document.querySelectorAll<HTMLElement>(".testi-dots i"));
    let idx = 0;
    let draggable: Draggable[] = [];

    const slideW = () => (viewport ? viewport.getBoundingClientRect().width : 0);
    const setDots = (i: number) => dots.forEach((d, n) => d.classList.toggle("active", n === i));
    const goTo = (i: number, dur = 0.55) => {
        if (!track || !slides.length) return;
        idx = Math.max(0, Math.min(slides.length - 1, i));
        add(gsap.to(track, {
            x: -idx * slideW(),
            duration: dur,
            ease: "power3.out",
            onComplete: () => draggable[0]?.update(),
        }));
        setDots(idx);
    };

    if (viewport && track && slides.length) {
        const bounds = () => ({ minX: -(slides.length - 1) * slideW(), maxX: 0 });
        const carousel: { instance?: Draggable } = {};
        document.body.classList.add("gsap-ready");

        draggable = Draggable.create(track, {
            type: "x",
            inertia: !reduce,
            allowWheelDrag: false,
            edgeResistance: 0.85,
            bounds: bounds(),
            snap: { x: (value: number) => Math.round(value / (slideW() || 1)) * (slideW() || 1) },
            onDragEnd: () => syncIndex(carousel.instance?.x ?? 0),
            onThrowComplete: () => syncIndex(carousel.instance?.x ?? 0),
        });
        carousel.instance = draggable[0];
        dots.forEach((dot, n) => on(dot, "click", () => goTo(n)));
        on(window, "resize", () => {
            if (!draggable[0]) return;
            draggable[0].applyBounds(bounds());
            add(gsap.to(track, { x: -idx * slideW(), duration: 0.35, ease: "power2.out" }));
        });
    }

    function syncIndex(position: number) {
        idx = Math.max(0, Math.min(slides.length - 1, Math.round(-position / (slideW() || 1))));
        setDots(idx);
    }

    if (reduce) {
        return () => dispose();
    }

    /* ===== Smooth scrolling (desktop + fine pointer) ===== */
    const smootherOn = window.matchMedia("(min-width: 992px) and (pointer: fine)").matches;
    if (smootherOn) {
        try {
            smoother = ScrollSmoother.create({
                wrapper: "#smooth-wrapper",
                content: "#smooth-content",
                smooth: 1.1,
                effects: true,
                smoothTouch: 0,
            });
            document.getElementById("smooth-wrapper")?.classList.add("smooth-enabled");
        } catch {
            smoother = null; /* graceful fallback to native scroll */
        }
    }

    /* ===== Hero entrance (SplitText + ScrambleText) Ã¢â‚¬â€ home page ===== */
    if (document.querySelector(".hero")) {
        const heroTl = add(gsap.timeline({ defaults: { ease: "power2.out", duration: 0.8 } }));
        heroTl.from(".hero .kicker", { y: -18, autoAlpha: 0 });

        const heroLines = split(".hero h1", {
            type: "lines",
            mask: "lines",
            linesClass: "h1-split",
        });
        if (heroLines) {
            heroTl.from(heroLines.lines, {
                yPercent: 115,
                stagger: 0.12,
                duration: 1,
                ease: "power4.out",
            }, "-=0.45");
        } else {
            heroTl.from(".hero h1", { y: 40, autoAlpha: 0 }, "-=0.45");
        }

        heroTl
            .from(".hero .lead", { y: 28, autoAlpha: 0, duration: 0.7 }, "-=0.5")
            .from(".hero-actions a", { y: 24, autoAlpha: 0, stagger: 0.12, duration: 0.6 }, "-=0.4")
            .from(".hero-quote", { y: 24, autoAlpha: 0, duration: 0.7 }, "-=0.3")
            .from(".hero-visual", { scale: 0.92, autoAlpha: 0, duration: 1 }, "-=0.9")
            .from(".float-card", { y: 18, autoAlpha: 0, stagger: 0.15, duration: 0.6 }, "-=0.5")
            .from(".scroll-badge", { scale: 0, autoAlpha: 0, duration: 0.7, ease: "back.out(1.7)" }, "-=0.35");

        const heroKicker = document.querySelector<HTMLElement>(".hero .kicker");
        if (heroKicker) {
            const text = heroKicker.textContent || "";
            heroTl.to(heroKicker, {
                duration: 1.2,
                ease: "none",
                scrambleText: { text, chars: "upperCase", speed: 0.6, revealDelay: 0.2 },
            }, 0.15);
        }

        add(gsap.to(".hero-visual .main-img", {
            yPercent: 8,
            ease: "none",
            scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: true },
        }));
    }

    /* ===== Inner page banner entrance ===== */
    const banner = document.querySelector<HTMLElement>(".page-banner");
    if (banner) {
        const bannerH1 = banner.querySelector("h1");
        const bannerTl = add(gsap.timeline({ defaults: { ease: "power3.out" } }));
        let bannerSplitDone = false;

        if (bannerH1) {
            const lines = split(bannerH1, { type: "lines", mask: "lines", linesClass: "h1-split" });
            if (lines) {
                bannerTl.from(lines.lines, {
                    yPercent: 115,
                    stagger: 0.1,
                    duration: 0.9,
                    ease: "power4.out",
                }, 0);
                bannerSplitDone = true;
            }
        }
        if (!bannerSplitDone && bannerH1) {
            bannerTl.from(bannerH1, { yPercent: 60, autoAlpha: 0, duration: 0.9 }, 0);
        }

        const breadcrumb = banner.querySelector(".breadcrumb");
        if (breadcrumb) {
            bannerTl.from(breadcrumb, { y: 18, autoAlpha: 0, duration: 0.6 }, "-=0.45");
        }
    }

    /* ===== Section headings ===== */
    document.querySelectorAll<HTMLElement>(".heading").forEach((heading) => {
        const h2 = heading.querySelector("h2");
        if (h2) {
            const lines = split(h2, {
                type: "lines",
                mask: "lines",
                linesClass: "h2-split",
                autoSplit: true,
                onSplit: (instance) => add(gsap.from(instance.lines, {
                    yPercent: 115,
                    stagger: 0.1,
                    duration: 0.9,
                    ease: "power4.out",
                    scrollTrigger: { trigger: h2, start: "top 88%" },
                })),
            });
            if (!lines) {
                add(gsap.from(h2, {
                    y: 34,
                    autoAlpha: 0,
                    duration: 0.8,
                    scrollTrigger: { trigger: h2, start: "top 88%" },
                }));
            }
            const extras = heading.querySelectorAll(".kicker, p");
            if (extras.length) {
                add(gsap.from(extras, {
                    y: 24,
                    autoAlpha: 0,
                    stagger: 0.08,
                    duration: 0.7,
                    ease: "power2.out",
                    scrollTrigger: { trigger: heading, start: "top 88%" },
                }));
            }
        } else {
            add(gsap.from(heading.children, {
                y: 34,
                autoAlpha: 0,
                stagger: 0.1,
                duration: 0.7,
                ease: "power2.out",
                scrollTrigger: { trigger: heading, start: "top 85%" },
            }));
        }
    });

    document.querySelectorAll<HTMLElement>(".section .kicker").forEach((kicker) => {
        if (kicker.closest(".heading") || kicker.closest(".hpanel-cta")) return;
        add(gsap.from(kicker, {
            y: -14,
            autoAlpha: 0,
            duration: 0.6,
            ease: "power2.out",
            scrollTrigger: { trigger: kicker, start: "top 90%" },
        }));
    });

    /* ===== Card grids + page blocks ===== */
    [
        ".cause-tile",
        ".program-card",
        ".gallery-sec .image",
        ".testi-card",
        ".stat-item",
        ".mission-card",
        ".team-card",
        ".ci-item",
        ".form-card",
        ".faq-item",
        ".timeline li",
        ".lead-note",
        ".feature-split .hero-actions",
    ].forEach((selector) => {
        const elements = document.querySelectorAll(selector);
        if (!elements.length) return;
        add(gsap.from(elements, {
            y: 40,
            autoAlpha: 0,
            stagger: 0.08,
            duration: 0.7,
            ease: "power2.out",
            scrollTrigger: { trigger: elements[0], start: "top 88%" },
        }));
    });

    const media = document.querySelector(".section .feature-media");
    if (media) {
        add(gsap.from(media, {
            y: 44,
            autoAlpha: 0,
            duration: 0.9,
            ease: "power2.out",
            scrollTrigger: { trigger: media, start: "top 85%" },
        }));
    }
    const checkItems = document.querySelectorAll(".check-list li");
    if (checkItems.length) {
        add(gsap.from(checkItems, {
            x: -26,
            autoAlpha: 0,
            stagger: 0.1,
            duration: 0.6,
            ease: "power2.out",
            scrollTrigger: { trigger: ".check-list", start: "top 88%" },
        }));
    }

    const cta = document.querySelector(".cta-band");
    if (cta) {
        add(gsap.from(cta.querySelectorAll("h2, p, .cta-actions"), {
            y: 30,
            autoAlpha: 0,
            stagger: 0.12,
            duration: 0.7,
            ease: "power2.out",
            scrollTrigger: { trigger: cta, start: "top 85%" },
        }));
    }

    /* ===== Velocity-reactive marquees ===== */
    const marquees: { tw: gsap.core.Tween; cur: number; target: number; restore: () => void }[] = [];
    const takeOverMarquee = (selector: string, from: number, to: number, duration: number) => {
        const element = document.querySelector<HTMLElement>(selector);
        if (!element) return;
        const inlineAnimation = element.style.animation;
        element.style.animation = "none";
        marquees.push({
            tw: add(gsap.fromTo(element, { xPercent: from }, {
                xPercent: to,
                duration,
                ease: "none",
                repeat: -1,
            })),
            cur: 1,
            target: 1,
            restore: () => { element.style.animation = inlineAnimation; },
        });
    };
    takeOverMarquee(".ghost-row:not(.reverse) .ghost-inner", 0, -50, 30);
    takeOverMarquee(".ghost-row.reverse .ghost-inner", -50, 0, 38);
    takeOverMarquee(".ticker-inner", -50, 0, 26);

    if (marquees.length) {
        trackTrigger(ScrollTrigger.create({
            trigger: document.body,
            start: 0,
            end: "max",
            onUpdate(self) {
                const velocity = self.getVelocity();
                if (Math.abs(velocity) < 40) return;
                const boost = 1 + Math.min(Math.abs(velocity) / 2500, 5);
                const sign = velocity < 0 ? -1 : 1;
                marquees.forEach((marquee) => { marquee.target = boost * sign; });
            },
        }));
        gsap.ticker.add(tickMarquees);
    }

    function tickMarquees() {
        marquees.forEach((marquee) => {
            marquee.target += (1 - marquee.target) * 0.04;
            marquee.cur += (marquee.target - marquee.cur) * 0.1;
            marquee.tw.timeScale(marquee.cur);
        });
    }

    /* ===== Pinned horizontal programs track ===== */
    const horizontalTrack = document.querySelector<HTMLElement>(".htrack");
    if (horizontalTrack && window.innerWidth > 991) {
        document.body.classList.add("htrack-pinned");
        const distance = () => Math.max(0, horizontalTrack.scrollWidth - window.innerWidth);
        add(gsap.to(horizontalTrack, {
            x: () => -distance(),
            ease: "none",
            scrollTrigger: {
                trigger: ".programs-pin",
                start: "top top",
                end: () => "+=" + Math.max(distance(), 1),
                pin: true,
                scrub: 0.6,
                anticipatePin: 1,
                invalidateOnRefresh: true,
            },
        }));
    }

    /* ===== DrawSVG squiggle underline after each heading ===== */
    document.querySelectorAll<HTMLElement>(".heading h2").forEach((h2) => {
        const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        svg.setAttribute("viewBox", "0 0 140 14");
        svg.setAttribute("class", "squiggle");
        svg.setAttribute("aria-hidden", "true");
        const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
        path.setAttribute("d", "M3 10 C 35 2, 65 14, 95 7 S 130 3, 137 8");
        svg.appendChild(path);
        h2.insertAdjacentElement("afterend", svg);
        injected.push(svg);
        add(gsap.fromTo(path,
            { drawSVG: "0%" },
            {
                drawSVG: "100%",
                duration: 1.1,
                ease: "power2.out",
                scrollTrigger: { trigger: svg, start: "top 92%" },
            }));
    });

    /* ===== MotionPath heart along the CTA line ===== */
    if (document.querySelector("#ctaLine") && document.querySelector(".cta-heart")) {
        gsap.set(".cta-heart", { autoAlpha: 0 });
        add(gsap.timeline({
            repeat: -1,
            repeatDelay: 2.4,
            scrollTrigger: {
                trigger: ".cta-band",
                start: "top 85%",
                toggleActions: "play pause resume pause",
            },
        })
            .to(".cta-heart", { autoAlpha: 1, duration: 0.35 })
            .to(".cta-heart", {
                motionPath: {
                    path: "#ctaLine",
                    align: "#ctaLine",
                    alignOrigin: [0.5, 0.5],
                    autoRotate: false,
                },
                duration: 3,
                ease: "power1.inOut",
            }, "<")
            .to(".cta-heart", { autoAlpha: 0, duration: 0.35 }, "-=0.35"));
    }

    /* ===== MorphSVG hero blobs + slow float ===== */
    if (document.querySelector(".blob-a .blob-main")) {
        add(gsap.timeline({ repeat: -1, yoyo: true, defaults: { duration: 3.6, ease: "sine.inOut" } })
            .to(".blob-a .blob-main", { morphSVG: ".blob-a .blob-alt" })
            .to(".blob-b .blob-main", { morphSVG: ".blob-b .blob-alt" }, "<0.7"));
    }
    if (document.querySelector(".blob-a")) {
        add(gsap.to(".blob-a", {
            y: -24,
            rotation: 6,
            transformOrigin: "50% 50%",
            repeat: -1,
            yoyo: true,
            duration: 5.5,
            ease: "sine.inOut",
        }));
        add(gsap.to(".blob-b", {
            y: 22,
            rotation: -8,
            transformOrigin: "50% 50%",
            repeat: -1,
            yoyo: true,
            duration: 7,
            ease: "sine.inOut",
        }));
    }

    /* ===== Scroll badge: draw ring, rotate text, fade, ScrollTo ===== */
    const badge = document.getElementById("scrollBadge");
    if (badge) {
        if (document.querySelector(".badge-stroke")) {
            add(gsap.fromTo(".badge-stroke",
                { drawSVG: "0%" },
                { drawSVG: "100%", duration: 1.6, ease: "power2.inOut", delay: 0.6 }));
        }
        add(gsap.to(".badge-rot", {
            rotation: 360,
            svgOrigin: "60 60",
            repeat: -1,
            duration: 18,
            ease: "none",
        }));
        add(gsap.to(".scroll-badge svg", {
            autoAlpha: 0,
            y: -30,
            scrollTrigger: {
                trigger: ".hero",
                start: "top+=300 top",
                end: "top+=520 top",
                scrub: true,
            },
        }));

        const goNext = () => {
            const stats = document.querySelector(".stats");
            if (!stats) return;
            add(gsap.to(window, {
                scrollTo: { y: stats, offsetY: 70 },
                duration: 1.1,
                ease: "power2.inOut",
            }));
        };
        on(badge, "click", goNext);
        on(badge, "keydown", (event) => {
            const key = (event as KeyboardEvent).key;
            if (key === "Enter" || key === " ") {
                event.preventDefault();
                goNext();
            }
        });
    }

    /* ===== Refresh triggers once everything has settled ===== */
    const refresh = () => ScrollTrigger.refresh();
    on(window, "load", refresh);
    const fonts = document.fonts;
    if (fonts?.ready) {
        Promise.race([
            fonts.ready,
            new Promise<void>((resolve) => window.setTimeout(resolve, 1500)),
        ]).then(() => {
            if (!cancelled) ScrollTrigger.refresh();
        });
    }

    return () => dispose();

    function dispose() {
        cancelled = true;
        gsap.ticker.remove(tickMarquees);
        marquees.forEach((marquee) => marquee.restore());
        listeners.forEach(([target, type, handler]) => target.removeEventListener(type, handler));
        splits.forEach((created) => {
            try { created.revert(); } catch { /* already detached */ }
        });
        injected.forEach((node) => node.remove());
        ScrollTrigger.getAll().forEach((trigger) => {
            if (!beforeTriggers.has(trigger)) trigger.kill();
        });
        gsap.globalTimeline.getChildren(true, true, true).forEach((tween) => {
            if (!beforeTweens.has(tween)) tween.kill();
        });
        draggable.forEach((instance) => instance.kill());
        if (smoother) {
            smoother.kill();
            smoother = null;
            document.getElementById("smooth-wrapper")?.classList.remove("smooth-enabled");
        }
        document.body.classList.remove("gsap-ready", "htrack-pinned");
    }
}

"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { runAnimations } from "@/lib/animation";

function startCounters(): () => void {
    const counters = Array.from(document.querySelectorAll<HTMLElement>("[data-count]"));
    if (!counters.length) return () => {};

    const animate = (element: HTMLElement) => {
        const target = parseInt(element.dataset.count || "0", 10) || 0;
        const duration = 1600;
        const start = performance.now();
        const step = (now: number) => {
            const progress = Math.min((now - start) / duration, 1);
            const value = Math.floor(target * (1 - Math.pow(1 - progress, 3)));
            element.textContent = value.toLocaleString() + (progress === 1 ? "+" : "");
            if (progress < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
    };

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    animate(entry.target as HTMLElement);
                    observer.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.4 },
    );
    counters.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
}

/**
 * Next streams the page content behind a boundary that React hydrates after
 * the layout shell (header, cursor, effects) is already attached. Animations
 * mutate markup with GSAP/SplitText, so starting them before the page content
 * hydrates would make React report a hydration mismatch and throw the whole
 * tree away. The footer is the last node of the page content, so once React
 * has attached to it the entire page is safe to animate.
 */
function isPageHydrated(): boolean {
    const content = document.getElementById("smooth-content");
    const lastNode = content?.querySelector("footer") ?? content?.lastElementChild ?? null;
    if (!lastNode) return true;
    return Object.keys(lastNode).some((key) => key.startsWith("__reactFiber"));
}

/**
 * ScrollTrigger's `pin` moves the pinned node into a generated `.pin-spacer`.
 * React keeps a reference to the node's *original* parent, so removing that
 * node after it was re-parented throws `NotFoundError` and React then unmounts
 * the entire app. Detach such nodes from wherever they actually live (and drop
 * the spacer, so `ScrollTrigger.kill()` cannot re-insert the detached node).
 */
function guardReparentedNodes(): void {
    const prototype = Node.prototype as unknown as { __reparentGuard?: boolean };
    if (prototype.__reparentGuard) return;

    const original = Node.prototype.removeChild;
    const patched = function <T extends Node>(this: Node, child: T): T {
        const realParent = child.parentNode;
        if (realParent && realParent !== this) {
            original.call(realParent, child);
            if (realParent instanceof Element && realParent.classList.contains("pin-spacer")) {
                realParent.parentNode?.removeChild(realParent);
            }
            return child;
        }
        return original.call(this, child) as T;
    } as typeof Node.prototype.removeChild;

    Node.prototype.removeChild = patched;
    prototype.__reparentGuard = true;
}

/** True when a click is about to trigger a client-side route change. */
function startsNavigation(event: MouseEvent): boolean {
    if (event.defaultPrevented || event.button !== 0) return false;
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return false;

    const anchor = (event.target as Element | null)?.closest?.("a");
    if (!anchor) return false;
    const target = anchor.getAttribute("target");
    if (target && target !== "_self") return false;

    const href = anchor.getAttribute("href");
    if (!href || href.startsWith("#") || href.startsWith("mailto:") || href.startsWith("tel:")) return false;

    let url: URL;
    try {
        url = new URL(href, window.location.href);
    } catch {
        return false;
    }
    if (url.origin !== window.location.origin) return false;

    return url.pathname !== window.location.pathname || url.search !== window.location.search;
}

export default function SiteEffects() {
    const pathname = usePathname();
    const teardownRef = useRef<() => void>(() => {});

    useEffect(() => {
        guardReparentedNodes();

        window.scrollTo({ top: 0, left: 0, behavior: "auto" });

        let cancelled = false;
        let disposed = false;
        let settled = false;
        let attempts = 0;
        let stopAnimations: (() => void) | undefined;
        let stopCounters: (() => void) | undefined;

        /**
         * Tears every animation down, restoring the DOM GSAP re-parented
         * (pin spacers, SplitText wrappers, injected SVGs). Safe to call twice.
         */
        const teardown = () => {
            if (disposed) return;
            disposed = true;
            stopCounters?.();
            stopCounters = undefined;
            stopAnimations?.();
            stopAnimations = undefined;
        };
        teardownRef.current = teardown;

        const start = () => {
            if (cancelled || disposed) return;
            stopAnimations = runAnimations();
            stopCounters = startCounters();
        };

        const waitForHydration = () => {
            if (cancelled || disposed) return;
            if (isPageHydrated()) {
                if (settled) {
                    start();
                    return;
                }
                settled = true;
            } else {
                settled = false;
            }
            if (attempts++ > 200) {
                start();
                return;
            }
            setTimeout(waitForHydration, 50);
        };
        waitForHydration();

        /*
         * React swaps the page DOM in the mutation phase, which runs *before*
         * this effect's cleanup. GSAP's pin has therefore not been reverted yet
         * and React would remove a re-parented node (and unmount the app).
         * Animations are torn down the moment navigation starts instead — both
         * for link clicks and for back/forward (`popstate`), which React only
         * renders asynchronously.
         */
        const onLinkClick = (event: MouseEvent) => {
            if (startsNavigation(event)) teardown();
        };
        document.addEventListener("click", onLinkClick, true);
        window.addEventListener("popstate", teardown);

        return () => {
            cancelled = true;
            document.removeEventListener("click", onLinkClick, true);
            window.removeEventListener("popstate", teardown);
            teardown();
        };
    }, [pathname]);

    return null;
}

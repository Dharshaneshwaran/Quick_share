"use client";

import { useEffect } from "react";

export default function CustomCursor() {
    useEffect(() => {
        const dot = document.querySelector<HTMLElement>(".cursor-dot");
        const ring = document.querySelector<HTMLElement>(".cursor-ring");
        if (!dot || !ring || !window.matchMedia("(pointer: fine)").matches) return;

        let mx = window.innerWidth / 2;
        let my = window.innerHeight / 2;
        let rx = mx;
        let ry = my;
        let frame = 0;

        const placeDot = () => {
            dot.style.transform = `translate(${mx}px,${my}px) rotate(45deg)`;
        };

        placeDot();
        ring.style.transform = `translate(${rx}px,${ry}px)`;
        document.body.classList.add("cursor-active");

        const interactive = [
            "a", "button", "input", "textarea", "select", "label",
            ".cause-tile", ".program-card", ".image", ".testi-card", ".scroll-badge",
            ".team-card", ".mission-card", ".ci-item", ".faq-q", ".stat-item", ".timeline li",
            ".amount-pills label", ".social a", ".back-top", ".pop-image",
        ].join(", ");

        const setHover = (on: boolean) => {
            dot.classList.toggle("is-hover", on);
            ring.classList.toggle("is-hover", on);
        };
        const onMouseMove = (event: MouseEvent) => {
            mx = event.clientX;
            my = event.clientY;
            placeDot();
        };
        const onMouseOver = (event: MouseEvent) => {
            const target = event.target as Element | null;
            if (target?.closest?.(interactive)) setHover(true);
        };
        const onMouseOut = (event: MouseEvent) => {
            const target = event.target as Element | null;
            if (target?.closest?.(interactive)) setHover(false);
        };
        const loop = () => {
            rx += (mx - rx) * 0.18;
            ry += (my - ry) * 0.18;
            ring.style.transform = `translate(${rx}px,${ry}px)`;
            frame = requestAnimationFrame(loop);
        };

        window.addEventListener("mousemove", onMouseMove, { passive: true });
        document.addEventListener("mouseover", onMouseOver);
        document.addEventListener("mouseout", onMouseOut);
        frame = requestAnimationFrame(loop);

        return () => {
            cancelAnimationFrame(frame);
            window.removeEventListener("mousemove", onMouseMove);
            document.removeEventListener("mouseover", onMouseOver);
            document.removeEventListener("mouseout", onMouseOut);
            document.body.classList.remove("cursor-active");
        };
    }, []);

    return (
        <>
            <div className="cursor-dot" aria-hidden="true" />
            <div className="cursor-ring" aria-hidden="true" />
        </>
    );
}

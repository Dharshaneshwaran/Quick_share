"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const NAV_LINKS = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/programs", label: "Programs" },
    { href: "/gallery", label: "Gallery" },
    { href: "/contact", label: "Contact" },
];

export default function SiteHeader() {
    const pathname = usePathname();
    /* Menu is bound to the route it was opened on, so a route change always
       closes it without needing a state-sync effect. */
    const [openAt, setOpenAt] = useState<string | null>(null);
    const open = openAt === pathname;
    const closeMenu = () => setOpenAt(null);

    useEffect(() => {
        const header = document.getElementById("siteHeader");
        const onScroll = () => header?.classList.toggle("scrolled", window.scrollY > 10);
        window.addEventListener("scroll", onScroll, { passive: true });
        onScroll();
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    useEffect(() => {
        if (!open) return;

        const onKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") closeMenu();
        };
        const onPointerDown = (event: MouseEvent) => {
            const header = document.getElementById("siteHeader");
            if (header && !header.contains(event.target as Node)) closeMenu();
        };
        document.addEventListener("keydown", onKeyDown);
        document.addEventListener("mousedown", onPointerDown);
        return () => {
            document.removeEventListener("keydown", onKeyDown);
            document.removeEventListener("mousedown", onPointerDown);
        };
    }, [open]);

    const isActive = (href: string) =>
        href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(href + "/");

    return (
        <header className="site-header" id="siteHeader">
            <div className="container">
                <Link href="/" className="brand">
                    <span className="brand-icon"><i className="fa fa-heartbeat" /></span>
                    <span className="brand-text">Deetya Marga<em>Foundation</em></span>
                </Link>
                <button
                    type="button"
                    className={`nav-toggle${open ? " open" : ""}`}
                    aria-label="Toggle navigation"
                    aria-expanded={open}
                    onClick={() => setOpen((value) => !value)}
                >
                    <span /><span /><span />
                </button>
                <nav className={`main-nav${open ? " open" : ""}`}>
                    <ul>
                        {NAV_LINKS.map((link) => (
                            <li key={link.href}>
                                <Link
                                    href={link.href}
                                    className={isActive(link.href) ? "active" : undefined}
                                    onClick={() => setOpen(false)}
                                >
                                    {link.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                    <Link href="/donate" className="btn-donate" onClick={() => setOpen(false)}>
                        Donate
                    </Link>
                </nav>
            </div>
        </header>
    );
}

import Link from "next/link";
import NewsletterForm from "./NewsletterForm";

const SOCIAL = [
    { href: "#", src: "/img/icons/facebook.png", alt: "Facebook", label: "Facebook" },
    { href: "#", src: "/img/icons/instagram.png", alt: "Instagram", label: "Instagram" },
    { href: "#", src: "/img/icons/youtube.png", alt: "YouTube", label: "YouTube" },
    { href: "#", src: "/img/icons/linkedin.png", alt: "LinkedIn", label: "LinkedIn" },
];

const QUICK_LINKS = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About Us" },
    { href: "/programs", label: "Programs" },
    { href: "/gallery", label: "Gallery" },
    { href: "/donate", label: "Donate" },
    { href: "/contact", label: "Contact" },
];

function Brand() {
    return (
        <Link href="/" className="brand">
            <span className="brand-icon"><i className="fa fa-heartbeat" /></span>
            <span className="brand-text">Deetya Marga<em>Foundation</em></span>
        </Link>
    );
}

function ContactList({ compact = false }: { compact?: boolean }) {
    if (compact) {
        return (
            <ul className="f-contact">
                <li><i className="fa fa-map-marker" /><span>45, 5th Block, Jayanagar, Bengaluru, Karnataka 560041</span></li>
                <li>
                    <i className="fa fa-phone" />
                    <span>
                        <a href="tel:+919876543210">+91 98765 43210</a> · <a href="tel:+918041235678">+91 80 4123 5678</a>
                    </span>
                </li>
                <li><i className="fa fa-envelope" /><span><a href="mailto:info@deetyamarga.org">info@deetyamarga.org</a></span></li>
                <li><i className="fa fa-clock-o" /><span>Mon–Sat, 9:00 AM – 6:00 PM</span></li>
            </ul>
        );
    }

    return (
        <ul className="f-contact">
            <li>
                <i className="fa fa-map-marker" />
                <span>45, 5th Block, Jayanagar,<br />Bengaluru, Karnataka 560041, India</span>
            </li>
            <li><i className="fa fa-phone" /><a href="tel:+919876543210">+91 98765 43210</a></li>
            <li><i className="fa fa-phone" /><a href="tel:+918041235678">+91 80 4123 5678</a></li>
            <li><i className="fa fa-envelope" /><a href="mailto:info@deetyamarga.org">info@deetyamarga.org</a></li>
            <li><i className="fa fa-clock-o" /><span>Mon – Sat, 9:00 AM – 6:00 PM</span></li>
        </ul>
    );
}

export default function SiteFooter({ variant = "inner" }: { variant?: "home" | "inner" }) {
    if (variant === "home") {
        return (
            <footer>
                <div className="container">
                    <div className="row footer-grid">
                        <div className="col-lg-4 col-md-6">
                            <Brand />
                            <p style={{ marginBottom: 18 }}>
                                Medicine, education and free clinic care for families who need it most. Together we can do so much.
                            </p>
                            <div className="social">
                                {SOCIAL.map((item) => (
                                    <a key={item.alt} href={item.href}>
                                        <img src={item.src} alt={item.alt} />
                                    </a>
                                ))}
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6">
                            <h4>Get In Touch</h4>
                            <ContactList compact />
                        </div>
                        <div className="col-lg-4 col-md-6">
                            <h4>Quick Links</h4>
                            <ul className="f-links">
                                {QUICK_LINKS.filter((link) => link.href !== "/").map((link) => (
                                    <li key={link.href}><Link href={link.href}>{link.label}</Link></li>
                                ))}
                            </ul>
                        </div>
                    </div>
                    <div className="footer-bottom">
                        © {2026} Deetya Marga Foundation. All rights reserved. · <Link href="/donate">Privacy Policy</Link>
                    </div>
                </div>
            </footer>
        );
    }

    return (
        <footer>
            <div className="container">
                <div className="row footer-grid">
                    <div className="col-lg-4 col-md-6">
                        <Brand />
                        <p>
                            A registered welfare foundation providing medicine, education and free clinic services to
                            underserved communities in Bengaluru and beyond.
                        </p>
                        <div className="social" style={{ marginTop: 18 }}>
                            {SOCIAL.map((item) => (
                                <a key={item.alt} href={item.href} aria-label={item.label}>
                                    <img src={item.src} alt={item.alt} />
                                </a>
                            ))}
                            <a href="mailto:info@deetyamarga.org" aria-label="Gmail">
                                <img src="/img/icons/gmail.png" alt="Gmail" />
                            </a>
                        </div>
                    </div>
                    <div className="col-lg-2 col-md-6">
                        <h4>Quick Links</h4>
                        <ul className="f-links">
                            {QUICK_LINKS.map((link) => (
                                <li key={link.href}><Link href={link.href}>{link.label}</Link></li>
                            ))}
                        </ul>
                    </div>
                    <div className="col-lg-3 col-md-6">
                        <h4>Contact Us</h4>
                        <ContactList />
                    </div>
                    <div className="col-lg-3 col-md-6">
                        <h4>Newsletter</h4>
                        <p>Get monthly updates on our medicine drives, school sponsorships and clinic days.</p>
                        <NewsletterForm />
                    </div>
                </div>
            </div>
            <div className="footer-bottom">
                <div className="container">
                    <p className="mb-0">
                        Copyright © {2026} Deetya Marga Foundation. All Rights Reserved. |{" "}
                        <Link href="/donate">Support Medicine, Education &amp; Clinic</Link>
                    </p>
                </div>
            </div>
        </footer>
    );
}

import type { Metadata } from "next";
import Link from "next/link";
import ContactForm from "@/components/ContactForm";
import SiteFooter from "@/components/SiteFooter";

export const metadata: Metadata = {
    title: "Contact Us",
    description:
        "Get in touch with Deetya Marga Foundation for donation pickups, volunteering, clinic visits and partnerships.",
};

const CONTACT_ITEMS = [
    { icon: "fa-map-marker", title: "Head Office & Clinic", body: <>45, 5th Block, Jayanagar,<br />Bengaluru, Karnataka 560041, India</> },
    {
        icon: "fa-phone",
        title: "Phone",
        body: (
            <>
                <a href="tel:+919876543210">+91 98765 43210</a> (Donation &amp; General)<br />
                <a href="tel:+918041235678">+91 80 4123 5678</a> (Clinic Desk)
            </>
        ),
    },
    {
        icon: "fa-envelope",
        title: "Email",
        body: (
            <>
                <a href="mailto:info@deetyamarga.org">info@deetyamarga.org</a><br />
                <a href="mailto:clinic@deetyamarga.org">clinic@deetyamarga.org</a>
            </>
        ),
    },
    { icon: "fa-clock-o", title: "Working Hours", body: <>Monday – Saturday: 9:00 AM – 6:00 PM<br />Clinic OPD: 10:00 AM – 4:00 PM</> },
];

const SOCIAL = [
    { href: "#", src: "/img/icons/facebook.png", alt: "Facebook", label: "Facebook" },
    { href: "#", src: "/img/icons/instagram.png", alt: "Instagram", label: "Instagram" },
    { href: "#", src: "/img/icons/youtube.png", alt: "YouTube", label: "YouTube" },
    { href: "#", src: "/img/icons/linkedin.png", alt: "LinkedIn", label: "LinkedIn" },
    { href: "mailto:info@deetyamarga.org", src: "/img/icons/gmail.png", alt: "Gmail", label: "Gmail" },
];

export default function ContactPage() {
    return (
        <>
            {/* ======= Page banner ======= */}
            <section className="page-banner">
                <div className="container">
                    <h1>Contact Us</h1>
                    <div className="breadcrumb">
                        <Link href="/">Home</Link> <span>/</span> <span>Contact</span>
                    </div>
                </div>
            </section>

            {/* ======= Contact ======= */}
            <section className="section">
                <div className="container">
                    <div className="heading center">
                        <span className="kicker">We Would Love To Hear From You</span>
                        <h2>Connect With <span>Deetya Marga</span></h2>
                        <p>Donation pickup, volunteering, clinic appointments or partnerships — send us a message and we
                            will reply within one working day.</p>
                    </div>

                    <div className="row">
                        <div className="col-lg-5">
                            <div className="contact-info">
                                <h3>Reach Us Directly</h3>
                                <p>Our office and clinic are open six days a week. Walk-ins are welcome.</p>

                                {CONTACT_ITEMS.map((item) => (
                                    <div className="ci-item" key={item.title}>
                                        <span className="ci-icon"><i className={`fa ${item.icon}`} /></span>
                                        <div>
                                            <h5>{item.title}</h5>
                                            <p>{item.body}</p>
                                        </div>
                                    </div>
                                ))}

                                <div className="social">
                                    {SOCIAL.map((item) => (
                                        <a href={item.href} aria-label={item.label} key={item.label}>
                                            <img src={item.src} alt={item.alt} />
                                        </a>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-7">
                            <div className="form-card">
                                <span className="kicker">Send A Message</span>
                                <div className="heading" style={{ marginBottom: 25 }}>
                                    <h2>How Can We <span>Help?</span></h2>
                                </div>
                                <ContactForm />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ======= Map ======= */}
            <section className="section alt">
                <div className="container">
                    <div className="heading center">
                        <span className="kicker">Find Us</span>
                        <h2>Visit Our <span>Office & Clinic</span></h2>
                        <p>45, 5th Block, Jayanagar, Bengaluru, Karnataka 560041 — parking available outside the clinic.</p>
                    </div>
                    <div className="map-box">
                        <iframe
                            src="https://www.google.com/maps?q=Jayanagar,+Bengaluru,+Karnataka,+India&output=embed"
                            loading="lazy"
                            title="Deetya Marga Foundation location"
                            referrerPolicy="no-referrer-when-downgrade"
                        />
                    </div>
                </div>
            </section>

            {/* ======= CTA ======= */}
            <section className="cta-band">
                <div className="container">
                    <h2>Ready To Make A Difference?</h2>
                    <p>Don&apos;t wait — your donation funds medicine, school fees and free clinic care today.</p>
                    <div className="cta-actions">
                        <Link href="/donate" className="btn-gold btn1">Donate Now</Link>
                        <Link href="/programs" className="btn1 btn-light">View Programs</Link>
                    </div>
                </div>
            </section>

            <SiteFooter />
        </>
    );
}

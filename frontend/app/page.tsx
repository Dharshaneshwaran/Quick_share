import type { Metadata } from "next";
import Link from "next/link";
import Gallery from "@/components/Gallery";
import SiteFooter from "@/components/SiteFooter";

export const metadata: Metadata = {
    title: "Deetya Marga Foundation — Medicine, Education & Clinic for All",
    description:
        "Deetya Marga Foundation provides medicine, education and free clinic services to families in need. Donate today and give hope.",
};

const CAUSES = [
    { icon: "fa-medkit", title: "Medicine Aid", text: "Life-saving medicines and monthly treatment kits for patients who cannot afford care." },
    { icon: "fa-graduation-cap", title: "Education Support", text: "School fees, books and supplies so underprivileged children never miss a classroom." },
    { icon: "fa-hospital-o", title: "Free Clinic", text: "Consultations, check-ups and basic treatment for families with no medical cover." },
    { icon: "fa-stethoscope", title: "Medical Equipment", text: "Beds, diagnostics and clinic equipment that keep our free clinics running every day." },
    { icon: "fa-book", title: "Books & Supplies", text: "Stationery, uniforms and learning material for children in our education program." },
    { icon: "fa-heart", title: "General Fund", text: "Flexible support wherever the need is greatest — food, shelter and emergency relief." },
];

const PROGRAMS = [
    {
        image: "/img/miss/1.jpg",
        alt: "Medicine program",
        tag: "Medicine",
        title: "Health & Medicine",
        text: "Free and subsidised medicines, monthly kits and emergency treatment support for chronic patients.",
    },
    {
        image: "/img/miss/4.jpg",
        alt: "Education program",
        tag: "Education",
        title: "Education for All",
        text: "Scholarships, school supplies and tutoring so children from low-income homes keep learning.",
    },
    {
        image: "/img/miss/3.jpg",
        alt: "Clinic program",
        tag: "Clinic",
        title: "Community Clinic",
        text: "Free consultations, diagnostics and follow-up care at neighbourhood clinics across the city.",
    },
];

const TESTIMONIALS = [
    {
        initials: "AR",
        name: "Ayesha Raza",
        role: "Beneficiary Family",
        quote: "The medicine kit reached my father every month for a whole year. This foundation gave our family hope when we had none.",
    },
    {
        initials: "HK",
        name: "Hassan Khan",
        role: "Monthly Donor",
        quote: "I have donated for three years. Every report shows exactly where the money went — that transparency keeps me giving.",
    },
    {
        initials: "SM",
        name: "Dr. Sana Malik",
        role: "Partner Physician",
        quote: "Our free clinic days are only possible because of their support. Hundreds of patients receive care they could never afford.",
    },
];

const HOME_GALLERY = [
    { src: "/img/img-4.jpg", alt: "Field work", speed: 1.06 },
    { src: "/img/miss/3.jpg", alt: "Clinic day" },
    { src: "/img/miss/4.jpg", alt: "School supplies" },
    { src: "/img/miss/1.jpg", alt: "Medicine drive", speed: 0.95 },
    { src: "/img/img-2.jpeg", alt: "Donation drive" },
    { src: "/img/img-3.jpg", alt: "Volunteers" },
];

export default function HomePage() {
    return (
        <>
            {/* ===== Hero (illustration) ===== */}
            <section className="hero">
                <svg className="hero-blob blob-a" viewBox="0 0 200 200" aria-hidden="true">
                    <path className="blob-main" fill="rgba(245,166,35,.16)" d="M40,100 C40,60 70,35 105,38 C140,41 168,70 165,105 C162,140 135,165 100,163 C65,161 40,140 40,100 Z" />
                    <path className="blob-alt" fill="none" d="M52,92 C48,58 78,30 112,36 C146,42 172,66 168,100 C164,134 148,168 112,166 C76,164 56,126 52,92 Z" />
                </svg>
                <svg className="hero-blob blob-b" viewBox="0 0 200 200" aria-hidden="true">
                    <path className="blob-main" fill="rgba(169,196,242,.3)" d="M60,70 C80,42 130,40 150,72 C170,104 158,140 126,152 C94,164 58,150 48,118 C38,86 40,98 60,70 Z" />
                    <path className="blob-alt" fill="none" d="M56,80 C70,48 124,34 152,64 C180,94 166,136 132,150 C98,164 62,156 50,124 C38,92 42,112 56,80 Z" />
                </svg>
                <div className="hero-ghost" aria-hidden="true">
                    <div className="ghost-row">
                        <div className="ghost-inner">
                            <span>Deetya Marga ✦ Medicine ✦ Education ✦ Clinic ✦ Hope ✦&nbsp;</span>
                            <span>Deetya Marga ✦ Medicine ✦ Education ✦ Clinic ✦ Hope ✦&nbsp;</span>
                        </div>
                    </div>
                    <div className="ghost-row reverse">
                        <div className="ghost-inner">
                            <span>Give Hope ✦ Save Lives ✦ Donate ✦ Serve ✦ Care ✦&nbsp;</span>
                            <span>Give Hope ✦ Save Lives ✦ Donate ✦ Serve ✦ Care ✦&nbsp;</span>
                        </div>
                    </div>
                </div>
                <div className="container">
                    <div className="row feature-split">
                        <div className="col-lg-6">
                            <span className="kicker">Charity &amp; Welfare Organization</span>
                            <h1>Give Hope, <span>Save Lives</span> With Every Donation</h1>
                            <p className="lead">Alone we can do little, together we can do so much. Deetya Marga Foundation delivers medicine, education and free clinic care to families who need it most.</p>
                            <div className="hero-actions">
                                <Link href="/donate" className="btn1">Donate Now</Link>
                                <Link href="/programs" className="btn-outline">Explore Programs</Link>
                            </div>
                            <blockquote className="hero-quote">
                                <span className="q-mark">“</span>
                                <p>The best way to find yourself is to lose yourself in the service of others.</p>
                                <span className="by">— Mahatma Gandhi</span>
                            </blockquote>
                        </div>
                        <div className="col-lg-6">
                            <div className="hero-visual" data-speed="1.05">
                                <img className="main-img" src="/img/img-1.png" alt="Donate and thank you illustration" />
                                <div className="float-card">
                                    <span className="fc-icon"><i className="fa fa-medkit" /></span>
                                    <div>
                                        <strong>100% to the cause</strong>
                                        <small>Transparent giving</small>
                                    </div>
                                </div>
                                <div className="float-card two">
                                    <span className="fc-icon"><i className="fa fa-users" /></span>
                                    <div>
                                        <strong>12,400+ helped</strong>
                                        <small>Families supported</small>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="scroll-badge" id="scrollBadge" role="button" tabIndex={0} aria-label="Scroll to next section">
                    <svg viewBox="0 0 120 120">
                        <circle className="badge-bg" cx="60" cy="60" r="57" fill="#F5A623" />
                        <circle className="badge-stroke" cx="60" cy="60" r="57" fill="none" stroke="#2B2A5E" strokeWidth="2" />
                        <g className="badge-rot">
                            <defs>
                                <path id="badgeCircle" d="M60,60 m-44,0 a44,44 0 1,1 88,0 a44,44 0 1,1 -88,0" />
                            </defs>
                            <text className="badge-text">
                                <textPath href="#badgeCircle">SCROLL DOWN ✦ DEETYA MARGA ✦ SCROLL DOWN ✦</textPath>
                            </text>
                        </g>
                        <path className="badge-arrow" d="M60 50 V70 M52 63 L60 71 L68 63" fill="none" stroke="#2B2A5E" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </div>
            </section>

            {/* ===== Ticker strip ===== */}
            <div className="ticker-strip" aria-hidden="true">
                <div className="ticker-inner">
                    <span>✦ Donate ✦ Hope ✦ Education ✦ Clinic ✦ Medicine ✦ Together We Can ✦&nbsp;</span>
                    <span>✦ Donate ✦ Hope ✦ Education ✦ Clinic ✦ Medicine ✦ Together We Can ✦&nbsp;</span>
                </div>
            </div>

            {/* ===== Stats band ===== */}
            <section className="stats">
                <div className="container">
                    <div className="row">
                        <div className="col-6 col-lg-3">
                            <div className="stat-item">
                                <div className="stat-icon"><i className="fa fa-handshake-o" /></div>
                                <div className="num" data-count="12400">0</div>
                                <div className="lbl">Lives Touched</div>
                            </div>
                        </div>
                        <div className="col-6 col-lg-3">
                            <div className="stat-item">
                                <div className="stat-icon"><i className="fa fa-medkit" /></div>
                                <div className="num" data-count="860">0</div>
                                <div className="lbl">Medicine Kits</div>
                            </div>
                        </div>
                        <div className="col-6 col-lg-3">
                            <div className="stat-item">
                                <div className="stat-icon"><i className="fa fa-graduation-cap" /></div>
                                <div className="num" data-count="2150">0</div>
                                <div className="lbl">Children Educated</div>
                            </div>
                        </div>
                        <div className="col-6 col-lg-3">
                            <div className="stat-item">
                                <div className="stat-icon"><i className="fa fa-hospital-o" /></div>
                                <div className="num" data-count="34">0</div>
                                <div className="lbl">Free Clinics</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ===== Causes ===== */}
            <section className="section alt" id="donation">
                <div className="container">
                    <div className="heading center">
                        <span className="kicker">Our Causes</span>
                        <h2>Where Your <span>Donation</span> Goes</h2>
                        <p>Every rupee is tagged to a cause. Pick the one closest to your heart and start making a difference today.</p>
                    </div>
                    <div className="row cause-grid">
                        {CAUSES.map((cause) => (
                            <div className="col-md-6 col-lg-4" key={cause.title}>
                                <div className="cause-tile">
                                    <div className="cause-icon"><i className={`fa ${cause.icon}`} /></div>
                                    <h3>{cause.title}</h3>
                                    <p>{cause.text}</p>
                                    <Link href="/donate" className="btn-dark">Donate Now</Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ===== About split ===== */}
            <section className="section">
                <div className="container">
                    <div className="row feature-split">
                        <div className="col-lg-6">
                            <span className="kicker">Who We Are</span>
                            <div className="heading" style={{ marginBottom: 26 }}>
                                <h2>Serving Communities With <span>Compassion</span></h2>
                            </div>
                            <p className="lead-note" style={{ marginBottom: 26 }}>Since our founding, Deetya Marga Foundation has worked on the ground with doctors, teachers and volunteers to reach families who would otherwise go without medicine, schooling or basic healthcare.</p>
                            <ul className="check-list">
                                <li><i className="fa fa-check" /><span><b>Medicine:</b> monthly treatment kits and emergency drug support.</span></li>
                                <li><i className="fa fa-check" /><span><b>Education:</b> scholarships, books and school supplies for children.</span></li>
                                <li><i className="fa fa-check" /><span><b>Clinic:</b> free check-ups and consultations at our community clinics.</span></li>
                                <li><i className="fa fa-check" /><span><b>Transparency:</b> every donation is reported back to our donors.</span></li>
                            </ul>
                            <Link href="/about" className="btn1 mt-40">Know Our Story</Link>
                        </div>
                        <div className="col-lg-6">
                            <div className="feature-media">
                                <img src="/img/img-2.jpeg" alt="Volunteers supporting a donation drive" data-speed="0.94" />
                                <div className="badge"><b>15+</b><span>Years of Service</span></div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ===== Programs (horizontal scroll track) ===== */}
            <section className="section alt programs-pin">
                <div className="container">
                    <div className="heading center">
                        <span className="kicker">What We Do</span>
                        <h2>Our <span>Programs</span></h2>
                        <p>Three focused programs, one mission — dignity, health and opportunity for every family we serve.</p>
                    </div>
                </div>
                <div className="htrack-wrap">
                    <div className="htrack">
                        {PROGRAMS.map((program) => (
                            <div className="hpanel" key={program.title}>
                                <div className="program-card">
                                    <div className="pc-img"><img src={program.image} alt={program.alt} /></div>
                                    <div className="pc-body">
                                        <span className="pc-tag">{program.tag}</span>
                                        <h3>{program.title}</h3>
                                        <p>{program.text}</p>
                                        <Link href="/programs" className="link-arrow">Read More <i className="fa fa-long-arrow-right" /></Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                        <div className="hpanel">
                            <div className="hpanel-cta">
                                <span className="kicker">Join Us</span>
                                <h3>Support A Program Today</h3>
                                <p>Your donation keeps medicine, schooling and clinic days running for families across Bengaluru.</p>
                                <Link href="/donate" className="btn1">Donate Now</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ===== Gallery ===== */}
            <section className="section">
                <div className="container">
                    <div className="heading center">
                        <span className="kicker">Our Work</span>
                        <h2>Moments From The <span>Field</span></h2>
                        <p>A look at recent medicine drives, school openings and free clinic days.</p>
                    </div>
                    <Gallery photos={HOME_GALLERY} />
                    <div className="text-center mt-40">
                        <Link href="/gallery" className="btn-outline">View Full Gallery</Link>
                    </div>
                </div>
            </section>

            {/* ===== Testimonials ===== */}
            <section className="section alt">
                <div className="container">
                    <div className="heading center">
                        <span className="kicker">Testimonials</span>
                        <h2>Words From Our <span>Community</span></h2>
                    </div>
                    <div className="testi-viewport">
                        <div className="testi-track">
                            {TESTIMONIALS.map((testimonial) => (
                                <div className="testi-slide" key={testimonial.name}>
                                    <div className="testi-card">
                                        <span className="quote">“</span>
                                        <div className="stars">
                                            <i className="fa fa-star" /><i className="fa fa-star" /><i className="fa fa-star" /><i className="fa fa-star" /><i className="fa fa-star" />
                                        </div>
                                        <p>{testimonial.quote}</p>
                                        <div className="testi-user">
                                            <span className="avatar">{testimonial.initials}</span>
                                            <div><strong>{testimonial.name}</strong><small>{testimonial.role}</small></div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="testi-dots"><i className="active" /><i /><i /></div>
                </div>
            </section>

            {/* ===== CTA ===== */}
            <section className="cta-band">
                <svg className="cta-motion" viewBox="0 0 1200 240" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
                    <path id="ctaLine" d="M-40 190 C 260 60, 520 230, 780 120 S 1120 40, 1240 90" fill="none" stroke="rgba(43,42,94,.18)" strokeWidth="2.5" strokeDasharray="7 10" />
                    <path className="cta-heart" d="M0 8 C0 3 7 -1 10 4 C13 -1 20 3 20 8 C20 14 10 21 10 21 C10 21 0 14 0 8 Z" fill="#F5A623" stroke="#2B2A5E" strokeWidth="1.5" />
                </svg>
                <div className="container">
                    <h2>Your Kindness Can Change A Life Today</h2>
                    <p>A single donation funds medicine, school supplies or a free clinic visit for a family in need.</p>
                    <div className="cta-actions">
                        <Link href="/donate" className="btn1">Donate Now</Link>
                        <Link href="/contact" className="btn-light">Become A Volunteer</Link>
                    </div>
                </div>
            </section>

            <SiteFooter variant="home" />
        </>
    );
}

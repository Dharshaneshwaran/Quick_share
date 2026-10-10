import type { Metadata } from "next";
import Link from "next/link";
import FaqList from "@/components/FaqList";
import SiteFooter from "@/components/SiteFooter";

export const metadata: Metadata = {
    title: "Our Programs",
    description:
        "Medicine, education and free clinic programs run by Deetya Marga Foundation across Bengaluru.",
};

const STATS = [
    { value: "15K+", label: "Patients Treated" },
    { value: "2,400", label: "Children Educated" },
    { value: "120", label: "Health Camps" },
    { value: "18", label: "Partner Schools" },
];

const FAQS = [
    {
        question: "How is my donation used?",
        answer: "On average 82% of every donation goes directly to medicine, school fees and clinic operations. The remainder covers logistics and basic administration. A quarterly report is emailed to every donor.",
    },
    {
        question: "Can I donate medicine instead of money?",
        answer: "Yes. Sealed, in-date medicines can be dropped at our Jayanagar office or collected by our team. Contact us to schedule a pickup and we will issue a donation receipt.",
    },
    {
        question: "How do students get selected for scholarships?",
        answer: "Selection is based on financial need and academic progress, verified with partner schools. Each case is reviewed by our education committee before approval.",
    },
    {
        question: "Is the clinic really free?",
        answer: "Consultation, basic tests and most medicines are free for families below our income threshold. A nominal fee applies to a few advanced tests, which is waived on request.",
    },
    {
        question: "Do you offer tax receipts?",
        answer: "Yes. Registered donors receive an official receipt for every contribution, usable for tax purposes where applicable.",
    },
];

export default function ProgramsPage() {
    return (
        <>
            {/* ======= Page banner ======= */}
            <section className="page-banner">
                <div className="container">
                    <h1>Our Programs</h1>
                    <div className="breadcrumb">
                        <Link href="/">Home</Link> <span>/</span> <span>Programs</span>
                    </div>
                </div>
            </section>

            {/* ======= Three pillars ======= */}
            <section className="section">
                <div className="container">
                    <div className="heading center">
                        <span className="kicker">Three Pillars</span>
                        <h2>Medicine, Education & <span>Clinic Care</span></h2>
                        <p>Our programs are designed to work together — a patient leaves the clinic with medicine, and a
                            child leaves school with a future.</p>
                    </div>

                    {/* Medicine */}
                    <div className="row feature-split" id="medicine">
                        <div className="col-lg-6">
                            <div className="feature-media">
                                <img src="/img/miss/3.jpg" alt="Medicine program" />
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <span className="kicker">01 — Healthcare</span>
                            <div className="heading">
                                <h2>Medicine For <span>All</span></h2>
                            </div>
                            <p className="lead-note">We buy essential and chronic-illness medicines in bulk directly from
                                distributors, which cuts the cost by up to 40%. Medicines are dispensed free at our clinic
                                and through mobile health camps.</p>
                            <ul className="check-list" style={{ marginTop: 20 }}>
                                <li><i className="fa fa-check" /><span><b>Monthly prescription support</b> for diabetes, blood
                                    pressure and heart patients.</span></li>
                                <li><i className="fa fa-check" /><span><b>Emergency drug relief</b> within 24 hours for
                                    referred patients.</span></li>
                                <li><i className="fa fa-check" /><span><b>120 health camps a year</b> distributing medicine
                                    in underserved areas.</span></li>
                            </ul>
                            <Link href="/donate" className="btn1" style={{ marginTop: 22 }}>Fund Medicine</Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* ======= Education ======= */}
            <section className="section tint" id="education">
                <div className="container">
                    <div className="row feature-split">
                        <div className="col-lg-6 order-first order-lg-last">
                            <div className="feature-media">
                                <img src="/img/miss/5.jpg" alt="Education program" />
                                <div className="badge">
                                    <b>2,400</b>
                                    <span>Students</span>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <span className="kicker">02 — Education</span>
                            <div className="heading">
                                <h2>Learning Without <span>Limits</span></h2>
                            </div>
                            <p className="lead-note">We sponsor children from primary school through to vocational training.
                                Each student receives school fees, books, uniforms and a mentor who tracks their progress
                                every term.</p>
                            <ul className="check-list" style={{ marginTop: 20 }}>
                                <li><i className="fa fa-check" /><span><b>Full fee sponsorship</b> at 18 partner schools in
                                    Bengaluru.</span></li>
                                <li><i className="fa fa-check" /><span><b>Books, uniforms & stationery</b> supplied at the
                                    start of every session.</span></li>
                                <li><i className="fa fa-check" /><span><b>Vocational scholarships</b> for older students in
                                    IT, nursing and trades.</span></li>
                            </ul>
                            <Link href="/donate" className="btn1" style={{ marginTop: 22 }}>Sponsor a Child</Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* ======= Clinic ======= */}
            <section className="section" id="clinic">
                <div className="container">
                    <div className="row feature-split">
                        <div className="col-lg-6">
                            <div className="feature-media">
                                <img src="/img/miss/2.jpg" alt="Free clinic program" />
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <span className="kicker">03 — Clinic</span>
                            <div className="heading">
                                <h2>Community <span>Free Clinic</span></h2>
                            </div>
                            <p className="lead-note">Our permanent clinic in Jayanagar offers free consultation, basic
                                diagnostics and an in-house dispensary. Volunteer doctors rotate through six specialties
                                every week.</p>
                            <ul className="check-list" style={{ marginTop: 20 }}>
                                <li><i className="fa fa-check" /><span><b>OPD 6 days a week</b> — general physician,
                                    gynaecology, paediatrics, cardiology, ortho and eye.</span></li>
                                <li><i className="fa fa-check" /><span><b>Free diagnostics</b> — blood sugar, BP, ECG and
                                    basic lab tests.</span></li>
                                <li><i className="fa fa-check" /><span><b>Specialist referrals</b> negotiated at reduced cost
                                    with partner hospitals.</span></li>
                            </ul>
                            <Link href="/contact" className="btn-outline" style={{ marginTop: 22 }}>Book a Visit</Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* ======= Impact numbers ======= */}
            <section className="stats">
                <div className="container">
                    <div className="row">
                        {STATS.map((stat) => (
                            <div className="col-6 col-lg-3" key={stat.label}>
                                <div className="stat-item">
                                    <div className="num">{stat.value}</div>
                                    <div className="lbl">{stat.label}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ======= FAQ ======= */}
            <section className="section alt">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-4">
                            <span className="kicker">Good To Know</span>
                            <div className="heading">
                                <h2>Frequently <span>Asked Questions</span></h2>
                                <p>Everything you need to know before you give.</p>
                            </div>
                            <Link href="/contact" className="btn-outline">Ask a Question</Link>
                        </div>
                        <div className="col-lg-8">
                            <FaqList items={FAQS} />
                        </div>
                    </div>
                </div>
            </section>

            {/* ======= CTA ======= */}
            <section className="cta-band">
                <div className="container">
                    <h2>Help Us Keep These Programs Running</h2>
                    <p>Your support directly funds medicine, school fees and our free clinic — with full transparency.</p>
                    <div className="cta-actions">
                        <Link href="/donate" className="btn-gold btn1">Donate Now</Link>
                        <Link href="/gallery" className="btn1 btn-light">See Our Work</Link>
                    </div>
                </div>
            </section>

            <SiteFooter />
        </>
    );
}

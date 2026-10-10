import type { Metadata } from "next";
import Link from "next/link";
import SiteFooter from "@/components/SiteFooter";

export const metadata: Metadata = {
    title: "About Us",
    description:
        "Learn about Deetya Marga Foundation - our mission, vision, journey and the team behind our medicine, education and clinic programs.",
};

const MISSION_CARDS = [
    { className: "", icon: "fa-bullseye", iconStyle: undefined, title: "Our Mission", text: "To deliver accessible medicine, quality education and free clinical care to underserved families through transparent, community-driven philanthropy." },
    { className: "gold", icon: "fa-eye", iconStyle: { color: "var(--gold)" }, title: "Our Vision", text: "A community where no one skips a dose of medicine or a year of school because of poverty — where care and learning reach every doorstep." },
    { className: "navy", icon: "fa-shield", iconStyle: { color: "var(--navy)" }, title: "Our Values", text: "Transparency, dignity and accountability. Every donation is receipted, published in our annual report and audited independently." },
];

const TIMELINE = [
    { year: "2014", title: "The First Free Clinic", text: "Volunteer doctors open a one-room Sunday clinic serving 40 patients a week." },
    { year: "2017", title: "Medicine Bank Launched", text: "Bulk procurement of chronic-disease drugs begins, serving 1,200 patients monthly." },
    { year: "2020", title: "Education Scholarships", text: "First 300 children sponsored with fees, books and uniforms during the pandemic." },
    { year: "2023", title: "Permanent Clinic Building", text: "A dedicated clinic with lab, pharmacy and consultation rooms opens in Jayanagar." },
    { year: "2026", title: "15,000+ Patients & 2,400 Students", text: "Today we run 120 health camps a year and support students across 18 schools." },
];

const TEAM = [
    { icon: "fa-user-md", name: "Dr. Amina Sheikh", role: "Founder & Chairperson", text: "Consultant physician leading our free clinic and medicine procurement since 2014." },
    { icon: "fa-user", name: "Bilal Ahmed", role: "Program Director", text: "Oversees education sponsorships and partnerships with 18 partner schools." },
    { icon: "fa-user", name: "Hina Malik", role: "Finance & Accounts", text: "Keeps every rupee accounted for and publishes our quarterly donor reports." },
    { icon: "fa-user", name: "Usman Tariq", role: "Volunteer Coordinator", text: "Manages 300+ volunteers across health camps, clinic shifts and school drives." },
];

export default function AboutPage() {
    return (
        <>
            {/* ======= Page banner ======= */}
            <section className="page-banner">
                <div className="container">
                    <h1>About Us</h1>
                    <div className="breadcrumb">
                        <Link href="/">Home</Link> <span>/</span> <span>About</span>
                    </div>
                </div>
            </section>

            {/* ======= Story ======= */}
            <section className="section">
                <div className="container">
                    <div className="row feature-split">
                        <div className="col-lg-6">
                            <div className="feature-media">
                                <img src="/img/img-2.jpeg" alt="Our story" />
                                <div className="badge">
                                    <b>12+</b>
                                    <span>Years of Service</span>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <span className="kicker">Our Story</span>
                            <div className="heading">
                                <h2>Born From a Small Clinic, <span>Grown By Community</span></h2>
                            </div>
                            <p className="lead-note">Deetya Marga Foundation began in 2014 when a group of volunteer doctors and
                                teachers started a one-room Sunday clinic in Jayanagar. Families came for free check-ups
                                and left with medicine they could not otherwise afford.</p>
                            <p className="lead-note" style={{ marginTop: 14 }}>Twelve years later that one room has become a
                                full community clinic, a medicine bank, and a scholarship program supporting thousands of
                                students — all funded by ordinary donors who believe care and education are rights, not
                                privileges.</p>
                            <div className="hero-actions" style={{ marginTop: 26 }}>
                                <Link href="/donate" className="btn1">Support Our Work</Link>
                                <Link href="/programs" className="btn-outline">See Our Programs</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ======= Mission / Vision / Values ======= */}
            <section className="section tint">
                <div className="container">
                    <div className="heading center">
                        <span className="kicker">What Drives Us</span>
                        <h2>Mission, Vision & <span>Values</span></h2>
                    </div>
                    <div className="row">
                        {MISSION_CARDS.map((card) => (
                            <div className="col-lg-4 col-md-6" key={card.title}>
                                <div className={`mission-card${card.className ? ` ${card.className}` : ""}`}>
                                    <i className={`fa ${card.icon} mi`} style={card.iconStyle} />
                                    <h3>{card.title}</h3>
                                    <p>{card.text}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ======= Journey timeline ======= */}
            <section className="section alt">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-5">
                            <span className="kicker">Milestones</span>
                            <div className="heading">
                                <h2>Our <span>Journey</span></h2>
                                <p>From a Sunday clinic to a full foundation serving Bengaluru&apos;s low-income neighbourhoods.
                                </p>
                            </div>
                            <img src="/img/img-3.jpg" alt="Our journey" style={{ borderRadius: 20, boxShadow: "var(--shadow-lg)" }} />
                        </div>
                        <div className="col-lg-7">
                            <ul className="timeline" style={{ marginTop: 20 }}>
                                {TIMELINE.map((entry) => (
                                    <li key={entry.year}>
                                        <span>{entry.year}</span>
                                        <h4>{entry.title}</h4>
                                        <p>{entry.text}</p>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* ======= Team ======= */}
            <section className="section">
                <div className="container">
                    <div className="heading center">
                        <span className="kicker">People Behind The Purpose</span>
                        <h2>Meet Our <span>Team</span></h2>
                        <p>A small paid team and a large family of volunteers keep our clinic, medicine bank and schools
                            running.</p>
                    </div>
                    <div className="row">
                        {TEAM.map((member) => (
                            <div className="col-lg-3 col-md-6" key={member.name}>
                                <div className="team-card">
                                    <div className="tc-img"><i className={`fa ${member.icon}`} /></div>
                                    <div className="tc-body">
                                        <h4>{member.name}</h4>
                                        <span>{member.role}</span>
                                        <p>{member.text}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ======= CTA ======= */}
            <section className="cta-band">
                <div className="container">
                    <h2>Want To Be Part Of Our Story?</h2>
                    <p>Donate, volunteer or partner with us — there is a place for you at Deetya Marga Foundation.</p>
                    <div className="cta-actions">
                        <Link href="/donate" className="btn-gold btn1">Donate Now</Link>
                        <Link href="/contact" className="btn1 btn-light">Contact Us</Link>
                    </div>
                </div>
            </section>

            <SiteFooter />
        </>
    );
}

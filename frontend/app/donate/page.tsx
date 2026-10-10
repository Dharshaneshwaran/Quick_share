import type { Metadata } from "next";
import Link from "next/link";
import DonationForm from "@/components/DonationForm";
import SiteFooter from "@/components/SiteFooter";

export const metadata: Metadata = {
    title: "Donate",
    description:
        "Support Deetya Marga Foundation with a donation for medicine, education and free clinic care.",
};

const IMPACT = [
    { icon: "fa-medkit", title: "PKR 1,000", text: "One month of medicine for a chronic patient." },
    { icon: "fa-book", title: "PKR 2,500", text: "Books, uniforms and stationery for one student." },
    { icon: "fa-stethoscope", title: "PKR 5,000", text: "A full day of free clinic operations — doctor, nurse and tests." },
    { icon: "fa-graduation-cap", title: "PKR 10,000", text: "One month of school fees for a sponsored child." },
];

const TRUST = [
    { className: "", icon: "fa-file-text-o", iconStyle: undefined, title: "Official Receipts", text: "Every contribution generates a numbered receipt, usable for tax purposes where applicable." },
    { className: "navy", icon: "fa-line-chart", iconStyle: { color: "var(--navy)" }, title: "Quarterly Reports", text: "Donors receive a breakdown of how funds were spent across medicine, education and clinic care." },
    { className: "gold", icon: "fa-certificate", iconStyle: { color: "var(--gold)" }, title: "Registered NGO", text: "Deetya Marga Foundation is a registered welfare society with independent annual audit." },
];

export default function DonatePage() {
    return (
        <>
            {/* ======= Page banner ======= */}
            <section className="page-banner">
                <div className="container">
                    <h1>Donate</h1>
                    <div className="breadcrumb">
                        <Link href="/">Home</Link> <span>/</span> <span>Donate</span>
                    </div>
                </div>
            </section>

            {/* ======= Donation form ======= */}
            <section className="section">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-7">
                            <div className="form-card">
                                <span className="kicker">Secure Giving</span>
                                <div className="heading" style={{ marginBottom: 25 }}>
                                    <h2>Make A <span>Donation</span></h2>
                                    <p>This is a demo form — no real payment is processed.</p>
                                </div>

                                <DonationForm />
                            </div>
                        </div>

                        <div className="col-lg-5">
                            <div className="contact-info">
                                <h3>Your Impact</h3>
                                <p>Here is what different amounts can do at our foundation.</p>
                                {IMPACT.map((item) => (
                                    <div className="ci-item" key={item.title}>
                                        <span className="ci-icon"><i className={`fa ${item.icon}`} /></span>
                                        <div>
                                            <h5>{item.title}</h5>
                                            <p>{item.text}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="mission-card" style={{ marginTop: 26 }}>
                                <i className="fa fa-university mi" />
                                <h3>Bank Transfer</h3>
                                <p><b>Account:</b> Deetya Marga Foundation<br />
                                    <b>IBAN:</b> PK36 MEZN 0000 0012 3456 78<br />
                                    <b>Bank:</b> HDFC Bank, Jayanagar Branch<br />
                                    <b>Swift:</b> MEBNPKKA</p>
                                <p style={{ marginTop: 10 }}>Email your slip to <a href="mailto:info@deetyamarga.org" style={{ color: "var(--accent)" }}>info@deetyamarga.org</a> for a receipt.</p>
                            </div>

                            <div className="mission-card gold" style={{ marginTop: 20 }}>
                                <i className="fa fa-phone mi" style={{ color: "var(--gold)" }} />
                                <h3>Prefer To Talk?</h3>
                                <p>Call our donation desk at <a href="tel:+919876543210" style={{ color: "var(--navy)", fontWeight: 600 }}>+91 98765 43210</a><br />
                                    Mon – Sat, 9:00 AM – 6:00 PM</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ======= Trust band ======= */}
            <section className="section tint">
                <div className="container">
                    <div className="heading center">
                        <span className="kicker">Why Donors Trust Us</span>
                        <h2>Transparent, Accountable, <span>Registered</span></h2>
                    </div>
                    <div className="row">
                        {TRUST.map((card) => (
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

            <SiteFooter />
        </>
    );
}

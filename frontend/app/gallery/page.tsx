import type { Metadata } from "next";
import Link from "next/link";
import Gallery from "@/components/Gallery";
import SiteFooter from "@/components/SiteFooter";

export const metadata: Metadata = {
    title: "Our Gallery",
    description:
        "Photos from Deetya Marga Foundation health camps, medicine distributions and school drives.",
};

const PHOTOS = [
    { src: "/img/miss/1.jpg", alt: "Health camp in the community" },
    { src: "/img/miss/2.jpg", alt: "Free clinic consultation day" },
    { src: "/img/miss/3.jpg", alt: "Medicine distribution drive" },
    { src: "/img/miss/4.jpg", alt: "Volunteers sorting donations" },
    { src: "/img/miss/5.jpg", alt: "Education supply distribution" },
    { src: "/img/miss/6.jpg", alt: "Community outreach mission" },
    { src: "/img/miss/7.jpg", alt: "Foundation field mission" },
    { src: "/img/img-3.jpg", alt: "Foundation team at work" },
    { src: "/img/img-4.jpg", alt: "Foundation event" },
];

export default function GalleryPage() {
    return (
        <>
            {/* ======= Page banner ======= */}
            <section className="page-banner">
                <div className="container">
                    <h1>Our Gallery</h1>
                    <div className="breadcrumb">
                        <Link href="/">Home</Link> <span>/</span> <span>Gallery</span>
                    </div>
                </div>
            </section>

            {/* ======= Missions ======= */}
            <section className="section">
                <div className="container">
                    <div className="heading center">
                        <span className="kicker">Our Work In Pictures</span>
                        <h2>Medicine, School & <span>Clinic Days</span></h2>
                        <p>Click any photo to view it full size. These are moments from our health camps, medicine
                            distributions and school drives.</p>
                    </div>

                    <Gallery photos={PHOTOS} />
                </div>
            </section>

            {/* ======= CTA ======= */}
            <section className="cta-band">
                <div className="container">
                    <h2>Be Part Of The Next Chapter</h2>
                    <p>Every photo here started with a donation. Help us create the next one.</p>
                    <div className="cta-actions">
                        <Link href="/donate" className="btn-gold btn1">Donate Now</Link>
                        <Link href="/contact" className="btn1 btn-light">Volunteer With Us</Link>
                    </div>
                </div>
            </section>

            <SiteFooter />
        </>
    );
}

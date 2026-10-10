"use client";

import { useState, type FormEvent } from "react";

const TOPICS = [
    { value: "donate", label: "Make a donation" },
    { value: "pickup", label: "Schedule a donation pickup" },
    { value: "clinic", label: "Book a clinic visit" },
    { value: "volunteer", label: "Volunteer with us" },
    { value: "partner", label: "Partner / corporate tie-up" },
    { value: "other", label: "Something else" },
];

export default function ContactForm() {
    const [sent, setSent] = useState(false);

    const onSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setSent(true);
        event.currentTarget.reset();
        event.currentTarget.querySelector<HTMLElement>(".form-msg")
            ?.scrollIntoView({ behavior: "smooth", block: "center" });
    };

    return (
        <form data-demo="true" onSubmit={onSubmit}>
            <div className="form-row">
                <div className="form-group">
                    <label>Your Name</label>
                    <input type="text" className="form-control" placeholder="Full name" required />
                </div>
                <div className="form-group">
                    <label>Mobile No.</label>
                    <input type="tel" className="form-control" placeholder="+91 9xxxx xxxxx" required />
                </div>
            </div>
            <div className="form-row">
                <div className="form-group">
                    <label>Email</label>
                    <input type="email" className="form-control" placeholder="you@example.com" />
                </div>
                <div className="form-group">
                    <label>I want to</label>
                    <select className="form-control" name="topic" defaultValue="donate">
                        {TOPICS.map((topic) => (
                            <option value={topic.value} key={topic.value}>{topic.label}</option>
                        ))}
                    </select>
                </div>
            </div>
            <div className="form-group">
                <label>Address (for pickup)</label>
                <input type="text" className="form-control" placeholder="House, street, area, city" />
            </div>
            <div className="form-group">
                <label>Message</label>
                <textarea className="form-control" rows={5} placeholder="Tell us how we can help..." required />
            </div>
            <button type="submit" className="btn1">Send Message</button>
            <p className="form-note"><i className="fa fa-shield" /> We reply within one working day. Your details are never shared with third parties.</p>

            <div className={`form-msg${sent ? " show" : ""}`}>
                Message sent! Our team will get back to you shortly.
            </div>
        </form>
    );
}

"use client";

import { useState, type FormEvent } from "react";

const CAUSES = [
    { value: "", label: "Select where your donation goes" },
    { value: "medicine", label: "Medicine Aid" },
    { value: "education", label: "Child Education" },
    { value: "clinic", label: "Clinic Support" },
    { value: "equipment", label: "Medical Equipment" },
    { value: "books", label: "Books & Supplies" },
    { value: "general", label: "General Fund" },
];

const FREQUENCIES = [
    { value: "once", label: "One-time" },
    { value: "monthly", label: "Monthly" },
    { value: "yearly", label: "Yearly" },
];

const AMOUNTS = [
    { value: "1000", label: "1,000" },
    { value: "2500", label: "2,500" },
    { value: "5000", label: "5,000" },
    { value: "10000", label: "10,000" },
];

const METHODS = [
    { value: "card", label: "Debit / Credit Card" },
    { value: "bank", label: "Bank Transfer" },
    { value: "easypaisa", label: "Easypaisa / JazzCash" },
    { value: "cash", label: "Cash (office pickup)" },
];

export default function DonationForm() {
    const [frequency, setFrequency] = useState("once");
    const [amount, setAmount] = useState<string | null>(null);
    const [sent, setSent] = useState(false);

    const onSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setSent(true);
        setAmount(null);
        event.currentTarget.reset();
        event.currentTarget.querySelector<HTMLElement>(".form-msg")
            ?.scrollIntoView({ behavior: "smooth", block: "center" });
    };

    return (
        <form data-demo="true" onSubmit={onSubmit}>
            <div className="form-group">
                <label>Choose a cause</label>
                <select className="form-control" name="cause" defaultValue="" required>
                    {CAUSES.map((cause) => (
                        <option value={cause.value} key={cause.value}>{cause.label}</option>
                    ))}
                </select>
            </div>

            <div className="form-group">
                <label>Donation frequency</label>
                <div className="amount-pills">
                    {FREQUENCIES.map((option) => (
                        <label className={frequency === option.value ? "active" : undefined} key={option.value}>
                            <input
                                type="radio"
                                name="freq"
                                value={option.value}
                                checked={frequency === option.value}
                                onChange={() => setFrequency(option.value)}
                            />
                            <span>{option.label}</span>
                        </label>
                    ))}
                </div>
            </div>

            <div className="form-group">
                <label>Amount (PKR)</label>
                <div className="amount-pills">
                    {AMOUNTS.map((option) => (
                        <label className={amount === option.value ? "active" : undefined} key={option.value}>
                            <input
                                type="radio"
                                name="amount"
                                value={option.value}
                                checked={amount === option.value}
                                onChange={() => setAmount(option.value)}
                            />
                            <span>{option.label}</span>
                        </label>
                    ))}
                </div>
            </div>

            <div className="form-row">
                <div className="form-group">
                    <label>Full name</label>
                    <input type="text" className="form-control" placeholder="e.g. Ahmed Raza" required />
                </div>
                <div className="form-group">
                    <label>Email</label>
                    <input type="email" className="form-control" placeholder="you@example.com" required />
                </div>
            </div>

            <div className="form-row">
                <div className="form-group">
                    <label>Phone</label>
                    <input type="tel" className="form-control" placeholder="+91 9xxxx xxxxx" />
                </div>
                <div className="form-group">
                    <label>Payment method</label>
                    <select className="form-control" name="method" defaultValue="card">
                        {METHODS.map((method) => (
                            <option value={method.value} key={method.value}>{method.label}</option>
                        ))}
                    </select>
                </div>
            </div>

            <div className="form-group">
                <label>Custom amount (PKR)</label>
                <input type="number" className="form-control" min={100} placeholder="Enter any amount" />
            </div>

            <div className="form-group">
                <label>Message (optional)</label>
                <textarea className="form-control" rows={3} placeholder="Dedication or note" />
            </div>

            <button type="submit" className="btn1" style={{ width: "100%" }}>Complete Donation</button>
            <p className="form-note"><i className="fa fa-lock" /> Your information is secure and never shared. You will receive a donation receipt by email.</p>

            <div className={`form-msg${sent ? " show" : ""}`}>
                Thank you for your generosity! This is a demo — no payment was processed.
            </div>
        </form>
    );
}

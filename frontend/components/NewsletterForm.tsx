"use client";

import { useState, type FormEvent } from "react";

export default function NewsletterForm({ variant = "footer" }: { variant?: "footer" }) {
    const [sent, setSent] = useState(false);

    const onSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setSent(true);
        event.currentTarget.reset();
        const message = event.currentTarget.parentElement?.querySelector<HTMLElement>(".form-msg");
        message?.classList.add("show");
        message?.scrollIntoView({ behavior: "smooth", block: "center" });
    };

    return (
        <>
            <form className={`newsletter ${variant}`} data-demo="true" onSubmit={onSubmit}>
                <input type="email" placeholder="Your email address" required />
                <button type="submit">Join</button>
            </form>
            <div className={`form-msg${sent ? " show" : ""}`}>Thank you! You are subscribed.</div>
        </>
    );
}

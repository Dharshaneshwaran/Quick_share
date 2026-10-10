"use client";

import { useEffect, useRef, useState } from "react";

export type FaqItem = { question: string; answer: string };

export default function FaqList({ items }: { items: FaqItem[] }) {
    const [openIndex, setOpenIndex] = useState<number | null>(null);
    const answerRefs = useRef<Array<HTMLDivElement | null>>([]);

    useEffect(() => {
        if (openIndex === null) return;

        const onResize = () => {
            const answer = answerRefs.current[openIndex];
            if (answer) answer.style.maxHeight = `${answer.scrollHeight}px`;
        };
        window.addEventListener("resize", onResize);
        return () => window.removeEventListener("resize", onResize);
    }, [openIndex]);

    const close = (index: number) => {
        const answer = answerRefs.current[index];
        if (answer) answer.style.maxHeight = "";
    };

    const toggle = (index: number) => {
        if (openIndex === index) {
            close(index);
            setOpenIndex(null);
            return;
        }

        if (openIndex !== null) close(openIndex);

        const answer = answerRefs.current[index];
        if (answer) answer.style.maxHeight = `${answer.scrollHeight}px`;
        setOpenIndex(index);
    };

    return (
        <>
            {items.map((item, index) => {
                const isOpen = openIndex === index;
                return (
                    <div className={`faq-item${isOpen ? " open" : ""}`} key={item.question}>
                        <button
                            type="button"
                            className="faq-q"
                            id={`faq-q-${index}`}
                            aria-expanded={isOpen}
                            aria-controls={`faq-a-${index}`}
                            onClick={() => toggle(index)}
                        >
                            {item.question} <i className="fa fa-chevron-down" />
                        </button>
                        <div
                            className="faq-a"
                            id={`faq-a-${index}`}
                            role="region"
                            aria-labelledby={`faq-q-${index}`}
                            ref={(element) => {
                                answerRefs.current[index] = element;
                            }}
                        >
                            <div>{item.answer}</div>
                        </div>
                    </div>
                );
            })}
        </>
    );
}

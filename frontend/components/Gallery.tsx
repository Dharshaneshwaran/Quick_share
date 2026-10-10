"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

export type Photo = {
    src: string;
    alt: string;
    speed?: number;
};

export default function Gallery({ photos }: { photos: Photo[] }) {
    const [active, setActive] = useState<number | null>(null);

    useEffect(() => {
        if (active === null) return;

        const onKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") setActive(null);
        };
        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        document.addEventListener("keydown", onKeyDown);

        return () => {
            document.body.style.overflow = previousOverflow;
            document.removeEventListener("keydown", onKeyDown);
        };
    }, [active]);

    const photo = active === null ? null : photos[active];

    return (
        <div className="gallery-sec">
            <div className="image-container">
                {photos.map((item, index) => (
                    <button
                        type="button"
                        className="image"
                        key={`${item.src}-${item.alt}`}
                        aria-label={`View ${item.alt}`}
                        onClick={() => setActive(index)}
                    >
                        <img src={item.src} alt={item.alt} data-speed={item.speed} />
                    </button>
                ))}
            </div>
            {photo &&
                createPortal(
                    <div
                        className="pop-image"
                        role="dialog"
                        aria-modal="true"
                        aria-label={photo.alt}
                        onClick={() => setActive(null)}
                    >
                        <button type="button" className="pop-close" aria-label="Close image">
                            &times;
                        </button>
                        <img
                            src={photo.src}
                            alt={photo.alt}
                            onClick={(event) => event.stopPropagation()}
                        />
                    </div>,
                    document.body,
                )}
        </div>
    );
}

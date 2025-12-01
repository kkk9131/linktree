import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useMotionValueEvent } from 'framer-motion';
import styles from './Carousel.module.css';
import { LinkCard } from './LinkCard';

interface Link {
    id: string;
    title: string;
    url: string;
}

interface CarouselProps {
    links: Link[];
    onDelete?: (id: string) => void;
}

export const Carousel: React.FC<CarouselProps> = ({ links, onDelete }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [activeIndex, setActiveIndex] = useState(0);

    const handleScroll = () => {
        if (containerRef.current) {
            const scrollLeft = containerRef.current.scrollLeft;
            const width = containerRef.current.offsetWidth;
            // Assuming card width + gap is roughly 80% of screen width or fixed
            // A simple approximation for center snapping
            const index = Math.round(scrollLeft / (width * 0.75));
            setActiveIndex(index);
        }
    };

    return (
        <div className={styles.carouselContainer}>
            <div
                className={styles.scrollContainer}
                ref={containerRef}
                onScroll={handleScroll}
            >
                {/* Spacer for centering first item */}
                <div className={styles.spacer} />

                {links.map((link, index) => {
                    const isActive = index === activeIndex;
                    return (
                        <div
                            key={link.id}
                            className={`${styles.cardWrapper} ${isActive ? styles.active : ''}`}
                        >
                            <div className={styles.cardInner}>
                                <LinkCard
                                    id={link.id}
                                    title={link.title}
                                    url={link.url}
                                    onDelete={onDelete}
                                // We don't pass dragControls here as we are using scroll
                                />
                            </div>
                        </div>
                    );
                })}

                {/* Spacer for centering last item */}
                <div className={styles.spacer} />
            </div>

            {/* Indicators */}
            <div className={styles.indicators}>
                {links.map((_, index) => (
                    <div
                        key={index}
                        className={`${styles.dot} ${index === activeIndex ? styles.activeDot : ''}`}
                    />
                ))}
            </div>
        </div>
    );
};

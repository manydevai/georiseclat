import React, { useState, useEffect, useRef } from 'react';
import { areasData } from '../constants';
import { useLanguage } from '../LanguageContext';

// Mapping area names to their respective image paths found in zone-area folder
const zoneImages: Record<string, string> = {
    "Montréal": "/zone-area/Montreal.jpg",
    "Laval": "/zone-area/laval.jpg",
    "Longueuil": "/zone-area/Longueil.webp", // Note: File spelling is Longueil
    "Brossard": "/zone-area/Brossard.jpg",
    "Boucherville": "/zone-area/Boucherville.jpg",
    "Verdun": "/zone-area/verdun.png",
    "Saint-Hubert": "/zone-area/saint-hubert.jpg"
};

const ZoneAreaGallery: React.FC = () => {
    const { t } = useLanguage();
    const [activeIndex, setActiveIndex] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);
    const autoPlayDuration = 4000; // 4 seconds per slide

    const handleNext = () => {
        setActiveIndex((prev) => (prev + 1) % areasData.length);
    };

    const handleManualChange = (index: number) => {
        setActiveIndex(index);
        setIsPaused(true);
        // Resume autoplay after 10 seconds of inactivity
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(() => setIsPaused(false), 10000);
    };

    useEffect(() => {
        if (!isPaused) {
            const interval = setInterval(handleNext, autoPlayDuration);
            return () => clearInterval(interval);
        }
    }, [isPaused]);

    // Clean up timeout on unmount
    useEffect(() => {
        return () => {
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
        };
    }, []);

    const activeArea = areasData[activeIndex];
    const activeImage = zoneImages[activeArea] || zoneImages["Montréal"]; // Fallback

    return (
        <div className="zone-gallery-container relative w-full overflow-hidden shadow-2xl bg-white dark:bg-gray-800">
            {/* Main Image Display */}
            <div className="relative h-[400px] md:h-[500px] w-full overflow-hidden">
                {areasData.map((area, index) => (
                    <div
                        key={area}
                        className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === activeIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'
                            }`}
                    >
                        <img
                            src={zoneImages[area]}
                            alt={`Zone d'intervention ${area}`}
                            className="w-full h-full object-cover transform transition-transform duration-[10000ms] ease-linear scale-110 motion-safe:animate-ken-burns"
                            style={{
                                animation: index === activeIndex ? 'kenBurns 20s infinite alternate' : 'none'
                            }}
                        />
                        {/* Gradient Overlay for text readability */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>

                        {/* Area Title Overlay */}
                        <div className="absolute bottom-24 left-6 md:left-12 max-w-xl text-white">
                            <h3 className="text-4xl md:text-6xl font-display font-bold mb-2 tracking-tight drop-shadow-lg transform translate-y-0 transition-all duration-700 delay-300">
                                {area}
                            </h3>
                            <p className="text-lg text-white/90 font-light flex items-center gap-2 drop-shadow-md">
                                <span className="material-icons-outlined text-accent">verified</span>
                                {t('areas.served_zone')}
                            </p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Navigation Badges / Thumbnails - Hidden on mobile as requested */}
            <div className="hidden md:block relative z-20 -mt-16 pb-6 px-4 md:px-8">
                <div className="flex flex-wrap justify-center gap-3 md:gap-4">
                    {areasData.map((area, index) => (
                        <button
                            key={area}
                            onClick={() => handleManualChange(index)}
                            className={`
                                group relative flex items-center gap-2 px-5 py-3 rounded-full 
                                backdrop-blur-md transition-all duration-300 border
                                ${index === activeIndex
                                    ? 'bg-white/95 text-primary border-accent shadow-lg scale-105'
                                    : 'bg-black/40 text-white/90 border-transparent hover:bg-black/60 hover:scale-105'}
                            `}
                        >
                            <span className={`material-icons-outlined text-lg transition-colors duration-300 ${index === activeIndex ? 'text-accent' : 'text-white/70 group-hover:text-white'}`}>
                                location_on
                            </span>
                            <span className="font-semibold text-sm tracking-wide">
                                {area}
                            </span>

                            {/* Loading progress bar for active item */}
                            {index === activeIndex && !isPaused && (
                                <span className="absolute bottom-0 left-0 h-0.5 bg-accent animate-progress rounded-full"
                                    style={{ width: '100%', animationDuration: `${autoPlayDuration}ms` }}>
                                </span>
                            )}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ZoneAreaGallery;

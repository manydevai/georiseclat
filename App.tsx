import React, { useEffect, useState, useRef, useCallback } from 'react';
import { HashRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { ServiceCard } from './components/ServiceCard';
import { TestimonialCard } from './components/TestimonialCard';
import { FeatureCard } from './components/FeatureCard';
import ZoneAreaGallery from './components/ZoneAreaGallery';
import { servicesData, testimonialsData, featuresData, statsData, processSteps, faqData, advantagesData, areasData } from './constants';
import { LanguageProvider, useLanguage } from './LanguageContext';
import LegalNotice from './pages/LegalNotice';
import PrivacyPolicy from './pages/PrivacyPolicy';

// Scroll to top helper component
const ScrollToTop = () => {
    const { pathname } = useLocation();
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);
    return null;
};

// Intersection Observer Hook for reveal animations
const useRevealOnScroll = () => {
    useEffect(() => {
        const observerOptions = {
            root: null,
            rootMargin: '0px 0px -80px 0px',
            threshold: 0.1
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        const elements = document.querySelectorAll('.reveal-element, .reveal-scale');
        elements.forEach(el => observer.observe(el));

        return () => observer.disconnect();
    }, []);
};

// FAQ Accordion Component
const FAQItem: React.FC<{ question: string; answer: string; isOpen: boolean; onClick: () => void }> = ({ question, answer, isOpen, onClick }) => (
    <div className="border-b border-gray-200 dark:border-gray-700">
        <button
            className="w-full py-5 px-6 flex justify-between items-center text-left hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
            onClick={onClick}
        >
            <span className="font-display font-semibold text-lg text-text-light-primary dark:text-text-dark-primary pr-4">{question}</span>
            <span className={`material-icons-outlined text-primary transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
                expand_more
            </span>
        </button>
        <div className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-96 pb-5' : 'max-h-0'}`}>
            <p className="px-6 text-text-light-secondary dark:text-text-dark-secondary leading-relaxed">
                {answer}
            </p>
        </div>
    </div>
);

// Stat Counter Component for animated numbers
const StatCounter: React.FC<{ end: string; duration?: number }> = ({ end, duration = 1500 }) => {
    const [count, setCount] = useState(0);
    const countRef = useRef<HTMLSpanElement>(null);
    const [isVisible, setIsVisible] = useState(false);

    // Extract number and suffix (+, %, etc)
    const numericPart = parseFloat(end.replace(/[^\d.]/g, '')) || 0;
    const suffix = end.replace(/[\d.]/g, '');
    const isDecimal = end.includes('.');

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                }
            },
            { threshold: 0.1 }
        );

        if (countRef.current) {
            observer.observe(countRef.current);
        }

        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        if (!isVisible) return;

        let animationFrame: number;
        let timeoutId: any;

        const startAnimation = () => {
            let startTime: number | null = null;

            const animate = (timestamp: number) => {
                if (!startTime) startTime = timestamp;
                const progress = timestamp - startTime;
                const percentage = Math.min(progress / duration, 1);

                // Easing function: easeOutExpo for a premium feel
                const easeOutExpo = percentage === 1 ? 1 : 1 - Math.pow(2, -10 * percentage);
                const currentCount = easeOutExpo * numericPart;

                setCount(currentCount);

                if (percentage < 1) {
                    animationFrame = requestAnimationFrame(animate);
                } else {
                    // Loop: restart after a delay
                    timeoutId = setTimeout(() => {
                        setCount(0);
                        startAnimation();
                    }, 1000);
                }
            };

            animationFrame = requestAnimationFrame(animate);
        };

        startAnimation();

        return () => {
            cancelAnimationFrame(animationFrame);
            clearTimeout(timeoutId);
        };
    }, [isVisible, numericPart, duration]);

    return (
        <span ref={countRef} className="tabular-nums">
            {isDecimal ? count.toFixed(1) : Math.floor(count)}
            {suffix}
        </span>
    );
};

// Magic Typewriter Component for the Hero Heading
const MagicTypewriter: React.FC<{ phrases: string[] }> = ({ phrases }) => {
    const [displayText, setDisplayText] = useState<string[][]>(phrases.map(() => []));
    const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
    const [currentCharIndex, setCurrentCharIndex] = useState(0);
    const [isComplete, setIsComplete] = useState(false);

    useEffect(() => {
        if (isComplete) {
            const timeout = setTimeout(() => {
                setDisplayText(phrases.map(() => []));
                setCurrentPhraseIndex(0);
                setCurrentCharIndex(0);
                setIsComplete(false);
            }, 3000); // 3s pause at the end
            return () => clearTimeout(timeout);
        }

        if (currentPhraseIndex < phrases.length) {
            const currentPhrase = phrases[currentPhraseIndex];
            if (currentCharIndex < currentPhrase.length) {
                const timeout = setTimeout(() => {
                    const newDisplayText = [...displayText];
                    newDisplayText[currentPhraseIndex] = [
                        ...newDisplayText[currentPhraseIndex],
                        currentPhrase[currentCharIndex]
                    ];
                    setDisplayText(newDisplayText);
                    setCurrentCharIndex(prev => prev + 1);
                }, 40); // Typing speed
                return () => clearTimeout(timeout);
            } else {
                setCurrentPhraseIndex(prev => prev + 1);
                setCurrentCharIndex(0);
            }
        } else {
            setIsComplete(true);
        }
    }, [currentCharIndex, currentPhraseIndex, phrases, isComplete, displayText]);

    return (
        <div className="magic-typewriter">
            {displayText.map((chars, pIdx) => (
                <span key={pIdx} className="block -mb-1 overflow-hidden min-h-[1.2em] leading-[1.1]">
                    {chars.map((char, cIdx) => (
                        <span
                            key={cIdx}
                            className={`inline-block magic-letter ${pIdx === 2 ? 'text-accent font-bold' : ''}`}
                            style={{ animationDelay: `${cIdx * 0.01}s` }}
                        >
                            {char === ' ' ? '\u00A0' : char}
                        </span>
                    ))}
                    {!isComplete && currentPhraseIndex === pIdx && (
                        <span className="magic-cursor">|</span>
                    )}
                </span>
            ))}
        </div>
    );
};

const HomePage: React.FC = () => {
    const { language, t } = useLanguage();
    const location = useLocation();
    const [scrollY, setScrollY] = useState(window.scrollY || 0);
    const [isHeaderScrolled, setIsHeaderScrolled] = useState(false);
    const [openFAQ, setOpenFAQ] = useState<number | null>(0);
    const heroRef = useRef<HTMLElement>(null);
    const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
    const [serviceType, setServiceType] = useState<string>('');
    const [fileName, setFileName] = useState<string>('');

    // Reusable scroll-to-section helper (robust for mobile)
    const scrollToSection = useCallback((id: string) => {
        // Use rAF to ensure DOM is settled before calculating position
        requestAnimationFrame(() => {
            const element = document.getElementById(id);
            if (element) {
                const headerOffset = 85;
                const elementPosition = element.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.scrollY - headerOffset;
                window.scrollTo({
                    top: Math.max(0, offsetPosition),
                    behavior: 'smooth'
                });
            }
        });
    }, []);

    // Handle scrollTo state from navigation (e.g. Header nav from other pages)
    useEffect(() => {
        const state = location.state as { scrollTo?: string; selectService?: string } | null;
        if (state?.scrollTo) {
            if (state.selectService) {
                setServiceType(state.selectService);
            }
            // Small delay to ensure the DOM is fully rendered
            const timer = setTimeout(() => {
                scrollToSection(state.scrollTo!);
            }, 100);
            // Clear the state so it doesn't re-scroll on re-renders
            window.history.replaceState({}, document.title);
            return () => clearTimeout(timer);
        }
    }, [location.state, scrollToSection]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setFormStatus('submitting');

        const form = e.currentTarget;
        const formData = new FormData(form);

        try {
            const response = await fetch("https://formbold.com/s/91mLB", {
                method: "POST",
                body: formData,
                headers: {
                    "Accept": "application/json"
                }
            });

            if (response.ok) {
                setFormStatus('success');
                setServiceType('');
                setFileName('');
                form.reset();
                setTimeout(() => setFormStatus('idle'), 5000);
            } else {
                setFormStatus('error');
                setTimeout(() => setFormStatus('idle'), 5000);
            }
        } catch (error) {
            setFormStatus('error');
            setTimeout(() => setFormStatus('idle'), 5000);
        }
    };

    useRevealOnScroll();

    const handleScroll = useCallback(() => {
        setScrollY(window.scrollY);
        setIsHeaderScrolled(window.scrollY > 100);
    }, []);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, [handleScroll]);

    useEffect(() => {
        // Force light mode by ensuring 'dark' class is never added automatically
        document.documentElement.classList.remove('dark');
    }, []);

    return (
        <div className="relative min-h-screen font-body bg-background-light dark:bg-background-dark text-text-light-primary dark:text-text-dark-primary transition-colors duration-300">
            <div className="grain-overlay"></div>

            <Header 
                isScrolled={isHeaderScrolled} 
                onCareerClick={() => {
                    setServiceType('candidate');
                    scrollToSection('contact-form');
                }}
            />

            {/* ============================================
                HERO SECTION - Full background image with text overlay
            ============================================ */}
            <section
                ref={heroRef}
                className="hero-premium relative overflow-hidden min-h-[60vh] lg:min-h-[70vh]"
                id="top"
            >
                {/* Background Image */}
                <div className="absolute inset-0 z-0 hero-background-animation">
                    <img
                        alt="Professional cleaning service"
                        className="w-full h-full object-cover object-right"
                        src="/hero-background.jpg"
                    />
                    <div className="absolute inset-0 hero-overlay-gradient"></div>
                    <div className="hero-stripe"></div>
                </div>

                {/* Content */}
                <div className="container mx-auto px-4 relative z-10">
                    <div className="grid lg:grid-cols-2 gap-8 items-center min-h-[60vh] lg:min-h-[70vh]">
                        {/* Left side - Text Content */}
                        <div className="pt-36 pb-16 lg:pt-24 lg:pb-24">
                            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-bold leading-[1.1] mb-6 min-h-[140px] md:min-h-[180px]">
                                <MagicTypewriter
                                    phrases={t('hero.phrases')}
                                />
                            </h1>
                            <p className="text-lg md:text-xl text-gray-700 mb-8 max-w-xl leading-relaxed">
                                {t('hero.description')}
                            </p>

                            {/* CTA Buttons */}
                            <div className="flex flex-col sm:flex-row gap-4 mb-8 justify-center lg:justify-start items-center lg:items-start text-center lg:text-left">
                                <a
                                    href="#contact"
                                    className="btn-hero-primary group"
                                    onClick={(e) => { e.preventDefault(); scrollToSection('contact-form'); }}
                                >
                                    <span className="material-icons-outlined text-lg group-hover:rotate-12 transition-transform">description</span>
                                    {t('hero.cta_quote')}
                                </a>
                            </div>

                            {/* Location badges */}
                            <div className="flex flex-wrap gap-3 justify-center lg:justify-start mb-12 lg:mb-0">
                                <span className="location-badge">
                                    <span className="material-icons-outlined">location_on</span>
                                    Montréal
                                </span>
                                <span className="location-badge">
                                    <span className="material-icons-outlined">location_on</span>
                                    Laval
                                </span>
                                <span className="location-badge">
                                    <span className="material-icons-outlined">location_on</span>
                                    Longueuil
                                </span>
                            </div>
                        </div>

                        {/* Right side - Empty for image visibility */}
                        <div className="hidden lg:block"></div>
                    </div>
                </div>

                {/* Scroll Indicator */}
                <a href="#services" className="absolute bottom-5 left-1/2 transform -translate-x-1/2 z-10 hover:opacity-70 transition-opacity hidden sm:block lg:flex" onClick={(e) => { e.preventDefault(); scrollToSection('services'); }}>
                    <div className="w-6 h-10 border-2 border-primary/50 rounded-full flex justify-center pt-2 bg-white/30 backdrop-blur-sm">
                        <div className="w-1.5 h-3 bg-primary/70 rounded-full animate-bounce"></div>
                    </div>
                </a>

                {/* Dedicated Mobile Scroll Indicator - Positioned lower */}
                <a href="#services" className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-10 hover:opacity-70 transition-opacity sm:hidden" onClick={(e) => { e.preventDefault(); scrollToSection('services'); }}>
                    <div className="w-5 h-8 border-2 border-primary/40 rounded-full flex justify-center pt-1.5 bg-white/20 backdrop-blur-sm">
                        <div className="w-1 h-2 bg-primary/60 rounded-full animate-bounce"></div>
                    </div>
                </a>
            </section>

            {/* ============================================
                STATS SECTION - Social Proof
            ============================================ */}
            <section className="py-6 bg-primary relative z-10">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {statsData.map((stat, index) => (
                            <div key={index} className="flex items-center justify-center sm:justify-center gap-3 text-white">
                                <div className="w-8 flex justify-center flex-shrink-0">
                                    <span className="material-icons-outlined text-2xl text-green-300">{stat.icon}</span>
                                </div>
                                <div className="flex flex-col items-start min-w-[100px] sm:min-w-0">
                                    <div className="text-2xl font-display font-bold leading-tight">
                                        <StatCounter end={stat.number} />
                                    </div>
                                    <div className="text-[10px] uppercase tracking-wider text-white/70 leading-tight">
                                        {index === 0 ? t('stats.clients') :
                                            index === 1 ? t('stats.satisfaction') :
                                                index === 2 ? t('stats.interventions') :
                                                    t('stats.agents')}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ============================================
                SERVICES SECTION
            ============================================ */}
            < section className="py-24 bg-surface-light dark:bg-surface-dark transition-colors duration-300 relative z-10" id="services" >
                <div className="container mx-auto px-4">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <span className="section-label-premium text-primary font-semibold uppercase tracking-wider text-sm reveal-element">{t('services_section.subtitle')}</span>
                        <h2 className="section-title-premium text-4xl md:text-5xl font-display font-bold mt-3 mb-6 text-text-light-primary dark:text-text-dark-primary reveal-element">
                            {t('services_section.title')}
                        </h2>
                        <p className="text-lg text-text-light-secondary dark:text-text-dark-secondary reveal-element">
                            {t('services_section.description')}
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                        {servicesData[language].map((service, index) => (
                            <div key={index} className={`reveal-element stagger-${(index % 4) + 1}`}>
                                <ServiceCard {...service} />
                            </div>
                        ))}
                    </div>
                    <div className="text-center mt-12 reveal-element">
                        <p className="text-text-light-secondary dark:text-text-dark-secondary mb-4">
                            {t('areas.specific_need.title')}
                        </p>
                        <a
                            href="#final-cta"
                            className="btn-accent text-white py-3 px-6 inline-flex items-center gap-2"
                            onClick={(e) => { e.preventDefault(); scrollToSection('final-cta'); }}
                        >
                            {t('areas.specific_need.button')}
                            <span className="material-icons-outlined">arrow_forward</span>
                        </a>
                    </div>
                </div>
            </section >

            {/* ============================================
                WHY CHOOSE US - Introduction
            ============================================ */}
            < section className="py-24 bg-background-light dark:bg-background-dark transition-colors duration-300" id="qui-sommes-nous" >
                <div className="container mx-auto px-4">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <div className="reveal-element">
                            <span className="text-primary font-semibold uppercase tracking-wider text-sm">{t('why_choose_us.subtitle')}</span>
                            <h2 className="text-4xl md:text-5xl font-display font-bold mt-3 mb-6 text-text-light-primary dark:text-text-dark-primary">
                                {t('why_choose_us.title')}
                            </h2>
                            <p className="text-lg text-text-light-secondary dark:text-text-dark-secondary mb-6 leading-relaxed">
                                {t('why_choose_us.description_1')}
                            </p>
                            <p className="text-lg text-text-light-secondary dark:text-text-dark-secondary mb-8 leading-relaxed">
                                {t('why_choose_us.description_2')}
                            </p>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="bg-surface-light dark:bg-surface-dark p-4 rounded-lg">
                                    <div className="text-3xl font-display font-bold text-primary mb-1">{t('why_choose_us.experience')}</div>
                                    <div className="text-sm text-text-light-secondary dark:text-text-dark-secondary">{t('why_choose_us.experience_label')}</div>
                                </div>
                                <div className="bg-surface-light dark:bg-surface-dark p-4 rounded-lg">
                                    <div className="text-3xl font-display font-bold text-primary mb-1">{t('why_choose_us.clients_count')}</div>
                                    <div className="text-sm text-text-light-secondary dark:text-text-dark-secondary">{t('why_choose_us.clients_label')}</div>
                                </div>
                            </div>
                        </div>

                        <div className="reveal-scale cinematic-image-premium rounded-2xl shadow-2xl">
                            <img
                                alt="Équipe Georis Éclat Nettoyage"
                                className="w-full h-auto object-cover"
                                src="/why-choose-us.jpg"
                            />
                            <div className="cinematic-image-overlay-premium"></div>
                            <div className="cinematic-image-stripe-premium"></div>
                        </div>
                    </div>
                </div>
            </section >

            {/* ============================================
                FEATURES GRID
            ============================================ */}
            < section className="py-24 bg-surface-light dark:bg-surface-dark transition-colors duration-300" >
                <div className="container mx-auto px-4">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <span className="section-label-premium text-primary font-semibold uppercase tracking-wider text-sm reveal-element">{t('features_section.subtitle')}</span>
                        <h2 className="section-title-premium text-4xl md:text-5xl font-display font-bold mt-3 mb-6 text-text-light-primary dark:text-text-dark-primary reveal-element">
                            {t('features_section.title')}
                        </h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {featuresData[language].map((feature, index) => (
                            <div key={index} className={`reveal-scale stagger-${(index % 4) + 1}`}>
                                <FeatureCard {...feature} />
                            </div>
                        ))}
                    </div>
                </div>
            </section >

            {/* ============================================
                ADVANTAGES SECTION - Detailed
            ============================================ */}
            < section className="py-24 bg-background-light dark:bg-background-dark transition-colors duration-300" id="avantages" >
                <div className="container mx-auto px-4">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <span className="section-label-premium text-primary font-semibold uppercase tracking-wider text-sm reveal-element">Vos avantages</span>
                        <h2 className="section-title-premium text-4xl md:text-5xl font-display font-bold mt-3 mb-6 text-text-light-primary dark:text-text-dark-primary reveal-element">
                            Ce qui fait notre différence
                        </h2>
                    </div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {advantagesData[language].map((advantage, index) => (
                            <div key={index} className={`reveal-element stagger-${(index % 4) + 1} advantage-item-premium flex items-start gap-4`}>
                                <span className="advantage-icon-premium material-icons-outlined text-3xl flex-shrink-0">{advantage.icon}</span>
                                <div>
                                    <h4 className="font-display font-semibold text-lg text-text-light-primary dark:text-text-dark-primary mb-2">{advantage.title}</h4>
                                    <p className="text-text-light-secondary dark:text-text-dark-secondary text-sm leading-relaxed">{advantage.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section >

            {/* ============================================
                PROCESS SECTION - Detailed Steps
            ============================================ */}
            < section className="py-24 bg-surface-light dark:bg-surface-dark transition-colors duration-300" id="processus" >
                <div className="container mx-auto px-4">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <span className="section-label-premium text-primary font-semibold uppercase tracking-wider text-sm reveal-element">{t('process_section.subtitle')}</span>
                        <h2 className="section-title-premium text-4xl md:text-5xl font-display font-bold mt-3 mb-6 text-text-light-primary dark:text-text-dark-primary reveal-element">
                            {t('process_section.title')}
                        </h2>
                    </div>
                    <div className="relative">
                        {/* Connecting line for desktop */}
                        <div className="hidden lg:block absolute top-24 left-[12.5%] right-[12.5%] h-1 bg-gradient-to-r from-primary via-green-400 to-primary rounded-full opacity-30"></div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                            {processSteps[language].map((step, index) => (
                                <div key={index} className={`reveal-scale stagger-${index + 1} text-center relative`}>
                                    <div className="process-number-premium text-white w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 relative shadow-lg z-10">
                                        <span className="text-3xl font-display font-bold">{step.num}</span>
                                        <div className="absolute -top-2 -right-2 bg-white dark:bg-gray-800 p-2 rounded-full shadow-lg">
                                            <span className="material-icons-outlined text-primary text-lg">{step.icon}</span>
                                        </div>
                                    </div>
                                    <h3 className="text-xl font-display font-bold mb-3 text-text-light-primary dark:text-text-dark-primary">{step.title}</h3>
                                    <p className="text-text-light-secondary dark:text-text-dark-secondary mb-3 leading-relaxed">{step.desc}</p>
                                    <span className="inline-block text-sm text-primary font-medium bg-primary/10 px-3 py-1 rounded-full">
                                        {step.detail}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section >

            {/* ============================================
                TESTIMONIALS SECTION - Expanded
            ============================================ */}
            < section className="py-24 bg-background-light dark:bg-background-dark transition-colors duration-300" id="temoignages" >
                <div className="container mx-auto px-4">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <span className="section-label-premium text-primary font-semibold uppercase tracking-wider text-sm reveal-element">{t('testimonials_section.subtitle')}</span>
                        <h2 className="section-title-premium text-4xl md:text-5xl font-display font-bold mt-3 mb-6 text-text-light-primary dark:text-text-dark-primary reveal-element">
                            {t('testimonials_section.title')}
                        </h2>
                        <p className="text-lg text-text-light-secondary dark:text-text-dark-secondary reveal-element">
                            {t('testimonials_section.description')}
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {testimonialsData[language].map((testimonial, index) => (
                            <div key={index} className={`reveal-element stagger-${(index % 4) + 1}`}>
                                <TestimonialCard {...testimonial} />
                            </div>
                        ))}
                    </div>

                    {/* Trust indicators */}
                    <div className="mt-16 text-center reveal-element">
                        <p className="text-text-light-secondary dark:text-text-dark-secondary mb-6">
                            {t('testimonials_section.rating_label')}
                        </p>
                        <div className="flex justify-center items-center gap-2 mb-2">
                            {[...Array(5)].map((_, i) => (
                                <span key={i} className="material-icons-outlined text-yellow-400 text-3xl">star</span>
                            ))}
                        </div>
                        <p className="text-2xl font-display font-bold text-text-light-primary dark:text-text-dark-primary">
                            4.9/5 <span className="text-base font-normal text-text-light-secondary dark:text-text-dark-secondary">{t('testimonials_section.rating_stats')}</span>
                        </p>
                    </div>
                </div>
            </section >

            {/* ============================================
                FAQ SECTION
            ============================================ */}
            < section className="py-24 bg-surface-light dark:bg-surface-dark transition-colors duration-300" id="faq" >
                <div className="container mx-auto px-4">
                    <div className="max-w-3xl mx-auto">
                        <div className="text-center mb-16">
                            <span className="section-label-premium text-primary font-semibold uppercase tracking-wider text-sm reveal-element">{t('faq.subtitle')}</span>
                            <h2 className="section-title-premium text-4xl md:text-5xl font-display font-bold mt-3 mb-6 text-text-light-primary dark:text-text-dark-primary reveal-element">
                                {t('faq.title')}
                            </h2>
                        </div>
                        <div className="bg-background-light dark:bg-background-dark rounded-2xl shadow-lg overflow-hidden reveal-element">
                            {faqData[language].map((faq, index) => (
                                <FAQItem
                                    key={index}
                                    question={faq.question}
                                    answer={faq.answer}
                                    isOpen={openFAQ === index}
                                    onClick={() => setOpenFAQ(openFAQ === index ? null : index)}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </section >

            {/* ============================================
                AREAS OF SERVICE
            ============================================ */}
            < section className="py-24 bg-background-light dark:bg-background-dark transition-colors duration-300" id="areas" >
                <div className="container mx-auto px-4">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <span className="section-label-premium text-primary font-semibold uppercase tracking-wider text-sm reveal-element">{t('areas.title')}</span>
                        <h2 className="section-title-premium text-4xl md:text-5xl font-display font-bold mt-3 mb-6 text-text-light-primary dark:text-text-dark-primary reveal-element">
                            {t('areas.title')}
                        </h2>
                        <p className="text-lg text-text-light-secondary dark:text-text-dark-secondary reveal-element">
                            {t('areas.description')}
                        </p>
                    </div>
                </div>

                <div className="reveal-element">
                    <ZoneAreaGallery />
                </div>

                <div className="container mx-auto px-4">
                    <p className="text-center mt-8 text-text-light-secondary dark:text-text-dark-secondary reveal-element">
                        {t('areas.not_listed')}
                    </p>
                </div>
            </section >

            {/* ============================================
                CTA SECTION - Final Conversion
            ============================================ */}
            < section className="cta-premium py-24 text-white relative overflow-hidden" id="final-cta" >
                <div className="container mx-auto px-4 text-center relative z-10">
                    <h2 className="text-4xl md:text-5xl font-display font-bold mb-6 reveal-element">
                        {t('cta_section.title')}
                    </h2>
                    <p className="text-xl font-body opacity-90 mb-4 max-w-2xl mx-auto reveal-element">
                        {t('cta_section.description')}
                    </p>
                    <p className="text-lg font-body opacity-75 mb-10 max-w-xl mx-auto reveal-element">
                        {t('cta_section.quote')}
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-stretch reveal-scale max-w-2xl mx-auto">
                        <a
                            href="#contact"
                            className="flex-1 flex items-center justify-center gap-2 text-white border-2 border-white/30 hover:border-white hover:bg-white/10 py-4 px-6 transition-all min-w-[280px] font-semibold text-center"
                            onClick={(e) => { e.preventDefault(); scrollToSection('contact-form'); }}
                        >
                            {t('cta_section.cta_button')}
                        </a>
                        <a
                            href="tel:5145121174"
                            className="flex-1 flex items-center justify-center gap-2 text-white border-2 border-white/30 hover:border-white hover:bg-white/10 py-4 px-6 transition-all min-w-[280px] font-semibold text-center"
                        >
                            <span className="material-icons-outlined">phone</span>
                            {t('cta_section.call_now')}
                        </a>
                    </div>

                    {/* Trust elements */}
                    <div className="mt-12 flex flex-wrap justify-center gap-8 text-white/70 text-sm reveal-element">
                        <span className="flex items-center gap-2">
                            <span className="material-icons-outlined text-green-300">check_circle</span>
                            {t('cta_section.trust_24h')}
                        </span>
                        <span className="flex items-center gap-2">
                            <span className="material-icons-outlined text-green-300">check_circle</span>
                            {t('cta_section.trust_no_commitment')}
                        </span>
                        <span className="flex items-center gap-2">
                            <span className="material-icons-outlined text-green-300">check_circle</span>
                            {t('cta_section.trust_satisfaction')}
                        </span>
                    </div>
                </div>
            </section >

            {/* ============================================
                CONTACT SECTION
            ============================================ */}
            < section className="py-24 bg-surface-light dark:bg-surface-dark transition-colors duration-300" id="contact" >
                <div className="container mx-auto px-4">
                    <div className="grid lg:grid-cols-2 gap-16">
                        {/* Form - appears FIRST on mobile (natural source order), SECOND on desktop (lg:order-2) */}
                        <div className="reveal-scale lg:order-2" id="contact-form">
                            <div className="bg-background-light dark:bg-background-dark p-8 rounded-2xl shadow-lg">
                                <h3 className="text-2xl font-display font-bold mb-6 text-text-light-primary dark:text-text-dark-primary">
                                    {t('contact_section.form_title')}
                                </h3>
                                <form className="space-y-4" onSubmit={handleSubmit} encType="multipart/form-data">
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <input
                                            type="text"
                                            name="first_name"
                                            placeholder={t('contact_section.first_name')}
                                            className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-surface-light dark:bg-surface-dark text-text-light-primary dark:text-text-dark-primary focus:outline-none focus:border-primary transition-colors"
                                            required
                                        />
                                        <input
                                            type="text"
                                            name="last_name"
                                            placeholder={t('contact_section.last_name')}
                                            className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-surface-light dark:bg-surface-dark text-text-light-primary dark:text-text-dark-primary focus:outline-none focus:border-primary transition-colors"
                                            required
                                        />
                                    </div>
                                    <input
                                        type="email"
                                        name="email"
                                        placeholder={t('contact_section.email_placeholder')}
                                        className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-surface-light dark:bg-surface-dark text-text-light-primary dark:text-text-dark-primary focus:outline-none focus:border-primary transition-colors"
                                        required
                                    />
                                    <input
                                        type="tel"
                                        name="phone"
                                        placeholder={t('contact_section.phone_placeholder')}
                                        className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-surface-light dark:bg-surface-dark text-text-light-primary dark:text-text-dark-primary focus:outline-none focus:border-primary transition-colors"
                                    />
                                    <select
                                        name="service_type"
                                        value={serviceType}
                                        onChange={(e) => {
                                            setServiceType(e.target.value);
                                            if (e.target.value !== 'candidate') {
                                                setFileName('');
                                            }
                                        }}
                                        className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-surface-light dark:bg-surface-dark text-text-light-primary dark:text-text-dark-primary focus:outline-none focus:border-primary transition-colors"
                                    >
                                        <option value="">{t('contact_section.service_type')}</option>
                                        <option value="offices">{t('contact_section.services.offices')}</option>
                                        <option value="residential">{t('contact_section.services.residential')}</option>
                                        <option value="industrial">{t('contact_section.services.industrial')}</option>
                                        <option value="commercial">{t('contact_section.services.commercial')}</option>
                                        <option value="construction">{t('contact_section.services.construction')}</option>
                                        <option value="windows">{t('contact_section.services.windows')}</option>
                                        <option value="candidate">{t('contact_section.services.candidate')}</option>
                                        <option value="other">{t('contact_section.services.other')}</option>
                                    </select>
                                    {serviceType === 'candidate' && (
                                        <div className="space-y-2 animate-fadeInScale">
                                            <label className="block text-sm font-semibold text-text-light-secondary dark:text-text-dark-secondary">
                                                {t('contact_section.cv_upload')}
                                            </label>
                                            <div className="relative border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-4 hover:border-primary transition-colors bg-surface-light dark:bg-surface-dark flex flex-col items-center justify-center cursor-pointer">
                                                <input
                                                    type="file"
                                                    name="cv"
                                                    accept=".pdf,.doc,.docx"
                                                    required
                                                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                                    onChange={(e) => {
                                                        const file = e.target.files?.[0];
                                                        if (file) {
                                                            setFileName(file.name);
                                                        } else {
                                                            setFileName('');
                                                        }
                                                    }}
                                                />
                                                <span className="material-icons-outlined text-3xl text-primary mb-2">cloud_upload</span>
                                                <span className="text-sm text-text-light-primary dark:text-text-dark-primary font-medium text-center">
                                                    {fileName || t('contact_section.cv_upload_placeholder')}
                                                </span>
                                                <span className="text-xs text-text-light-secondary dark:text-text-dark-secondary mt-1">
                                                    PDF, DOC, DOCX (Max 5MB)
                                                </span>
                                            </div>
                                        </div>
                                    )}
                                    <textarea
                                        name="message"
                                        placeholder={t('contact_section.describe_need')}
                                        rows={4}
                                        className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-surface-light dark:bg-surface-dark text-text-light-primary dark:text-text-dark-primary focus:outline-none focus:border-primary transition-colors resize-none"
                                        required
                                    ></textarea>
                                    <button
                                        type="submit"
                                        disabled={formStatus === 'submitting' || formStatus === 'success'}
                                        className={`w-full py-4 font-semibold text-lg transition-all duration-500 flex items-center justify-center gap-3 rounded-xl shadow-lg transform hover:-translate-y-1 ${formStatus === 'success' ? 'bg-green-500 hover:bg-green-600' :
                                            formStatus === 'error' ? 'bg-red-500 hover:bg-red-600' :
                                                'btn-accent'
                                            } text-white disabled:opacity-75 disabled:cursor-not-allowed`}
                                    >
                                        {formStatus === 'submitting' && (
                                            <span className="material-icons-outlined animate-spin">sync</span>
                                        )}
                                        {formStatus === 'success' && (
                                            <span className="material-icons-outlined animate-bounce">check_circle</span>
                                        )}
                                        {formStatus === 'error' && (
                                            <span className="material-icons-outlined">error</span>
                                        )}

                                        <span>
                                            {formStatus === 'idle' && t('contact_section.cta_button')}
                                            {formStatus === 'submitting' && t('contact_section.sending')}
                                            {formStatus === 'success' && t('contact_section.sent')}
                                            {formStatus === 'error' && (language === 'fr' ? "Erreur d'envoi" : "Sending Error")}
                                        </span>
                                    </button>
                                    <p className="text-xs text-text-light-secondary dark:text-text-dark-secondary text-center">
                                        {t('contact_section.privacy_note')}
                                    </p>
                                </form>
                            </div>
                        </div>

                        {/* Contact info - appears SECOND on mobile (natural source order), FIRST on desktop (lg:order-1) */}
                        <div className="reveal-element lg:order-1">
                            <span className="text-primary font-semibold uppercase tracking-wider text-sm">{t('contact_section.label')}</span>
                            <h2 className="text-4xl md:text-5xl font-display font-bold mt-3 mb-6 text-text-light-primary dark:text-text-dark-primary">
                                {t('contact_section.title')}
                            </h2>
                            <p className="text-lg text-text-light-secondary dark:text-text-dark-secondary mb-8 leading-relaxed">
                                {t('contact_section.description')}
                            </p>

                            <div className="space-y-6">
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                                        <span className="material-icons-outlined text-primary">phone</span>
                                    </div>
                                    <div>
                                        <h4 className="font-display font-semibold text-text-light-primary dark:text-text-dark-primary">{t('contact_section.phone')}</h4>
                                        <a href="tel:5145121174" className="text-text-light-secondary dark:text-text-dark-secondary hover:text-primary transition-colors">514-512-1174</a>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                                        <span className="material-icons-outlined text-primary">mail</span>
                                    </div>
                                    <div>
                                        <h4 className="font-display font-semibold text-text-light-primary dark:text-text-dark-primary">{t('contact_section.email')}</h4>
                                        <a href="mailto:info@georiseclat.com" className="text-text-light-secondary dark:text-text-dark-secondary hover:text-primary transition-colors">info@georiseclat.com</a>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                                        <span className="material-icons-outlined text-primary">schedule</span>
                                    </div>
                                    <div>
                                        <h4 className="font-display font-semibold text-text-light-primary dark:text-text-dark-primary">{t('contact_section.hours')}</h4>
                                        <p className="text-text-light-secondary dark:text-text-dark-secondary">{t('contact_section.days')}</p>
                                        <p className="text-text-light-secondary dark:text-text-dark-secondary">{t('contact_section.availability')}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section >

            <Footer />
        </div >
    );
};

const App: React.FC = () => {
    return (
        <LanguageProvider>
            <HashRouter>
                <ScrollToTop />
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/mentions-legales" element={<LegalNotice />} />
                    <Route path="/politique-de-confidentialite" element={<PrivacyPolicy />} />
                    {/* Fallback to home */}
                    <Route path="*" element={<HomePage />} />
                </Routes>
            </HashRouter>
        </LanguageProvider>
    );
};

export default App;
import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { LanguageToggle } from './LanguageToggle';
import { useLanguage } from '../LanguageContext';

interface HeaderProps {
    isScrolled?: boolean;
}

export const Header: React.FC<HeaderProps> = ({ isScrolled = false }) => {
    const { t } = useLanguage();
    const location = useLocation();
    const navigate = useNavigate();
    const isHome = location.pathname === '/';
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>, id: string) => {
        e.preventDefault();
        if (isHome) {
            requestAnimationFrame(() => {
                const element = document.getElementById(id);
                if (element) {
                    const headerOffset = 85;
                    const elementPosition = element.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.scrollY - headerOffset;
                    window.scrollTo({
                        top: Math.max(0, offsetPosition),
                        behavior: "smooth"
                    });
                }
            });
        } else {
            navigate('/', { state: { scrollTo: id } });
        }
        setIsMenuOpen(false);
    };

    // Prevent scrolling when menu is open
    useEffect(() => {
        if (isMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [isMenuOpen]);

    // Close menu on navigation
    useEffect(() => {
        setIsMenuOpen(false);
    }, [location.pathname]);

    const navLinks = [
        { id: 'services', label: t('nav.services') },
        { id: 'avantages', label: t('nav.advantages') },
        { id: 'qui-sommes-nous', label: t('nav.team') },
        { id: 'processus', label: t('nav.process') },
        { id: 'temoignages', label: t('nav.testimonials') },
        { id: 'faq', label: t('nav.faq') },
        { id: 'areas', label: t('nav.areas') },
        { id: 'contact', label: t('nav.contact') },
    ];

    return (
        <>
            <header className={`header-premium fixed top-0 left-0 right-0 z-50 transition-all duration-500 bg-white/90 backdrop-blur-sm ${isScrolled ? 'h-16 shadow-md' : 'h-20'}`}>
                {/* Subtle 5% black overlay */}
                <div className="absolute inset-0 bg-black/5 pointer-events-none z-0"></div>

                <div className="container mx-auto px-4 h-full flex justify-between items-center relative z-10">
                    {/* Logo */}
                    <Link
                        to="/"
                        className="flex items-center flex-shrink-0 -ml-1 h-full z-20"
                        onClick={() => setIsMenuOpen(false)}
                    >
                        <img
                            alt="Georis Éclat Nettoyage"
                            className={`transition-all duration-500 w-auto object-contain ${isScrolled
                                ? 'h-[75px] md:h-[85px] mt-2'
                                : 'h-[95px] md:h-[105px] mt-4'
                                }`}
                            src="/logo-georis-v3.png"
                        />
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="flex items-center h-full">
                        <nav className="hidden lg:flex items-center space-x-6 text-gray-700 font-semibold mr-8">
                            {navLinks.map((link) => (
                                <a
                                    key={link.id}
                                    className="nav-link-premium hover:text-primary transition-colors text-sm cursor-pointer"
                                    href={`#${link.id}`}
                                    onClick={(e) => handleNavClick(e, link.id)}
                                >
                                    {link.label}
                                </a>
                            ))}
                        </nav>

                        <div className="flex items-center space-x-3 flex-shrink-0">
                            <div className="text-gray-600 scale-90 hidden sm:block">
                                <LanguageToggle />
                            </div>
                            <a
                                href="#contact"
                                onClick={(e) => handleNavClick(e, 'contact-form')}
                                className="hidden sm:inline-block lg:hidden btn-accent text-[10px] py-2 px-5 min-w-0 cursor-pointer"
                            >
                                {t('nav.quote')}
                            </a>

                            {/* Mobile menu button */}
                            <button
                                onClick={() => setIsMenuOpen(!isMenuOpen)}
                                className="lg:hidden text-gray-700 p-2 hover:bg-gray-100 rounded-lg transition-colors z-50 relative"
                                aria-label="Toggle menu"
                            >
                                <span className="material-icons-outlined text-3xl">
                                    {isMenuOpen ? 'close' : 'menu'}
                                </span>
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            {/* Mobile Navigation Menu Overlay */}
            <div
                className={`fixed inset-0 z-[45] lg:hidden transition-all duration-500 ${isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
                    }`}
            >
                {/* Backdrop */}
                <div
                    className="absolute inset-0 bg-black/60 backdrop-blur-md"
                    onClick={() => setIsMenuOpen(false)}
                ></div>

                {/* Menu Content */}
                <div
                    className={`absolute top-0 right-0 bottom-0 w-[80%] max-w-sm bg-white dark:bg-gray-900 shadow-2xl transition-transform duration-500 ease-premium ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'
                        }`}
                >
                    <div className="flex flex-col h-full pt-20 pb-10 px-6">
                        <div className="flex justify-between items-center mb-10 border-b border-gray-100 dark:border-gray-800 pb-6">
                            <span className="text-xl font-display font-bold text-primary">Menu</span>
                            <div className="scale-110">
                                <LanguageToggle />
                            </div>
                        </div>

                        <nav className="flex flex-col space-y-4">
                            {navLinks.map((link) => (
                                <a
                                    key={link.id}
                                    href={`#${link.id}`}
                                    className="text-lg font-semibold text-gray-800 dark:text-gray-200 hover:text-primary transition-colors py-2 flex items-center justify-between group cursor-pointer"
                                    onClick={(e) => handleNavClick(e, link.id)}
                                >
                                    {link.label}
                                    <span className="material-icons-outlined text-primary opacity-0 group-hover:opacity-100 transition-opacity">east</span>
                                </a>
                            ))}
                        </nav>

                        <div className="mt-auto">
                            <a
                                href="#contact"
                                className="w-full btn-accent py-4 text-center text-sm cursor-pointer"
                                onClick={(e) => handleNavClick(e, 'contact-form')}
                            >
                                {t('nav.quote')}
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
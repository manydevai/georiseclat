import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../LanguageContext';

export const Footer: React.FC = () => {
    const { t } = useLanguage();
    return (
        <footer className="footer-premium bg-gray-900 dark:bg-black text-gray-300 py-16">
            <div className="container mx-auto px-4 md:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
                    {/* Brand Column */}
                    <div className="md:col-span-1">
                        <img
                            src="https://i.ibb.co/1td8zwVF/Goris-Eclat-Logo-bg.png"
                            alt="Georis Éclat Logo"
                            className="h-16 mb-4 filter brightness-110"
                        />
                        <p className="text-gray-400 text-sm leading-relaxed">
                            {t('footer.brand_description')}
                        </p>
                    </div>

                    {/* Contact Column */}
                    <div>
                        <h4 className="text-white text-lg font-display font-bold mb-6 relative inline-block">
                            Contact
                            <span className="absolute -bottom-2 left-0 w-12 h-1 bg-gradient-to-r from-primary to-green-400 rounded-full"></span>
                        </h4>
                        <ul className="space-y-4 mt-4">
                            <li className="footer-link-premium flex items-center cursor-pointer">
                                <span className="material-icons-outlined text-lg mr-3 text-green-400">phone</span>
                                <a href="tel:5145121174">514-512-1174</a>
                            </li>
                            <li className="footer-link-premium flex items-center cursor-pointer">
                                <span className="material-icons-outlined text-lg mr-3 text-green-400">mail_outline</span>
                                <a href="mailto:info@georiseclat.com">info@georiseclat.com</a>
                            </li>
                            <li className="footer-link-premium flex items-center cursor-pointer">
                                <span className="material-icons-outlined text-lg mr-3 text-green-400">location_on</span>
                                <span>6051 avenue de l'Authion, Montréal, QC</span>
                            </li>
                        </ul>
                    </div>

                    {/* Links Column */}
                    <div>
                        <h4 className="text-white text-lg font-display font-bold mb-6 relative inline-block">
                            {t('footer.about')}
                            <span className="absolute -bottom-2 left-0 w-12 h-1 bg-gradient-to-r from-primary to-green-400 rounded-full"></span>
                        </h4>
                        <ul className="space-y-3 mt-4">
                            <li><a className="footer-link-premium hover:text-green-400 transition-all duration-300 inline-block" href="/#/#qui-sommes-nous">{t('footer.our_story')}</a></li>
                            <li><a className="footer-link-premium hover:text-green-400 transition-all duration-300 inline-block" href="/#/#contact">{t('footer.careers')}</a></li>
                            <li><Link className="footer-link-premium hover:text-green-400 transition-all duration-300 inline-block" to="/mentions-legales">{t('footer.legal')}</Link></li>
                            <li><Link className="footer-link-premium hover:text-green-400 transition-all duration-300 inline-block" to="/politique-de-confidentialite">{t('footer.privacy')}</Link></li>
                        </ul>
                    </div>

                    {/* Social Column */}
                    <div>
                        <h4 className="text-white text-lg font-display font-bold mb-6 relative inline-block">
                            {t('footer.follow_us')}
                            <span className="absolute -bottom-2 left-0 w-12 h-1 bg-gradient-to-r from-primary to-green-400 rounded-full"></span>
                        </h4>
                        <div className="flex space-x-4 mt-4">
                            {/* Facebook */}
                            <a
                                href="https://www.facebook.com/p/Georis-Eclats-61571460172335/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-12 h-12 bg-gray-800 hover:bg-[#1877F2] rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg group"
                                title="Facebook"
                            >
                                <svg className="w-6 h-6 fill-gray-400 group-hover:fill-white transition-colors" viewBox="0 0 24 24">
                                    <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z" />
                                </svg>
                            </a>

                            {/* TikTok */}
                            <a
                                href="https://www.tiktok.com/@georiseclatnettoyage"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-12 h-12 bg-gray-800 hover:bg-[#000000] rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg group"
                                title="TikTok"
                            >
                                <svg className="w-6 h-6 fill-gray-400 group-hover:fill-white transition-colors" viewBox="0 0 24 24">
                                    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.17-2.86-.6-4.12-1.31-.01 2.84.02 5.69-.03 8.53-.11 3.06-1.55 6.12-4.41 7.42-2.5 1.14-5.77.89-7.91-.92-2.32-1.96-2.92-5.56-1.49-8.31 1.51-2.91 5.39-4.22 8.41-3.21v4.29c-1.78-.62-3.83-.02-5 1.43-.92 1.1-.96 2.76-.02 3.84.94 1.11 2.6 1.39 3.86.63 1.12-.66 1.6-1.98 1.62-3.23.04-4.52-.02-9.04.03-13.56-.01-1.12-.01-2.25-.01-3.37z" />
                                </svg>
                            </a>

                            {/* Instagram */}
                            <a
                                href="#"
                                className="w-12 h-12 bg-gray-800 hover:bg-gradient-to-br hover:from-purple-500 hover:to-pink-500 rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg group"
                                title="Instagram"
                            >
                                <svg className="w-6 h-6 fill-gray-400 group-hover:fill-white transition-colors" viewBox="0 0 24 24">
                                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                                </svg>
                            </a>
                        </div>

                        {/* Newsletter Mini */}
                        <div className="mt-8">
                            <p className="text-sm text-gray-400 mb-3">Newsletter</p>
                            <div className="flex">
                                <input
                                    type="email"
                                    placeholder="Votre email"
                                    className="flex-1 bg-gray-800 border border-gray-700 rounded-l-lg px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-green-400 transition-colors"
                                />
                                <button className="bg-gradient-to-r from-primary to-green-400 px-4 rounded-r-lg hover:opacity-90 transition-opacity">
                                    <span className="material-icons-outlined text-white">send</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom bar */}
                <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-sm text-gray-500">
                        © {new Date().getFullYear()} Georis Éclat Nettoyage. {t('footer.rights')}
                    </p>
                    <div className="flex items-center gap-2">
                        <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                        <span className="text-sm text-gray-400">{t('footer.available_7j')}</span>
                    </div>
                </div>
            </div>
        </footer>
    );
};
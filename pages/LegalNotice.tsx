import React, { useEffect } from 'react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { useLanguage } from '../LanguageContext';

const LegalNotice: React.FC = () => {
    const { t } = useLanguage();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="min-h-screen bg-background-light dark:bg-background-dark transition-colors duration-300">
            <Header isScrolled={true} />

            <main className="pt-32 pb-24">
                <div className="container mx-auto px-4 max-w-4xl">
                    <div className="bg-white dark:bg-surface-dark rounded-3xl shadow-xl overflow-hidden p-8 md:p-12">
                        <h1 className="text-4xl md:text-5xl font-display font-bold mb-8 text-text-light-primary dark:text-text-dark-primary border-b border-primary/20 pb-4">
                            {t('legal_notice.title')}
                        </h1>

                        <div className="space-y-8 text-text-light-secondary dark:text-text-dark-secondary leading-relaxed">
                            <section>
                                <h2 className="text-2xl font-display font-bold text-primary mb-4">{t('legal_notice.company_info')}</h2>
                                <ul className="space-y-2">
                                    <li>{t('legal_notice.company_name')}</li>
                                    <li>{t('legal_notice.address')}</li>
                                    <li>{t('legal_notice.phone')}</li>
                                    <li>{t('legal_notice.email')}</li>
                                    <li>{t('legal_notice.neq')}</li>
                                </ul>
                            </section>

                            <section>
                                <h2 className="text-2xl font-display font-bold text-primary mb-4">{t('legal_notice.hosting')}</h2>
                                <p>{t('legal_notice.hosting_info')}</p>
                            </section>

                            <section>
                                <h2 className="text-2xl font-display font-bold text-primary mb-4">{t('legal_notice.intellectual_property')}</h2>
                                <p>{t('legal_notice.ip_info')}</p>
                            </section>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default LegalNotice;

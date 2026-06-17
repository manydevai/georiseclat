import React, { useEffect } from 'react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { useLanguage } from '../LanguageContext';

const PrivacyPolicy: React.FC = () => {
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
                            {t('privacy_policy.title')}
                        </h1>

                        <div className="space-y-8 text-text-light-secondary dark:text-text-dark-secondary leading-relaxed">
                            <p className="text-lg font-medium">{t('privacy_policy.introduction')}</p>

                            <section>
                                <h2 className="text-2xl font-display font-bold text-primary mb-4">{t('privacy_policy.collection_title')}</h2>
                                <p>{t('privacy_policy.collection_info')}</p>
                            </section>

                            <section>
                                <h2 className="text-2xl font-display font-bold text-primary mb-4">{t('privacy_policy.purpose_title')}</h2>
                                <p>{t('privacy_policy.purpose_info')}</p>
                            </section>

                            <section>
                                <h2 className="text-2xl font-display font-bold text-primary mb-4">{t('privacy_policy.protection_title')}</h2>
                                <p>{t('privacy_policy.protection_info')}</p>
                            </section>

                            <section>
                                <h2 className="text-2xl font-display font-bold text-primary mb-4">{t('privacy_policy.rights_title')}</h2>
                                <p>{t('privacy_policy.rights_info')}</p>
                            </section>

                            <section className="bg-primary/5 p-6 rounded-2xl border border-primary/10">
                                <h2 className="text-xl font-display font-bold text-primary mb-2">{t('privacy_policy.officer_title')}</h2>
                                <p className="font-medium">{t('privacy_policy.officer_info')}</p>
                            </section>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default PrivacyPolicy;

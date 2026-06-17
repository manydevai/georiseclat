import React from 'react';
import { ServiceCardProps } from '../types';
import { useLanguage } from '../LanguageContext';

export const ServiceCard: React.FC<ServiceCardProps> = ({ imgSrc, imgAlt, title, description }) => {
    const { t } = useLanguage();

    return (
        <div className="service-card-v2 group" role="article">
            {/* Full-bleed background image */}
            <div className="service-card-v2__img-wrap">
                <img
                    alt={imgAlt}
                    className="service-card-v2__img"
                    src={imgSrc}
                    loading="lazy"
                />
            </div>

            {/* Cinematic gradient overlay */}
            <div className="service-card-v2__overlay" aria-hidden="true"></div>

            {/* Accent stripe at top */}
            <div className="service-card-v2__stripe" aria-hidden="true"></div>

            {/* Content layer */}
            <div className="service-card-v2__content">
                <h3 className="service-card-v2__title">{title}</h3>
                <p className="service-card-v2__desc">{description}</p>
                <a
                    href="#contact"
                    className="service-card-v2__cta"
                    onClick={(e) => {
                        e.preventDefault();
                        const element = document.getElementById('contact-form');
                        if (element) {
                            const headerOffset = 85;
                            const elementPosition = element.getBoundingClientRect().top;
                            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                            window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
                        }
                    }}
                >
                    <span className="service-card-v2__cta-text">{t('services.cta')}</span>
                    <span className="service-card-v2__cta-icon">
                        <span className="material-icons-outlined">east</span>
                    </span>
                </a>
            </div>
        </div>
    );
};
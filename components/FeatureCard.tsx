import React from 'react';
import { FeatureCardProps } from '../types';

export const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description }) => (
    <div className="feature-card-premium text-center group">
        <div className="feature-icon-premium w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:scale-110 transition-transform duration-500">
            <span className="material-icons-outlined text-4xl text-white">{icon}</span>
        </div>
        <h3 className="text-xl font-display font-bold mb-3 text-text-light-primary dark:text-text-dark-primary group-hover:text-primary transition-colors duration-300">
            {title}
        </h3>
        <p className="text-text-light-secondary dark:text-text-dark-secondary leading-relaxed">
            {description}
        </p>
    </div>
);
import React from 'react';
import { TestimonialCardProps } from '../types';

export const TestimonialCard: React.FC<TestimonialCardProps> = ({ author, role, quote, rating = 5 }) => (
    <div className="testimonial-premium relative group h-full flex flex-col">
        {/* Star rating */}
        <div className="flex gap-1 mb-4">
            {[...Array(rating)].map((_, i) => (
                <span key={i} className="material-icons-outlined text-yellow-400 text-lg">star</span>
            ))}
        </div>

        <p className="text-text-light-secondary dark:text-text-dark-secondary mb-6 relative z-10 text-base leading-relaxed flex-grow">
            "{quote}"
        </p>

        <div className="mt-auto">
            <div className="w-12 h-0.5 bg-gradient-to-r from-primary to-green-400 rounded-full mb-4 group-hover:w-20 transition-all duration-500"></div>
            <p className="font-display font-bold text-text-light-primary dark:text-text-dark-primary">
                {author}
            </p>
            {role && (
                <p className="text-sm text-text-light-secondary dark:text-text-dark-secondary mt-1">
                    {role}
                </p>
            )}
        </div>
    </div>
);
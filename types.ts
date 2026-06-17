export interface Service {
    imgSrc: string;
    imgAlt: string;
    title: string;
    description: string;
}

export interface Testimonial {
    author: string;
    role?: string;
    quote: string;
    rating?: number;
}

export interface Feature {
    icon: string;
    title: string;
    description: string;
}

export interface Stat {
    number: string;
    label: string;
    icon: string;
}

export interface ProcessStep {
    num: number;
    icon: string;
    title: string;
    desc: string;
    detail: string;
}

export interface FAQ {
    question: string;
    answer: string;
}

export interface Advantage {
    icon: string;
    title: string;
    description: string;
}

// Props interfaces for components
export interface ServiceCardProps extends Service { }
export interface TestimonialCardProps extends Testimonial { }
export interface FeatureCardProps extends Feature { }
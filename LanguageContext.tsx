import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

type Language = 'fr' | 'en';

interface LanguageContextType {
    language: Language;
    setLanguage: (lang: Language) => void;
    t: (key: string) => any;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations = {
    fr: {
        nav: {
            services: "Nos Services",
            advantages: "Avantages",
            team: "Notre équipe",
            process: "Processus",
            testimonials: "Témoignages",
            faq: "FAQ",
            areas: "Zones",
            contact: "Contact",
            quote: "Devis gratuit"
        },
        hero: {
            phrases: [
                "Votre espace, notre",
                "expertise : propreté",
                "garantie au quotidien."
            ],
            description: "Entretien ménager commercial et institutionnel à Montréal, Laval et Longueuil.",
            cta_quote: "Devis gratuit",
            cta_services: "Nos services"
        },
        stats: {
            clients: "Clients Satisfaits",
            satisfaction: "Satisfaction",
            interventions: "Interventions/An",
            agents: "Agents Qualifiés"
        },
        why_choose_us: {
            subtitle: "Pourquoi nous choisir",
            title: "Une expertise reconnue depuis 2024",
            experience: "2 ans",
            experience_label: "d’expérience",
            clients_label: "clients actifs",
            description_1: "Georis Éclat Nettoyage est le partenaire de confiance pour l'entretien de vos locaux professionnels et résidentiels dans la région de Montréal.",
            description_2: "Notre approche repose sur trois piliers : la rigueur de nos protocoles, la formation continue de nos agents et l'utilisation de produits respectueux de l'environnement.",
            clients_count: "21+"
        },
        services_section: {
            subtitle: "Nos Solutions de Nettoyage",
            title: "Des services sur mesure pour chaque besoin",
            description: "Nous proposons une gamme complète de services de nettoyage professionnel, adaptés aux exigences spécifiques de chaque secteur d'activité."
        },
        areas: {
            title: "Zones d'intervention",
            description: "Nous intervenons rapidement dans toute la région métropolitaine.",
            served_zone: "Zone desservie",
            not_listed: <>Votre ville n'est pas listée ? <a href="#contact" className="text-primary hover:underline font-semibold">Contactez-nous</a> pour vérifier notre disponibilité.</>,
            specific_need: {
                title: "Vous avez un besoin spécifique ? Nous nous adaptons.",
                button: "Contactez-nous pour en discuter"
            }
        },
        footer: {
            brand_description: "Votre partenaire de confiance pour tous vos besoins en nettoyage professionnel.",
            about: "À propos",
            our_story: "Notre histoire",
            careers: "Carrières",
            legal: "Mentions légales",
            privacy: "Politique de confidentialité",
            follow_us: "Suivez-nous",
            available_7j: "Service disponible 7j/7",
            rights: "Tous droits réservés."
        },
        cta_section: {
            title: "Prêt à profiter d'un espace impeccable ?",
            description: "Obtenez votre devis gratuit en moins de 24h. Sans engagement, sans surprise.",
            quote: "\"Nous nous engageons sur la qualité, la discrétion et la satisfaction de chaque client.\"",
            call_now: "Appelez-nous maintenant",
            cta_button: "Obtenir devis gratuit",
            trust_24h: "Devis sous 24h",
            trust_no_commitment: "Sans engagement",
            trust_satisfaction: "Satisfaction garantie"
        },
        contact_section: {
            label: "Contact",
            title: "Parlons de votre projet",
            description: "Vous avez une question ou souhaitez obtenir un devis personnalisé ? Notre équipe est à votre écoute du lundi au samedi, de 8h à 19h.",
            phone: "Téléphone",
            email: "Email",
            hours: "Horaires",
            days: "Lun - Sam: 8h00 - 19h00",
            availability: "Interventions 7j/7 disponibles",
            cta_button: "Obtenir devis gratuit",
            sending: "Envoi en cours...",
            sent: "Message envoyé !",
            form_title: "Demandez votre devis gratuit",
            first_name: "Prénom",
            last_name: "Nom",
            email_placeholder: "Adresse email",
            phone_placeholder: "Numéro de téléphone",
            service_type: "Type de service souhaité",
            describe_need: "Décrivez votre besoin (surface, fréquence souhaitée, etc.)",
            privacy_note: "En soumettant ce formulaire, vous acceptez notre politique de confidentialité.",
            cv_upload: "Joindre votre CV",
            cv_upload_placeholder: "Sélectionnez ou glissez-déposez votre CV (PDF, DOC, DOCX)",
            services: {
                offices: "Nettoyage de Bureaux",
                residential: "Nettoyage Résidentiel",
                industrial: "Nettoyage Industriel",
                commercial: "Nettoyage Commercial",
                construction: "Fin de Chantier",
                windows: "Nettoyage de Vitres",
                candidate: "Candidat à un emploi",
                other: "Autre"
            }
        },
        features_section: {
            subtitle: "Nos engagements",
            title: "La qualité, notre priorité absolue"
        },
        process_section: {
            subtitle: "Notre Méthode",
            title: "Un processus rigoureux pour un résultat parfait"
        },
        testimonials_section: {
            subtitle: "Témoignages",
            title: "Ils nous font confiance",
            description: "Découvrez ce que nos clients disent de notre service. Leur satisfaction est notre meilleure récompense.",
            rating_label: "Note moyenne de nos clients",
            rating_stats: "basé sur 147 avis"
        },
        faq: {
            title: "Questions Fréquemment Posées",
            subtitle: "FAQ"
        },
        services: {
            cta: "Devis gratuit"
        },
        legal_notice: {
            title: "Mentions Légales",
            company_info: "Informations sur l'entreprise",
            company_name: "Nom de l'entreprise : Georis Éclat Nettoyage",
            address: "Adresse : 6051 avenue de l'Authion, Montréal, QC",
            phone: "Téléphone : 514-512-1174",
            email: "Email : info@georiseclat.com",
            neq: "NEQ : [Votre numéro d'entreprise du Québec]",
            hosting: "Hébergement",
            hosting_info: "Le site est hébergé par Netlify, Inc., 44 Montgomery Street, Suite 300, San Francisco, CA 94104.",
            intellectual_property: "Propriété Intellectuelle",
            ip_info: "L'ensemble du contenu de ce site (textes, images, logos, etc.) est la propriété exclusive de Georis Éclat Nettoyage. Toute reproduction sans autorisation préalable est interdite."
        },
        privacy_policy: {
            title: "Politique de Confidentialité",
            introduction: "Conformément à la Loi 25 du Québec et à la LPRPDE du Canada, Georis Éclat Nettoyage s'engage à protéger la vie privée de ses utilisateurs.",
            collection_title: "Collecte des données",
            collection_info: "Nous collectons uniquement les informations fournies via notre formulaire de contact (nom, courriel, téléphone, type de service) afin de répondre à vos demandes.",
            purpose_title: "Finalité du traitement",
            purpose_info: "Ces données sont utilisées exclusivement pour l'établissement de devis et la gestion de la relation client.",
            protection_title: "Protection des données",
            protection_info: "Nous mettons en œuvre des mesures de sécurité rigoureuses pour protéger vos renseignements personnels contre tout accès non autorisé.",
            rights_title: "Vos droits",
            rights_info: "Vous disposez d'un droit d'accès, de rectification et de suppression de vos données personnelles.",
            officer_title: "Responsable de la protection des renseignements personnels",
            officer_info: "Pour toute question, veuillez contacter le Responsable à info@georiseclat.com ou par téléphone au 514-512-1174."
        }
    },
    en: {
        nav: {
            services: "Our Services",
            advantages: "Advantages",
            team: "Our Team",
            process: "Process",
            testimonials: "Testimonials",
            faq: "FAQ",
            areas: "Areas",
            contact: "Contact",
            quote: "Get free quote"
        },
        hero: {
            phrases: [
                "Your space, our",
                "expertise: cleanliness",
                "guaranteed daily."
            ],
            description: "Commercial and institutional cleaning services in Montreal, Laval, and Longueuil.",
            cta_quote: "Get free quote",
            cta_services: "Our Services"
        },
        stats: {
            clients: "Happy Clients",
            satisfaction: "Satisfaction",
            interventions: "Interventions/Year",
            agents: "Qualified Agents"
        },
        why_choose_us: {
            subtitle: "Why Choose Us",
            title: "Recognized Expertise Since 2024",
            experience: "2 years",
            experience_label: "of experience",
            clients_label: "active clients",
            description_1: "Georis Éclat Nettoyage is the trusted partner for the maintenance of your professional and residential premises in the Montreal area.",
            description_2: "Our approach is based on three pillars: rigorous protocols, continuous training of our agents, and the use of environmentally friendly products.",
            clients_count: "21+"
        },
        services_section: {
            subtitle: "Our Cleaning Solutions",
            title: "Tailored services for every need",
            description: "We offer a full range of professional cleaning services, adapted to the specific requirements of each business sector."
        },
        areas: {
            title: "Service Areas",
            description: "We intervene quickly throughout the metropolitan area.",
            served_zone: "Service Area",
            not_listed: <>Your city is not listed? <a href="#contact" className="text-primary hover:underline font-semibold">Contact us</a> to check our availability.</>,
            specific_need: {
                title: "Do you have a specific need? We adapt.",
                button: "Contact us to discuss"
            }
        },
        footer: {
            brand_description: "Your trusted partner for all your professional cleaning needs.",
            about: "About",
            our_story: "Our Story",
            careers: "Careers",
            legal: "Legal Notice",
            privacy: "Privacy Policy",
            follow_us: "Follow Us",
            available_7j: "Service available 7/7",
            rights: "All rights reserved."
        },
        cta_section: {
            title: "Ready for an impeccable space?",
            description: "Get your free quote in less than 24h. No commitment, no surprises.",
            quote: "\"We are committed to quality, discretion and the satisfaction of every client.\"",
            call_now: "Call us now",
            cta_button: "Get free quote",
            trust_24h: "Quote within 24h",
            trust_no_commitment: "No commitment",
            trust_satisfaction: "Satisfaction guaranteed"
        },
        contact_section: {
            label: "Contact",
            title: "Let's talk about your project",
            description: "Do you have a question or want a personalized quote? Our team is at your service from Monday to Saturday, 8am to 7pm.",
            phone: "Phone",
            email: "Email",
            hours: "Hours",
            days: "Mon - Sat: 8am - 7pm",
            availability: "7/7 interventions available",
            cta_button: "Get free quote",
            sending: "Sending...",
            sent: "Message sent!",
            form_title: "Request your free quote",
            first_name: "First Name",
            last_name: "Last Name",
            email_placeholder: "Email address",
            phone_placeholder: "Phone number",
            service_type: "Requested service type",
            describe_need: "Describe your need (surface area, desired frequency, etc.)",
            privacy_note: "By submitting this form, you accept our privacy policy.",
            cv_upload: "Attach your CV",
            cv_upload_placeholder: "Select or drag-and-drop your CV (PDF, DOC, DOCX)",
            services: {
                offices: "Office Cleaning",
                residential: "Residential Cleaning",
                industrial: "Industrial Cleaning",
                commercial: "Commercial Cleaning",
                construction: "Post-Construction",
                windows: "Window Cleaning",
                candidate: "Job Candidate",
                other: "Other"
            }
        },
        features_section: {
            subtitle: "Our Commitments",
            title: "Quality, Our Top Priority"
        },
        process_section: {
            subtitle: "Our Method",
            title: "A Rigorous Process for a Perfect Result"
        },
        testimonials_section: {
            subtitle: "Testimonials",
            title: "They Trust Us",
            description: "Discover what our clients say about our service. Their satisfaction is our best reward.",
            rating_label: "Average customer rating",
            rating_stats: "based on 147 reviews"
        },
        faq: {
            title: "Frequently Asked Questions",
            subtitle: "FAQ"
        },
        services: {
            cta: "Get free quote"
        },
        legal_notice: {
            title: "Legal Notice",
            company_info: "Company Information",
            company_name: "Company Name: Georis Éclat Nettoyage",
            address: "Address: 6051 avenue de l'Authion, Montreal, QC",
            phone: "Phone: 514-512-1174",
            email: "Email: info@georiseclat.com",
            neq: "NEQ: [Your Quebec Enterprise Number]",
            hosting: "Hosting",
            hosting_info: "This site is hosted by Netlify, Inc., 44 Montgomery Street, Suite 300, San Francisco, CA 94104.",
            intellectual_property: "Intellectual Property",
            ip_info: "All content on this site (text, images, logos, etc.) is the exclusive property of Georis Éclat Nettoyage. Any reproduction without prior authorization is prohibited."
        },
        privacy_policy: {
            title: "Privacy Policy",
            introduction: "In accordance with Quebec's Law 25 and Canada's PIPEDA, Georis Éclat Nettoyage is committed to protecting the privacy of its users.",
            collection_title: "Data Collection",
            collection_info: "We only collect information provided via our contact form (name, email, phone, service type) to respond to your requests.",
            purpose_title: "Purpose of Processing",
            purpose_info: "This data is used exclusively for providing quotes and managing the customer relationship.",
            protection_title: "Data Protection",
            protection_info: "We implement rigorous security measures to protect your personal information against unauthorized access.",
            rights_title: "Your Rights",
            rights_info: "You have the right to access, rectify, and delete your personal data.",
            officer_title: "Privacy Officer",
            officer_info: "For any questions, please contact the Privacy Officer at info@georiseclat.com or by phone at 514-512-1174."
        }
    }
};

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [language, setLanguage] = useState<Language>(() => {
        const saved = localStorage.getItem('app_language');
        return (saved as Language) || 'fr';
    });

    useEffect(() => {
        localStorage.setItem('app_language', language);
        document.documentElement.lang = language;
    }, [language]);

    const t = (path: string) => {
        const keys = path.split('.');
        let result: any = translations[language];
        for (const key of keys) {
            if (result && result[key] !== undefined) {
                result = result[key];
            } else {
                return path;
            }
        }
        return result;
    };

    return (
        <LanguageContext.Provider value={{ language, setLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = () => {
    const context = useContext(LanguageContext);
    if (context === undefined) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
};

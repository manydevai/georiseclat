import { Service, Testimonial, Feature } from './types';

export const servicesData: Record<'fr' | 'en', Service[]> = {
    fr: [
        {
            imgSrc: "https://i.ibb.co/JFw3Vt4N/Office-cleaning-service-1.jpg",
            imgAlt: "Professionnel souriant nettoyant un bureau",
            title: "Nettoyage de Bureaux",
            description: "Un environnement de travail propre booste la productivité. Nous assurons la propreté quotidienne de vos espaces professionnels.",
        },
        {
            imgSrc: "/residential-cleaning-new.jpg",
            imgAlt: "Professionnelle nettoyant des armoires de cuisine",
            title: "Nettoyage Résidentiel",
            description: "Récupérez votre temps libre. Notre équipe s'occupe de tout : nettoyage complet, repassage, rangement.",
        },
        {
            imgSrc: "https://i.ibb.co/q3Jkw072/Industrial-cleaning-service.jpg",
            imgAlt: "Service de nettoyage industriel professionnel",
            title: "Nettoyage Industriel",
            description: "Des protocoles stricts pour les environnements exigeants. Usines, entrepôts et sites de production.",
        },
        {
            imgSrc: "https://i.ibb.co/XfV14gTj/Office-cleaning-service-2.jpg",
            imgAlt: "Professionnel nettoyant un espace commercial",
            title: "Nettoyage Commercial",
            description: "Première impression impeccable garantie. Commerces, showrooms, restaurants, hôtels.",
        },
        {
            imgSrc: "https://i.ibb.co/YTQTZSrL/Surface-cleaning-1.jpg",
            imgAlt: "Service de nettoyage en profondeur",
            title: "Nettoyage de Fin de Chantier",
            description: "Transformation complète après travaux. Nous éliminons poussière et résidus de construction.",
        },
        {
            imgSrc: "https://i.ibb.co/XfdRPbm4/vecteezy-maid-cleaning-wipe-and-wash-the-glass-at-widow-in-home-2541121.jpg",
            imgAlt: "Professionnelle nettoyant une vitre à domicile",
            title: "Nettoyage de Vitres",
            description: "Des vitres cristallines pour une luminosité optimale. Intervention façades et verrières.",
        },
    ],
    en: [
        {
            imgSrc: "https://i.ibb.co/JFw3Vt4N/Office-cleaning-service-1.jpg",
            imgAlt: "Smiling professional cleaning an office",
            title: "Office Cleaning",
            description: "A clean work environment boosts productivity. We ensure the daily cleanliness of your professional spaces.",
        },
        {
            imgSrc: "/residential-cleaning-new.jpg",
            imgAlt: "Professional cleaning kitchen cabinets",
            title: "Residential Cleaning",
            description: "Get your free time back. Our team takes care of everything: complete cleaning, ironing, tidying.",
        },
        {
            imgSrc: "https://i.ibb.co/q3Jkw072/Industrial-cleaning-service.jpg",
            imgAlt: "Professional industrial cleaning service",
            title: "Industrial Cleaning",
            description: "Strict protocols for demanding environments. Factories, warehouses, and production sites.",
        },
        {
            imgSrc: "https://i.ibb.co/XfV14gTj/Office-cleaning-service-2.jpg",
            imgAlt: "Professional cleaning a commercial space",
            title: "Commercial Cleaning",
            description: "Impeccable first impression guaranteed. Shops, showrooms, restaurants, hotels.",
        },
        {
            imgSrc: "https://i.ibb.co/YTQTZSrL/Surface-cleaning-1.jpg",
            imgAlt: "Deep cleaning service",
            title: "Post-Construction Cleaning",
            description: "Complete transformation after work. We eliminate dust and construction residues.",
        },
        {
            imgSrc: "https://i.ibb.co/XfdRPbm4/vecteezy-maid-cleaning-wipe-and-wash-the-glass-at-widow-in-home-2541121.jpg",
            imgAlt: "Professional cleaning a window at home",
            title: "Window Cleaning",
            description: "Crystal clear windows for optimal brightness. Facades and glass roofs intervention.",
        },
    ]
};

export const testimonialsData: Record<'fr' | 'en', Testimonial[]> = {
    fr: [
        {
            author: "Sophie Martin",
            role: "Directrice Générale, TechStart SAS",
            quote: "Un service exceptionnel ! Leurs équipes sont discrètes, efficaces et toujours ponctuelles.",
            rating: 5
        },
        {
            author: "Thomas Dubreuil",
            role: "Gérant, Restaurant Le Gourmet",
            quote: "Dans la restauration, l'hygiène est primordiale. Georis Éclat comprend nos exigences.",
            rating: 5
        },
        {
            author: "Isabelle Fontaine",
            role: "Particulier",
            quote: "Désormais, je rentre dans un intérieur toujours impeccable. Un vrai soulagement !",
            rating: 5
        }
    ],
    en: [
        {
            author: "Sophie Martin",
            role: "CEO, TechStart SAS",
            quote: "Exceptional service! Their teams are discreet, efficient, and always on time.",
            rating: 5
        },
        {
            author: "Thomas Dubreuil",
            role: "Manager, Le Gourmet Restaurant",
            quote: "In the restaurant industry, hygiene is paramount. Georis Éclat understands our needs.",
            rating: 5
        },
        {
            author: "Isabelle Fontaine",
            role: "Individual",
            quote: "Now, I always come home to an impeccable interior. A real relief!",
            rating: 5
        }
    ]
};

export const featuresData: Record<'fr' | 'en', Feature[]> = {
    fr: [
        { icon: "groups", title: "Équipe Certifiée", description: "Agents formés, certifiés et supervisés." },
        { icon: "verified_user", title: "Assurance Complète", description: "Responsabilité civile professionnelle incluse." },
        { icon: "schedule", title: "Flexibilité Horaire", description: "Interventions 7j/7 selon votre planning." },
    ],
    en: [
        { icon: "groups", title: "Certified Team", description: "Trained, certified, and supervised agents." },
        { icon: "verified_user", title: "Full Insurance", description: "Professional liability insurance included." },
        { icon: "schedule", title: "Flexible Schedule", description: "7/7 interventions according to your schedule." },
    ]
};

export const advantagesData: Record<'fr' | 'en', { icon: string; title: string; description: string }[]> = {
    fr: [
        { icon: "check_circle", title: "Nettoyage complet", description: "Chaque recoin reçoit une attention particulière." },
        { icon: "eco", title: "Produits écologiques", description: "Produits labellisés sans danger pour la santé." },
        { icon: "request_quote", title: "Tarifs transparents", description: "Devis détaillé sans frais cachés." },
    ],
    en: [
        { icon: "check_circle", title: "Complete Cleaning", description: "Every corner receives special attention." },
        { icon: "eco", title: "Eco-friendly Products", description: "Labeled products safe for health." },
        { icon: "request_quote", title: "Transparent Pricing", description: "Detailed quote with no hidden fees." },
    ]
};

export const statsData = [
    { number: "21+", icon: "people" },
    { number: "99.7%", icon: "thumb_up" },
    { number: "107+", icon: "cleaning_services" },
    { number: "17+", icon: "badge" },
];

export const areasData = [
    "Montréal",
    "Laval",
    "Longueuil",
    "Brossard",
    "Boucherville",
    "Verdun",
    "Saint-Hubert",
];

export const processSteps: Record<'fr' | 'en', any[]> = {
    fr: [
        { num: 1, icon: 'phone_in_talk', title: 'Contact', desc: 'Contactez-nous pour une évaluation.', detail: 'Évaluation gratuite' },
        { num: 2, icon: 'assignment', title: 'Devis', desc: 'Nous établissons un devis détaillé.', detail: 'Transparent' },
        { num: 3, icon: 'cleaning_services', title: 'Nettoyage', desc: 'Intervention avec équipement pro.', detail: 'Qualité garantie' },
        { num: 4, icon: 'verified', title: 'Contrôle', desc: 'Suivi rigoureux après chaque passage.', detail: 'Satisfaction' },
    ],
    en: [
        { num: 1, icon: 'phone_in_talk', title: 'Contact', desc: 'Contact us for an evaluation.', detail: 'Free assessment' },
        { num: 2, icon: 'assignment', title: 'Quote', desc: 'We provide a detailed quote.', detail: 'Transparent' },
        { num: 3, icon: 'cleaning_services', title: 'Cleaning', desc: 'Intervention with pro equipment.', detail: 'Guaranteed quality' },
        { num: 4, icon: 'verified', title: 'Control', desc: 'Rigorous follow-up after each visit.', detail: 'Satisfaction' },
    ]
};

export const faqData: Record<'fr' | 'en', any[]> = {
    fr: [
        { question: "Quels sont vos tarifs ?", answer: "Nos tarifs varient selon la surface et le type de prestation. Devis gratuit." },
        { question: "Fournissez-vous les produits ?", answer: "Oui, tous nos produits et équipements sont inclus." },
        { question: "Êtes-vous assurés ?", answer: "Absolument. Nous avons une assurance responsabilité civile complète." },
    ],
    en: [
        { question: "What are your rates?", answer: "Our rates vary based on area and service type. Free quote available." },
        { question: "Do you provide supplies?", answer: "Yes, all our products and equipment are included." },
        { question: "Are you insured?", answer: "Absolutely. We have full professional liability insurance." },
    ]
};
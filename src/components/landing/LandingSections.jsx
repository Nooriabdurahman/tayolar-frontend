import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Scissors, Ruler, Truck, ShieldCheck, Star, ChevronDown, ChevronUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import Tailor3DScene from './Tailor3DScene';

// --- Hero Section ---
export const HeroSection = () => {
    return (
        <section className="relative h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-900 to-slate-800">
            <div className="absolute inset-0 z-0 opacity-50">
                <Tailor3DScene />
            </div>

            <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="text-4xl md:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 via-purple-300 to-pink-300 tracking-tight leading-tight"
                >
                    Masterful Tailoring, <br className="hidden md:block" />
                    Delivered to You.
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="mt-6 text-lg md:text-2xl text-slate-300 max-w-3xl mx-auto font-light px-4"
                >
                    Connect with expert tailors for bespoke clothing, alterations, and custom designs. Quality craftsmanship meets modern convenience.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    className="mt-10 flex flex-col sm:flex-row gap-4 justify-center"
                >
                    <Link to="/signup" className="px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white text-lg font-semibold rounded-full shadow-lg hover:shadow-indigo-500/50 transition-all transform hover:-translate-y-1 flex items-center justify-center">
                        Get Started <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                    <a href="#how-it-works" className="px-8 py-4 bg-white/10 backdrop-blur-md hover:bg-white/20 text-white text-lg font-semibold rounded-full border border-white/20 transition-all flex items-center justify-center">
                        How it Works
                    </a>
                </motion.div>
            </div>

            <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce text-white/50">
                <ChevronDown className="h-8 w-8" />
            </div>
        </section>
    );
};

// --- Features Section ---
export const FeaturesSection = () => {
    const features = [
        { icon: Scissors, title: "Expert Tailors", desc: "Vetted professionals with years of experience." },
        { icon: Ruler, title: "Perfect Fit", desc: "Detailed measurements for custom-fitted garments." },
        { icon: Truck, title: "Doorstep Delivery", desc: "We pick up and deliver your clothes safely." },
        { icon: ShieldCheck, title: "Quality Guarantee", desc: "100% satisfaction or free alterations." },
    ];

    return (
        <section className="py-24 bg-white" id="features">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold text-slate-900">Why Choose TailorHub?</h2>
                    <p className="mt-4 text-xl text-slate-600 max-w-2xl mx-auto">We bridge the gap between traditional craftsmanship and modern convenience.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {features.map((f, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: i * 0.1 }}
                            className="bg-white p-8 rounded-3xl shadow-lg shadow-slate-200/50 hover:shadow-2xl hover:shadow-indigo-500/10 transition-all border border-slate-100 group relative overflow-hidden"
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/50 to-purple-50/50 opacity-0 group-hover:opacity-100 transition-opacity" />
                            <div className="relative z-10">
                                <div className="w-14 h-14 bg-indigo-100 rounded-2xl flex items-center justify-center mb-6 text-indigo-600 group-hover:scale-110 transition-transform">
                                    <f.icon className="h-7 w-7" />
                                </div>
                                <h3 className="text-xl font-bold text-slate-900 mb-3">{f.title}</h3>
                                <p className="text-slate-600 leading-relaxed">{f.desc}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

// --- How It Works Section ---
export const HowItWorksSection = () => {
    const steps = [
        { num: 1, title: "Post a Job", desc: "Describe what you need - alteration, custom suit, or dress." },
        { num: 2, title: "Get Propsals", desc: "Review bids from top-rated tailors near you." },
        { num: 3, title: "Measure Up", desc: "Provide measurements or schedule a visit." },
        { num: 4, title: "Delivery", desc: "Receive your perfectly fitted garment." },
    ];

    return (
        <section className="py-24 bg-slate-900 text-white" id="how-it-works">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold">How It Works</h2>
                    <p className="mt-4 text-xl text-slate-400">Your path to perfect style in 4 simple steps.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
                    {/* Connection Line (Hidden on mobile) */}
                    <div className="hidden md:block absolute top-12 left-0 right-0 h-0.5 bg-gradient-to-r from-indigo-500/0 via-indigo-500/50 to-indigo-500/0" />

                    {steps.map((step, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: i * 0.15 }}
                            className="relative z-10 text-center"
                        >
                            <div className="w-24 h-24 bg-slate-800 rounded-full border-4 border-indigo-500/50 group-hover:border-indigo-500 flex items-center justify-center text-3xl font-bold mx-auto mb-6 shadow-lg shadow-indigo-500/20 transition-all">
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">{step.num}</span>
                            </div>
                            <h3 className="text-2xl font-bold mb-3 text-indigo-50">{step.title}</h3>
                            <p className="text-slate-400 max-w-xs mx-auto">{step.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}

// --- Testimonials Section ---
export const TestimonialsSection = () => {
    return (
        <section className="py-24 bg-indigo-50 overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-4xl font-bold text-center text-slate-900 mb-16">What Our Clients Say</h2>

                <div className="flex gap-6 animate-marquee-slow">
                    {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="min-w-[350px] bg-white p-8 rounded-2xl shadow-md border border-indigo-100 flex-shrink-0">
                            <div className="flex text-yellow-500 mb-4">
                                {[...Array(5)].map((_, j) => <Star key={j} className="h-5 w-5 fill-current" />)}
                            </div>
                            <p className="text-slate-700 italic mb-6">"Absolutely amazing service. The tailor came to my house, took measurements, and the suit fits perfectly. Highly recommended!"</p>
                            <div className="flex items-center">
                                <div className="h-10 w-10 bg-slate-200 rounded-full mr-3"></div>
                                <div>
                                    <p className="font-bold text-slate-900">Sarah Johnson</p>
                                    <p className="text-slate-500 text-sm">New York, NY</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

// --- FAQ Section ---
export const FAQSection = () => {
    const faqs = [
        { q: "How do I ensure the measurements are correct?", a: "We provide a detailed video guide for self-measurement, or you can book a tailor who offers home visits." },
        { q: "What happens if the clothes don't fit?", a: "We offer a fit guarantee. Your tailor will perform alterations free of charge until you are satisfied." },
        { q: "How long does custom tailoring take?", a: "It depends on the complexity. Simple alterations take 2-3 days, while custom suits may take 2-3 weeks." },
    ];

    return (
        <section className="py-24 bg-white" id="faq">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-4xl font-bold text-center text-slate-900 mb-16">Frequently Asked Questions</h2>

                <div className="space-y-4">
                    {faqs.map((faq, i) => (
                        <div key={i} className="border border-slate-200 rounded-2xl p-6 hover:border-indigo-300 transition-colors">
                            <h3 className="text-xl font-bold text-slate-900 mb-2">{faq.q}</h3>
                            <p className="text-slate-600">{faq.a}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

// --- CTA Section ---
export const CTASection = () => {
    return (
        <section className="py-24 bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-center">
            <div className="max-w-4xl mx-auto px-4">
                <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Upgrade Your Style?</h2>
                <p className="text-xl text-indigo-100 mb-10 max-w-2xl mx-auto">Join thousands of satisfied customers who have discovered the joy of perfectly fitted clothes.</p>
                <Link to="/signup" className="inline-block px-10 py-4 bg-white text-indigo-700 text-xl font-bold rounded-full shadow-2xl hover:bg-slate-100 transform hover:scale-105 transition-all">
                    Start Your Journey
                </Link>
            </div>
        </section>
    );
};

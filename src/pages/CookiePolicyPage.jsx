import React from 'react';
import { motion } from 'framer-motion';
import { Cookie, Settings, Shield, Info } from 'lucide-react';
import Tailor3DScene from '../components/landing/Tailor3DScene';

const CookiePolicyPage = () => {
    const sections = [
        {
            icon: Cookie,
            title: 'What Are Cookies',
            content: 'Cookies are small text files stored on your device when you visit our website. They help us provide you with a better experience by remembering your preferences and understanding how you use our platform.',
        },
        {
            icon: Settings,
            title: 'How We Use Cookies',
            content: 'We use cookies to authenticate users, remember your preferences, analyze site traffic, and improve our services. Some cookies are essential for the platform to function, while others help us enhance your experience.',
        },
        {
            icon: Shield,
            title: 'Cookie Types',
            content: 'We use essential cookies (required for site functionality), analytics cookies (to understand usage), and preference cookies (to remember your settings). You can manage cookie preferences in your browser settings.',
        },
        {
            icon: Info,
            title: 'Third-Party Cookies',
            content: 'We may use third-party services that set their own cookies. These services help us analyze traffic, process payments, and provide customer support. We do not control these cookies, but we ensure our partners follow privacy best practices.',
        },
    ];

    return (
        <div className="relative min-h-screen bg-gradient-to-br from-slate-900 via-amber-900 to-slate-900 pt-24 pb-12">
            <div className="absolute inset-0 z-0 opacity-20">
                <Tailor3DScene />
            </div>

            <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-12"
                >
                    <h1 className="text-5xl font-bold text-white mb-4">Cookie Policy</h1>
                    <p className="text-xl text-slate-300">Last updated: January 2026</p>
                </motion.div>

                <div className="bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-8 md:p-12 space-y-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                    >
                        <p className="text-lg text-white/90 leading-relaxed">
                            This Cookie Policy explains how TailorHub uses cookies and similar technologies to recognize you when you visit our website. It explains what these technologies are and why we use them.
                        </p>
                    </motion.div>

                    {sections.map((section, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 + index * 0.1 }}
                            className="bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10"
                        >
                            <div className="flex items-start gap-4">
                                <div className="p-3 bg-amber-500/20 rounded-xl">
                                    <section.icon className="w-6 h-6 text-amber-300" />
                                </div>
                                <div className="flex-1">
                                    <h2 className="text-2xl font-bold text-white mb-3">{section.title}</h2>
                                    <p className="text-white/80 leading-relaxed">{section.content}</p>
                                </div>
                            </div>
                        </motion.div>
                    ))}

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 }}
                        className="pt-8 border-t border-white/20"
                    >
                        <h2 className="text-2xl font-bold text-white mb-4">Managing Cookies</h2>
                        <p className="text-white/80 leading-relaxed mb-4">
                            You can control and manage cookies in various ways. Please keep in mind that removing or blocking cookies can impact your user experience and parts of our website may no longer be fully accessible.
                        </p>
                        <p className="text-white/80 leading-relaxed">
                            For questions about our use of cookies, contact us at{' '}
                            <a href="mailto:cookies@tailorhub.com" className="text-amber-300 hover:text-amber-200 underline">
                                cookies@tailorhub.com
                            </a>
                        </p>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default CookiePolicyPage;


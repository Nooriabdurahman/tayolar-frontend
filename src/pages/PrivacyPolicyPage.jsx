import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Lock, Eye, FileText } from 'lucide-react';
import Tailor3DScene from '../components/landing/Tailor3DScene';

const PrivacyPolicyPage = () => {
    const sections = [
        {
            icon: Eye,
            title: 'Information We Collect',
            content: 'We collect information that you provide directly to us, including your name, email address, phone number, and payment information when you use our services. We also collect information about your usage of our platform to improve your experience.',
        },
        {
            icon: Lock,
            title: 'How We Use Your Information',
            content: 'We use the information we collect to provide, maintain, and improve our services, process transactions, send you updates about your orders, and communicate with you about our services. We do not sell your personal information to third parties.',
        },
        {
            icon: Shield,
            title: 'Data Security',
            content: 'We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. Your data is encrypted and stored securely.',
        },
        {
            icon: FileText,
            title: 'Your Rights',
            content: 'You have the right to access, update, or delete your personal information at any time. You can also opt out of marketing communications. Contact us at privacy@tailorhub.com to exercise these rights.',
        },
    ];

    return (
        <div className="relative min-h-screen bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-900 pt-24 pb-12">
            <div className="absolute inset-0 z-0 opacity-20">
                <Tailor3DScene />
            </div>

            <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-12"
                >
                    <h1 className="text-5xl font-bold text-white mb-4">Privacy Policy</h1>
                    <p className="text-xl text-slate-300">Last updated: January 2026</p>
                </motion.div>

                <div className="bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-8 md:p-12 space-y-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                    >
                        <p className="text-lg text-white/90 leading-relaxed">
                            At TailorHub, we are committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our platform.
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
                                <div className="p-3 bg-indigo-500/20 rounded-xl">
                                    <section.icon className="w-6 h-6 text-indigo-300" />
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
                        <h2 className="text-2xl font-bold text-white mb-4">Contact Us</h2>
                        <p className="text-white/80 leading-relaxed">
                            If you have questions about this Privacy Policy, please contact us at{' '}
                            <a href="mailto:privacy@tailorhub.com" className="text-indigo-300 hover:text-indigo-200 underline">
                                privacy@tailorhub.com
                            </a>
                        </p>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default PrivacyPolicyPage;


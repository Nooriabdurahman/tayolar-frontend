import React from 'react';
import { motion } from 'framer-motion';
import { FileText, Scale, AlertCircle, CheckCircle } from 'lucide-react';
import Tailor3DScene from '../components/landing/Tailor3DScene';

const TermsConditionsPage = () => {
    const sections = [
        {
            icon: FileText,
            title: 'Agreement to Terms',
            content: 'By accessing or using TailorHub, you agree to be bound by these Terms and Conditions. If you disagree with any part of these terms, you may not access the service.',
        },
        {
            icon: CheckCircle,
            title: 'User Responsibilities',
            content: 'You are responsible for maintaining the confidentiality of your account and password. You agree to provide accurate, current, and complete information. You are responsible for all activities that occur under your account.',
        },
        {
            icon: Scale,
            title: 'Service Terms',
            content: 'TailorHub connects clients with tailors. We facilitate transactions but are not responsible for the quality of tailoring services. Disputes between clients and tailors should be resolved directly or through our support team.',
        },
        {
            icon: AlertCircle,
            title: 'Payment and Refunds',
            content: 'Payments are processed securely through our platform. Refund policies vary by service and tailor. Please review individual service terms before booking. We reserve the right to charge service fees.',
        },
    ];

    return (
        <div className="relative min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 pt-24 pb-12">
            <div className="absolute inset-0 z-0 opacity-20">
                <Tailor3DScene />
            </div>

            <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-12"
                >
                    <h1 className="text-5xl font-bold text-white mb-4">Terms & Conditions</h1>
                    <p className="text-xl text-slate-300">Last updated: January 2026</p>
                </motion.div>

                <div className="bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-8 md:p-12 space-y-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                    >
                        <p className="text-lg text-white/90 leading-relaxed">
                            Please read these Terms and Conditions carefully before using TailorHub. These terms govern your use of our platform and services.
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
                                <div className="p-3 bg-purple-500/20 rounded-xl">
                                    <section.icon className="w-6 h-6 text-purple-300" />
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
                            For questions about these Terms, contact us at{' '}
                            <a href="mailto:legal@tailorhub.com" className="text-purple-300 hover:text-purple-200 underline">
                                legal@tailorhub.com
                            </a>
                        </p>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default TermsConditionsPage;


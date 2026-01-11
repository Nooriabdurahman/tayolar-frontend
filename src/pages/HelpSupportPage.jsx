import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { HelpCircle, MessageSquare, Mail, Phone, Search, ChevronDown } from 'lucide-react';
import Tailor3DScene from '../components/landing/Tailor3DScene';

const HelpSupportPage = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [openCategory, setOpenCategory] = useState(null);

    const categories = [
        {
            title: 'Getting Started',
            icon: HelpCircle,
            items: [
                { q: 'How do I create an account?', a: 'Click the "Sign Up" button in the top right corner, fill in your details, verify your email, and you\'re ready to go!' },
                { q: 'What\'s the difference between Client and Tailor?', a: 'Clients post jobs and hire tailors. Tailors create services and fulfill client requests.' },
            ],
        },
        {
            title: 'Account & Profile',
            icon: MessageSquare,
            items: [
                { q: 'How do I update my profile?', a: 'Go to your Dashboard, click on the Profile tab, and use the Edit button to update your information.' },
                { q: 'Can I change my role?', a: 'Yes, you can switch between Client and Tailor roles in your account settings.' },
            ],
        },
        {
            title: 'Orders & Payments',
            icon: Mail,
            items: [
                { q: 'How do I pay for services?', a: 'Payments are processed securely through our platform. You\'ll be prompted to pay when accepting a tailor\'s proposal.' },
                { q: 'What is the refund policy?', a: 'Refund policies vary by service. Check individual service terms or contact support for assistance.' },
            ],
        },
    ];

    return (
        <div className="relative min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 pt-24 pb-12">
            <div className="absolute inset-0 z-0 opacity-20">
                <Tailor3DScene />
            </div>

            <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-12"
                >
                    <h1 className="text-5xl font-bold text-white mb-4">Help & Support</h1>
                    <p className="text-xl text-slate-300 mb-8">We're here to help you</p>

                    {/* Search Bar */}
                    <div className="max-w-2xl mx-auto relative">
                        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                        <input
                            type="text"
                            placeholder="Search for help..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-12 pr-4 py-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                    </div>
                </motion.div>

                {/* Categories */}
                <div className="space-y-4 mb-12">
                    {categories.map((category, catIndex) => (
                        <motion.div
                            key={catIndex}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: catIndex * 0.1 }}
                            className="bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 overflow-hidden"
                        >
                            <button
                                onClick={() => setOpenCategory(openCategory === catIndex ? null : catIndex)}
                                className="w-full p-6 flex items-center justify-between text-left hover:bg-white/5 transition-colors"
                            >
                                <div className="flex items-center gap-4">
                                    <div className="p-3 bg-blue-500/20 rounded-xl">
                                        <category.icon className="w-6 h-6 text-blue-300" />
                                    </div>
                                    <h2 className="text-2xl font-bold text-white">{category.title}</h2>
                                </div>
                                <ChevronDown
                                    className={`w-6 h-6 text-white transition-transform ${
                                        openCategory === catIndex ? 'transform rotate-180' : ''
                                    }`}
                                />
                            </button>
                            {openCategory === catIndex && (
                                <div className="px-6 pb-6 space-y-4 border-t border-white/10 pt-6">
                                    {category.items.map((item, itemIndex) => (
                                        <div key={itemIndex} className="bg-white/5 rounded-xl p-4">
                                            <h3 className="font-semibold text-white mb-2">{item.q}</h3>
                                            <p className="text-white/80">{item.a}</p>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </motion.div>
                    ))}
                </div>

                {/* Contact Options */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 p-8"
                >
                    <h2 className="text-3xl font-bold text-white mb-6 text-center">Still Need Help?</h2>
                    <div className="grid md:grid-cols-3 gap-6">
                        <a
                            href="mailto:support@tailorhub.com"
                            className="p-6 bg-white/5 hover:bg-white/10 rounded-2xl transition-colors text-center group"
                        >
                            <Mail className="w-8 h-8 text-blue-300 mx-auto mb-3 group-hover:scale-110 transition-transform" />
                            <h3 className="font-semibold text-white mb-2">Email Us</h3>
                            <p className="text-white/70 text-sm">support@tailorhub.com</p>
                        </a>
                        <a
                            href="tel:+15551234567"
                            className="p-6 bg-white/5 hover:bg-white/10 rounded-2xl transition-colors text-center group"
                        >
                            <Phone className="w-8 h-8 text-blue-300 mx-auto mb-3 group-hover:scale-110 transition-transform" />
                            <h3 className="font-semibold text-white mb-2">Call Us</h3>
                            <p className="text-white/70 text-sm">+1 (555) 123-4567</p>
                        </a>
                        <a
                            href="/contact"
                            className="p-6 bg-white/5 hover:bg-white/10 rounded-2xl transition-colors text-center group"
                        >
                            <MessageSquare className="w-8 h-8 text-blue-300 mx-auto mb-3 group-hover:scale-110 transition-transform" />
                            <h3 className="font-semibold text-white mb-2">Contact Form</h3>
                            <p className="text-white/70 text-sm">Send us a message</p>
                        </a>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default HelpSupportPage;


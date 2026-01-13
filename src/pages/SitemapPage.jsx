import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Map, Home, User, ShoppingBag, FileText, HelpCircle } from 'lucide-react';
import Tailor3DScene from '../components/landing/Tailor3DScene';

const SitemapPage = () => {
    const sections = [
        {
            icon: Home,
            title: 'Main Pages',
            links: [
                { path: '/', label: 'Home' },
                { path: '/about', label: 'About Us' },
                { path: '/contact', label: 'Contact Us' },
                { path: '/services', label: 'Services' },
            ],
        },
        {
            icon: ShoppingBag,
            title: 'Shop & Services',
            links: [
                { path: '/products', label: 'Products & Shop' },
                { path: '/portfolio', label: 'Portfolio' },
                { path: '/pricing', label: 'Pricing' },
                { path: '/marketplace', label: 'Marketplace' },
            ],
        },
        {
            icon: User,
            title: 'User Pages',
            links: [
                { path: '/login', label: 'Login' },
                { path: '/signup', label: 'Sign Up' },
                { path: '/forgot-password', label: 'Forgot Password' },
                { path: '/dashboard', label: 'Dashboard' },
            ],
        },
        {
            icon: FileText,
            title: 'Legal & Info',
            links: [
                { path: '/privacy-policy', label: 'Privacy Policy' },
                { path: '/terms', label: 'Terms & Conditions' },
                { path: '/cookie-policy', label: 'Cookie Policy' },
                { path: '/blog', label: 'Blog' },
            ],
        },
        {
            icon: HelpCircle,
            title: 'Support',
            links: [
                { path: '/help', label: 'Help & Support' },
                { path: '/faq', label: 'FAQ' },
                { path: '/testimonials', label: 'Testimonials' },
                { path: '/features', label: 'Features' },  

                { path: '/sitemap', label: 'Sitemap' },
            ],
        },
    ];

    return (
        <div className="relative min-h-screen bg-gradient-to-br from-slate-50 to-indigo-50 pt-24 pb-12">
            <div className="absolute inset-0 z-0 opacity-10">
                <Tailor3DScene />
            </div>

            <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-12"
                >
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-indigo-100 rounded-full mb-6">
                        <Map className="w-10 h-10 text-indigo-600" />
                    </div>
                    <h1 className="text-5xl font-bold text-slate-900 mb-4">Sitemap</h1>
                    <p className="text-xl text-slate-600">Navigate through all our pages</p>
                </motion.div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {sections.map((section, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow"
                        >
                            <div className="flex items-center gap-3 mb-4">
                                <div className="p-2 bg-indigo-100 rounded-lg">
                                    <section.icon className="w-5 h-5 text-indigo-600" />
                                </div>
                                <h2 className="text-xl font-bold text-slate-900">{section.title}</h2>
                            </div>
                            <ul className="space-y-2">
                                {section.links.map((link, linkIndex) => (
                                    <li key={linkIndex}>
                                        <Link
                                            to={link.path}
                                            className="block px-3 py-2 text-slate-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                                        >
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
                    ))}
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="mt-12 bg-white rounded-2xl shadow-lg p-8 text-center"
                >
                    <h2 className="text-2xl font-bold text-slate-900 mb-4">Can't find what you're looking for?</h2>
                    <p className="text-slate-600 mb-6">Try our search or contact our support team</p>
                    <div className="flex gap-4 justify-center">
                        <Link
                            to="/help"
                            className="px-6 py-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-colors"
                        >
                            Get Help
                        </Link>
                        <Link
                            to="/contact"
                            className="px-6 py-3 bg-white border border-slate-200 text-slate-700 rounded-xl hover:bg-slate-50 transition-colors"
                        >
                            Contact Us
                        </Link>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default SitemapPage;


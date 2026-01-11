import React from 'react';
import { HeroSection } from '../components/landing/LandingSections';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Star, ShieldCheck, Zap } from 'lucide-react';

const LandingPage = () => {
    return (
        <div className="bg-slate-50 min-h-screen flex flex-col">
            {/* Hero Section (Keep the 3D animation) */}
            <HeroSection />

            {/* Quick Teaser / Navigation Hub */}
            <div className="bg-white py-20">
                <div className="max-w-7xl mx-auto px-6 text-center">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="text-3xl font-bold text-slate-900 mb-12"
                    >
                        Explore TailorHub
                    </motion.h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <Link to="/features" className="group p-8 border border-slate-200 rounded-2xl hover:shadow-xl transition-all hover:-translate-y-1">
                            <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center text-indigo-600 mb-4 group-hover:scale-110 transition-transform">
                                <Zap className="w-6 h-6" />
                            </div>
                            <h3 className="text-xl font-bold mb-2 text-slate-900">Features</h3>
                            <p className="text-slate-500 mb-4">Discover what makes our platform unique.</p>
                            <span className="text-indigo-600 font-semibold flex items-center justify-center">Learn More <ArrowRight className="w-4 h-4 ml-1" /></span>
                        </Link>

                        <Link to="/how-it-works" className="group p-8 border border-slate-200 rounded-2xl hover:shadow-xl transition-all hover:-translate-y-1">
                            <div className="w-12 h-12 bg-pink-100 rounded-xl flex items-center justify-center text-pink-600 mb-4 group-hover:scale-110 transition-transform">
                                <Star className="w-6 h-6" />
                            </div>
                            <h3 className="text-xl font-bold mb-2 text-slate-900">How it Works</h3>
                            <p className="text-slate-500 mb-4">See our simple 4-step process.</p>
                            <span className="text-pink-600 font-semibold flex items-center justify-center">View Process <ArrowRight className="w-4 h-4 ml-1" /></span>
                        </Link>

                        <Link to="/testimonials" className="group p-8 border border-slate-200 rounded-2xl hover:shadow-xl transition-all hover:-translate-y-1">
                            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center text-green-600 mb-4 group-hover:scale-110 transition-transform">
                                <ShieldCheck className="w-6 h-6" />
                            </div>
                            <h3 className="text-xl font-bold mb-2 text-slate-900">Success Stories</h3>
                            <p className="text-slate-500 mb-4">Read what our users are saying.</p>
                            <span className="text-green-600 font-semibold flex items-center justify-center">Read Reviews <ArrowRight className="w-4 h-4 ml-1" /></span>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LandingPage;

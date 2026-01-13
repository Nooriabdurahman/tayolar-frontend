import React from 'react';
import { Check, Star, Zap, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';
import ThreeBackground from '../components/ThreeBackground';
import { motion } from 'framer-motion';

const PricingPage = () => {
    return (
        <div className="relative min-h-screen py-24 overflow-hidden">
            <ThreeBackground />

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12 md:mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Upgrade Your Experience</h2>
                    <p className="text-lg md:text-xl text-indigo-100 max-w-2xl mx-auto px-4">Get exclusive access to top-rated tailors, faster delivery, and premium support.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 px-4 md:px-0">
                    {/* Free Plan */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-8 text-white"
                    >
                        <h3 className="text-2xl font-bold mb-2">Basic Access</h3>
                        <div className="text-4xl font-bold mb-6">$0 <span className="text-lg font-normal text-white/60">/mo</span></div>
                        <ul className="space-y-4 mb-8">
                            {['Browse Tailors', 'Post 1 Job/Month', 'Basic Support'].map(feat => (
                                <li key={feat} className="flex items-center text-white/80">
                                    <Check className="h-5 w-5 mr-3 text-indigo-400" /> {feat}
                                </li>
                            ))}
                        </ul>
                        <Link to="/signup" className="block w-full py-3 px-6 bg-white/10 hover:bg-white/20 text-center rounded-xl font-semibold transition-colors">
                            Current Plan
                        </Link>
                    </motion.div>

                    {/* Pro Plan */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="bg-gradient-to-b from-indigo-600/90 to-purple-800/90 backdrop-blur-md border border-indigo-500 rounded-3xl p-8 text-white shadow-2xl transform md:-translate-y-4"
                    >
                        <div className="absolute top-0 right-0 bg-yellow-400 text-black text-xs font-bold px-3 py-1 rounded-bl-xl rounded-tr-2xl">POPULAR</div>
                        <h3 className="text-2xl font-bold mb-2 flex items-center"><Star className="h-6 w-6 mr-2 fill-yellow-400 text-yellow-400" /> Premium</h3>
                        <div className="text-5xl font-bold mb-6">$19 <span className="text-lg font-normal text-white/60">/mo</span></div>
                        <p className="text-indigo-200 mb-6 text-sm">Perfect for regular clients and dedicated tailors.</p>
                        <ul className="space-y-4 mb-8">
                            {['Unlimited Job Posts', 'Priority Support', 'Verified Badge', '0% Commission Fees', 'Advanced Analytics'].map(feat => (
                                <li key={feat} className="flex items-center">
                                    <Check className="h-5 w-5 mr-3 text-yellow-400" /> {feat}
                                </li>
                            ))}
                        </ul>
                        <Link to="/checkout" className="block w-full py-4 px-6 bg-white text-indigo-900 text-center rounded-xl font-bold hover:bg-indigo-50 shadow-lg transition-colors">
                            Upgrade Now
                        </Link>
                    </motion.div>

                    {/* Enterprise Plan */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                        className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-8 text-white"
                    >
                        <h3 className="text-2xl font-bold mb-2">Enterprise</h3>
                        <div className="text-4xl font-bold mb-6">$99 <span className="text-lg font-normal text-white/60">/mo</span></div>
                        <ul className="space-y-4 mb-8">
                            {['Dedicated Account Manager', 'API Access', 'Custom Contracts', 'White-label Options'].map(feat => (
                                <li key={feat} className="flex items-center text-white/80">
                                    <Shield className="h-5 w-5 mr-3 text-indigo-400" /> {feat}
                                </li>
                            ))}
                        </ul>
                        <button className="block w-full py-3 px-6 bg-white/10 hover:bg-white/20 text-center rounded-xl font-semibold transition-colors">
                            Contact Sales
                        </button>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default PricingPage;

import React from 'react';
import { motion } from 'framer-motion';
import { Wrench, Clock, Mail } from 'lucide-react';
import Tailor3DScene from '../components/landing/Tailor3DScene';

const MaintenancePage = () => {
    return (
        <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-900 via-orange-900 to-slate-900">
            <div className="absolute inset-0 z-0 opacity-30">
                <Tailor3DScene />
            </div>

            <div className="relative z-10 max-w-2xl mx-auto px-4 text-center">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8 }}
                    className="bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-12"
                >
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                        className="w-24 h-24 bg-orange-500/20 rounded-full flex items-center justify-center mx-auto mb-8"
                    >
                        <Wrench className="w-12 h-12 text-orange-300" />
                    </motion.div>

                    <h1 className="text-5xl font-bold text-white mb-4">We'll Be Back Soon!</h1>
                    <p className="text-xl text-slate-300 mb-8">
                        We're currently performing scheduled maintenance to improve your experience.
                    </p>

                    <div className="flex items-center justify-center gap-2 text-slate-400 mb-8">
                        <Clock className="w-5 h-5" />
                        <span>Expected completion: 2-4 hours</span>
                    </div>

                    <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                        <h2 className="text-xl font-semibold text-white mb-4">What we're doing:</h2>
                        <ul className="text-left text-white/80 space-y-2 max-w-md mx-auto">
                            <li>• Server updates and optimization</li>
                            <li>• Database maintenance</li>
                            <li>• Performance improvements</li>
                            <li>• Security enhancements</li>
                        </ul>
                    </div>

                    <div className="mt-8 pt-8 border-t border-white/20">
                        <p className="text-white/70 mb-4">Need immediate assistance?</p>
                        <a
                            href="mailto:support@tailorhub.com"
                            className="inline-flex items-center gap-2 px-6 py-3 bg-orange-600 hover:bg-orange-700 text-white rounded-xl transition-colors"
                        >
                            <Mail className="w-5 h-5" />
                            Contact Support
                        </a>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default MaintenancePage;


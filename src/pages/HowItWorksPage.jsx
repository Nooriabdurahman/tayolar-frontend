import React from 'react';
import { motion } from 'framer-motion';
import { Search, MessageSquare, Ruler, CheckCircle } from 'lucide-react';
import ThreeBackground from '../components/ThreeBackground';

const steps = [
    {
        id: 1,
        title: "Find a Tailor",
        desc: "Browse through portfolios, read reviews, and filter by specialization to find your perfect match.",
        icon: Search,
        color: "text-blue-400"
    },
    {
        id: 2,
        title: "Discuss Details",
        desc: "Chat directly with the tailor. Share images, discuss fabrics, and agree on a timeline and price.",
        icon: MessageSquare,
        color: "text-green-400"
    },
    {
        id: 3,
        title: "Get Measured",
        desc: "Use our detailed measurement guide or visit the tailor for a fitting session.",
        icon: Ruler,
        color: "text-purple-400"
    },
    {
        id: 4,
        title: "Final Delivery",
        desc: "Receive your custom garment. We only release payment when you are completely satisfied.",
        icon: CheckCircle,
        color: "text-pink-400"
    }
];

const HowItWorksPage = () => {
    return (
        <div className="relative min-h-screen py-24 bg-slate-900 overflow-hidden">
            {/* Reusing ThreeBackground but we could pass props if we modified it */}
            <ThreeBackground />

            <div className="relative z-10 max-w-7xl mx-auto px-6">
                <div className="text-center mb-20">
                    <motion.h1
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-5xl font-bold text-white mb-6"
                    >
                        How It <span className="text-indigo-400">Works</span>
                    </motion.h1>
                    <p className="text-xl text-slate-300">Your journey to the perfect outfit in 4 simple steps.</p>
                </div>

                <div className="relative">
                    {/* Vertical Line for Desktop */}
                    <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-indigo-500/0 via-indigo-500 to-indigo-500/0 transform -translate-x-1/2"></div>

                    <div className="space-y-24">
                        {steps.map((step, index) => (
                            <motion.div
                                key={step.id}
                                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6 }}
                                className={`flex flex-col md:flex-row items-center gap-8 ${index % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}
                            >
                                {/* Text Side */}
                                <div className={`flex-1 text-center ${index % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                                    <h3 className={`text-3xl font-bold mb-4 ${step.color}`}>{step.title}</h3>
                                    <p className="text-slate-300 text-lg leading-relaxed">{step.desc}</p>
                                </div>

                                {/* Center Icon */}
                                <div className="relative flex-shrink-0 z-10">
                                    <div className="w-16 h-16 rounded-full bg-slate-800 border-4 border-indigo-500 flex items-center justify-center shadow-lg shadow-indigo-500/50">
                                        <step.icon className="w-8 h-8 text-white" />
                                    </div>
                                    <div className="absolute top-0 right-0 -mr-2 -mt-2 w-6 h-6 bg-slate-100 rounded-full flex items-center justify-center text-slate-900 font-bold text-xs">
                                        {step.id}
                                    </div>
                                </div>

                                {/* Empty Side for Balance */}
                                <div className="flex-1 hidden md:block"></div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HowItWorksPage;

import React from 'react';
import { motion } from 'framer-motion';
import { Scissors, Ruler, Truck, ShieldCheck, Zap, Globe } from 'lucide-react';
import ThreeBackground from '../components/ThreeBackground';

const features = [
    {
        icon: <Scissors className="w-8 h-8 text-pink-500" />,
        title: "Expert Tailoring",
        description: "Connect with master tailors who have years of experience in bespoke clothing and complex alterations."
    },
    {
        icon: <Ruler className="w-8 h-8 text-blue-500" />,
        title: "Perfect Fit Guarantee",
        description: "Our precise measurement tools and fit guarantee ensure your clothes look and feel exactly how you want them."
    },
    {
        icon: <Truck className="w-8 h-8 text-green-500" />,
        title: "Doorstep Delivery",
        description: "Door-to-door service. We pick up your fabrics or garments and deliver the finished product to your home."
    },
    {
        icon: <ShieldCheck className="w-8 h-8 text-purple-500" />,
        title: "Secure Payments",
        description: "Your money is held in escrow until you are 100% satisfied with the finished job. No risks involved."
    },
    {
        icon: <Zap className="w-8 h-8 text-yellow-500" />,
        title: "Fast Turnaround",
        description: "Need it fast? Choose express service options to get your garments ready for your big event in record time."
    },
    {
        icon: <Globe className="w-8 h-8 text-cyan-500" />,
        title: "Global Marketplace",
        description: "Whether you want local talent or international style, find the perfect tailor from our global network."
    }
];

const FeaturesPage = () => {
    return (
        <div className="relative min-h-screen py-24 overflow-hidden bg-slate-900">
            <ThreeBackground />

            <div className="relative z-10 max-w-7xl mx-auto px-6">
                <div className="text-center mb-20">
                    <motion.h1
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-5xl md:text-6xl font-bold text-white mb-6"
                    >
                        Why Choose <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500">TailorHub?</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="text-xl text-slate-300 max-w-3xl mx-auto"
                    >
                        We are revolutionizing the way you think about custom clothing. Experience the future of fashion tech.
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="bg-white/5 backdrop-blur-lg border border-white/10 p-8 rounded-3xl hover:bg-white/10 transition-colors group"
                        >
                            <div className="bg-white/10 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                {feature.icon}
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-4">{feature.title}</h3>
                            <p className="text-slate-400 leading-relaxed">
                                {feature.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default FeaturesPage;

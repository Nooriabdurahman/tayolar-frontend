import React from 'react';
import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';
import ThreeBackground from '../components/ThreeBackground';

const testimonials = [
    { name: "Sarah Jenkins", role: "Fashion Designer", text: "TailorHub transformed my business. I can connect with clients globally.", rating: 5, image: "https://i.pravatar.cc/150?u=a042581f4e29026024d" },
    { name: "Michael Chen", role: "Client", text: "Found a tailor for my wedding suit in 2 days. The fit was perfection.", rating: 5, image: "https://i.pravatar.cc/150?u=a042581f4e29026704d" },
    { name: "Emma Wilson", role: "Seamstress", text: "The job moderation system protects us from scammers. Love it!", rating: 4, image: "https://i.pravatar.cc/150?u=a04258114e29026302d" },
    { name: "David Miller", role: "Client", text: "I needed a zipper fixed and found a local expert in minutes. Easy.", rating: 5, image: "https://i.pravatar.cc/150?u=a04258114e29026701d" },
    { name: "Jessica Brown", role: "Client", text: "The 3D visualization of fabrics is a game changer. I knew exactly what I was getting.", rating: 5, image: "https://i.pravatar.cc/150?u=a04258114e29026702d" },
    { name: "Robert Taylor", role: "Tailor", text: "Increased my bookings by 300% in the first month. Highly recommend.", rating: 5, image: "https://i.pravatar.cc/150?u=a04258114e29026703d" },
];

const TestimonialsPage = () => {
    return (
        <div className="relative min-h-screen py-24 bg-slate-900 overflow-hidden">
            <ThreeBackground />

            <div className="relative z-10 max-w-7xl mx-auto px-6">
                <div className="text-center mb-16">
                    <motion.h1
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-5xl font-bold text-white mb-6"
                    >
                        Success <span className="text-yellow-400">Stories</span>
                    </motion.h1>
                    <p className="text-xl text-slate-300">Join thousands of satisfied clients and skilled tailors.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {testimonials.map((t, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="bg-white/5 backdrop-blur-md border border-white/10 p-8 rounded-3xl relative"
                        >
                            <Quote className="absolute top-6 right-6 w-8 h-8 text-white/10" />
                            <div className="flex items-center mb-6">
                                <img src={t.image} alt={t.name} className="w-14 h-14 rounded-full border-2 border-indigo-500 mr-4" />
                                <div>
                                    <h4 className="font-bold text-white text-lg">{t.name}</h4>
                                    <p className="text-indigo-400 text-sm">{t.role}</p>
                                </div>
                            </div>
                            <div className="flex mb-4">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} className={`w-4 h-4 ${i < t.rating ? 'text-yellow-400 fill-yellow-400' : 'text-slate-600'}`} />
                                ))}
                            </div>
                            <p className="text-slate-300 italic">"{t.text}"</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default TestimonialsPage;

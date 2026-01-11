import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Plus, Minus } from 'lucide-react';
import ThreeBackground from '../components/ThreeBackground';

const faqs = [
    { q: "How do I measure myself?", a: "We provide a comprehensive video guide and a digital measuring tool. Alternatively, you can book a local fitting session with one of our verified partners." },
    { q: "What if the clothes don't fit?", a: "We offer a 'Perfect Fit Guarantee'. If it doesn't fit, we cover the cost of alterations or remake the garment for free, provided you followed our measurement protocols." },
    { q: "How long does delivery take?", a: "It depends on the complexity of the job. Simple alterations take 2-3 days, while bespoke suits can take 2-4 weeks. Expedited options are available." },
    { q: "Is my payment secure?", a: "Yes. Payment is held in escrow and only released to the tailor once you have received the item and confirmed your satisfaction." },
    { q: "Can I choose my own fabric?", a: "Absolutely! You can browse our marketplace of fabrics, send your own, or ask the tailor to source specific materials for you." },
];

const FAQPage = () => {
    const [openIndex, setOpenIndex] = useState(null);

    return (
        <div className="relative min-h-screen py-24 bg-slate-900 overflow-hidden">
            <ThreeBackground />

            <div className="relative z-10 max-w-3xl mx-auto px-6">
                <div className="text-center mb-16">
                    <motion.h1
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-5xl font-bold text-white mb-6"
                    >
                        Frequently Asked <span className="text-green-400">Questions</span>
                    </motion.h1>
                    <p className="text-xl text-slate-300">Everything you need to know about TailorHub.</p>
                </div>

                <div className="space-y-4">
                    {faqs.map((faq, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl overflow-hidden"
                        >
                            <button
                                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                                className="w-full text-left p-6 flex justify-between items-center text-white hover:bg-white/5 transition-colors"
                            >
                                <span className="font-semibold text-lg">{faq.q}</span>
                                {openIndex === index ? <Minus className="text-indigo-400" /> : <Plus className="text-indigo-400" />}
                            </button>
                            <AnimatePresence>
                                {openIndex === index && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        className="px-6 pb-6 text-slate-300 leading-relaxed border-t border-white/5"
                                    >
                                        <div className="pt-4">{faq.a}</div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default FAQPage;

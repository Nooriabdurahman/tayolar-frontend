import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Scissors, DollarSign, Clock, Layout } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import ThreeClothingDisplay from '../components/ThreeClothingDisplay';

const CreateServicePage = () => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            toast.error("Please login to create a service!");
            setTimeout(() => navigate('/login'), 1500);
        }
    }, [navigate]);

    const [formData, setFormData] = useState({
        title: '',
        price: '',
        delivery: '3-5 Days',
        description: '',
        contactPhone: '',
        contactEmail: '',
        category: 'Alteration' // Default or allow empty
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const token = localStorage.getItem('token');
        // In a real app we'd decode the token to get the user ID, or rely on backend to do it from the token
        // For now, let's assume the backend needs a tailorId. 
        // Since we don't have auth middleware extracting user yet in the provided simple backend routes:
        const demoTailorId = "demo-tailor-id"; // Placeholder if auth middleware isn't ready

        try {
            const response = await fetch('http://localhost:5000/api/services', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    // 'Authorization': `Bearer ${token}` // If backend needed it
                },
                body: JSON.stringify({
                    ...formData,
                    tailorId: demoTailorId // Ideally this comes from auth token on backend
                })
            });

            if (response.ok) {
                toast.success("Service Created Successfully!");
                setTimeout(() => navigate('/services'), 1000); // Redirect to listing
            } else {
                const errorData = await response.json();
                toast.error(errorData.error || "Failed to create service");
            }
        } catch (error) {
            toast.error("Something went wrong");
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-900 pt-24 pb-12 px-6 flex flex-col items-center">
            <Toaster position="top-center" />

            <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12">

                {/* Left Side: 3D Visualization (Red Clothes as requested for consistency) */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="relative bg-gradient-to-br from-red-900/20 to-pink-900/20 rounded-3xl overflow-hidden border border-white/10 min-h-[500px]"
                >
                    <div className="absolute top-6 left-6 z-10">
                        <h2 className="text-3xl font-bold text-white mb-2">Create Service</h2>
                        <p className="text-slate-400">Showcase your skills and get hired.</p>
                    </div>

                    <ThreeClothingDisplay color="#ef4444" image="/assets/red-dress.png" />

                    {/* Floating Badge */}
                    <motion.div
                        animate={{ y: [0, -10, 0] }}
                        transition={{ repeat: Infinity, duration: 4 }}
                        className="absolute bottom-10 right-10 bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/20"
                    >
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-yellow-400 rounded-full">
                                <Scissors className="w-6 h-6 text-black" />
                            </div>
                            <div>
                                <p className="text-white font-bold">Top Rated Tailor</p>
                                <p className="text-xs text-slate-300">Join the best</p>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>

                {/* Right Side: The Form */}
                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="bg-white/5 backdrop-blur-md border border-white/10 p-8 rounded-3xl"
                >
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Service Info */}
                        <div className="space-y-4">
                            <h3 className="text-xl font-bold text-white flex items-center">
                                Service Details
                            </h3>
                            <div>
                                <label className="block text-slate-300 mb-2 font-medium">Service Name</label>
                                <input name="title" value={formData.title} onChange={handleChange} required type="text" className="w-full bg-black/20 border border-white/10 rounded-xl p-4 text-white placeholder-white/30 focus:border-yellow-400 transition-colors outline-none" placeholder="e.g. Premium Suit Stitching" />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="flex items-center text-yellow-400 mb-2 font-bold">
                                        <DollarSign className="w-5 h-5 mr-2" /> Base Price <span className="text-red-400 ml-1">*</span>
                                    </label>
                                    <input
                                        name="price"
                                        value={formData.price}
                                        onChange={handleChange}
                                        type="number"
                                        required
                                        min="1"
                                        step="0.01"
                                        className="w-full bg-black/20 border-2 border-yellow-400/50 rounded-xl p-4 text-white text-lg font-semibold placeholder-white/30 focus:border-yellow-400 transition-colors outline-none"
                                        placeholder="250.00"
                                    />
                                    <p className="text-xs text-yellow-400/70 mt-1">Your service price</p>
                                </div>
                                <div>
                                    <label className="flex items-center text-yellow-400 mb-2 font-bold">
                                        <Clock className="w-5 h-5 mr-2" /> Delivery
                                    </label>
                                    <select name="delivery" value={formData.delivery} onChange={handleChange} className="w-full bg-black/20 border border-white/10 rounded-xl p-4 text-white focus:border-yellow-400 transition-colors outline-none">
                                        <option>3-5 Days</option>
                                        <option>1 Week</option>
                                        <option>2 Weeks</option>
                                        <option>Custom</option>
                                    </select>
                                </div>
                            </div>

                            <div>
                                <label className="block text-slate-300 mb-2 font-medium">Description</label>
                                <textarea name="description" value={formData.description} onChange={handleChange} required className="w-full bg-black/20 border border-white/10 rounded-xl p-4 text-white h-32 placeholder-white/30 focus:border-yellow-400 transition-colors outline-none" placeholder="Describe your service in detail..."></textarea>
                            </div>
                        </div>

                        {/* Contact Information Section - NEW */}
                        <div className="pt-6 border-t border-white/10 space-y-4">
                            <h3 className="text-xl font-bold text-white flex items-center">
                                Contact Information
                            </h3>
                            <p className="text-sm text-slate-400">Share your contact details for potential clients.</p>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-slate-300 mb-2 font-medium">Phone Number</label>
                                    <input name="contactPhone" value={formData.contactPhone} onChange={handleChange} type="tel" className="w-full bg-black/20 border border-white/10 rounded-xl p-4 text-white placeholder-white/30 focus:border-yellow-400 transition-colors outline-none" placeholder="+1 (555) 000-0000" />
                                </div>
                                <div>
                                    <label className="block text-slate-300 mb-2 font-medium">Email Address</label>
                                    <input name="contactEmail" value={formData.contactEmail} onChange={handleChange} type="email" className="w-full bg-black/20 border border-white/10 rounded-xl p-4 text-white placeholder-white/30 focus:border-yellow-400 transition-colors outline-none" placeholder="business@example.com" />
                                </div>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-yellow-400 hover:bg-yellow-300 text-black font-bold py-4 rounded-xl shadow-lg shadow-yellow-400/20 transform hover:-translate-y-1 transition-all flex items-center justify-center"
                        >
                            <Layout className="w-5 h-5 mr-2" />
                            {loading ? 'Creating...' : 'Publish Service'}
                        </button>
                    </form>
                </motion.div>
            </div>
        </div>
    );
};

export default CreateServicePage;

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Upload, DollarSign, Calendar, Ruler, CheckCircle } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import ThreeClothingDisplay from '../components/ThreeClothingDisplay';

const PostJobPage = () => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            toast.error("Please login to post a job!");
            setTimeout(() => navigate('/login'), 1500);
        }
    }, [navigate]);

    const [formData, setFormData] = useState({
        title: '',
        category: 'Alteration',
        budget: '',
        description: '',
        contactPhone: '',
        contactEmail: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const demoClientId = "demo-client-id"; // Placeholder until auth is fully integrated

        try {
            const response = await fetch('http://localhost:5000/api/jobs', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...formData,
                    clientId: demoClientId
                })
            });

            if (response.ok) {
                toast.success("Job Posted Successfully! Tailors will bid soon.");
                setTimeout(() => navigate('/dashboard'), 1500);
            } else {
                const errorData = await response.json();
                toast.error(errorData.error || "Failed to post job");
            }
        } catch (error) {
            toast.error("Network error");
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-900 pt-24 pb-12 px-6 flex flex-col items-center">
            <Toaster position="top-center" />

            <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12">

                {/* Left Side: 3D Visualization (Red Clothes) */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="relative bg-gradient-to-br from-red-900/20 to-orange-900/20 rounded-3xl overflow-hidden border border-white/10 min-h-[500px]"
                >
                    <div className="absolute top-6 left-6 z-10">
                        <h2 className="text-3xl font-bold text-white mb-2">Post a Job</h2>
                        <p className="text-slate-400">Describe your needs and find the perfect tailor.</p>
                    </div>

                    <ThreeClothingDisplay color="#ef4444" image="/assets/tailor.png" />

                    {/* Floating Badge */}
                    <motion.div
                        animate={{ y: [0, -10, 0] }}
                        transition={{ repeat: Infinity, duration: 4 }}
                        className="absolute bottom-10 right-10 bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/20"
                    >
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-red-500 rounded-full">
                                <CheckCircle className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <p className="text-white font-bold">Verified Tailors</p>
                                <p className="text-xs text-slate-300">Only the best for you</p>
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

                        {/* Job Details Section */}
                        <div className="space-y-4">
                            <h3 className="text-xl font-bold text-white flex items-center">
                                Job Details
                            </h3>
                            <div>
                                <label className="block text-slate-300 mb-2 font-medium">Job Title</label>
                                <input name="title" value={formData.title} onChange={handleChange} required type="text" className="w-full bg-slate-800/50 border border-slate-700 rounded-xl p-3 text-white focus:ring-2 focus:ring-indigo-500 outline-none" placeholder="e.g. Alteration for Wedding Suit" />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-slate-300 mb-2 font-medium">Category</label>
                                    <select name="category" value={formData.category} onChange={handleChange} className="w-full bg-slate-800/50 border border-slate-700 rounded-xl p-3 text-white focus:ring-2 focus:ring-indigo-500 outline-none">
                                        <option>Alteration</option>
                                        <option>Custom Suit</option>
                                        <option>Dress Making</option>
                                        <option>Repair</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-slate-300 mb-2 font-medium">
                                        Budget ($) <span className="text-red-400">*</span>
                                    </label>
                                    <div className="relative">
                                        <DollarSign className="absolute left-3 top-3.5 w-5 h-5 text-indigo-400" />
                                        <input
                                            name="budget"
                                            value={formData.budget}
                                            onChange={handleChange}
                                            type="number"
                                            required
                                            min="1"
                                            step="0.01"
                                            className="w-full bg-slate-800/50 border-2 border-indigo-500/50 rounded-xl py-3 pl-10 pr-3 text-white text-lg font-semibold focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none placeholder-slate-500"
                                            placeholder="Enter amount"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div>
                                <label className="block text-slate-300 mb-2 font-medium">Description</label>
                                <textarea name="description" value={formData.description} onChange={handleChange} required className="w-full bg-slate-800/50 border border-slate-700 rounded-xl p-3 text-white h-32 focus:ring-2 focus:ring-indigo-500 outline-none" placeholder="Describe what you need..."></textarea>
                            </div>
                        </div>

                        {/* Contact Information Section - NEW */}
                        <div className="pt-6 border-t border-white/10 space-y-4">
                            <h3 className="text-xl font-bold text-white flex items-center">
                                Contact Information
                            </h3>
                            <p className="text-sm text-slate-400">How should tailors contact you?</p>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-slate-300 mb-2 font-medium">Phone Number</label>
                                    <input name="contactPhone" value={formData.contactPhone} onChange={handleChange} type="tel" className="w-full bg-slate-800/50 border border-slate-700 rounded-xl p-3 text-white focus:ring-2 focus:ring-indigo-500 outline-none" placeholder="+1 (555) 000-0000" />
                                </div>
                                <div>
                                    <label className="block text-slate-300 mb-2 font-medium">Email Address</label>
                                    <input name="contactEmail" value={formData.contactEmail} onChange={handleChange} type="email" className="w-full bg-slate-800/50 border border-slate-700 rounded-xl p-3 text-white focus:ring-2 focus:ring-indigo-500 outline-none" placeholder="you@example.com" />
                                </div>
                            </div>
                        </div>

                        {/* Image Upload */}
                        <div>
                            <label className="block text-slate-300 mb-2 font-medium">Optional: Clothing Reference</label>
                            <div
                                className="border-2 border-dashed border-slate-700 rounded-xl p-8 flex flex-col items-center justify-center text-slate-400 hover:border-indigo-500 hover:text-indigo-400 transition-colors cursor-pointer bg-slate-800/30 relative"
                                onClick={() => document.getElementById('file-upload').click()}
                            >
                                <input
                                    id="file-upload"
                                    type="file"
                                    accept="image/*"
                                    className="hidden"
                                    onChange={(e) => {
                                        const file = e.target.files[0];
                                        if (file) toast.success(`Selected: ${file.name}`);
                                    }}
                                />
                                <Upload className="w-10 h-10 mb-2" />
                                <p className="font-medium">Click to upload images</p>
                                <p className="text-slate-400 text-sm">Upload Reference Images or Sketches</p>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold py-4 rounded-xl shadow-lg shadow-indigo-500/30 transform hover:-translate-y-1 transition-all flex items-center justify-center"
                        >
                            {loading ? 'Posting...' : <><CheckCircle className="w-5 h-5 mr-2" /> Post Job Now</>}
                        </button>
                    </form>
                </motion.div>
            </div>
        </div>
    );
};

export default PostJobPage;

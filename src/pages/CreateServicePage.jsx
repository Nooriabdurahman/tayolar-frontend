import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Scissors, DollarSign, Clock, Layout } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import TailorWorkingScene from '../components/landing/TailorWorkingScene';
import { API_ENDPOINTS } from '../config/api';

const CreateServicePage = () => {
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        skills: [],
        price: '',
        turnaround: '7 Days',
        description: ''
    });
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const toggleSkill = (skill) => {
        setFormData(prev => ({
            ...prev,
            skills: prev.skills.includes(skill)
                ? prev.skills.filter(s => s !== skill)
                : [...prev.skills, skill]
        }));
    };

    const getAuthHeaders = () => {
        const token = localStorage.getItem('token');
        return {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        };
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const token = localStorage.getItem('token');
            if (!token) {
                toast.error('Please login to create a service');
                navigate('/login');
                return;
            }

            await axios.post(API_ENDPOINTS.SERVICES, {
                name: formData.name,
                skills: formData.skills,
                price: parseFloat(formData.price),
                turnaround: formData.turnaround,
                description: formData.description
            }, getAuthHeaders());

            toast.success("Service Created! Clients can now hire you.");
            // Reset form
            setFormData({
                name: '',
                skills: [],
                price: '',
                turnaround: '7 Days',
                description: ''
            });
            // Optionally navigate to services list or dashboard
            setTimeout(() => navigate('/dashboard'), 1500);
        } catch (error) {
            console.error('Error creating service:', error);
            toast.error(error.response?.data?.message || 'Failed to create service. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-900 pt-24 pb-12 px-6 flex flex-col items-center">
            <Toaster position="top-center" />

            <div className="max-w-5xl w-full">
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Showcase Your <span className="text-yellow-400">Craft</span></h1>
                    <p className="text-slate-300 text-lg">Create a service listing to attract high-paying clients.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Visual Side */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="relative h-[600px] rounded-3xl overflow-hidden bg-slate-800 border-4 border-slate-700"
                    >
                        <TailorWorkingScene />
                        <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
                            <h3 className="text-white font-bold text-xl">The Art of Tailoring</h3>
                            <p className="text-white/70 text-sm">Your skills deserve the best showcase.</p>
                        </div>
                    </motion.div>

                    {/* Form Side */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="bg-white/5 backdrop-blur-xl p-8 rounded-3xl border border-white/10"
                    >
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label className="flex items-center text-yellow-400 mb-2 font-bold">
                                    <Layout className="w-5 h-5 mr-2" /> Service Name
                                </label>
                                <input 
                                    type="text" 
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="w-full bg-black/20 border border-white/10 rounded-xl p-4 text-white placeholder-white/30 focus:border-yellow-400 transition-colors outline-none" 
                                    placeholder="e.g. Bespoke 3-Piece Suit" 
                                    required 
                                />
                            </div>

                            <div>
                                <label className="flex items-center text-yellow-400 mb-2 font-bold">
                                    <Scissors className="w-5 h-5 mr-2" /> Skills Required
                                </label>
                                <div className="flex flex-wrap gap-2">
                                    {['Pattern Cutting', 'Embroidery', 'Alterations', 'Design'].map(skill => (
                                        <span 
                                            key={skill} 
                                            onClick={() => toggleSkill(skill)}
                                            className={`px-3 py-1 rounded-full text-xs text-white cursor-pointer transition-colors ${
                                                formData.skills.includes(skill) 
                                                    ? 'bg-yellow-400 text-black' 
                                                    : 'bg-white/10 hover:bg-yellow-400 hover:text-black'
                                            }`}
                                        >
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="flex items-center text-yellow-400 mb-2 font-bold">
                                        <DollarSign className="w-5 h-5 mr-2" /> Base Price <span className="text-red-400 ml-1">*</span>
                                    </label>
                                    <input 
                                        type="number" 
                                        name="price"
                                        value={formData.price}
                                        onChange={handleChange}
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
                                        <Clock className="w-5 h-5 mr-2" /> Turnaround
                                    </label>
                                    <select 
                                        name="turnaround"
                                        value={formData.turnaround}
                                        onChange={handleChange}
                                        className="w-full bg-black/20 border border-white/10 rounded-xl p-4 text-white focus:border-yellow-400 transition-colors outline-none"
                                    >
                                        <option>3 Days</option>
                                        <option>7 Days</option>
                                        <option>14 Days</option>
                                        <option>1 Month</option>
                                    </select>
                                </div>
                            </div>

                            <div>
                                <label className="flex items-center text-yellow-400 mb-2 font-bold">
                                    Description
                                </label>
                                <textarea 
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                    className="w-full bg-black/20 border border-white/10 rounded-xl p-4 text-white placeholder-white/30 focus:border-yellow-400 transition-colors outline-none h-32" 
                                    placeholder="Describe your process and what makes your service unique..."
                                    required
                                ></textarea>
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full py-4 bg-yellow-400 hover:bg-yellow-300 text-black font-bold text-lg rounded-xl shadow-lg shadow-yellow-400/20 transform hover:-translate-y-1 transition-all"
                            >
                                {loading ? 'Creating...' : 'Launch Service'}
                            </button>
                        </form>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default CreateServicePage;

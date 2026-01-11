import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, User, ArrowRight, Loader } from 'lucide-react';
import { motion } from 'framer-motion';
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';
import Tailor3DScene from '../components/landing/Tailor3DScene';

const SignupPage = () => {
    const [formData, setFormData] = useState({ name: '', email: '', password: '', role: 'CLIENT' });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            await axios.post('http://localhost:5000/api/auth/signup', formData);

            toast.success('Code sent! Please verify your email.');
            // Navigate to verify page with email
            setTimeout(() => navigate('/verify-email', { state: { email: formData.email } }), 1000);

        } catch (err) {
            toast.error(err.response?.data?.message || 'Signup failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-900 via-indigo-900 to-purple-900">
            <div className="absolute inset-0 z-0 opacity-30">
                <Tailor3DScene />
            </div>
            <Toaster position="top-center" reverseOrder={false} />

            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                className="relative z-10 w-full max-w-md bg-white/10 backdrop-blur-xl p-8 rounded-3xl shadow-2xl border border-white/20"
            >
                <div className="text-center mb-8">
                    <h2 className="text-4xl font-bold text-white mb-2 tracking-tight">Create Account</h2>
                    <p className="text-white/70">Join us today</p>
                </div>

                <form className="space-y-5" onSubmit={handleSubmit}>
                    <div className="space-y-4">
                        <div className="relative group">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <User className="h-5 w-5 text-white/50 group-focus-within:text-white transition-colors" />
                            </div>
                            <input
                                id="name"
                                name="name"
                                type="text"
                                required
                                className="block w-full pl-10 pr-3 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all"
                                placeholder="Full Name"
                                value={formData.name}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="relative group">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Mail className="h-5 w-5 text-white/50 group-focus-within:text-white transition-colors" />
                            </div>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                required
                                className="block w-full pl-10 pr-3 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all"
                                placeholder="Email address"
                                value={formData.email}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="relative group">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Lock className="h-5 w-5 text-white/50 group-focus-within:text-white transition-colors" />
                            </div>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                required
                                className="block w-full pl-10 pr-3 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all"
                                placeholder="Password"
                                value={formData.password}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="relative">
                            <select
                                id="role"
                                name="role"
                                className="block w-full px-3 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all [&>option]:text-black"
                                value={formData.role}
                                onChange={handleChange}
                            >
                                <option value="CLIENT">Client (Buying Services)</option>
                                <option value="TAILOR">Tailor (Offering Services)</option>
                            </select>
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-3.5 px-4 bg-gradient-to-r from-pink-500 to-rose-600 hover:from-pink-600 hover:to-rose-700 text-white font-semibold rounded-xl shadow-lg shadow-pink-500/30 transform hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center group"
                    >
                        {loading ? (
                            <Loader className="animate-spin h-5 w-5" />
                        ) : (
                            <>
                                Sign Up
                                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                            </>
                        )}
                    </button>
                </form>

                <div className="mt-8 text-center text-sm text-white/60">
                    Already have an account?{' '}
                    <Link to="/login" className="font-semibold text-white hover:text-pink-200 transition-colors">
                        Sign in
                    </Link>
                </div>
            </motion.div>
        </div>
    );
};

export default SignupPage;

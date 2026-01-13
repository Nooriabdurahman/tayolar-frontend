import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { Mail, ArrowRight, Loader } from 'lucide-react';
import { motion } from 'framer-motion';
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';
import Tailor3DScene from '../components/landing/Tailor3DScene';
import { API_ENDPOINTS } from '../config/api';

const VerifyEmailPage = () => {
    const [code, setCode] = useState('');
    const [loading, setLoading] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    const email = location.state?.email;

    useEffect(() => {
        if (!email) {
            toast.error("No email found. Redirecting to signup.");
            navigate('/signup');
        }
    }, [email, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await axios.post(API_ENDPOINTS.AUTH.VERIFY_EMAIL, {
                email,
                code
            });

            const { token, user } = response.data;
            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(user));

            toast.success('Email Verified! Welcome aboard.');
            setTimeout(() => navigate('/dashboard'), 1500);

        } catch (err) {
            toast.error(err.response?.data?.message || 'Verification failed. Try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleResendCode = async () => {
        setLoading(true);
        try {
            await axios.post(API_ENDPOINTS.AUTH.RESEND_CODE, { email });
            toast.success('New verification code sent!');
        } catch (err) {
            toast.error(err.response?.data?.message || 'Failed to resend code.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-900 via-emerald-900 to-teal-900">
            <div className="absolute inset-0 z-0 opacity-30">
                <Tailor3DScene />
            </div>
            <Toaster position="top-center" />

            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="relative z-10 w-full max-w-md bg-white/10 backdrop-blur-xl p-8 rounded-3xl shadow-2xl border border-white/20"
            >
                <div className="text-center mb-8">
                    <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Mail className="w-8 h-8 text-white" />
                    </div>
                    <h2 className="text-3xl font-bold text-white mb-2">Verify Your Email</h2>
                    <p className="text-white/70 text-sm">We sent a 6-digit code to <span className="text-white font-bold">{email}</span></p>
                </div>

                <form className="space-y-6" onSubmit={handleSubmit}>
                    <div>
                        <input
                            type="text"
                            maxLength="6"
                            className="block w-full py-4 text-center bg-white/5 border border-white/10 rounded-xl text-white text-2xl tracking-[0.5em] font-bold placeholder-white/20 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all"
                            placeholder="000000"
                            value={code}
                            onChange={(e) => setCode(e.target.value)}
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-3.5 px-4 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold rounded-xl shadow-lg shadow-green-500/30 transform hover:-translate-y-0.5 transition-all flex items-center justify-center"
                    >
                        {loading ? <Loader className="animate-spin" /> : <>Verify Account <ArrowRight className="ml-2 w-4 h-4" /></>}
                    </button>
                </form>

                <div className="mt-6 text-center">
                    <button
                        onClick={handleResendCode}
                        disabled={loading}
                        className="text-white/50 text-sm hover:text-white transition-colors disabled:opacity-50"
                    >
                        Didn't receive code? Resend
                    </button>
                </div>
            </motion.div>
        </div>
    );
};

export default VerifyEmailPage;

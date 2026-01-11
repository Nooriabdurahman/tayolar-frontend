import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Settings, Package, Heart, LogOut, Edit, Camera, CreditCard, Lock } from 'lucide-react';
import { motion } from 'framer-motion';
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';
import Tailor3DScene from '../components/landing/Tailor3DScene';
import { API_ENDPOINTS } from '../config/api';

const UserDashboardPage = () => {
    const [user, setUser] = useState(null);
    const [activeTab, setActiveTab] = useState('profile');
    const [adminCard, setAdminCard] = useState(null);
    const [cardLoading, setCardLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const userData = localStorage.getItem('user');
        if (userData) {
            setUser(JSON.parse(userData));
        } else {
            navigate('/login');
        }
    }, [navigate]);

    useEffect(() => {
        if (activeTab === 'card') {
            loadAdminCard();
        }
    }, [activeTab]);

    const loadAdminCard = async () => {
        setCardLoading(true);
        try {
            const response = await axios.get(API_ENDPOINTS.CARDS.ACTIVE);
            if (response.data) {
                setAdminCard(response.data);
            }
        } catch (error) {
            console.error('Error loading admin card:', error);
            toast.error('Failed to load card information');
        } finally {
            setCardLoading(false);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/');
    };

    if (!user) return null;

    return (
        <div className="relative min-h-screen bg-gradient-to-br from-slate-50 to-indigo-50 pt-24 pb-12">
            <Toaster position="top-right" />
            <div className="absolute inset-0 z-0 opacity-20">
                <Tailor3DScene />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white rounded-3xl shadow-2xl overflow-hidden"
                >
                    {/* Header */}
                    <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-8 text-white">
                        <div className="flex items-center justify-between flex-wrap gap-4">
                            <div className="flex items-center gap-6">
                                <div className="relative">
                                    <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-md border-4 border-white/30">
                                        <User className="w-12 h-12" />
                                    </div>
                                    <button className="absolute bottom-0 right-0 p-2 bg-indigo-700 rounded-full hover:bg-indigo-800 transition-colors">
                                        <Camera className="w-4 h-4" />
                                    </button>
                                </div>
                                <div>
                                    <h1 className="text-3xl font-bold mb-1">{user.name}</h1>
                                    <p className="text-indigo-100">{user.email}</p>
                                    <span className="inline-block mt-2 px-3 py-1 bg-white/20 rounded-full text-sm backdrop-blur-md">
                                        {user.role === 'TAILOR' ? '👔 Tailor' : '👤 Client'}
                                    </span>
                                </div>
                            </div>
                            <button
                                onClick={handleLogout}
                                className="px-6 py-3 bg-white/20 hover:bg-white/30 backdrop-blur-md rounded-xl transition-colors flex items-center gap-2"
                            >
                                <LogOut className="w-5 h-5" />
                                Logout
                            </button>
                        </div>
                    </div>

                    {/* Tabs */}
                    <div className="border-b border-slate-200">
                        <div className="flex overflow-x-auto">
                            {[
                                { id: 'profile', label: 'Profile', icon: User },
                                { id: 'card', label: 'Card', icon: CreditCard },
                                { id: 'orders', label: 'Orders', icon: Package },
                                { id: 'favorites', label: 'Favorites', icon: Heart },
                                { id: 'settings', label: 'Settings', icon: Settings },
                            ].map((tab) => (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`flex items-center gap-2 px-8 py-4 font-semibold transition-colors border-b-2 ${
                                        activeTab === tab.id
                                            ? 'border-indigo-600 text-indigo-600'
                                            : 'border-transparent text-slate-600 hover:text-indigo-600'
                                    }`}
                                >
                                    <tab.icon className="w-5 h-5" />
                                    {tab.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Content */}
                    <div className="p-8">
                        {activeTab === 'profile' && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="max-w-2xl"
                            >
                                <div className="flex items-center justify-between mb-6">
                                    <h2 className="text-2xl font-bold text-slate-900">Profile Information</h2>
                                    <button className="px-4 py-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-colors flex items-center gap-2">
                                        <Edit className="w-4 h-4" />
                                        Edit
                                    </button>
                                </div>
                                <div className="space-y-4">
                                    <div className="p-4 bg-slate-50 rounded-xl">
                                        <label className="text-sm text-slate-500">Full Name</label>
                                        <p className="text-lg font-semibold text-slate-900">{user.name}</p>
                                    </div>
                                    <div className="p-4 bg-slate-50 rounded-xl">
                                        <label className="text-sm text-slate-500">Email</label>
                                        <p className="text-lg font-semibold text-slate-900">{user.email}</p>
                                    </div>
                                    <div className="p-4 bg-slate-50 rounded-xl">
                                        <label className="text-sm text-slate-500">Role</label>
                                        <p className="text-lg font-semibold text-slate-900">{user.role}</p>
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {activeTab === 'card' && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="max-w-2xl"
                            >
                                <h2 className="text-2xl font-bold text-slate-900 mb-6">Payment Card</h2>
                                {cardLoading ? (
                                    <div className="text-center py-12">
                                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
                                    </div>
                                ) : adminCard ? (
                                    <div className="space-y-6">
                                        {/* Card Visualization */}
                                        <div className="w-full aspect-[1.586/1] rounded-2xl bg-gradient-to-br from-slate-900 to-slate-800 p-6 text-white shadow-lg relative overflow-hidden">
                                            {adminCard.imageUrl && (
                                                <img 
                                                    src={adminCard.imageUrl} 
                                                    alt="Card" 
                                                    className="absolute inset-0 w-full h-full object-cover opacity-30"
                                                />
                                            )}
                                            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl"></div>
                                            <div className="h-full flex flex-col justify-between relative z-10">
                                                <div className="flex justify-between items-start">
                                                    <div className="w-12 h-8 bg-yellow-500/80 rounded-md"></div>
                                                    <Lock className="w-6 h-6 text-white/60" />
                                                </div>
                                                <div className="font-mono text-xl tracking-widest">
                                                    {adminCard.cardNumber ? (
                                                        adminCard.cardNumber.replace(/(.{4})/g, '$1 ').trim()
                                                    ) : '•••• •••• •••• ••••'}
                                                </div>
                                                <div className="flex justify-between items-end font-mono text-sm">
                                                    <div>
                                                        <div className="text-xs opacity-70 mb-1">CARD HOLDER</div>
                                                        <div className="uppercase">{adminCard.cardHolder || 'YOUR NAME'}</div>
                                                    </div>
                                                    <div>
                                                        <div className="text-xs opacity-70 mb-1">EXPIRES</div>
                                                        <div>{adminCard.expiry || 'MM/YY'}</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="bg-slate-50 rounded-xl p-6 space-y-4">
                                            <div>
                                                <label className="text-sm text-slate-500">Card Number</label>
                                                <p className="text-lg font-semibold text-slate-900 font-mono">
                                                    {adminCard.cardNumber ? (
                                                        adminCard.cardNumber.replace(/(.{4})/g, '$1 ').trim()
                                                    ) : '•••• •••• •••• ••••'}
                                                </p>
                                            </div>
                                            <div>
                                                <label className="text-sm text-slate-500">Card Holder</label>
                                                <p className="text-lg font-semibold text-slate-900 uppercase">{adminCard.cardHolder}</p>
                                            </div>
                                            <div className="grid grid-cols-2 gap-4">
                                                <div>
                                                    <label className="text-sm text-slate-500">Expiry Date</label>
                                                    <p className="text-lg font-semibold text-slate-900 font-mono">{adminCard.expiry}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="text-center py-12 text-slate-500">
                                        <CreditCard className="w-16 h-16 mx-auto mb-4 text-slate-300" />
                                        <p>No card information available</p>
                                    </div>
                                )}
                            </motion.div>
                        )}

                        {activeTab === 'orders' && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                            >
                                <h2 className="text-2xl font-bold text-slate-900 mb-6">Your Orders</h2>
                                <div className="text-center py-12 text-slate-500">
                                    <Package className="w-16 h-16 mx-auto mb-4 text-slate-300" />
                                    <p>No orders yet</p>
                                    <Link to="/marketplace" className="mt-4 inline-block px-6 py-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-colors">
                                        Browse Services
                                    </Link>
                                </div>
                            </motion.div>
                        )}

                        {activeTab === 'favorites' && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                            >
                                <h2 className="text-2xl font-bold text-slate-900 mb-6">Favorites</h2>
                                <div className="text-center py-12 text-slate-500">
                                    <Heart className="w-16 h-16 mx-auto mb-4 text-slate-300" />
                                    <p>No favorites yet</p>
                                </div>
                            </motion.div>
                        )}

                        {activeTab === 'settings' && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="max-w-2xl"
                            >
                                <h2 className="text-2xl font-bold text-slate-900 mb-6">Settings</h2>
                                <div className="space-y-4">
                                    <div className="p-4 bg-slate-50 rounded-xl">
                                        <label className="flex items-center justify-between">
                                            <span className="font-semibold text-slate-900">Email Notifications</span>
                                            <input type="checkbox" className="w-5 h-5 text-indigo-600 rounded" defaultChecked />
                                        </label>
                                    </div>
                                    <div className="p-4 bg-slate-50 rounded-xl">
                                        <label className="flex items-center justify-between">
                                            <span className="font-semibold text-slate-900">SMS Notifications</span>
                                            <input type="checkbox" className="w-5 h-5 text-indigo-600 rounded" />
                                        </label>
                                    </div>
                                    <Link to="/privacy-policy" className="block p-4 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors">
                                        <span className="font-semibold text-slate-900">Privacy Policy</span>
                                    </Link>
                                    <Link to="/terms" className="block p-4 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors">
                                        <span className="font-semibold text-slate-900">Terms & Conditions</span>
                                    </Link>
                                </div>
                            </motion.div>
                        )}
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default UserDashboardPage;


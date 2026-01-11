import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { User, Mail, MapPin, Camera, Save, LogOut } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const UserDashboardPage = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [editing, setEditing] = useState(false);

    // Form State
    const [formData, setFormData] = useState({
        name: '',
        bio: '',
        location: '',
        avatarUrl: ''
    });

    useEffect(() => {
        fetchProfile();
    }, []);

    const fetchProfile = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                navigate('/login');
                return;
            }

            const res = await axios.get('http://localhost:5000/api/users/profile', {
                headers: { Authorization: `Bearer ${token}` }
            });

            setUser(res.data);
            setFormData({
                name: res.data.name,
                bio: res.data.profile?.bio || '',
                location: res.data.profile?.location || '',
                avatarUrl: res.data.profile?.avatarUrl || ''
            });
            setLoading(false);
        } catch (err) {
            console.error(err);
            toast.error('Failed to load profile');
            setLoading(false);
        }
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            await axios.put('http://localhost:5000/api/users/profile', formData, {
                headers: { Authorization: `Bearer ${token}` }
            });

            toast.success('Profile Updated!');
            setEditing(false);
            fetchProfile(); // Refresh
        } catch (err) {
            toast.error('Failed to update profile');
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/');
    };

    if (loading) return <div className="min-h-screen pt-24 text-center text-white">Loading...</div>;

    return (
        <div className="min-h-screen bg-slate-900 pt-24 px-6 pb-12">
            <Toaster position="top-center" />

            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="flex justify-between items-end mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-white">My Profile</h1>
                        <p className="text-slate-400">Manage your account settings and preferences.</p>
                    </div>
                    <button onClick={handleLogout} className="flex items-center text-red-400 hover:text-red-300 transition-colors">
                        <LogOut className="w-5 h-5 mr-2" /> Logout
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Sidebar Card */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 text-center h-fit"
                    >
                        <div className="relative inline-block mb-4">
                            <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-indigo-500/30 mx-auto bg-slate-800 flex items-center justify-center">
                                {user.profile?.avatarUrl ? (
                                    <img src={user.profile.avatarUrl} alt="Profile" className="w-full h-full object-cover" />
                                ) : (
                                    <User className="w-16 h-16 text-slate-500" />
                                )}
                            </div>
                            <button className="absolute bottom-0 right-0 p-2 bg-indigo-600 rounded-full text-white hover:bg-indigo-700 transition-colors">
                                <Camera className="w-4 h-4" />
                            </button>
                        </div>
                        <h2 className="text-xl font-bold text-white">{user.name}</h2>
                        <span className="inline-block mt-2 px-3 py-1 bg-indigo-500/20 text-indigo-300 text-xs rounded-full uppercase tracking-wider font-bold">
                            {user.role}
                        </span>
                        <div className="mt-6 space-y-3 text-left">
                            <div className="flex items-center text-slate-300 text-sm">
                                <Mail className="w-4 h-4 mr-3 text-slate-500" /> {user.email}
                            </div>
                            <div className="flex items-center text-slate-300 text-sm">
                                <MapPin className="w-4 h-4 mr-3 text-slate-500" /> {user.profile?.location || 'No location set'}
                            </div>
                        </div>
                    </motion.div>

                    {/* Editor Form */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="md:col-span-2 bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8"
                    >
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-xl font-bold text-white">Profile Details</h3>
                            <button
                                onClick={() => setEditing(!editing)}
                                className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${editing ? 'bg-slate-700 text-white' : 'bg-indigo-600 text-white hover:bg-indigo-700'}`}
                            >
                                {editing ? 'Cancel' : 'Edit Profile'}
                            </button>
                        </div>

                        <form onSubmit={handleUpdate} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-slate-400 text-sm mb-2">Full Name</label>
                                    <input
                                        disabled={!editing}
                                        type="text"
                                        className="w-full bg-black/20 border border-white/10 rounded-xl p-3 text-white disabled:opacity-50 outline-none focus:border-indigo-500 transition-colors"
                                        value={formData.name}
                                        onChange={e => setFormData({ ...formData, name: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <label className="block text-slate-400 text-sm mb-2">Location</label>
                                    <input
                                        disabled={!editing}
                                        type="text"
                                        className="w-full bg-black/20 border border-white/10 rounded-xl p-3 text-white disabled:opacity-50 outline-none focus:border-indigo-500 transition-colors"
                                        placeholder="e.g. New York, USA"
                                        value={formData.location}
                                        onChange={e => setFormData({ ...formData, location: e.target.value })}
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-slate-400 text-sm mb-2">Bio</label>
                                <textarea
                                    disabled={!editing}
                                    className="w-full bg-black/20 border border-white/10 rounded-xl p-3 text-white h-32 disabled:opacity-50 outline-none focus:border-indigo-500 transition-colors"
                                    placeholder="Tell us about yourself..."
                                    value={formData.bio}
                                    onChange={e => setFormData({ ...formData, bio: e.target.value })}
                                ></textarea>
                            </div>

                            {editing && (
                                <div className="flex justify-end">
                                    <button
                                        type="submit"
                                        className="flex items-center px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl transition-all shadow-lg shadow-indigo-500/20"
                                    >
                                        <Save className="w-5 h-5 mr-2" /> Save Changes
                                    </button>
                                </div>
                            )}
                        </form>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default UserDashboardPage;

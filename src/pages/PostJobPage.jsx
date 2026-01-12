import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Upload, DollarSign, Calendar, Ruler, CheckCircle, X } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import ThreeClothingDisplay from '../components/ThreeClothingDisplay';
import { API_ENDPOINTS } from '../config/api';

const PostJobPage = () => {
    const [loading, setLoading] = useState(false);
    const [images, setImages] = useState([]);
    const [previews, setPreviews] = useState([]);
    const [formData, setFormData] = useState({
        title: '',
        category: 'Alteration',
        budget: '',
        description: ''
    });
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        if (files.length > 5) {
            toast.error("You can only upload up to 5 images");
            return;
        }

        setImages(files);
        const newPreviews = [];
        files.forEach(file => {
            const reader = new FileReader();
            reader.onloadend = () => {
                newPreviews.push(reader.result);
                if (newPreviews.length === files.length) {
                    setPreviews(newPreviews);
                }
            };
            reader.readAsDataURL(file);
        });
    };

    const removeImage = (index) => {
        const newImages = [...images];
        newImages.splice(index, 1);
        setImages(newImages);

        const newPreviews = [...previews];
        newPreviews.splice(index, 1);
        setPreviews(newPreviews);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const token = localStorage.getItem('token');
            if (!token) {
                toast.error('Please login to post a job');
                navigate('/login');
                return;
            }

            const user = JSON.parse(localStorage.getItem('user'));
            const clientId = user?.id;

            const data = new FormData();
            data.append('title', formData.title);
            data.append('category', formData.category);
            data.append('budget', formData.budget);
            data.append('description', formData.description);
            data.append('clientId', clientId);
            images.forEach((image) => {
                data.append('images', image);
            });

            await axios.post(API_ENDPOINTS.JOBS, data, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data',
                },
            });

            toast.success("Job Posted Successfully! Tailors will bid soon.");
            setFormData({
                title: '',
                category: 'Alteration',
                budget: '',
                description: ''
            });
            setImages([]);
            setPreviews([]);
            setTimeout(() => navigate('/dashboard'), 1500);
        } catch (error) {
            console.error('Error posting job:', error);
            toast.error(error.response?.data?.message || 'Failed to post job. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-900 pt-24 pb-12 px-6 flex flex-col items-center">
            <Toaster position="top-center" />

            <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12">

                {/* Left Side: 3D Visualization */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="relative bg-gradient-to-br from-indigo-900/20 to-purple-900/20 rounded-3xl overflow-hidden border border-white/10 min-h-[500px]"
                >
                    <div className="absolute top-6 left-6 z-10">
                        <h2 className="text-3xl font-bold text-white mb-2">Visualize It</h2>
                        <p className="text-indigo-300">See your design come to life before you stitch.</p>
                    </div>
                    <ThreeClothingDisplay image="/assets/red-dress.png" />
                </motion.div>

                {/* Right Side: The Form */}
                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="bg-white/5 backdrop-blur-md border border-white/10 p-8 rounded-3xl"
                >
                    <h1 className="text-4xl font-bold text-white mb-6">Post a Job</h1>
                    <p className="text-slate-400 mb-8">Describe what you need, and let our master tailors work their magic.</p>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-slate-300 mb-2 font-medium">Project Title</label>
                            <input
                                type="text"
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                className="w-full bg-slate-800/50 border border-slate-700 rounded-xl p-3 text-white focus:ring-2 focus:ring-indigo-500 outline-none"
                                placeholder="e.g., Custom Wedding Suit Alteration"
                                required
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-slate-300 mb-2 font-medium">Category</label>
                                <select
                                    name="category"
                                    value={formData.category}
                                    onChange={handleChange}
                                    className="w-full bg-slate-800/50 border border-slate-700 rounded-xl p-3 text-white focus:ring-2 focus:ring-indigo-500 outline-none"
                                >
                                    <option>Alteration</option>
                                    <option>Bespoke / Custom</option>
                                    <option>Repair</option>
                                    <option>Embroidery</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-slate-300 mb-2 font-medium">
                                    Budget ($) <span className="text-red-400">*</span>
                                </label>
                                <div className="relative">
                                    <DollarSign className="absolute left-3 top-3.5 w-5 h-5 text-indigo-400" />
                                    <input
                                        type="number"
                                        name="budget"
                                        value={formData.budget}
                                        onChange={handleChange}
                                        required
                                        min="1"
                                        step="0.01"
                                        className="w-full bg-slate-800/50 border-2 border-indigo-500/50 rounded-xl py-3 pl-10 pr-3 text-white text-lg font-semibold focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none placeholder-slate-500"
                                        placeholder="Enter amount (e.g., 150.00)"
                                    />
                                    <p className="text-xs text-slate-400 mt-1">This is how much you're willing to pay for this job</p>
                                </div>
                            </div>
                        </div>

                        <div>
                            <label className="block text-slate-300 mb-2 font-medium">Description & Measurements</label>
                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                className="w-full bg-slate-800/50 border border-slate-700 rounded-xl p-3 text-white focus:ring-2 focus:ring-indigo-500 outline-none h-32"
                                placeholder="Please describe the fabric, fit preference, and any specific measurements..."
                                required
                            ></textarea>
                        </div>

                        <div className="space-y-4">
                            <label className="block text-slate-300 font-medium">Reference Images</label>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                {previews.map((preview, index) => (
                                    <div key={index} className="relative aspect-square rounded-xl overflow-hidden border border-white/10">
                                        <img src={preview} alt="Preview" className="w-full h-full object-cover" />
                                        <button
                                            type="button"
                                            onClick={() => removeImage(index)}
                                            className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                                        >
                                            <X className="w-4 h-4" />
                                        </button>
                                    </div>
                                ))}
                                {previews.length < 5 && (
                                    <div className="relative aspect-square bg-white/5 border-2 border-dashed border-white/10 rounded-xl flex flex-col items-center justify-center cursor-pointer hover:bg-white/10 transition-all">
                                        <input
                                            type="file"
                                            multiple
                                            accept="image/*"
                                            onChange={handleImageChange}
                                            className="absolute inset-0 opacity-0 cursor-pointer"
                                        />
                                        <Upload className="w-6 h-6 text-indigo-400 mb-2" />
                                        <span className="text-xs text-slate-400">Add Image</span>
                                    </div>
                                )}
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

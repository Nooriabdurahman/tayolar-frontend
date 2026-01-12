import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ShoppingBag, Star, Heart, Filter, Search } from 'lucide-react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Tailor3DScene from '../components/landing/Tailor3DScene';
import { API_ENDPOINTS } from '../config/api';

const ProductsShopPage = () => {
    const [favorites, setFavorites] = useState([]);
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchServices = async () => {
            try {
                const response = await axios.get(API_ENDPOINTS.SERVICES);
                setServices(response.data);
            } catch (error) {
                console.error('Error fetching services:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchServices();
    }, []);

    const toggleFavorite = (id) => {
        setFavorites(prev => prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]);
    };

    const filteredServices = services.filter(service =>
        service.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        service.description?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="relative min-h-screen bg-gradient-to-br from-slate-50 to-indigo-50 pt-24 pb-12">
            <div className="absolute inset-0 z-0 opacity-10">
                <Tailor3DScene />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-12"
                >
                    <h1 className="text-5xl font-bold text-slate-900 mb-4">Shop Services</h1>
                    <p className="text-xl text-slate-600">Browse our tailor services and products</p>
                </motion.div>

                {/* Search and Filter */}
                <div className="mb-8 flex flex-col md:flex-row gap-4">
                    <div className="flex-1 relative">
                        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                        <input
                            type="text"
                            placeholder="Search products..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        />
                    </div>
                    <button className="px-6 py-3 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors flex items-center gap-2">
                        <Filter className="w-5 h-5" />
                        Filter
                    </button>
                </div>

                {/* Products Grid */}
                {loading ? (
                    <div className="flex justify-center items-center h-64">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
                    </div>
                ) : (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredServices.length > 0 ? (
                            filteredServices.map((service, index) => (
                                <motion.div
                                    key={service.id || service._id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow overflow-hidden group"
                                >
                                    <div className="relative bg-gradient-to-br from-indigo-100 to-purple-100 p-12 flex items-center justify-center min-h-[250px]">
                                        {service.imageUrl ? (
                                            <img src={service.imageUrl} alt={service.name} className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                        ) : (
                                            <span className="text-8xl">👔</span>
                                        )}
                                        <button
                                            onClick={() => toggleFavorite(service.id || service._id)}
                                            className="absolute top-4 right-4 p-2 bg-white/80 backdrop-blur-sm rounded-full hover:bg-white transition-colors z-20"
                                        >
                                            <Heart
                                                className={`w-5 h-5 ${favorites.includes(service.id || service._id) ? 'fill-red-500 text-red-500' : 'text-slate-400'
                                                    }`}
                                            />
                                        </button>
                                    </div>
                                    <div className="p-6">
                                        <div className="flex items-start justify-between mb-2">
                                            <h3 className="text-xl font-bold text-slate-900">{service.title}</h3>
                                            <div className="flex items-center gap-1">
                                                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                                <span className="text-sm text-slate-600">{service.rating || 'New'}</span>
                                            </div>
                                        </div>
                                        <p className="text-sm text-slate-500 mb-4 line-clamp-2">{service.description}</p>
                                        <div className="flex items-center justify-between">
                                            <span className="text-2xl font-bold text-indigo-600">${service.price}</span>
                                            <Link
                                                to={`/checkout?product=${service.id || service._id}`}
                                                className="px-4 py-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-colors flex items-center gap-2"
                                            >
                                                <ShoppingBag className="w-4 h-4" />
                                                Order
                                            </Link>
                                        </div>
                                    </div>
                                </motion.div>
                            ))
                        ) : (
                            <div className="col-span-full text-center py-12">
                                <p className="text-slate-500 text-xl">No services found.</p>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProductsShopPage;


import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ShoppingBag, Star, Heart, Filter, Search } from 'lucide-react';
import { Link } from 'react-router-dom';
import Tailor3DScene from '../components/landing/Tailor3DScene';

const ProductsShopPage = () => {
    const [favorites, setFavorites] = useState([]);

    const products = [
        {
            id: 1,
            title: 'Bespoke Suit',
            price: 599,
            rating: 5,
            image: '👔',
            category: 'Suits',
        },
        {
            id: 2,
            title: 'Custom Shirt',
            price: 149,
            rating: 4.5,
            image: '👕',
            category: 'Shirts',
        },
        {
            id: 3,
            title: 'Wedding Dress',
            price: 1299,
            rating: 5,
            image: '👗',
            category: 'Dresses',
        },
        {
            id: 4,
            title: 'Alterations Service',
            price: 49,
            rating: 4.8,
            image: '✂️',
            category: 'Services',
        },
        {
            id: 5,
            title: 'Leather Jacket',
            price: 449,
            rating: 4.7,
            image: '🧥',
            category: 'Outerwear',
        },
        {
            id: 6,
            title: 'Formal Trousers',
            price: 199,
            rating: 4.6,
            image: '👖',
            category: 'Trousers',
        },
    ];

    const toggleFavorite = (id) => {
        setFavorites(prev => prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]);
    };

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
                            className="w-full pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        />
                    </div>
                    <button className="px-6 py-3 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors flex items-center gap-2">
                        <Filter className="w-5 h-5" />
                        Filter
                    </button>
                </div>

                {/* Products Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {products.map((product, index) => (
                        <motion.div
                            key={product.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow overflow-hidden group"
                        >
                            <div className="relative bg-gradient-to-br from-indigo-100 to-purple-100 p-12 flex items-center justify-center">
                                <span className="text-8xl">{product.image}</span>
                                <button
                                    onClick={() => toggleFavorite(product.id)}
                                    className="absolute top-4 right-4 p-2 bg-white/80 backdrop-blur-sm rounded-full hover:bg-white transition-colors"
                                >
                                    <Heart
                                        className={`w-5 h-5 ${
                                            favorites.includes(product.id) ? 'fill-red-500 text-red-500' : 'text-slate-400'
                                        }`}
                                    />
                                </button>
                            </div>
                            <div className="p-6">
                                <div className="flex items-start justify-between mb-2">
                                    <h3 className="text-xl font-bold text-slate-900">{product.title}</h3>
                                    <div className="flex items-center gap-1">
                                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                        <span className="text-sm text-slate-600">{product.rating}</span>
                                    </div>
                                </div>
                                <p className="text-sm text-slate-500 mb-4">{product.category}</p>
                                <div className="flex items-center justify-between">
                                    <span className="text-2xl font-bold text-indigo-600">${product.price}</span>
                                    <Link
                                        to={`/checkout?product=${product.id}`}
                                        className="px-4 py-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-colors flex items-center gap-2"
                                    >
                                        <ShoppingBag className="w-4 h-4" />
                                        Order
                                    </Link>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ProductsShopPage;


import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Heart, Users, Target, Award } from 'lucide-react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Tailor3DScene from '../components/landing/Tailor3DScene';
import { API_ENDPOINTS } from '../config/api';

// --- About Us ---
export const AboutPage = () => {
    const values = [
        { icon: Heart, title: 'Passion for Craft', desc: 'We celebrate the artistry of tailoring and the dedication of skilled craftspeople.' },
        { icon: Users, title: 'Community First', desc: 'Building connections between tailors and clients, fostering trust and quality.' },
        { icon: Target, title: 'Excellence', desc: 'Setting the highest standards for service, quality, and customer satisfaction.' },
        { icon: Award, title: 'Innovation', desc: 'Combining traditional craftsmanship with modern technology and convenience.' },
    ];

    return (
        <div className="relative min-h-screen bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-900 pt-24 pb-12">
            <div className="absolute inset-0 z-0 opacity-20">
                <Tailor3DScene />
            </div>

            <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-16"
                >
                    <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">About TailorHub</h1>
                    <p className="text-xl text-slate-300 max-w-3xl mx-auto">
                        Connecting the world's best craftsmen with people who appreciate quality
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-8 md:p-12 mb-12"
                >
                    <h2 className="text-3xl font-bold text-white mb-6">Our Story</h2>
                    <div className="space-y-6 text-lg text-white/90 leading-relaxed">
                        <p>
                            TailorHub was born from a simple idea: connect the world's best craftsmen with people who appreciate quality. We believe that clothing shouldn't just fit your body—it should fit your personality, your lifestyle, and your values.
                        </p>
                        <p>
                            Our platform empowers skilled tailors to showcase their work and allows clients to access bespoke fashion from anywhere. We bridge the gap between traditional craftsmanship and modern convenience, making premium tailoring accessible to everyone.
                        </p>
                    </div>
                </motion.div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                    {values.map((value, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 + index * 0.1 }}
                            className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20 text-center"
                        >
                            <div className="w-16 h-16 bg-indigo-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                                <value.icon className="w-8 h-8 text-indigo-300" />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-2">{value.title}</h3>
                            <p className="text-white/80 text-sm">{value.desc}</p>
                        </motion.div>
                    ))}
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 }}
                    className="text-center"
                >
                    <Link
                        to="/contact"
                        className="inline-block px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl transition-colors"
                    >
                        Get in Touch
                    </Link>
                </motion.div>
            </div>
        </div>
    );
};

// --- Contact Us ---
export const ContactPage = () => {
    const [formData, setFormData] = React.useState({ name: '', email: '', message: '' });

    const handleSubmit = (e) => {
        e.preventDefault();
        alert('Thank you for your message! We will get back to you soon.');
        setFormData({ name: '', email: '', message: '' });
    };

    return (
        <div className="relative min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 pt-24 pb-12 flex items-center">
            <div className="absolute inset-0 z-0 opacity-20">
                <Tailor3DScene />
            </div>

            <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-12"
                >
                    <h1 className="text-5xl font-bold text-white mb-4">Get in Touch</h1>
                    <p className="text-xl text-slate-300">Have questions? We'd love to hear from you</p>
                </motion.div>

                <div className="grid md:grid-cols-2 gap-8">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="bg-white/10 backdrop-blur-xl rounded-2xl p-8 border border-white/20"
                    >
                        <h2 className="text-2xl font-bold text-white mb-6">Contact Information</h2>
                        <div className="space-y-6 text-white/90">
                            <div>
                                <p className="text-sm text-white/70 mb-1">Email</p>
                                <a href="mailto:support@tailorhub.com" className="text-lg font-semibold hover:text-purple-300 transition-colors">
                                    support@tailorhub.com
                                </a>
                            </div>
                            <div>
                                <p className="text-sm text-white/70 mb-1">Phone</p>
                                <a href="tel:+15551234567" className="text-lg font-semibold hover:text-purple-300 transition-colors">
                                    +1 (555) 123-4567
                                </a>
                            </div>
                            <div>
                                <p className="text-sm text-white/70 mb-1">Address</p>
                                <p className="text-lg font-semibold">123 Fashion Ave, Design District, NY</p>
                            </div>
                        </div>
                    </motion.div>

                    <motion.form
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        onSubmit={handleSubmit}
                        className="bg-white/10 backdrop-blur-xl rounded-2xl p-8 border border-white/20 space-y-4"
                    >
                        <div>
                            <input
                                type="text"
                                required
                                className="w-full p-4 bg-white/5 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                                placeholder="Your Name"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            />
                        </div>
                        <div>
                            <input
                                type="email"
                                required
                                className="w-full p-4 bg-white/5 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                                placeholder="Email Address"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            />
                        </div>
                        <div>
                            <textarea
                                required
                                rows="6"
                                className="w-full p-4 bg-white/5 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all resize-none"
                                placeholder="Your Message"
                                value={formData.message}
                                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold rounded-xl transition-all transform hover:-translate-y-0.5"
                        >
                            Send Message
                        </button>
                    </motion.form>
                </div>
            </div>
        </div>
    );
};

// --- Services ---
export const ServicesPage = () => {
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);

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

    return (
        <div className="relative min-h-screen bg-gradient-to-br from-slate-50 to-indigo-50 pt-24 pb-12">
            <div className="absolute inset-0 z-0 opacity-10">
                <Tailor3DScene />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-16"
                >
                    <h1 className="text-5xl font-bold text-slate-900 mb-4">Our Services</h1>
                    <p className="text-xl text-slate-600">Premium tailoring services for every need</p>
                </motion.div>

                {loading ? (
                    <div className="flex justify-center items-center h-64">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
                    </div>
                ) : (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {services.length > 0 ? (
                            services.map((service, index) => (
                                <motion.div
                                    key={service.id || index}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow p-8 group"
                                >
                                    <div className="text-6xl mb-4 group-hover:scale-110 transition-transform">
                                        {service.imageUrl ? (
                                            <img src={service.imageUrl} alt={service.name} className="w-20 h-20 object-cover rounded-full mx-auto" />
                                        ) : '✂️'}
                                    </div>
                                    <h3 className="text-2xl font-bold text-slate-900 mb-3">{service.name}</h3>
                                    <p className="text-slate-600 mb-4 line-clamp-3">{service.description}</p>
                                    <div className="flex items-center justify-between pt-4 border-t border-slate-200">
                                        <span className="text-lg font-bold text-indigo-600">${service.price?.toFixed(2)}</span>
                                        <Link
                                            to="/contact"
                                            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors text-sm font-semibold"
                                        >
                                            Book Now
                                        </Link>
                                    </div>
                                </motion.div>
                            ))
                        ) : (
                            <div className="col-span-full text-center text-slate-500 py-12">
                                No services available at the moment.
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

// --- Portfolio ---
export const PortfolioPage = () => {
    const projects = [
        { id: 1, title: 'Bespoke Suit Collection', category: 'Suits', emoji: '👔' },
        { id: 2, title: 'Wedding Dress Series', category: 'Dresses', emoji: '👗' },
        { id: 3, title: 'Formal Shirt Collection', category: 'Shirts', emoji: '👕' },
        { id: 4, title: 'Leather Jacket Designs', category: 'Outerwear', emoji: '🧥' },
        { id: 5, title: 'Corporate Uniforms', category: 'Uniforms', emoji: '🎖️' },
        { id: 6, title: 'Evening Wear Collection', category: 'Formal', emoji: '🎩' },
    ];

    return (
        <div className="relative min-h-screen bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-900 pt-24 pb-12">
            <div className="absolute inset-0 z-0 opacity-20">
                <Tailor3DScene />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-16"
                >
                    <h1 className="text-5xl font-bold text-white mb-4">Featured Work</h1>
                    <p className="text-xl text-slate-300">Showcasing our master tailors' finest creations</p>
                </motion.div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {projects.map((project, index) => (
                        <motion.div
                            key={project.id}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: index * 0.1 }}
                            className="group relative aspect-square bg-gradient-to-br from-indigo-500/20 to-purple-500/20 backdrop-blur-xl rounded-2xl overflow-hidden border border-white/20 cursor-pointer hover:border-indigo-400 transition-all"
                        >
                            <div className="absolute inset-0 flex flex-col items-center justify-center p-8">
                                <div className="text-8xl mb-4 group-hover:scale-110 transition-transform">{project.emoji}</div>
                                <h3 className="text-2xl font-bold text-white mb-2">{project.title}</h3>
                                <p className="text-indigo-300">{project.category}</p>
                            </div>
                            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                <span className="text-white font-bold text-lg">View Project →</span>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};

// --- Blog ---
export const BlogPage = () => {
    const posts = [
        {
            id: 1,
            title: 'The Future of Bespoke Tailoring',
            excerpt: 'Exploring how technology and tradition combine to create the perfect suit. Discover the latest trends in custom tailoring.',
            date: 'Jan 11, 2026',
            category: 'Fashion',
            emoji: '👔',
        },
        {
            id: 2,
            title: 'Sustainable Fashion in Tailoring',
            excerpt: 'How modern tailors are embracing eco-friendly practices and sustainable materials to create beautiful, ethical garments.',
            date: 'Jan 12, 2026',
            category: 'Sustainability',
            emoji: '🌱',
        },
        {
            id: 3,
            title: 'Tips for Perfect Measurements',
            excerpt: 'A comprehensive guide to getting accurate measurements for custom clothing. Learn the secrets of professional tailors.',
            date: 'Jan 13, 2026',
            category: 'Guide',
            emoji: '📏',
        },
    ];

    return (
        <div className="relative min-h-screen bg-gradient-to-br from-slate-50 to-indigo-50 pt-24 pb-12">
            <div className="absolute inset-0 z-0 opacity-10">
                <Tailor3DScene />
            </div>

            <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-16"
                >
                    <h1 className="text-5xl font-bold text-slate-900 mb-4">Latest News</h1>
                    <p className="text-xl text-slate-600">Insights, trends, and stories from the world of tailoring</p>
                </motion.div>

                <div className="space-y-8">
                    {posts.map((post, index) => (
                        <motion.article
                            key={post.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow overflow-hidden group cursor-pointer"
                        >
                            <div className="md:flex">
                                <div className="md:w-48 bg-gradient-to-br from-indigo-100 to-purple-100 flex items-center justify-center p-12 group-hover:scale-105 transition-transform">
                                    <span className="text-8xl">{post.emoji}</span>
                                </div>
                                <div className="flex-1 p-8">
                                    <div className="flex items-center gap-3 mb-3">
                                        <span className="px-3 py-1 bg-indigo-100 text-indigo-600 text-sm font-semibold rounded-full">{post.category}</span>
                                        <span className="text-sm text-slate-400">{post.date}</span>
                                    </div>
                                    <h2 className="text-3xl font-bold text-slate-900 mb-3 group-hover:text-indigo-600 transition-colors">
                                        {post.title}
                                    </h2>
                                    <p className="text-slate-600 leading-relaxed mb-4">{post.excerpt}</p>
                                    <Link to="#" className="text-indigo-600 font-semibold hover:text-indigo-700 inline-flex items-center gap-2">
                                        Read More →
                                    </Link>
                                </div>
                            </div>
                        </motion.article>
                    ))}
                </div>
            </div>
        </div>
    );
};

// --- 404 ---
export const NotFoundPage = () => {
    return (
        <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-900 via-red-900 to-slate-900">
            <div className="absolute inset-0 z-0 opacity-30">
                <Tailor3DScene />
            </div>

            <div className="relative z-10 max-w-2xl mx-auto px-4 text-center">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8 }}
                    className="bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-12"
                >
                    <motion.h1
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                        className="text-9xl font-bold text-red-400 mb-4"
                    >
                        404
                    </motion.h1>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="text-3xl font-bold text-white mb-4"
                    >
                        Page Not Found
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="text-xl text-slate-300 mb-8"
                    >
                        Oops! The page you're looking for seems to have been misplaced. Don't worry, our tailors can help you find your way!
                    </motion.p>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className="flex gap-4 justify-center flex-wrap"
                    >
                        <Link
                            to="/"
                            className="px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl transition-colors"
                        >
                            Go Home
                        </Link>
                        <Link
                            to="/sitemap"
                            className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-xl transition-colors border border-white/20"
                        >
                            View Sitemap
                        </Link>
                    </motion.div>
                </motion.div>
            </div>
        </div>
    );
};
